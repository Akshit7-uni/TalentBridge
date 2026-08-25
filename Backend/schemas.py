from pydantic import BaseModel


class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str
    required_skills: str


class JobResponse(JobCreate):
    id: int

    class Config:
        from_attributes = True


class CandidateCreate(BaseModel):
    name: str
    email: str
    skills: str


class CandidateResponse(CandidateCreate):
    id: int

    class Config:
        from_attributes = True