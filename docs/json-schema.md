# JSON Schema Reference

This document provides the complete JSON schema for generating lesson plans.

## Top-Level Week Structure

```json
{
  "week": "string (required)",
  "unit": "string (required)",
  "week_focus": "string",
  "week_overview": "string",
  "week_objectives": ["string array"],
  "week_materials": ["string array"],
  "formative_assessment": "string",
  "summative_assessment": "string",
  "weekly_deliverable": "string",
  "vocabulary_summary": {"category": "terms string"},
  "teacher_notes": ["string array"],
  "standards_alignment": "string",
  "days": [day objects],
  "student_handouts": [handout objects]
}
```

## Day Object Structure

```json
{
  "topic": "string (required)",
  "objectives": ["string array (required)"],
  "day_materials": ["string array"],
  "schedule": [activity objects],
  "vocabulary": {"term": "definition"},
  "differentiation": {
    "Advanced": "string",
    "Struggling": "string",
    "ELL": "string"
  },
  "teacher_notes": "string",
  "content_standards": "string",
  "overview": "string (auto-generated if not provided)",
  "materials": ["checkbox keys"],
  "methods": ["checkbox keys"],
  "assessment": ["checkbox keys"],
  "curriculum": ["checkbox keys"],
  "other_areas": ["checkbox keys"]
}
```

## Activity Object Structure

Used in the `schedule` array:

```json
{
  "time": "string (e.g., '10 min')",
  "name": "string (e.g., 'Bell Ringer')",
  "description": "string"
}
```

## Student Handout Object Structure

```json
{
  "name": "string (used for filename)",
  "title": "string (displayed title)",
  "subtitle": "string",
  "instructions": "string",
  "sections": [section objects],
  "questions": ["string array"],
  "vocabulary": {"term": "definition"},
  "tips": ["string array"]
}
```

## Section Object Structure

Used in student handout `sections` array:

```json
{
  "heading": "string",
  "content": "string (paragraph text)",
  "items": ["string array"],
  "numbered": true/false,
  "blank_lines": number
}
```

## Checkbox Keys Reference

### Materials & Equipment
- `textbook`, `lab_manual`, `video_dvd`, `labs`, `posters`
- `speaker`, `projector`, `computer`, `supplemental_materials`
- `student_journals`, `other_equipment`

### Instructional Methods
- `discussion`, `demonstration`, `lecture`
- `powerpoint`, `multimedia`, `guest_speaker`

### Assessment Strategies
- `homework`, `classwork`, `test`, `project_based`
- `teamwork`, `observation`, `performance`, `on_task`, `other`

### Integrated Curriculum
- `math`, `science`, `reading`, `social_studies`
- `english`, `government_economics`, `fine_arts`
- `foreign_language`, `technology`

### Other Areas Addressed
- `safety`, `management_skills`, `teamwork`, `live_work`
- `higher_order_reasoning`, `varied_learning`, `work_ethics`
- `integrated_academics`, `ctso`, `problem_solving`

## Complete Example

```json
{
  "week": "3",
  "unit": "Camera Basics",
  "week_focus": "Camera operation, exposure, and composition",
  "week_overview": "This week students learn the fundamentals of camera operation including the exposure triangle and basic composition techniques.",
  "week_objectives": [
    "Identify and explain the function of camera parts",
    "Apply the exposure triangle to control image brightness",
    "Demonstrate the rule of thirds in photo composition",
    "Capture properly exposed images using manual settings"
  ],
  "week_materials": [
    "DSLR cameras (class set)",
    "Tripods",
    "SD cards (64GB each)",
    "Camera Parts Handout",
    "Exposure Triangle reference chart"
  ],
  "formative_assessment": "Daily participation, exit tickets, camera handling checks",
  "summative_assessment": "22 Shots Project - 30 points",
  "weekly_deliverable": "Begin filming for 22 Shots Project (due Week 4)",
  "vocabulary_summary": {
    "Camera Parts": "Body, lens, viewfinder, LCD screen, mode dial, shutter button",
    "Exposure Triangle": "Aperture, shutter speed, ISO, exposure, stops"
  },
  "teacher_notes": [
    "Ensure all cameras are charged before class",
    "Check SD cards are formatted and ready",
    "Have students sign equipment checkout forms"
  ],
  "standards_alignment": "Alabama State CTE Standards for Arts, A/V Technology & Communications",
  "days": [
    {
      "topic": "Camera Parts and Functions",
      "objectives": [
        "Identify and name all major parts of a DSLR camera",
        "Explain the function of each camera component",
        "Demonstrate proper camera handling and care"
      ],
      "day_materials": [
        "DSLR cameras",
        "Camera Parts diagram handout",
        "Camera handling checklist"
      ],
      "schedule": [
        {
          "time": "10 min",
          "name": "Bell Ringer",
          "description": "What cameras have you used before? What do you already know about them?"
        },
        {
          "time": "25 min",
          "name": "Direct Instruction",
          "description": "Present camera parts presentation. Cover body, lens, viewfinder, LCD, mode dial, and controls."
        },
        {
          "time": "35 min",
          "name": "Hands-On Practice",
          "description": "Students handle cameras in pairs. Identify parts, practice mounting lens, using controls."
        },
        {
          "time": "15 min",
          "name": "Camera Care Demo",
          "description": "Demonstrate proper cleaning, storage, and handling. Discuss equipment responsibility."
        },
        {
          "time": "5 min",
          "name": "Wrap-Up",
          "description": "Exit ticket: Label 5 camera parts on diagram."
        }
      ],
      "vocabulary": {
        "Body": "The main housing of the camera containing the sensor and electronics",
        "Lens": "Optical component that focuses light onto the sensor",
        "Viewfinder": "Optical or electronic display for composing shots",
        "Mode Dial": "Control wheel for selecting camera shooting modes",
        "Shutter Button": "Button that triggers the capture of an image"
      },
      "differentiation": {
        "Advanced": "Research mirrorless vs DSLR differences",
        "Struggling": "Partner with experienced student; simplified diagram",
        "ELL": "Visual glossary with camera part images"
      },
      "teacher_notes": "Allow extra time for students to handle equipment safely. Emphasize strap usage.",
      "content_standards": "ALABAMA STATE STANDARDS:\nStandard 8: Identify media production equipment and explain how it is used.\nF1: Incorporate safety procedures in handling, operating, and maintaining tools and machinery.\n\nADOBE CERTIFIED PROFESSIONAL:\n1.4.a: Define video and audio terminology (aperture, shutter speed, ISO).\n1.4.c: Define common film form terms and principles."
    },
    {
      "topic": "The Exposure Triangle",
      "objectives": [
        "Define aperture, shutter speed, and ISO",
        "Explain how each element affects exposure",
        "Adjust settings to achieve proper exposure"
      ],
      "day_materials": [
        "DSLR cameras",
        "Exposure Triangle handout",
        "Projector for examples"
      ],
      "schedule": [
        {
          "time": "10 min",
          "name": "Bell Ringer",
          "description": "What makes a photo too dark or too bright?"
        },
        {
          "time": "30 min",
          "name": "Direct Instruction",
          "description": "Teach exposure triangle: aperture (f-stops), shutter speed (fractions), ISO (sensitivity). Show visual examples."
        },
        {
          "time": "35 min",
          "name": "Guided Practice",
          "description": "Students practice adjusting each setting. Teacher demonstrates, students replicate. Capture test shots."
        },
        {
          "time": "10 min",
          "name": "Comparison Activity",
          "description": "Compare shots with different settings. Discuss results as class."
        },
        {
          "time": "5 min",
          "name": "Wrap-Up",
          "description": "Exit ticket: What happens when you increase ISO?"
        }
      ],
      "vocabulary": {
        "Aperture": "Opening in the lens that controls light (measured in f-stops)",
        "Shutter Speed": "Duration the sensor is exposed to light (measured in fractions)",
        "ISO": "Sensor sensitivity to light (higher = brighter but more noise)",
        "Exposure": "The amount of light reaching the camera sensor",
        "F-stop": "Numerical value indicating aperture size"
      },
      "differentiation": {
        "Advanced": "Experiment with creative motion blur or bokeh effects",
        "Struggling": "Focus on one element at a time; reference card",
        "ELL": "Visual diagram showing relationship between settings"
      },
      "teacher_notes": "Use the 'sunny 16 rule' as a starting point for outdoor shots."
    }
  ],
  "student_handouts": [
    {
      "name": "Camera_Parts_Guide",
      "title": "Camera Parts Quick Reference",
      "subtitle": "Media Foundations - Week 3",
      "instructions": "Use this guide while learning camera parts. Keep it handy during hands-on activities.",
      "sections": [
        {
          "heading": "Major Camera Parts",
          "numbered": true,
          "items": [
            "Camera Body - Houses sensor and electronics",
            "Lens - Focuses light onto sensor",
            "Viewfinder - For composing shots",
            "LCD Screen - For review and live view",
            "Mode Dial - Selects shooting mode",
            "Shutter Button - Captures the image"
          ]
        },
        {
          "heading": "Camera Care",
          "items": [
            "Always use the neck strap",
            "Keep lens cap on when not shooting",
            "Never touch the sensor",
            "Store in camera bag when not in use"
          ]
        }
      ],
      "vocabulary": {
        "DSLR": "Digital Single-Lens Reflex camera",
        "Sensor": "Electronic chip that captures the image",
        "Mode Dial": "Control for Auto, Manual, and other modes"
      },
      "tips": [
        "When changing lenses, point camera down to prevent dust on sensor",
        "Format your SD card in-camera, not on computer"
      ]
    }
  ]
}
```

## Auto-Generated Fields

The following fields are automatically generated if not provided:

### overview
Built from topic, objectives, and hands-on activities in schedule.

### materials (checkboxes)
Inferred from keywords in topic, objectives, and schedule:
- "projector" from: presentation, slides, display
- "computer" from: editing, software, digital
- "video_dvd" from: video, watch, film, clip
- "labs" from: hands-on, practice, filming
- etc.

### methods (checkboxes)
Inferred from schedule activity names and descriptions:
- "discussion" from: discuss, debate, share
- "demonstration" from: demonstrate, show how, model
- "lecture" from: direct instruction, teach, explain
- etc.

### assessment (checkboxes)
Inferred from activities:
- "classwork" from: activity, practice, exit ticket
- "observation" from: observe, monitor, circulate
- "project_based" from: project, deliverable, create
- etc.

### curriculum (checkboxes)
Inferred from content:
- "technology" from: camera, editing, software
- "english" from: script, writing, story
- "fine_arts" from: composition, visual, design
- etc.

### other_areas (checkboxes)
Inferred from content:
- "safety" from: safety, equipment, handling
- "teamwork" from: team, group, collaborate
- "problem_solving" from: problem, solve, troubleshoot
- etc.
