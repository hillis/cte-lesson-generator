#!/usr/bin/env python3
"""
Check email authentication DNS records (MX, SPF, DKIM, DMARC) for a domain.

Usage:
    python3 check-email-auth-records.py <domain>
    python3 check-email-auth-records.py madisoncity.k12.al.us
"""

import sys
import dns.resolver

DKIM_SELECTORS = [
    "google", "default", "selector1", "selector2",
    "s1", "s2", "k1", "k2", "dkim", "mail",
    "mandrill", "everlytickey1", "everlytickey2",
    "pic", "cm", "protonmail", "protonmail2", "protonmail3",
    "smtp", "ses", "mxvault",
]


def create_resolver():
    resolver = dns.resolver.Resolver()
    resolver.nameservers = ["8.8.8.8", "8.8.4.4", "1.1.1.1"]
    resolver.lifetime = 10
    return resolver


def query(resolver, qname, rdtype):
    try:
        answers = resolver.resolve(qname, rdtype)
        return [r.to_text() for r in answers]
    except dns.resolver.NXDOMAIN:
        return []
    except dns.resolver.NoAnswer:
        return []
    except dns.resolver.LifetimeTimeout:
        return ["ERROR: DNS query timed out"]
    except Exception as e:
        return [f"ERROR: {type(e).__name__}: {e}"]


def check_domain(domain):
    resolver = create_resolver()

    print("=" * 64)
    print(f"  Email Authentication DNS Records for: {domain}")
    print("=" * 64)

    # MX Records
    print("\n--- MX Records ---")
    mx_records = query(resolver, domain, "MX")
    if mx_records:
        for r in sorted(mx_records):
            print(f"  {r}")
    else:
        print("  [MISSING] No MX records found")

    # SPF (TXT)
    print("\n--- SPF Record ---")
    txt_records = query(resolver, domain, "TXT")
    spf_found = False
    for r in txt_records:
        if "v=spf1" in r.lower():
            print(f"  {r}")
            spf_found = True
    if not spf_found:
        print("  [MISSING] No SPF record found")

    # DMARC
    print("\n--- DMARC Record ---")
    dmarc_records = query(resolver, f"_dmarc.{domain}", "TXT")
    dmarc_found = False
    for r in dmarc_records:
        if "v=dmarc1" in r.lower():
            print(f"  {r}")
            dmarc_found = True
    if not dmarc_found:
        print("  [MISSING] No DMARC record found")

    # DKIM
    print("\n--- DKIM Records ---")
    dkim_found = False
    for selector in DKIM_SELECTORS:
        results = query(resolver, f"{selector}._domainkey.{domain}", "TXT")
        for r in results:
            if r.startswith("ERROR"):
                continue
            print(f"  Selector '{selector}': {r}")
            dkim_found = True
    if not dkim_found:
        print(f"  [MISSING] No DKIM records found (checked selectors: {', '.join(DKIM_SELECTORS)})")

    # All TXT Records
    print("\n--- All TXT Records ---")
    if txt_records:
        for r in txt_records:
            print(f"  {r}")
    else:
        print("  No TXT records found")

    # Summary
    print("\n" + "=" * 64)
    print("  Summary")
    print("=" * 64)
    checks = {
        "MX": bool(mx_records and not any("ERROR" in r for r in mx_records)),
        "SPF": spf_found,
        "DMARC": dmarc_found,
        "DKIM": dkim_found,
    }
    for check, passed in checks.items():
        status = "PASS" if passed else "FAIL"
        icon = "[+]" if passed else "[-]"
        print(f"  {icon} {check}: {status}")
    print()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <domain>")
        print(f"Example: {sys.argv[0]} madisoncity.k12.al.us")
        sys.exit(1)

    domain = sys.argv[1]
    check_domain(domain)
