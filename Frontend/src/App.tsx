import { useState } from "react";
import "./App.css";

interface JobMatch {
  job_id: number;
  title: string;
  company: string;
  location: string;
  match_percentage: number;
}

interface MatchResponse {
  candidate: string;
  matches: JobMatch[];
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");

  const [jobMessage, setJobMessage] = useState("");
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findJobs = async () => {
    if (!name || !email || !skills) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setMatches([]);

    try {
      const candidateResponse = await fetch(
          "https://talentbridge-wtz9.onrender.com/candidates",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              skills,
            }),
          }
      );

      if (!candidateResponse.ok) {
        throw new Error("Failed to create candidate");
      }

      const candidate = await candidateResponse.json();

      const matchResponse = await fetch(
          `https://talentbridge-wtz9.onrender.com/match/${candidate.id}`
      );

      if (!matchResponse.ok) {
        throw new Error("Failed to find matching jobs");
      }

      const data: MatchResponse = await matchResponse.json();

      setMatches(data.matches);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const postJob = async () => {
    if (
        !jobTitle ||
        !company ||
        !location ||
        !description ||
        !requiredSkills
    ) {
      setJobMessage("Please fill in all job details.");
      return;
    }

    try {
      const response = await fetch(
          "https://talentbridge-wtz9.onrender.com/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: jobTitle,
              company: company,
              location: location,
              description: description,
              required_skills: requiredSkills,
            }),
          }
      );

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      setJobMessage("Job posted successfully!");

      setJobTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setRequiredSkills("");

    } catch {
      setJobMessage("Failed to post job. Please try again.");
    }
  };

  const scrollToMatcher = () => {
    document
        .getElementById("matcher")
        ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <div className="app">

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">
            Talent<span>Bridge</span>
          </div>

          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#matcher">Find jobs</a>
            <a href="#post-job">Post a job</a>
          </div>
          <button className="nav-button" onClick={scrollToMatcher}>
            Get Started
          </button>
        </nav>


        {/* HERO */}
        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              ✦ Smart career matching
            </div>

            <h1>
              Your skills.
              <br />
              <span>Your next opportunity.</span>
            </h1>

            <p>
              TalentBridge connects your skills with the right
              opportunities, helping you discover jobs where
              you're most likely to succeed.
            </p>

            <div className="hero-buttons">
              <button className="primary-button" onClick={scrollToMatcher}>
                Find Your Match →
              </button>

              <a href="#how-it-works" className="secondary-button">
                How it works
              </a>
            </div>

            <div className="hero-note">
              No complicated setup · Skill-based matching · Instant results
            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="floating-card top-card">
              <span className="mini-icon">✓</span>
              <div>
                <strong>Perfect match</strong>
                <small>Skills aligned</small>
              </div>
            </div>


            <div className="match-card">

              <div className="match-header">
                <div>
                  <small>RECOMMENDED FOR YOU</small>
                  <h3>Backend Developer</h3>
                </div>

                <div className="score">
                  96%
                </div>
              </div>

              <p className="company">
                Tech Solutions · Bangalore
              </p>

              <div className="skill-list">
                <span>Python</span>
                <span>FastAPI</span>
                <span>SQL</span>
                <span>REST APIs</span>
              </div>

              <div className="match-line">
                <div className="line">
                  <div className="line-fill"></div>
                </div>

                <span>Excellent fit</span>
              </div>

            </div>


            <div className="floating-card bottom-card">
              <div className="avatar">AJ</div>
              <div>
                <strong>Candidate profile</strong>
                <small>4 skills detected</small>
              </div>
            </div>

          </div>
          {/* EMPLOYER SECTION */}

          <section className="employer-section" id="post-job">

            <div className="employer-container">

              <div className="matcher-intro">

                <div className="badge">
                  FOR EMPLOYERS
                </div>

                <h2>
                  Find the right talent for your team.
                </h2>

                <p>
                  Post an opportunity with the skills you're
                  looking for and let TalentBridge connect
                  candidates with your requirements.
                </p>

              </div>


              <div className="profile-card">

                <h2>Post a Job</h2>

                <label>Job Title</label>

                <input
                    type="text"
                    placeholder="e.g. Backend Developer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />


                <label>Company</label>

                <input
                    type="text"
                    placeholder="e.g. Tech Solutions"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />


                <label>Location</label>

                <input
                    type="text"
                    placeholder="e.g. Bangalore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />


                <label>Description</label>

                <textarea
                    placeholder="Describe the role..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />


                <label>Required Skills</label>

                <input
                    type="text"
                    placeholder="Python, FastAPI, SQL"
                    value={requiredSkills}
                    onChange={(e) =>
                        setRequiredSkills(e.target.value)
                    }
                />


                <button
                    className="primary-button full-button"
                    onClick={postJob}
                >
                  Post Job →
                </button>


                {jobMessage && (
                    <p className="job-message">
                      {jobMessage}
                    </p>
                )}

              </div>

            </div>

          </section>
        </section>


        {/* STATS */}

        <section className="stats">

          <div>
            <strong>Skill-based</strong>
            <span>Matching</span>
          </div>

          <div>
            <strong>Instant</strong>
            <span>Recommendations</span>
          </div>

          <div>
            <strong>Simple</strong>
            <span>Candidate Profile</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Transparent Matching</span>
          </div>

        </section>


        {/* HOW IT WORKS */}

        <section className="how-section" id="how-it-works">

          <div className="section-heading">

            <div className="badge">
              HOW IT WORKS
            </div>

            <h2>
              From skills to opportunities
            </h2>

            <p>
              A simple three-step process to discover
              opportunities that match what you know.
            </p>

          </div>


          <div className="steps">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <h3>Build your profile</h3>

              <p>
                Tell us your name, email and the skills
                you've developed.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <h3>Analyze your skills</h3>

              <p>
                TalentBridge compares your skills with
                the requirements of available jobs.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <h3>Discover your matches</h3>

              <p>
                Get ranked opportunities with a clear
                match percentage.
              </p>

            </div>

          </div>

        </section>


        {/* MATCHER */}

        <section className="matcher-section" id="matcher">

          <div className="matcher-container">

            <div className="matcher-intro">

              <div className="badge">
                FIND YOUR MATCH
              </div>

              <h2>
                Ready to find your next opportunity?
              </h2>

              <p>
                Enter your details and let TalentBridge
                find the jobs that match your skills.
              </p>

            </div>


            <div className="profile-card">

              <h2>Candidate Profile</h2>

              <label>Name</label>

              <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />


              <label>Email</label>

              <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />


              <label>Skills</label>

              <input
                  type="text"
                  placeholder="Python, SQL, React, FastAPI"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
              />


              <button
                  className="primary-button full-button"
                  onClick={findJobs}
                  disabled={loading}
              >
                {loading
                    ? "Finding Jobs..."
                    : "Find Matching Jobs →"}
              </button>


              {error && (
                  <p className="error">
                    {error}
                  </p>
              )}

            </div>


            {/* RESULTS */}

            {matches.length > 0 && (

                <div className="results">

                  <h2>Recommended Jobs</h2>

                  {matches.map((job) => (

                      <div
                          className="job-card"
                          key={job.job_id}
                      >

                        <div>

                          <h3>{job.title}</h3>

                          <p>
                            {job.company}
                          </p>

                          <p>
                            {job.location}
                          </p>

                        </div>


                        <div className="match">

                          {job.match_percentage}%

                          <span>
                      Match
                    </span>

                        </div>

                      </div>

                  ))}

                </div>

            )}

          </div>

        </section>


        {/* FOOTER */}

        <footer>
          <div className="logo">
            Talent<span>Bridge</span>
          </div>

          <p>
            Connecting skills with opportunities.
          </p>
        </footer>

      </div>
  );
}

export default App;