---
name: cte-lesson
description: Generate complete Media Foundations lesson plan packages - CTE lesson plans, teacher handout, and student handouts. Automatically uses the correct method for each document type.
---

# Media Foundations Lesson Plan Generator

Generate complete lesson plan packages for Media Foundations. This skill orchestrates multiple document types using the best approach for each:

- **CTE Lesson Plans** → Generated using the CTE template (this skill's Python script)
- **Teacher Handout** → Generated using the docx skill (docx-js)
- **Student Handouts** → Generated using the docx skill (docx-js)

## When to Use

Use this skill when user says any of:
- "make lesson plans for week X"
- "create lesson plans"
- "generate week X lessons"
- `/cte-lesson`

## CRITICAL: Automatic Document Generation

When the user requests lesson plans, Claude MUST generate ALL THREE document types automatically:

1. **CTE Lesson Plans** - using `scripts/generate-lesson-plan.py`
2. **Teacher Handout** - using the docx skill (read `/mnt/skills/public/docx/SKILL.md` first)
3. **Student Handouts** - using the docx skill

The user should NOT need to ask separately for each document type.

## Course Reference

**Course:** Media Foundations Spring 2026
**Instructor:** Mr. Matthew Hillis
**School:** James Clemens High School
**Class Duration:** 90 minutes

Reference files:
- `references/syllabus-weeks.md` - 18-week syllabus
- `references/course-memory.md` - Lesson format, rules, standards
- `references/content-standards.md` - Alabama CTE Content Standards

## Important Rules
- **DO NOT** put teacher name or class name on presentation slides
- **Class time is 90 minutes**
- **Default to 5 days per week** (Monday, Tuesday, Wednesday, Thursday, Friday)
- Students must pass safety test with 100% before using equipment

---

## Complete Workflow

### Step 1: Gather Information

Ask the user which week they need. Reference the syllabus to plan content for each day.

### Step 2: Generate CTE Lesson Plans

Run the Python script with JSON data:

```bash
echo '<JSON_DATA>' | python3 scripts/generate-lesson-plan.py
```

### Step 3: Generate Teacher Handout

**Read the docx skill first:** `/mnt/skills/public/docx/SKILL.md`

Use docx-js (JavaScript) to create the teacher handout. Install: `npm install docx`

#### Required Format (MUST MATCH EXACTLY)

**Colors:**
- NAVY: "1B3A5F"
- LIGHT_BLUE: "D5E8F0"
- LIGHT_GRAY: "F5F5F5"
- CREAM_YELLOW: "FFF9E6"
- BORDER_GRAY: "CCCCCC"

**Document Structure:**

1. **Header Table** - Full width, navy background
   - "WEEK X: UNIT NAME" - white, bold, 18pt, centered
   - "Teacher Weekly Guide" - light blue (#D5E8F0), 12pt, centered

2. **Week Overview Box** - Light blue fill, gray border
   - "WEEK OVERVIEW" header - navy, bold
   - Overview paragraph below

3. **Section Headers** - Paragraph with bottom border only
   - Bold, navy (#1B3A5F), 13pt
   - Bottom border: 12pt solid navy line
   - NO sidebars or accent bars

4. **Learning Objectives** - Simple numbered list
   - Bold number: "1. " then regular text

5. **Materials Needed** - Simple bullet list
   - "• " prefix for each item

6. **Assessment Table** - 3 equal columns
   - Column 1: FORMATIVE (light blue fill)
   - Column 2: SUMMATIVE (light gray fill)
   - Column 3: DELIVERABLE (cream yellow fill)

7. **Daily Breakdown** - For each day:
   - Day header table: "DAY 1" (navy cell) | "Monday: Topic" (light blue cell)
   - "Objectives:" label then bullet list
   - Schedule table with headers: TIME | ACTIVITY | DESCRIPTION
   - Navy header row, alternating white/gray data rows
   - Teacher notes in cream yellow box if present

### Step 4: Generate Student Handouts (if needed)

Use docx-js with the same color scheme and similar structure:

1. **Header** - Navy background, white title, light blue subtitle
2. **Intro Box** - Light blue fill with content
3. **Sections** - Header with bottom border, then numbered/bullet content
4. **Vocabulary Table** - Term | Definition, alternating row colors
5. **Tips Box** - Cream yellow background

---

## docx-js Quick Reference

```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

const NAVY = "1B3A5F";
const LIGHT_BLUE = "D5E8F0";
const LIGHT_GRAY = "F5F5F5";
const CREAM_YELLOW = "FFF9E6";
const BORDER_GRAY = "CCCCCC";

const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY };
const borders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

// Section header with bottom border (NO sidebars)
function sectionHeader(text) {
    return new Paragraph({
        spacing: { before: 200, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: NAVY } },
        children: [new TextRun({ text, bold: true, color: NAVY, size: 26 })]
    });
}

// Document with US Letter size
const doc = new Document({
    sections: [{
        properties: {
            page: {
                size: { width: 12240, height: 15840 },
                margin: { top: 720, right: 720, bottom: 720, left: 720 }
            }
        },
        children: [/* paragraphs and tables */]
    }]
});

// Save document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("output.docx", buffer);
});
```

See `templates/teacher-handout.js` and `templates/student-handout.js` for complete examples.

---

## JSON Structure for CTE Plans

**IMPORTANT:** Always create 5 days (Monday - Friday) unless the user specifies otherwise.

```json
{
  "week": "3",
  "unit": "Camera Basics",
  "week_overview": "Students learn fundamental camera operations...",
  "week_objectives": ["Objective 1", "Objective 2"],
  "week_materials": ["DSLR cameras", "Tripods"],
  "formative_assessment": "Daily participation",
  "summative_assessment": "Camera Skills Test",
  "weekly_deliverable": "Completed photo assignment",
  "skip_presentations": true,
  "days": [
    {
      "topic": "Day 1 Topic (Monday)",
      "objectives": ["Objective 1"],
      "schedule": [{"time": "10 min", "name": "Bell Ringer", "description": "..."}],
      "teacher_notes": "..."
    },
    {
      "topic": "Day 2 Topic (Tuesday)",
      "objectives": ["Objective 1"],
      "schedule": [{"time": "10 min", "name": "Bell Ringer", "description": "..."}],
      "teacher_notes": "..."
    },
    {
      "topic": "Day 3 Topic (Wednesday)",
      "objectives": ["Objective 1"],
      "schedule": [{"time": "10 min", "name": "Bell Ringer", "description": "..."}],
      "teacher_notes": "..."
    },
    {
      "topic": "Day 4 Topic (Thursday)",
      "objectives": ["Objective 1"],
      "schedule": [{"time": "10 min", "name": "Bell Ringer", "description": "..."}],
      "teacher_notes": "..."
    },
    {
      "topic": "Day 5 Topic (Friday)",
      "objectives": ["Objective 1"],
      "schedule": [{"time": "10 min", "name": "Bell Ringer", "description": "..."}],
      "teacher_notes": "..."
    }
  ]
}
```

---

### Step 5: Upload to Google Drive

After generating all files, upload the week folder to Google Drive:

```bash
python3 scripts/gdrive-upload.py upload-folder <path_to_WeekXX_folder>
```

This uploads all generated files to the configured default Google Drive folder, creating a `WeekXX` subfolder automatically. If a file already exists, it is updated in place.

**First-time setup required:** Run `python3 scripts/gdrive-upload.py setup` to authenticate and set the default folder. See the Google Drive Setup section below.

---

## Output Summary

After completing all steps, deliver to user:
- `Day1_Topic_CTE.docx` through `Day5_Topic_CTE.docx` (5 days: Mon-Fri)
- `WeekX_Unit_TeacherHandout.docx`
- `HandoutName_StudentHandout.docx` (as needed)
- All files uploaded to Google Drive in a `WeekXX` subfolder

## Google Drive Setup (One-Time)

1. Go to https://console.cloud.google.com/apis/credentials
2. Create/select a project, enable the **Google Drive API**
3. Create OAuth 2.0 Client ID (Desktop application type)
4. Download the JSON and save it as `scripts/client_secret.json`
5. Run: `python3 scripts/gdrive-upload.py setup`
6. A browser window will open - sign in with your school Google account
7. Select your default folder from the list

The token is saved locally at `scripts/gdrive-token.json` and auto-refreshes. To use remotely, copy `gdrive-token.json` and `client_secret.json` to the remote machine's skill scripts folder.

## Dependencies

- Python 3.8+ with python-docx, Pillow, requests, google-api-python-client, google-auth-oauthlib
- Node.js with docx package (`npm install docx`)
- PEXELS_API_KEY for presentations (optional)
- Google OAuth2 credentials for Drive upload (`scripts/client_secret.json`)
