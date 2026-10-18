"""Regenerate the website's one-page resume with editable content below."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/junyeop_na_resume.pdf"
INK = colors.HexColor("#172B3A")
ACCENT = colors.HexColor("#087F80")
MUTED = colors.HexColor("#425563")
WIDTH = A4[0] - 92  # Page margins plus the frame's 6pt padding on each side.

# Content is based on the existing resume and the user-approved portfolio.
# Dates follow src/pages/index.tsx; prior resume metrics are retained.
SUMMARY = (
    "Senior machine learning engineer building production AI systems at NAVER. "
    "Experience spans computer vision, multimodal thumbnail selection, automated sports "
    "highlights, real-time travel-time prediction, and LLM agents with retrieval-augmented generation."
)
SKILLS = [
    "<b>ML &amp; inference:</b> Python, TensorFlow, PyTorch, TensorRT, NVIDIA Triton Inference Server, "
    "OpenCV, scikit-learn, computer vision, multimodal embeddings, aesthetic scoring, LangGraph, RAG.",
    "<b>Engineering &amp; analytics:</b> Scala, Rust, Go, MySQL, Spark, Airflow, NumPy, Pandas, "
    "clustering, regression, classification, statistical analysis, Tableau, Git, unit testing.",
]
EXPERIENCE = [
    (
        "NAVER Media AI | ML Engineer", "Aug 2025 - Present",
        [
            "<b>BestCrop:</b> Developed computer vision models that identify the best image region "
            "for thumbnails, used across millions of NAVER content items daily and in Home Feed posts.",
            "<b>BestCut:</b> Combined CLIP-style image-text embeddings with aesthetic scoring to select "
            "visually appealing thumbnails relevant to a user post's title and content.",
            "<b>SPORTER:</b> Developed contextual AI models for automated clips and highlights for the "
            "2026 World Cup, MSI, EWC, Asian Games 2026, and LoL Worlds 2026.",
        ],
    ),
    (
        "NAVER Maps, Car Navigation | ML Engineer", "Jan 2025 - Aug 2025",
        [
            "Developed a road-scene object detection model with few-shot learning capabilities, "
            "achieving 95% mAP@50 across 104 labels.",
            "Built an LLM agent with LangGraph-style orchestration and RAG to automate customer "
            "feedback processing; automated 87% of feedback previously handled manually.",
        ],
    ),
    (
        "NAVER Maps, Public Transportation | Backend Engineer", "Jan 2024 - Dec 2024",
        [
            "Modernized Tokio libraries and legacy Rust code, improving P99 latency by 20%; "
            "introduced a Rust unit-test framework and improved test-suite quality by 30%.",
            "Designed a multi-timetable binary-search algorithm that accelerated subway route searches by 5x.",
        ],
    ),
    (
        "NAVER Maps | Data Scientist", "Aug 2020 - Dec 2023",
        [
            "Built NAVER Maps' first real-time deep learning model for car-route arrival times, "
            "improving MAPE by 3 percentage points over the prior heuristic; transportation ETA "
            "models improved MAPE by 2 percentage points.",
            "Developed Wi-Fi-based indoor positioning models for real-time user location in "
            "NAVER Maps' public transportation navigation service.",
        ],
    ),
]

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=26,
                           textColor=INK, alignment=TA_CENTER),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.5, leading=11,
                              textColor=MUTED, alignment=TA_CENTER),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10, leading=13,
                              textColor=ACCENT, spaceBefore=8, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=12.4,
                           textColor=INK, spaceAfter=2),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.3, leading=12,
                           textColor=INK),
    "date": ParagraphStyle("date", fontName="Helvetica", fontSize=8.8, leading=12,
                           textColor=MUTED, alignment=TA_RIGHT),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.5, leading=12.4,
                             textColor=INK, leftIndent=9, bulletIndent=0, spaceAfter=2),
}


def paragraph(text, kind="body"):
    return Paragraph(text, styles[kind])


def heading(title):
    return [paragraph(title, "section"),
            HRFlowable(width="100%", thickness=0.45, color=colors.HexColor("#B9C9CE")),
            Spacer(1, 4)]


def row(left, right):
    table = Table([[paragraph(left, "role"), paragraph(right, "date")]],
                  colWidths=[WIDTH - 113, 113])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return table


def build():
    story = [paragraph("Jun Yeop Na", "name"), Spacer(1, 4),
             paragraph("Seongnam, Gyeong-gi, South Korea | (010) 7595-7564 | "
                       '<link href="mailto:junyeopna4@gmail.com">junyeopna4@gmail.com</link>', "contact"),
             paragraph('<link href="https://junyeopnaportfolio.dev">Portfolio</link> | '
                       '<link href="https://github.com/flyxiv">github.com/flyxiv</link> | '
                       '<link href="https://www.linkedin.com/in/%EC%A4%80%EC%97%BD-%EB%82%98-7436762b8/">LinkedIn</link>', "contact")]
    story += heading("SUMMARY") + [paragraph(SUMMARY)]
    story += heading("SKILLS") + [paragraph(skill) for skill in SKILLS]
    story += heading("EXPERIENCE")
    for title, dates, bullets in EXPERIENCE:
        content = [row(title, dates)]
        content += [Paragraph(text, styles["bullet"], bulletText="-") for text in bullets]
        story += [KeepTogether(content), Spacer(1, 4)]
    story += heading("EDUCATION")
    story += [row("Seoul National University", "Mar 2014 - Jul 2020"),
              paragraph("Bachelor of Computer Science | GPA: 3.77/4.3")]
    story += heading("SIDE PROJECTS")
    story += [paragraph('<b>FFXIV Simhelper:</b> DPS simulation tool used by hundreds of players. '
                        'Designed reinforcement-learning logic, a Rust backend and a React frontend. '
                        '<link href="https://ffxivsimhelper.com" color="#087F80">Website</link> | '
                        '<link href="https://github.com/flyxiv/ffxiv_simhelper" color="#087F80">GitHub</link>'),
              paragraph('<b>Software Without Borders, Project 279:</b> Volunteer data engineer. '
                        'Designed a Google Cloud data-lake prototype to address Dropbox storage '
                        'challenges for Brazilian environmental organization IPÊ.')]
    story += heading("LANGUAGES")
    story += [paragraph("Korean: Native | English: Fluent (TOEFL iBT 102/120)")]
    document = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=40, leftMargin=40,
                                 topMargin=30, bottomMargin=30, title="Jun Yeop Na - Resume",
                                 author="Jun Yeop Na", subject="Machine Learning Engineer",
                                 pageCompression=1, invariant=1)
    document.build(story)
    print(f"Generated {OUTPUT}")


if __name__ == "__main__":
    build()
