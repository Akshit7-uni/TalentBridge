from matching import calculate_match
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, SessionLocal
from models import Job, Candidate
from schemas import (
    JobCreate,
    JobResponse,
    CandidateCreate,
    CandidateResponse
)


Base.metadata.create_all(bind=engine)

app = FastAPI(title="TalentBridge API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {
        "message": "Welcome to TalentBridge",
        "status": "running"
    }


@app.post("/jobs", response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = Job(
        title=job.title,
        company=job.company,
        location=job.location,
        description=job.description,
        required_skills=job.required_skills
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job


@app.get("/jobs", response_model=list[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()

@app.post("/candidates", response_model=CandidateResponse)
def create_candidate(
        candidate: CandidateCreate,
        db: Session = Depends(get_db)
):
    new_candidate = Candidate(
        name=candidate.name,
        email=candidate.email,
        skills=candidate.skills
    )

    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)

    return new_candidate


@app.get("/candidates", response_model=list[CandidateResponse])
def get_candidates(db: Session = Depends(get_db)):
    return db.query(Candidate).all()

@app.get("/match/{candidate_id}")
def match_jobs(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        return {"error": "Candidate not found"}

    jobs = db.query(Job).all()

    results = []

    for job in jobs:
        match_percentage = calculate_match(
            candidate.skills,
            job.required_skills
        )

        results.append({
            "job_id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "match_percentage": match_percentage
        })

    results.sort(
        key=lambda x: x["match_percentage"],
        reverse=True
    )

    return {
        "candidate": candidate.name,
        "matches": results
    }