---
name: cte-lesson
description: Generate Media Foundations lesson plans for a week - CTE format (per day), teacher handout (weekly), student handouts, and daily lesson presentations with auto-sourced images and videos
---

# Media Foundations Lesson Plan Generator

Generate complete lesson plan packages for Media Foundations based on the Spring 2026 syllabus. Includes Canva-quality styled handouts and full 90-minute daily lesson presentations with auto-sourced images from Pexels and embedded YouTube videos.

## When to Use

Use this skill when:
- User wants to create lesson plans for a week
- User says "make lesson plans for week X" or similar
- User runs `/cte-lesson`

## Course Reference

**Course:** Media Foundations Spring 2026
**Instructor:** Mr. Matthew Hillis
**School:** James Clemens High School
**Class Duration:** 90 minutes

See:
- `~/.claude/skills/cte-lesson/references/syllabus-weeks.md` - 18-week syllabus
- `~/.claude/skills/cte-lesson/references/course-memory.md` - Lesson format style, rules, and standards
- `~/.claude/skills/cte-lesson/references/content-standards.md` - Alabama CTE Content Standards for lesson plans

## Important Rules
- **DO NOT** put teacher name or class name on presentation slides
- **Class time is 90 minutes** - structure lessons accordingly
- Students must pass safety test with 100% before using equipment

## Output Documents

For each week, the skill generates:

| Document Type | Format | Quantity |
|--------------|--------|----------|
| CTE Lesson Plans | Official CTE template (.docx) | One per day (typically 5) |
| Teacher Handout | Canva-quality styled Word doc (.docx) | One for entire week |
| Student Handouts | Canva-quality styled Word doc (.docx) | As needed per lesson |
| Daily Presentations | PowerPoint (.pptx) with images & videos | One per day (typically 5) |
| Media Log | Text file (.txt) | One for entire week |

**Output Location:** Google Drive `Hillis 2/WeekXX/`

Files are organized into week-based folders (Week01, Week02, etc.) for easy navigation.

## Workflow

### Step 0: Gather Preferences

Before starting, use the AskUserQuestion tool to ask the user these configuration questions:

**Question 1: Days of the Week**
- Question: "Which days do you need lesson plans for?"
- Header: "Days"
- Options:
  - "Mon-Fri (5 days)" - Full week of lessons (Recommended)
  - "Mon-Thu (4 days)" - Four day week
  - "Custom" - Specify which days you need
- Default: Mon-Fri

**Question 2: Presentations**
- Question: "Create PowerPoint presentations for each day?"
- Header: "Presentations"
- Options:
  - "No" - Skip presentations (faster) (Recommended)
  - "Yes" - Generate presentations with images and videos
- Default: No
- Note: Presentations require Pexels API for images and take longer to generate

**Question 3: Student Handouts**
- Question: "Create student handouts?"
- Header: "Handouts"
- Options:
  - "No" - Skip student handouts (Recommended)
  - "Yes" - Create Canva-quality student handouts
- Default: No

**Question 4: Vocabulary Summary**
- Question: "Include end-of-week vocabulary summary?"
- Header: "Vocabulary"
- Options:
  - "No" - Skip vocabulary summary (Recommended)
  - "Yes" - Include vocabulary cards at end of week
- Default: No

Store these preferences and apply them when generating the JSON data:
- `days`: Array of day objects matching selected days only
- If presentations = No, add `"skip_presentations": true` to JSON
- If handouts = No, omit `student_handouts` array from JSON
- If vocabulary = No, omit `vocabulary_summary` object from JSON

### Step 1: Identify the Week

Ask: "Which week do you want lesson plans for?"

Reference the syllabus to get that week's:
- Unit name
- Topics to cover
- Associated project (if any)

### Step 2: Plan the Week

Based on the syllabus topics, determine how to distribute content across the days (typically 5 days). Consider:
- Logical progression of concepts
- Balance of instruction, practice, and hands-on work
- Project milestones if applicable

### Step 3: Gather Additional Details (if needed)

Ask for any specific information not in the syllabus:
- Special activities planned
- Guest speakers
- Field trips
- Assessment dates
- Any modifications needed

### Step 4: Generate Documents

Structure the data and run:

```bash
python3 ~/.claude/skills/cte-lesson/scripts/generate-lesson-plan.py '<json_data>'
```

## JSON Structure for Weekly Generation

```json
{
  "week": "2",
  "unit": "Pre-Production Fundamentals",
  "week_focus": "Copyright, Fair Use, Scriptwriting, Storyboarding, Production Crew Roles",
  "week_overview": "This week establishes the foundational pre-production skills students will use throughout the course.",
  "week_objectives": [
    "Understand copyright law and apply fair use principles",
    "Create effective loglines that capture story essence",
    "Develop scripts using proper formatting conventions",
    "Create visual storyboards with appropriate shot types"
  ],
  "week_materials": [
    "Computers with internet access",
    "Projector and screen",
    "Storyboard templates (printed)",
    "Copyright and Fair Use presentation"
  ],
  "formative_assessment": "Daily participation, exit tickets, class discussions",
  "summative_assessment": "Logline creation, 22 Shots storyboard (30 points)",
  "weekly_deliverable": "Completed storyboard for 22 Shots Project due Friday",
  "days": [
    {
      "topic": "Copyright and Fair Use",
      "objectives": [
        "Define copyright and explain how it protects creative works",
        "Apply the four factors of fair use to evaluate media usage",
        "Identify Creative Commons licenses and appropriate usage"
      ],
      "day_materials": [
        "Copyright and Fair Use presentation",
        "Fair Use scenario cards",
        "Creative Commons license chart"
      ],
      "schedule": [
        {"time": "10 min", "name": "Bell Ringer", "description": "Students respond: When can you legally use a YouTube song?"},
        {"time": "25 min", "name": "Direct Instruction", "description": "Present Copyright and Fair Use lesson."},
        {"time": "20 min", "name": "Guided Practice", "description": "Fair Use Analysis Activity with scenarios."},
        {"time": "15 min", "name": "Creative Commons", "description": "Introduce CC licensing system."},
        {"time": "15 min", "name": "Resource Exploration", "description": "Students explore Pexels, Pixabay."},
        {"time": "5 min", "name": "Wrap-Up", "description": "Exit ticket: Name the four factors of fair use."}
      ],
      "vocabulary": {
        "Copyright": "Legal protection giving creators exclusive rights",
        "Fair Use": "Legal doctrine allowing limited use without permission",
        "Creative Commons": "Free licenses for sharing work"
      },
      "differentiation": {
        "Advanced": "Research a real copyright case and present findings",
        "Struggling": "Provide graphic organizer for the four factors",
        "ELL": "Vocabulary list with definitions; visual examples"
      },
      "teacher_notes": "Fair Use scenarios generate good debate - allow discussion time.",
      "content_standards": "MF.1.1 - Demonstrate understanding of copyright and fair use",
      "overview": "Introduction to copyright law and fair use principles",
      "materials": ["projector", "computer"],
      "methods": ["lecture", "discussion"],
      "assessment": ["classwork", "observation"]
    }
  ],
  "vocabulary_summary": {
    "Copyright & Fair Use": "Copyright, Fair Use, Public Domain, Creative Commons, Royalty-Free",
    "Scriptwriting": "Logline, Protagonist, Antagonist, Inciting Incident, Stakes, Genre"
  },
  "teacher_notes": [
    "Ensure all students have access to Scriptwriting Student Manual",
    "Print sufficient storyboard templates",
    "Strings Attached film available at: https://youtu.be/7KPHJVLkVoo"
  ],
  "standards_alignment": "Alabama State CTE Standards for Arts, A/V Technology & Communications",
  "student_handouts": [
    {
      "name": "Copyright Guide",
      "title": "Copyright and Fair Use Quick Reference",
      "subtitle": "Media Foundations - Week 2",
      "instructions": "Use this guide when evaluating whether you can use copyrighted content.",
      "sections": [
        {
          "heading": "The Four Factors of Fair Use",
          "numbered": true,
          "items": [
            "Purpose and character of use",
            "Nature of the copyrighted work",
            "Amount used relative to the whole",
            "Effect on the market value"
          ]
        }
      ],
      "vocabulary": {
        "Copyright": "Legal protection for original creative works",
        "Fair Use": "Limited use of copyrighted material without permission"
      }
    }
  ]
}
```

### Teacher Handout JSON Fields

| Field | Description |
|-------|-------------|
| `week_focus` | Short focus statement for the overview box |
| `week_overview` | Detailed week description |
| `formative_assessment` | Daily/ongoing assessments |
| `summative_assessment` | Major assessments with points |
| `weekly_deliverable` | What's due at end of week |
| `vocabulary_summary` | End-of-week vocabulary by category |
| `teacher_notes` | Array of notes for end of document |
| `standards_alignment` | Standards reference text |

### Daily Schedule Format

Use `schedule` array with objects containing:
- `time`: Duration (e.g., "10 min", "25 min")
- `name`: Activity name (e.g., "Bell Ringer", "Direct Instruction")
- `description`: What happens during this activity

### Differentiation Format

Use object with levels:
```json
"differentiation": {
  "Advanced": "Extension activity",
  "Struggling": "Support provided",
  "ELL": "Language accommodations"
}
```

## Auto-Generated CTE Fields

The following CTE template fields are **automatically generated** from the lesson data:

### Procedures/Activities/Learning Experiences
Built automatically from the `schedule` array. Each activity is formatted as:
```
10 min - Bell Ringer: Students respond to prompt
25 min - Direct Instruction: Present lesson content
```

### Provision for Individual Differences
Built automatically from the `differentiation` object. Formats as:
```
Advanced Learners: [strategy]
Struggling Learners: [strategy]
ELL Students: [strategy]
```

### Overview/Annotation (Auto-Generated)
If not explicitly provided, the overview is built automatically from:
- Topic name
- Learning objectives
- Hands-on activities from schedule

You can explicitly provide `overview` in the JSON to override.

### Materials & Equipment (Auto-Inferred)
The script automatically checks relevant materials based on lesson content:

| Material | Keywords Detected |
|----------|-------------------|
| Projector | presentation, show, display, screen, slides, powerpoint |
| Computer | computer, premiere, photoshop, editing, software, digital |
| Video/DVD | video, watch, film, movie, clip, youtube |
| Labs | lab, studio, hands-on, practice, filming, shoot |
| Speaker | audio, sound, music, listen, playback |
| Supplemental Materials | handout, worksheet, guide, template, storyboard, script |
| Other Equipment | camera, tripod, lighting, microphone, equipment, gear |
| Student Journals | journal, notebook, notes, reflection |
| Posters | poster, chart, diagram, visual aid |

You can explicitly specify `materials` in the JSON to override or add items.

### Instructional Methods (Auto-Inferred)
The script automatically checks relevant methods based on lesson content:

| Method | Keywords Detected |
|--------|-------------------|
| Discussion | discussion, discuss, debate, share, Q&A |
| Demonstration | demonstrate, show how, model, walk through, tutorial |
| Lecture | direct instruction, lecture, teach, explain, introduce |
| PowerPoint | powerpoint, presentation, slides |
| Multi-Media | video, multimedia, youtube, film, audio, digital |
| Guest Speaker | guest speaker, industry professional, visitor |

You can explicitly specify `methods` in the JSON to override or add items.

### Varied Assessment Strategies (Auto-Inferred)
The script automatically checks relevant assessments based on lesson content:

| Assessment | Keywords Detected |
|------------|-------------------|
| Classwork | classwork, activity, practice, exercise, in-class, exit ticket |
| Observation | observe, monitor, circulate, watch, check in |
| Project-based | project, final, deliverable, portfolio, create, produce |
| Teamwork | team, group, partner, collaborate, crew, peer |
| Performance | perform, present, demonstrate, show, pitch |
| On-Task | participate, engage, on-task, focused, active |
| Test | test, quiz, exam |
| Homework | homework, take home, assignment |

You can explicitly specify `assessment` in the JSON to override or add items.

### Integrated Curriculum (Auto-Inferred)
The script automatically checks relevant curriculum areas based on lesson content:

| Curriculum Area | Keywords Detected |
|-----------------|-------------------|
| Technology | camera, editing, software, premiere, photoshop, computer, digital, video, audio |
| English | script, writing, story, narrative, interview, news |
| Reading | reading, research, article |
| Fine Arts | composition, visual, design, aesthetic, creative, color, lighting, framing |
| Math | exposure, ratio, frame rate, aperture, shutter speed, iso |
| Science | light, sound wave, physics, optics |
| Social Studies | history, documentary, social, community, news, psa, public service |

You can also explicitly specify `curriculum` in the JSON to override or add areas:
```json
"curriculum": ["technology", "english", "fine_arts"]
```

### Other Areas Addressed (Auto-Inferred)
The script automatically checks relevant "Other Areas" based on lesson content. Left blank if no areas apply.

| Area | Keywords Detected |
|------|-------------------|
| Safety | safety, equipment, handling, protective, hazard |
| Management Skills | time management, organize, planning, schedule, workflow, deadline |
| Teamwork | team, group, collaborate, partner, crew, together |
| Live Work | client, real-world, live production, community partner |
| Higher Order Reasoning | analyze, evaluate, create, critique, compare, design, develop |
| Varied Learning | visual, hands-on, demonstration, practice (or if differentiation provided) |
| Work Ethics | professional, responsibility, deadline, quality, industry standard |
| Integrated Academics | Auto-checked if any curriculum areas are checked |
| CTSO | skillsusa, ctso, competition, career development, leadership |
| Problem Solving | problem, solve, troubleshoot, debug, fix, challenge, solution |

You can also explicitly specify `other_areas` in the JSON:
```json
"other_areas": ["safety", "teamwork", "problem_solving"]
```

## Weekly Syllabus Quick Reference

| Week | Unit | Key Topics |
|------|------|------------|
| 1 | Introduction & History of Film | Course intro, History of film, Equipment safety, Safety Test |
| 2 | Pre-Production | Copyright, Scriptwriting, Storyboarding, Crew roles, 22 Shots intro |
| 3 | Camera Basics | Camera parts, Exposure triangle, Composition, 22 Shots filming |
| 4 | Premiere Pro Intro | Premiere basics, Editing techniques, Audio sync, 22 Shots editing |
| 5 | Advanced Techniques | Foley, Sound design, Green screen, Advanced lighting, Photoshop |
| 6 | PSA Pre-Production | PSA research, Advanced camera moves, Storyboarding, Graphics |
| 7 | PSA Production | Filming techniques, B-roll, Interviews, Audio recording |
| 8 | PSA Post-Production | Advanced editing, Color correction, Graphics, Audio mixing |
| 9 | News Segment | News package structure, Interviews, Writing for broadcast |
| 10 | News/Documentary Intro | News editing, Documentary styles, Documentary planning |
| 11 | Documentary Production | Documentary filming, One-shot technique, Interview techniques |
| 12 | Documentary Production | Filming continues, Advanced transitions, AI tools |
| 13 | Documentary Post | Documentary editing, Narrative structure, Titles & credits |
| 14 | Music Video Pre-Production | Music video styles, Shot composition, Lip-sync, Storyboarding |
| 15 | Music Video Production | Music video filming, Creative techniques, Performance directing |
| 16 | Music Video Production | Filming continues, Advanced Premiere Pro, Effects, Color grading |
| 17 | Music Video Post | Final editing, Portfolio prep, Certification test |
| 18 | Final Exam | Study guide review, Final Exam, Course reflection, Portfolio |

## Content Standards (Required for CTE Lesson Plans)

Use both **Alabama State Standards** and **Adobe Certified Professional objectives** from `references/content-standards.md`.

**Format for `content_standards` field:**
```
ALABAMA STATE STANDARDS:
Standard 14: Identify and describe the basic camera angles used in media production.
Standard 8: Identify media production equipment and explain how it is used.
F1: Incorporate safety procedures in handling, operating, and maintaining tools and machinery.

ADOBE CERTIFIED PROFESSIONAL:
1.4.c: Define common film form terms and principles (shot types, rule of thirds, depth of field).
1.4.a: Define video and audio terminology (frame rate, aspect ratio, aperture, shutter speed, ISO).
```

### Standards by Week (Quick Reference)

| Week | Unit | AL Standards | Adobe Objectives |
|------|------|--------------|------------------|
| 1 | Introduction & History | 1, 2, F1, F4 | 1.4.a, 1.4.c |
| 2 | Pre-Production | 15, 17, F4 | 1.1.c, 1.3.a, 1.3.b |
| 3 | Camera Basics | 8, 14, F1 | 1.4.a, 1.4.c |
| 4 | Premiere Pro Intro | 7, 10, 13 | 2.1, 2.2, 2.4, 4.1.a |
| 5 | Advanced Techniques | 11, 12, 13 | 4.5.d, 4.7 |
| 6 | PSA Pre-Production | 4, 5, 15 | 1.1.a, 1.1.c |
| 7 | PSA Production | 8, 10, 14 | 1.4.b, 1.4.c |
| 8 | PSA Post-Production | 7, 10, 13 | 4.4, 4.5, 4.7, 5.3 |
| 9 | News Segment | 4, 5, 9, 10 | 1.1.a, 1.4.b, 4.2 |
| 10 | News/Documentary Intro | 5, 9, 15 | 1.1.c, 3.1, 3.2 |
| 11 | Documentary Production | 8, 10, 14 | 1.4.b, 1.4.c, 4.1 |
| 12 | Documentary Production | 10, 14, 16 | 1.4.b, 4.4, 4.5 |
| 13 | Documentary Post | 7, 10, 13 | 4.3, 4.5.a, 4.7, 5.1 |
| 14 | Music Video Pre-Prod | 4, 5, 15 | 1.1.a, 1.1.c, 1.4.b |
| 15 | Music Video Production | 8, 10, 14 | 1.4.b, 1.4.c |
| 16 | Music Video Production | 10, 11, 13 | 4.5, 4.6, 4.7 |
| 17 | Music Video Post | 7, 9, 10 | 4.5.a, 5.1, 5.3 |
| 18 | Final Exam | 3, 9, F2, F3 | All (Cert Test) |

### Quick Reference by Topic

| Topic | AL Standards | Adobe Objectives |
|-------|--------------|------------------|
| Camera/Filming | 8, 14, F1 | 1.4.a, 1.4.c |
| Editing Basics | 7, 10 | 2.1, 2.2, 4.1.a, 4.4 |
| Audio | 12, 13 | 4.7 |
| Pre-production | 4, 5, 15 | 1.1.a, 1.1.c |
| Color/Effects | 10, 11 | 4.5, 4.6 |
| Graphics/Titles | 10 | 4.3 |
| Export | 7, 10 | 5.1, 5.2, 5.3 |
| Copyright/Ethics | 16, 17, F4 | 1.3.a, 1.3.b |
| History/Theory | 1, 2 | 1.4.a, 1.4.c |
| Safety | F1 | — |
| Career/CTSO | F2, F3, F5 | 1.1.d |

## CTE Checkbox Options

**materials**: textbook, lab_manual, video_dvd, labs, posters, speaker, projector, computer, supplemental_materials, student_journals, other_equipment

**methods**: discussion, demonstration, lecture, powerpoint, multimedia, guest_speaker

**assessment**: homework, classwork, test, project_based, teamwork, observation, performance, on_task, other

**curriculum**: math, science, reading, social_studies, english, government_economics, fine_arts, foreign_language, technology

**other_areas**: safety, management_skills, teamwork, live_work, higher_order_reasoning, varied_learning, work_ethics, integrated_academics, ctso, problem_solving

## Output Files

After generation, report all created files:

```
Created lesson plans for Week 3:

Week Folder: Google Drive/Hillis 2/Week03/

CTE Lesson Plans (5):
  - Day1_Camera_Parts_CTE.docx
  - Day2_Exposure_Triangle_CTE.docx
  - Day3_Composition_CTE.docx
  - Day4_Lighting_Sound_CTE.docx
  - Day5_22_Shots_Filming_CTE.docx

Teacher Handout:
  - Week3_Camera_Basics_TeacherHandout.docx

Student Handouts (1):
  - Camera_Parts_Guide_StudentHandout.docx

Daily Presentations (5):
  - Day1_Camera_Parts_Presentation.pptx
  - Day2_Exposure_Triangle_Presentation.pptx
  - Day3_Composition_Presentation.pptx
  - Day4_Lighting_Sound_Presentation.pptx
  - Day5_22_Shots_Filming_Presentation.pptx

Media Log:
  - Week3_Media_Log.txt
```

## Daily Presentations

Full 90-minute lesson presentations are automatically generated for each day with images and embedded videos.

**Format:** PowerPoint (.pptx) - 16:9 aspect ratio

**Slide Structure:**
1. **Bell Ringer** - Question/prompt with engaging background image
2. **Agenda** - Visual timeline of day's activities with time badges
3. **Learning Objectives** - Listed with topic image
4. **Vocabulary** - Term cards with definitions (if vocabulary provided)
5. **Direct Instruction** - Core content slides with images (3-5 slides)
6. **Video** - Embedded YouTube video (if relevant video found)
7. **Activities** - Guided practice and hands-on activity instructions
8. **Wrap-Up** - Key takeaways, exit ticket, preview of next class

**Visual Design:**
- Color themes vary by unit (Camera = orange, Editing = purple, PSA = green, etc.)
- Content-rich slides with bullet points + images alongside
- Large readable fonts (24pt+ body, 44pt+ titles)
- High-quality images auto-sourced from Pexels API
- YouTube videos embedded to play within presentation

**Slide Count:** Approximately 15-25 slides per day

### Image Sourcing

Images are automatically fetched from **Pexels API** based on topic keywords.

- Search strategy combines topic keywords with media production context
- Example: "Camera Basics" → searches "camera", "cinematography", "film camera"
- Falls back to solid color background if no image found
- All images logged in `WeekX_Media_Log.txt` for attribution and easy swapping

### YouTube Video Embedding

Videos are sourced from a curated library of trusted educational channels:
- **StudioBinder** - Cinematography and filmmaking techniques
- **Film Riot** - Practical filmmaking tutorials
- **D4Darious** - Independent filmmaking
- **Cinecom** - Creative video effects
- **Peter McKinnon** - Photography and cinematography
- **Premiere Gal** - Adobe Premiere Pro tutorials

**Note:** YouTube videos require internet connection to play in PowerPoint.

If no matching video is found, a placeholder "[Add Video]" slide is included.

## Canva-Style Handout Design

Both Teacher and Student handouts feature professional Canva-quality styling.

### Teacher Handout Features
- Full-width header banner with accent bar and week/unit styling
- Section headers with left sidebar accents
- Objectives displayed with numbered circular navy badges
- Materials in two-column checklist layout
- Assessment cards in 3-column color-coded layout
- Daily sections with tab-style headers (day badge + topic bar)
- Schedule tables with highlighted time column and navy header
- Vocabulary in two-column card layout
- Differentiation in color-coded columns by level
- Teacher notes in sticky-note style with yellow accent bar

### Student Handout Features
- Header banner with accent bar at top
- Section headers with sidebar accents
- Numbered steps with circular navy badges (white numbers)
- Vocabulary in two-column card layout
- Questions with number badges and answer lines
- Tips section with yellow accent bar (pull-quote style)
- More generous margins and spacing for cleaner reading

## Formatting Notes

- **No red text** - All CTE lesson plan text is black (red placeholders are automatically converted)
- **90-minute class periods** - Default duration for all lessons
- **Week folders** - Files organized by week number (Week01, Week02, etc.) for easy navigation
- **Presentations require internet** - YouTube videos need connection to play
