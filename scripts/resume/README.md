# Website resume

`build.py` contains the editable content and layout for the one-page PDF served at
`/junyeop_na_resume.pdf`. The download link lives in `src/components/AboutMe.tsx`.

```sh
python -m pip install -r scripts/resume/requirements.txt
python scripts/resume/build.py
```

The script resolves the repository root from its own path. Review the rendered PDF
after changing content; confirm it is still one page with no clipped or overlapping
text. Commit both the source and `public/junyeop_na_resume.pdf`. The existing main-push
deployment includes the PDF in the static public assets; ReportLab is not required
by Next.js or on the production VM.

Content follows the user-approved portfolio roles and dates, including Media AI
starting August 2025 and Maps ML ending August 2025. Earlier resume metrics,
education, contacts, side projects and language qualifications are retained.
The old aggregate employment date was July 2020; the role timeline uses the
portfolio's August 2020 Data Scientist start date. Product names and reported
results are supplied by the user, not independently audited.
