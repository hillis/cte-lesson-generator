# CTE Lesson Plan Generator

Generate complete lesson plan packages for CTE (Career and Technical Education) Media Foundations courses. Produces professional-quality documents including Canva-style handouts and full 90-minute daily lesson presentations with auto-sourced images and embedded YouTube videos.

## Features

- **CTE Lesson Plans**: Official CTE format Word documents (one per day)
- **Teacher Handouts**: Canva-quality styled weekly guides
- **Student Handouts**: Professional student materials as needed
- **Daily Presentations**: PowerPoint slides with auto-sourced images from Pexels and embedded YouTube videos
- **Media Log**: Attribution tracking for all sourced media
- **Auto-inference**: Automatically detects materials, methods, assessments, and curriculum integration from lesson content
- **Interactive Mode**: When used via Claude Code skill, prompts for preferences before generating

## Interactive Mode (Claude Code Skill)

When invoked via the `/cte-lesson` skill in Claude Code, the generator asks 4 configuration questions before starting:

| Question | Options | Default |
|----------|---------|---------|
| **Days of the Week** | Mon-Fri (5 days), Mon-Thu (4 days), Custom | Mon-Fri |
| **Presentations** | Yes (with images/videos), No (faster) | No |
| **Student Handouts** | Yes (Canva-quality), No | Yes |
| **Vocabulary Summary** | Yes (end-of-week cards), No | No |

### Quick Generation (Defaults)

Using all defaults gives you:
- 5 days of CTE lesson plans
- Weekly teacher handout
- Student handouts
- No presentations or vocabulary summary

### Full Generation

Selecting all "Yes" options produces:
- 5 days of CTE lesson plans
- Weekly teacher handout
- Daily PowerPoint presentations with auto-sourced images
- Student handouts for each lesson
- End-of-week vocabulary summary cards

**Note:** Presentations require the Pexels API and take longer to generate due to image sourcing.

## Output Documents

For each week, the generator produces:

| Document Type | Format | Quantity |
|--------------|--------|----------|
| CTE Lesson Plans | Word (.docx) | One per day (typically 5) |
| Teacher Handout | Word (.docx) | One for entire week |
| Student Handouts | Word (.docx) | As needed per lesson |
| Daily Presentations | PowerPoint (.pptx) | One per day |
| Media Log | Text (.txt) | One for entire week |

## Requirements

### Python Dependencies

```bash
pip install python-docx python-pptx requests duckduckgo-search
```

### API Keys

Set up a Pexels API key for automatic image sourcing:
- Get a free API key at [pexels.com/api](https://www.pexels.com/api/)
- Update the `PEXELS_API_KEY` in `scripts/generate-lesson-plan.py`

### Template File

You'll need a CTE lesson plan template Word document. Place it in the `templates/` directory and update the `TEMPLATE_PATH` in the script.

## Usage

### Basic Command

```bash
python scripts/generate-lesson-plan.py '<json_data>'
```

### JSON Data Structure

```json
{
  "week": "3",
  "unit": "Camera Basics",
  "week_focus": "Understanding camera operation and composition",
  "week_overview": "Students learn camera fundamentals including exposure, composition, and shot types.",
  "week_objectives": [
    "Identify camera parts and their functions",
    "Apply the exposure triangle (aperture, shutter speed, ISO)",
    "Demonstrate proper composition techniques"
  ],
  "week_materials": [
    "DSLR cameras",
    "Tripods",
    "SD cards"
  ],
  "days": [
    {
      "topic": "Camera Parts and Functions",
      "objectives": [
        "Identify and name the parts of a DSLR camera",
        "Explain the function of each camera component"
      ],
      "schedule": [
        {"time": "10 min", "name": "Bell Ringer", "description": "What cameras have you used?"},
        {"time": "25 min", "name": "Direct Instruction", "description": "Camera parts presentation"},
        {"time": "40 min", "name": "Hands-On Practice", "description": "Handle cameras, identify parts"},
        {"time": "15 min", "name": "Wrap-Up", "description": "Exit ticket on camera parts"}
      ],
      "vocabulary": {
        "Aperture": "Opening that controls light entering the lens",
        "Shutter": "Mechanism that controls exposure time"
      },
      "differentiation": {
        "Advanced": "Research additional camera features",
        "Struggling": "Partner with experienced student",
        "ELL": "Visual camera diagram with labels"
      }
    }
  ]
}
```

## Auto-Inference Features

The generator automatically infers many CTE template fields from your lesson content:

### Materials & Equipment
Detected from keywords like "camera", "computer", "video", "handout", etc.

### Instructional Methods
Detected from schedule activities and keywords like "discussion", "demonstration", "lecture", etc.

### Assessment Strategies
Detected from activities like "exit ticket", "project", "observation", etc.

### Curriculum Integration
Detected from content keywords related to math, science, English, technology, etc.

### Other Areas Addressed
Detected from content related to safety, teamwork, problem-solving, etc.

## Presentation Features

Daily PowerPoint presentations include:

- **Bell Ringer Slides**: Warm-up questions with engaging backgrounds
- **Agenda Slides**: Visual timeline with time badges
- **Learning Objectives**: Listed with topic images
- **Vocabulary Cards**: Term definitions in card format
- **Content Slides**: Core instruction with auto-sourced images
- **Video Slides**: Embedded YouTube videos from curated educational channels
- **Activity Instructions**: Clear hands-on activity guidance
- **Wrap-Up Slides**: Key takeaways and exit tickets

### Color Themes by Unit

Each unit has its own color scheme:
- Introduction & History: Brown/sepia
- Pre-Production: Blue
- Camera Basics: Orange
- Premiere Pro: Purple/Adobe
- PSA: Green
- News: Red
- Documentary: Earth tones
- Music Video: Pink/purple

## Content Standards

The generator supports both:
- **Alabama State CTE Standards** for Arts, A/V Technology & Communications
- **Adobe Certified Professional** objectives for Premiere Pro

See `references/content-standards.md` for the complete standards list.

## Configuration

### Output Directory

Update `OUTPUT_DIR` in the script to set where files are saved:

```python
OUTPUT_DIR = '/path/to/your/output/directory'
```

Files are organized into week folders (Week01, Week02, etc.).

### Curated Video Library

The script includes a curated library of educational YouTube videos from trusted channels:
- StudioBinder
- Film Riot
- D4Darious
- Cinecom
- Peter McKinnon
- Premiere Gal

Add custom videos to the `CURATED_VIDEOS` dictionary in the script.

## File Structure

```
cte-lesson-generator/
├── README.md
├── LICENSE
├── requirements.txt
├── docs/
│   └── json-schema.md
├── references/
│   ├── content-standards.md
│   ├── course-memory.md
│   ├── syllabus-weeks.md
│   └── template-fields.md
├── scripts/
│   └── generate-lesson-plan.py
└── templates/
    └── (your CTE template.docx)
```

## License

MIT License - See LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Credits

Developed for Media Foundations course curriculum at James Clemens High School.
