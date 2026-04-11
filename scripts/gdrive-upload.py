#!/usr/bin/env python3
"""
Google Drive Upload Helper for CTE Lesson Plans

Uploads generated lesson files to a configured Google Drive folder.
Handles OAuth2 authentication with saved tokens.

Usage:
  # First-time setup - authenticate and set default folder:
  python3 gdrive-upload.py setup

  # List folders to find your folder ID:
  python3 gdrive-upload.py list-folders [search_query]

  # Upload files:
  python3 gdrive-upload.py upload file1.docx file2.docx ...

  # Upload entire week folder:
  python3 gdrive-upload.py upload-folder Week03

  # Show current config:
  python3 gdrive-upload.py config
"""

import sys
import os
import json
import mimetypes

CONFIG_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(CONFIG_DIR, 'gdrive-config.json')
TOKEN_PATH = os.path.join(CONFIG_DIR, 'gdrive-token.json')
CREDENTIALS_PATH = os.path.join(CONFIG_DIR, 'client_secret.json')

SCOPES = ['https://www.googleapis.com/auth/drive']


def load_config():
    """Load the config file, creating default if missing."""
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH) as f:
            return json.load(f)
    return {"default_folder_id": "", "default_folder_name": ""}


def save_config(config):
    """Save config to file."""
    with open(CONFIG_PATH, 'w') as f:
        json.dump(config, f, indent=2)


def get_credentials():
    """Get valid Google Drive API credentials, refreshing or re-authenticating as needed."""
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request

    creds = None

    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_PATH):
                print(f"ERROR: No credentials file found at {CREDENTIALS_PATH}")
                print()
                print("To set up Google Drive access:")
                print("1. Go to https://console.cloud.google.com/apis/credentials")
                print("2. Create a project (or select existing)")
                print("3. Enable the Google Drive API")
                print("4. Create OAuth 2.0 Client ID (Desktop application type)")
                print("5. Download the JSON and save it as:")
                print(f"   {CREDENTIALS_PATH}")
                print("6. Run: python3 gdrive-upload.py setup")
                sys.exit(1)

            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(TOKEN_PATH, 'w') as token:
            token.write(creds.to_json())

    return creds


def get_service():
    """Build and return the Google Drive API service."""
    from googleapiclient.discovery import build
    return build('drive', 'v3', credentials=get_credentials())


def list_folders(query=None):
    """List Google Drive folders, optionally filtered by search query."""
    service = get_service()

    q = "mimeType='application/vnd.google-apps.folder' and trashed=false"
    if query:
        q += f" and name contains '{query}'"

    results = service.files().list(
        q=q,
        spaces='drive',
        fields='files(id, name, parents)',
        orderBy='name',
        pageSize=50
    ).execute()

    folders = results.get('files', [])
    if not folders:
        print("No folders found.")
        return

    print(f"{'Folder Name':<50} {'Folder ID'}")
    print("-" * 90)
    for folder in folders:
        print(f"{folder['name']:<50} {folder['id']}")

    return folders


def find_or_create_subfolder(service, parent_id, folder_name):
    """Find a subfolder by name, or create it if it doesn't exist."""
    q = (f"mimeType='application/vnd.google-apps.folder' "
         f"and name='{folder_name}' "
         f"and '{parent_id}' in parents "
         f"and trashed=false")

    results = service.files().list(q=q, spaces='drive', fields='files(id, name)').execute()
    files = results.get('files', [])

    if files:
        return files[0]['id']

    # Create the subfolder
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder',
        'parents': [parent_id]
    }
    folder = service.files().create(body=file_metadata, fields='id').execute()
    print(f"  Created subfolder: {folder_name}")
    return folder['id']


def upload_file(service, file_path, folder_id):
    """Upload a single file to a Google Drive folder."""
    from googleapiclient.http import MediaFileUpload

    filename = os.path.basename(file_path)
    mime_type = mimetypes.guess_type(file_path)[0] or 'application/octet-stream'

    # Check if file already exists in folder
    q = f"name='{filename}' and '{folder_id}' in parents and trashed=false"
    existing = service.files().list(q=q, spaces='drive', fields='files(id)').execute()
    existing_files = existing.get('files', [])

    media = MediaFileUpload(file_path, mimetype=mime_type, resumable=True)

    if existing_files:
        # Update existing file
        file = service.files().update(
            fileId=existing_files[0]['id'],
            media_body=media,
            fields='id, name, webViewLink'
        ).execute()
        print(f"  Updated: {filename}")
    else:
        # Create new file
        file_metadata = {
            'name': filename,
            'parents': [folder_id]
        }
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id, name, webViewLink'
        ).execute()
        print(f"  Uploaded: {filename}")

    return file


def upload_files(file_paths, folder_id=None):
    """Upload multiple files to Google Drive."""
    config = load_config()
    folder_id = folder_id or config.get('default_folder_id')

    if not folder_id:
        print("ERROR: No folder ID specified and no default configured.")
        print("Run: python3 gdrive-upload.py setup")
        sys.exit(1)

    service = get_service()
    print(f"Uploading to folder: {config.get('default_folder_name', folder_id)}")

    uploaded = []
    for path in file_paths:
        if not os.path.exists(path):
            print(f"  Skipped (not found): {path}")
            continue
        file = upload_file(service, path, folder_id)
        uploaded.append(file)

    print(f"\nDone! {len(uploaded)} file(s) uploaded.")
    return uploaded


def upload_folder(local_folder, folder_id=None):
    """Upload all files in a local folder, creating a matching subfolder on Drive."""
    config = load_config()
    folder_id = folder_id or config.get('default_folder_id')

    if not folder_id:
        print("ERROR: No folder ID specified and no default configured.")
        print("Run: python3 gdrive-upload.py setup")
        sys.exit(1)

    if not os.path.isdir(local_folder):
        print(f"ERROR: {local_folder} is not a directory.")
        sys.exit(1)

    service = get_service()
    folder_name = os.path.basename(os.path.normpath(local_folder))

    # Create subfolder on Drive matching the local folder name
    subfolder_id = find_or_create_subfolder(service, folder_id, folder_name)
    print(f"Uploading to: {config.get('default_folder_name', '')} / {folder_name}")

    uploaded = []
    for filename in sorted(os.listdir(local_folder)):
        file_path = os.path.join(local_folder, filename)
        if os.path.isfile(file_path):
            file = upload_file(service, file_path, subfolder_id)
            uploaded.append(file)

    print(f"\nDone! {len(uploaded)} file(s) uploaded to {folder_name}/")
    return uploaded


def setup():
    """Authenticate with Google Drive (non-interactive)."""
    print("=== Google Drive Upload Setup ===\n")

    print("Authenticating with Google...")
    if not os.path.exists(CREDENTIALS_PATH):
        print(f"\nNo credentials file found at:\n  {CREDENTIALS_PATH}\n")
        print("To create one:")
        print("1. Go to https://console.cloud.google.com/apis/credentials")
        print("2. Create/select a project, enable Google Drive API")
        print("3. Create OAuth 2.0 Client ID (Desktop application)")
        print("4. Download the JSON file")
        print(f"5. Save it as: {CREDENTIALS_PATH}")
        print("6. Re-run: python3 gdrive-upload.py setup")
        sys.exit(1)

    get_credentials()
    print("Authenticated successfully!")
    print("\nNext: Run 'list-folders' to find your folder, then 'set-folder <ID>' to set it.")


def set_folder(folder_id):
    """Set the default Google Drive folder by ID."""
    service = get_service()
    try:
        folder = service.files().get(fileId=folder_id, fields='id, name').execute()
        folder_name = folder['name']
    except Exception as e:
        print(f"ERROR: Could not find folder: {e}")
        sys.exit(1)

    config = load_config()
    config['default_folder_id'] = folder_id
    config['default_folder_name'] = folder_name
    save_config(config)

    print(f"Default folder set to: {folder_name} ({folder_id})")


def show_config():
    """Display current configuration."""
    config = load_config()
    print("=== Google Drive Upload Config ===")
    print(f"Config file: {CONFIG_PATH}")
    print(f"Token file:  {TOKEN_PATH} ({'exists' if os.path.exists(TOKEN_PATH) else 'NOT FOUND'})")
    print(f"Credentials: {CREDENTIALS_PATH} ({'exists' if os.path.exists(CREDENTIALS_PATH) else 'NOT FOUND'})")
    print(f"Default folder: {config.get('default_folder_name', 'Not set')} ({config.get('default_folder_id', 'Not set')})")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(0)

    command = sys.argv[1]

    if command == 'setup':
        setup()
    elif command == 'config':
        show_config()
    elif command == 'set-folder':
        if len(sys.argv) < 3:
            print("Usage: gdrive-upload.py set-folder <FOLDER_ID>")
            sys.exit(1)
        set_folder(sys.argv[2])
    elif command == 'list-folders':
        query = sys.argv[2] if len(sys.argv) > 2 else None
        list_folders(query)
    elif command == 'upload':
        if len(sys.argv) < 3:
            print("Usage: gdrive-upload.py upload file1.docx file2.docx ...")
            sys.exit(1)
        upload_files(sys.argv[2:])
    elif command == 'upload-folder':
        if len(sys.argv) < 3:
            print("Usage: gdrive-upload.py upload-folder Week03")
            sys.exit(1)
        upload_folder(sys.argv[2])
    else:
        print(f"Unknown command: {command}")
        print(__doc__)
        sys.exit(1)


if __name__ == '__main__':
    main()
