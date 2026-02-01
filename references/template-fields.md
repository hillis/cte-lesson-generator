# CTE Lesson Plan Template Field Reference

## Template Structure

The CTE template (`2026SpringCTELessonPlanTemplate.docx`) is a single-table Word document with 18 rows and 3 columns.

## Text Fields

| Field | Row | Col | JSON Key |
|-------|-----|-----|----------|
| Week | 1 | 0 | `week` (auto-filled) |
| Course Title | 1 | 1 | Auto: "Media Foundations" |
| Topic | 2 | 0 | `topic` |
| Duration (minutes) | 2 | 1 | `duration` |
| Content Standards | 5 | 0 | `content_standards` |
| Overview/Annotation | 7 | 0 | `overview` |
| Procedures/Activities | 9 | 0 | `procedures` |
| Provision for Individual Differences | 13 | 2 | `individual_differences` |
| Embedded Credit | 15 | 2 | `embedded_credit` |
| Lesson Evaluation | 17 | 2 | `lesson_evaluation` |

## Checkbox Fields

### Materials & Equipment (Row 7, Col 1)

| Display Name | JSON Key |
|--------------|----------|
| Textbook | `textbook` |
| Lab Manual | `lab_manual` |
| Video/DVD | `video_dvd` |
| Labs | `labs` |
| Posters | `posters` |
| Speaker | `speaker` |
| Projector | `projector` |
| Computer | `computer` |
| Supplemental Materials | `supplemental_materials` |
| Student Journals | `student_journals` |
| Other Equipment | `other_equipment` |

### Instructional Methods (Row 11, Col 0)

| Display Name | JSON Key |
|--------------|----------|
| Discussion | `discussion` |
| Demonstration | `demonstration` |
| Lecture | `lecture` |
| Power Point Presentation | `powerpoint` |
| Multi-Media Presentation | `multimedia` |
| Guest Speaker | `guest_speaker` |

### Assessment Strategies (Row 13, Col 0)

| Display Name | JSON Key |
|--------------|----------|
| Homework | `homework` |
| Classwork | `classwork` |
| Test | `test` |
| Project-based Activity | `project_based` |
| Teamwork Activity | `teamwork` |
| Teacher Observation | `observation` |
| Performance | `performance` |
| On-Task Ability | `on_task` |
| Other | `other` |

### Integrated Curriculum (Row 15, Col 0)

| Display Name | JSON Key |
|--------------|----------|
| Math | `math` |
| Science | `science` |
| Reading | `reading` |
| Social Studies/History | `social_studies` |
| English | `english` |
| Government/Economics | `government_economics` |
| Fine Arts | `fine_arts` |
| Foreign Language | `foreign_language` |
| Technology | `technology` |

### Other Areas Addressed (Row 17, Col 0)

| Display Name | JSON Key |
|--------------|----------|
| Safety Instruction | `safety` |
| Management Skills | `management_skills` |
| Teamwork Activity | `teamwork` |
| Live work | `live_work` |
| Higher Order Reasoning | `higher_order_reasoning` |
| Varied Learning experiences | `varied_learning` |
| Work Ethics | `work_ethics` |
| Integrated Academics | `integrated_academics` |
| Integrated CTSO Experiences | `ctso` |
| Problem Solving Skills | `problem_solving` |

---

# Teacher Handout Structure

The teacher handout is a clean Word document with the following sections:

## Week-Level Fields

| Field | JSON Key | Description |
|-------|----------|-------------|
| Week Number | `week` | Week of the semester |
| Unit Name | `unit` | Unit title from syllabus |
| Week Overview | `week_overview` | Summary of the week |
| Weekly Objectives | `week_objectives` | Array of learning objectives |
| Week Materials | `week_materials` | Array of materials needed |

## Day-Level Fields (in `days` array)

| Field | JSON Key | Description |
|-------|----------|-------------|
| Topic | `topic` | Lesson topic/title |
| Duration | `duration` | Minutes (default: 90) |
| Objectives | `objectives` | Array of learning objectives |
| Bell Ringer | `bell_ringer` | Warm-up activity |
| Activities | `activities` | Array of lesson activities |
| Teacher Notes | `teacher_notes` | Notes for the teacher |
| Assessment Notes | `assessment_notes` | How to assess learning |
| Differentiation | `differentiation` | Accommodations |
| Homework | `homework` | Homework/extension |

### Activity Structure

Activities can be strings or objects:
```json
{"name": "Demo", "duration": "15 min", "description": "Show technique"}
```

---

# Student Handout Structure

Student handouts are customizable Word documents:

| Field | JSON Key | Description |
|-------|----------|-------------|
| Title | `title` | Handout title |
| Subtitle | `subtitle` | Optional subtitle |
| Instructions | `instructions` | Instructions for students |
| Sections | `sections` | Array of content sections |
| Questions | `questions` | Array of questions |
| Vocabulary | `vocabulary` | Dictionary of terms |

### Section Structure

```json
{
  "heading": "Section Title",
  "content": "Paragraph text",
  "items": ["Item 1", "Item 2"],
  "numbered": true,
  "blank_lines": 3
}
```
