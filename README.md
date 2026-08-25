# TalentBridge

TalentBridge is a simple full-stack job matching platform that connects candidates with relevant job opportunities based on their skills.

The application provides two sides:

- Candidates can create a profile and find matching jobs.
- Employers can post jobs with their required skills.

TalentBridge then compares candidate skills with the required skills of each job and generates a match percentage.

## Features

- Candidate profile creation
- Employer job posting
- Skill-based job matching
- Match percentage calculation
- Job recommendations
- REST API using FastAPI
- SQLite database
- React and TypeScript frontend
- SQLAlchemy ORM

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- SQLite

## How It Works

### Candidate Flow

1. Candidate enters their name, email and skills.
2. The frontend sends the candidate information to the FastAPI backend.
3. The candidate is stored in the database.
4. The matching engine compares the candidate's skills with available job requirements.
5. Jobs are ranked according to their match percentage.
6. The recommendations are displayed on the frontend.

### Employer Flow

1. Employer enters job details.
2. Required skills are provided for the job.
3. The job is sent to the backend.
4. The job is stored in the database.
5. It becomes available for candidate matching.

## Matching Logic

TalentBridge currently uses a rule-based skill matching approach.

The candidate skills and job requirements are normalized and compared.

The basic matching calculation is:

```text
Match Percentage =
(Matched Required Skills / Total Required Skills) × 100
```

### Project Structure

```text
TalentBridge/
│
├── Backend/
│   ├── database.py
│   ├── main.py
│   ├── matching.py
│   ├── models.py
│   └── schemas.py
│
├── Frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
