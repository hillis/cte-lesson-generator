/**
 * Teacher Handout Generator - Uses docx-js per the docx skill
 * Matches the format from Week9_News_Segment_TeacherHandout.docx
 * 
 * Usage: node teacher-handout.js
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

// Colors
const NAVY = "1B3A5F";
const LIGHT_BLUE = "D5E8F0";
const LIGHT_GRAY = "F5F5F5";
const CREAM_YELLOW = "FFF9E6";
const BORDER_GRAY = "CCCCCC";

// Standard border style
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY };
const borders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

// Cell margins for padding
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };
const headerCellMargins = { top: 150, bottom: 150, left: 200, right: 200 };

/**
 * Creates a section header with bottom border
 */
function sectionHeader(text) {
    return new Paragraph({
        spacing: { before: 200, after: 120 },
        border: {
            bottom: { style: BorderStyle.SINGLE, size: 12, color: NAVY }
        },
        children: [
            new TextRun({ text: text, bold: true, color: NAVY, size: 26 })
        ]
    });
}

/**
 * Generate a Teacher Handout document
 */
function generateTeacherHandout(weekData) {
    const weekNum = weekData.week || '';
    const unitName = weekData.unit || '';
    
    const children = [];
    
    // ========== HEADER ==========
    children.push(
        new Table({
            width: { size: 10800, type: WidthType.DXA },
            columnWidths: [10800],
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 10800, type: WidthType.DXA },
                            shading: { fill: NAVY, type: ShadingType.CLEAR },
                            margins: headerCellMargins,
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({ 
                                            text: `WEEK ${weekNum}: ${unitName.toUpperCase()}`, 
                                            bold: true, 
                                            color: "FFFFFF", 
                                            size: 36 
                                        })
                                    ]
                                }),
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({ 
                                            text: "Teacher Weekly Guide", 
                                            color: LIGHT_BLUE, 
                                            size: 24 
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    );
    
    children.push(new Paragraph({ spacing: { after: 200 } }));
    
    // ========== WEEK OVERVIEW ==========
    if (weekData.week_overview) {
        children.push(
            new Table({
                width: { size: 10800, type: WidthType.DXA },
                columnWidths: [10800],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 10800, type: WidthType.DXA },
                                borders,
                                shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
                                margins: { top: 150, bottom: 150, left: 200, right: 200 },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({ text: "WEEK OVERVIEW", bold: true, color: NAVY, size: 24 })
                                        ]
                                    }),
                                    new Paragraph({
                                        spacing: { before: 100 },
                                        children: [
                                            new TextRun({ text: weekData.week_overview })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        );
        children.push(new Paragraph({ spacing: { after: 200 } }));
    }
    
    // ========== LEARNING OBJECTIVES ==========
    children.push(sectionHeader("LEARNING OBJECTIVES"));
    
    const objectives = weekData.week_objectives || [];
    objectives.forEach((obj, i) => {
        children.push(
            new Paragraph({
                spacing: { after: 80 },
                children: [
                    new TextRun({ text: `${i + 1}. `, bold: true }),
                    new TextRun({ text: obj })
                ]
            })
        );
    });
    
    children.push(new Paragraph({ spacing: { after: 200 } }));
    
    // ========== MATERIALS NEEDED ==========
    children.push(sectionHeader("MATERIALS NEEDED"));
    
    const materials = weekData.week_materials || [];
    materials.forEach(mat => {
        children.push(
            new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: `• ${mat}` })]
            })
        );
    });
    
    children.push(new Paragraph({ spacing: { after: 200 } }));
    
    // ========== ASSESSMENT ==========
    children.push(sectionHeader("ASSESSMENT"));
    
    const assessHeaders = ["FORMATIVE", "SUMMATIVE", "DELIVERABLE"];
    const assessFills = [LIGHT_BLUE, LIGHT_GRAY, CREAM_YELLOW];
    const assessContent = [
        weekData.formative_assessment || '',
        weekData.summative_assessment || '',
        weekData.weekly_deliverable || ''
    ];
    
    children.push(
        new Table({
            width: { size: 10800, type: WidthType.DXA },
            columnWidths: [3600, 3600, 3600],
            rows: [
                new TableRow({
                    children: assessHeaders.map((header, i) => 
                        new TableCell({
                            width: { size: 3600, type: WidthType.DXA },
                            borders,
                            shading: { fill: assessFills[i], type: ShadingType.CLEAR },
                            margins: { top: 120, bottom: 120, left: 150, right: 150 },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: header, bold: true, color: NAVY, size: 20 })
                                    ]
                                }),
                                new Paragraph({
                                    spacing: { before: 80 },
                                    children: [
                                        new TextRun({ text: assessContent[i], size: 20 })
                                    ]
                                })
                            ]
                        })
                    )
                })
            ]
        })
    );
    
    children.push(new Paragraph({ spacing: { after: 300 } }));
    
    // ========== DAILY BREAKDOWN ==========
    children.push(sectionHeader("DAILY BREAKDOWN"));
    
    // Default: 5 days per week (Monday - Friday)
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const days = weekData.days || [];
    
    days.forEach((day, dayIdx) => {
        // Day header: DAY X | Topic
        children.push(
            new Table({
                width: { size: 10800, type: WidthType.DXA },
                columnWidths: [1200, 9600],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 1200, type: WidthType.DXA },
                                shading: { fill: NAVY, type: ShadingType.CLEAR },
                                verticalAlign: VerticalAlign.CENTER,
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({ text: `DAY ${dayIdx + 1}`, bold: true, color: "FFFFFF" })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 9600, type: WidthType.DXA },
                                shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
                                margins: { left: 150 },
                                verticalAlign: VerticalAlign.CENTER,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({ text: `${dayNames[dayIdx] || 'Day ' + (dayIdx + 1)}: `, bold: true }),
                                            new TextRun({ text: day.topic || '' })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        );
        
        children.push(new Paragraph({ spacing: { after: 100 } }));
        
        // Day objectives
        const dayObjectives = day.objectives || [];
        if (dayObjectives.length > 0) {
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: "Objectives: ", bold: true, size: 20 })]
                })
            );
            
            dayObjectives.forEach(obj => {
                children.push(
                    new Paragraph({
                        spacing: { after: 40 },
                        indent: { left: 360 },
                        children: [new TextRun({ text: `• ${obj}`, size: 20 })]
                    })
                );
            });
            
            children.push(new Paragraph({ spacing: { after: 80 } }));
        }
        
        // Schedule table
        const schedule = day.schedule || [];
        if (schedule.length > 0) {
            const scheduleRows = [
                // Header row
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 1400, type: WidthType.DXA },
                            borders,
                            shading: { fill: NAVY, type: ShadingType.CLEAR },
                            margins: { top: 60, bottom: 60, left: 80, right: 80 },
                            children: [new Paragraph({ children: [new TextRun({ text: "TIME", bold: true, color: "FFFFFF", size: 18 })] })]
                        }),
                        new TableCell({
                            width: { size: 2200, type: WidthType.DXA },
                            borders,
                            shading: { fill: NAVY, type: ShadingType.CLEAR },
                            margins: { top: 60, bottom: 60, left: 80, right: 80 },
                            children: [new Paragraph({ children: [new TextRun({ text: "ACTIVITY", bold: true, color: "FFFFFF", size: 18 })] })]
                        }),
                        new TableCell({
                            width: { size: 7200, type: WidthType.DXA },
                            borders,
                            shading: { fill: NAVY, type: ShadingType.CLEAR },
                            margins: { top: 60, bottom: 60, left: 80, right: 80 },
                            children: [new Paragraph({ children: [new TextRun({ text: "DESCRIPTION", bold: true, color: "FFFFFF", size: 18 })] })]
                        })
                    ]
                })
            ];
            
            schedule.forEach((activity, rowIdx) => {
                const rowFill = rowIdx % 2 === 0 ? "FFFFFF" : LIGHT_GRAY;
                scheduleRows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 1400, type: WidthType.DXA },
                                borders,
                                shading: { fill: rowFill, type: ShadingType.CLEAR },
                                margins: { top: 60, bottom: 60, left: 80, right: 80 },
                                children: [new Paragraph({ children: [new TextRun({ text: activity.time || activity.duration || '', bold: true, size: 18 })] })]
                            }),
                            new TableCell({
                                width: { size: 2200, type: WidthType.DXA },
                                borders,
                                shading: { fill: rowFill, type: ShadingType.CLEAR },
                                margins: { top: 60, bottom: 60, left: 80, right: 80 },
                                children: [new Paragraph({ children: [new TextRun({ text: activity.name || activity.activity || '', size: 18 })] })]
                            }),
                            new TableCell({
                                width: { size: 7200, type: WidthType.DXA },
                                borders,
                                shading: { fill: rowFill, type: ShadingType.CLEAR },
                                margins: { top: 60, bottom: 60, left: 80, right: 80 },
                                children: [new Paragraph({ children: [new TextRun({ text: activity.description || '', size: 18 })] })]
                            })
                        ]
                    })
                );
            });
            
            children.push(
                new Table({
                    width: { size: 10800, type: WidthType.DXA },
                    columnWidths: [1400, 2200, 7200],
                    rows: scheduleRows
                })
            );
        }
        
        // Teacher notes
        if (day.teacher_notes) {
            children.push(new Paragraph({ spacing: { after: 100 } }));
            children.push(
                new Table({
                    width: { size: 10800, type: WidthType.DXA },
                    columnWidths: [10800],
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 10800, type: WidthType.DXA },
                                    borders,
                                    shading: { fill: CREAM_YELLOW, type: ShadingType.CLEAR },
                                    margins: { top: 100, bottom: 100, left: 150, right: 150 },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: "Teacher Notes: ", bold: true, size: 20 }),
                                                new TextRun({ text: day.teacher_notes, size: 20 })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            );
        }
        
        children.push(new Paragraph({ spacing: { after: 300 } }));
    });
    
    // Create document
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    size: { width: 12240, height: 15840 },
                    margin: { top: 720, right: 720, bottom: 720, left: 720 }
                }
            },
            children
        }]
    });
    
    return doc;
}

// Example usage
const weekData = {
    week: "9",
    unit: "News Segment",
    week_overview: "Students learn the fundamentals of broadcast journalism by creating their own news segments.",
    week_objectives: [
        "Identify the components and structure of a professional news package",
        "Write broadcast-style scripts using proper news writing conventions",
        "Develop effective interview questions"
    ],
    week_materials: ["Computers with Premiere Pro", "DSLR cameras and tripods", "Lavalier microphones"],
    formative_assessment: "Daily participation, script drafts",
    summative_assessment: "News Segment Project (100 points)",
    weekly_deliverable: "Completed news script by Friday",
    days: [
        {
            topic: "Introduction to News Packages",
            objectives: ["Identify key components of a news package", "Analyze professional news segments"],
            schedule: [
                { time: "10 min", name: "Bell Ringer", description: "What makes news newsworthy?" },
                { time: "25 min", name: "Direct Instruction", description: "News package structure" }
            ],
            teacher_notes: "Have example news clips ready before class"
        }
    ]
};

const doc = generateTeacherHandout(weekData);
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Teacher_Handout.docx", buffer);
    console.log("Teacher handout created: Teacher_Handout.docx");
});
