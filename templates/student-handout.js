/**
 * Student Handout Generator - Uses docx-js per the docx skill
 * Matches the clean format style
 * 
 * Usage: node student-handout.js
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType } = require('docx');
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
 * Generate a Student Handout document
 */
function generateStudentHandout(handoutData) {
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
                            margins: { top: 200, bottom: 200, left: 200, right: 200 },
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({ 
                                            text: handoutData.title || "Student Handout", 
                                            bold: true, 
                                            color: "FFFFFF", 
                                            size: 36 
                                        })
                                    ]
                                }),
                                ...(handoutData.subtitle ? [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({ 
                                                text: handoutData.subtitle, 
                                                color: LIGHT_BLUE, 
                                                size: 24 
                                            })
                                        ]
                                    })
                                ] : [])
                            ]
                        })
                    ]
                })
            ]
        })
    );
    
    children.push(new Paragraph({ spacing: { after: 200 } }));
    
    // ========== INTRO/INSTRUCTIONS ==========
    const intro = handoutData.intro || handoutData.instructions;
    if (intro) {
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
                                        children: [new TextRun({ text: intro })]
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
    
    // ========== SECTIONS ==========
    const sections = handoutData.sections || [];
    sections.forEach(section => {
        if (section.title) {
            children.push(sectionHeader(section.title));
        }
        
        const items = section.items || [];
        const sectionType = section.type || 'bullets';
        
        if (sectionType === 'numbered_steps') {
            items.forEach((item, i) => {
                children.push(
                    new Paragraph({
                        spacing: { after: 80 },
                        children: [
                            new TextRun({ text: `${i + 1}. `, bold: true }),
                            new TextRun({ text: item })
                        ]
                    })
                );
            });
        } else if (sectionType === 'bullets' || items.length > 0) {
            items.forEach(item => {
                children.push(
                    new Paragraph({
                        spacing: { after: 60 },
                        children: [new TextRun({ text: `• ${item}` })]
                    })
                );
            });
        } else if (section.content) {
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: section.content })]
                })
            );
        }
        
        children.push(new Paragraph({ spacing: { after: 160 } }));
    });
    
    // ========== VOCABULARY ==========
    const vocab = handoutData.vocabulary || {};
    const vocabEntries = Object.entries(vocab);
    if (vocabEntries.length > 0) {
        children.push(sectionHeader("VOCABULARY"));
        
        const vocabRows = vocabEntries.map(([term, definition], i) => {
            const rowFill = i % 2 === 0 ? LIGHT_BLUE : "FFFFFF";
            return new TableRow({
                children: [
                    new TableCell({
                        width: { size: 2500, type: WidthType.DXA },
                        borders,
                        shading: { fill: rowFill, type: ShadingType.CLEAR },
                        margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [
                            new Paragraph({
                                children: [new TextRun({ text: term, bold: true, size: 20 })]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 8300, type: WidthType.DXA },
                        borders,
                        shading: { fill: rowFill, type: ShadingType.CLEAR },
                        margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [
                            new Paragraph({
                                children: [new TextRun({ text: definition, size: 20 })]
                            })
                        ]
                    })
                ]
            });
        });
        
        children.push(
            new Table({
                width: { size: 10800, type: WidthType.DXA },
                columnWidths: [2500, 8300],
                rows: vocabRows
            })
        );
        
        children.push(new Paragraph({ spacing: { after: 200 } }));
    }
    
    // ========== QUESTIONS ==========
    const questions = handoutData.questions || [];
    if (questions.length > 0) {
        children.push(sectionHeader("QUESTIONS"));
        
        questions.forEach((question, i) => {
            children.push(
                new Paragraph({
                    spacing: { after: 40 },
                    children: [
                        new TextRun({ text: `${i + 1}. `, bold: true }),
                        new TextRun({ text: question })
                    ]
                })
            );
            // Answer line
            children.push(
                new Paragraph({
                    spacing: { after: 160 },
                    children: [
                        new TextRun({ text: "_".repeat(80), color: BORDER_GRAY })
                    ]
                })
            );
        });
        
        children.push(new Paragraph({ spacing: { after: 200 } }));
    }
    
    // ========== TIPS ==========
    const tips = handoutData.tips || [];
    if (tips.length > 0) {
        const tipParagraphs = [
            new Paragraph({
                children: [new TextRun({ text: "TIPS", bold: true, color: NAVY })]
            })
        ];
        
        tips.forEach(tip => {
            tipParagraphs.push(
                new Paragraph({
                    spacing: { before: 80 },
                    children: [new TextRun({ text: `• ${tip}`, size: 20 })]
                })
            );
        });
        
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
                                margins: { top: 120, bottom: 120, left: 150, right: 150 },
                                children: tipParagraphs
                            })
                        ]
                    })
                ]
            })
        );
    }
    
    // Create document
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    size: { width: 12240, height: 15840 },
                    margin: { top: 864, right: 864, bottom: 864, left: 864 }
                }
            },
            children
        }]
    });
    
    return doc;
}

// Example usage
const handoutData = {
    title: "News Script Template",
    subtitle: "Broadcast Writing Guide",
    intro: "Use this template to write your news segment script following professional broadcast conventions.",
    sections: [
        {
            title: "Script Format",
            type: "numbered_steps",
            items: [
                "Write in ALL CAPS for on-camera talent",
                "Use present tense and active voice",
                "Keep sentences short (under 20 words)",
                "Include timing notes in margins"
            ]
        },
        {
            title: "Story Structure",
            type: "bullets",
            items: [
                "Lead - Hook the viewer in first 5 seconds",
                "Body - Present facts in order of importance",
                "SOT - Include at least one interview clip",
                "Tag - Wrap up with call to action"
            ]
        }
    ],
    vocabulary: {
        "Anchor": "News presenter in studio",
        "Reporter": "Journalist in the field",
        "B-roll": "Supplementary footage"
    },
    tips: [
        "Read your script out loud - if you stumble, rewrite it",
        "Time yourself - aim for 60-90 seconds total"
    ]
};

const doc = generateStudentHandout(handoutData);
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Student_Handout.docx", buffer);
    console.log("Student handout created: Student_Handout.docx");
});
