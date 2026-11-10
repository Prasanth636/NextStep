
// NEXTSTEP - STUDENT CAREER DEVELOPMENT PORTAL

const careerData = {
    developer: {
        name: "Software Developer",
        icon: "💻",
        description: "Build websites, applications and software solutions.",
        skills: {
            Beginner: ["HTML", "CSS", "JavaScript"],
            Intermediate: ["Git and GitHub", "React", "SQL"],
            Advanced: ["Node.js", "System Design", "AI Tools"]
        },
        projects: ["Personal Portfolio Website", "Student Management System", "Online Quiz Application"]
    },

    analyst: {
        name: "Data Analyst",
        icon: "📊",
        description: "Analyze data and discover useful business insights.",
        skills: {
            Beginner: ["Excel", "Statistics", "SQL Basics"],
            Intermediate: ["Python", "Power BI", "Data Visualization"],
            Advanced: ["Machine Learning Basics", "Advanced SQL", "AI Tools"]
        },
        projects: ["Student Performance Analysis", "Sales Dashboard", "Movie Data Analysis"]
    },

    designer: {
        name: "UI/UX Designer",
        icon: "🎨",
        description: "Create attractive and user-friendly digital experiences.",
        skills: {
            Beginner: ["Design Principles", "Color Theory", "Typography"],
            Intermediate: ["Figma", "Wireframing", "Prototyping"],
            Advanced: ["User Research", "Design Systems", "Usability Testing"]
        },
        projects: ["Mobile App Design", "Food Delivery App UI", "College Website Design"]
    },

    ai: {
        name: "AI / ML Engineer",
        icon: "🤖",
        description: "Develop intelligent systems using artificial intelligence.",
        skills: {
            Beginner: ["Python", "Mathematics", "Statistics"],
            Intermediate: ["Machine Learning", "NumPy", "Pandas"],
            Advanced: ["Deep Learning", "Neural Networks", "Generative AI"]
        },
        projects: ["Spam Detection System", "Student Result Predictor", "AI Chatbot"]
    },

    cyber: {
        name: "Cybersecurity Analyst",
        icon: "🔐",
        description: "Protect computer systems, networks and information.",
        skills: {
            Beginner: ["Computer Networks", "Linux Basics", "Security Fundamentals"],
            Intermediate: ["Python", "Network Security", "Ethical Hacking Concepts"],
            Advanced: ["Threat Analysis", "Incident Response", "Security Auditing"]
        },
        projects: ["Password Strength Checker", "Phishing Awareness Website", "Network Security Monitor"]
    },

    cloud: {
        name: "Cloud Engineer",
        icon: "☁️",
        description: "Manage applications and infrastructure using cloud platforms.",
        skills: {
            Beginner: ["Networking", "Linux", "Cloud Fundamentals"],
            Intermediate: ["AWS Basics", "Docker", "Git"],
            Advanced: ["Kubernetes", "Cloud Security", "CI/CD"]
        },
        projects: ["Cloud File Storage Concept", "Website Deployment", "Cloud Monitoring Dashboard"]
    }
};

let selectedCareer = localStorage.getItem("nextStepCareer") || "";
let completedSkills = JSON.parse(
    localStorage.getItem("nextStepSkills") || "{}"
);
let viewedProjects = JSON.parse(
    localStorage.getItem("nextStepProjects") || "[]"
);

let revealedAnswers = [];
let answeredQuestions = [];

const interviewQuestions = [
    {
        q: "What is HTML?",
        a: "HTML stands for HyperText Markup Language. It is used to structure content on web pages."
    },
    {
        q: "What is CSS?",
        a: "CSS stands for Cascading Style Sheets. It is used to style and design web pages."
    },
    {
        q: "What is JavaScript?",
        a: "JavaScript is a programming language used to make websites interactive and dynamic."
    },
    {
        q: "What is a database?",
        a: "A database is an organized collection of data that can be stored, managed and retrieved."
    },
    {
        q: "What is Artificial Intelligence?",
        a: "Artificial Intelligence enables machines to perform tasks that normally require human intelligence."
    }
];

const aptitudeQuestions = [
    {
        q: "What is 20% of 200?",
        options: ["20", "30", "40", "50"],
        answer: "40"
    },
    {
        q: "Find the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "12", "14"],
        answer: "10"
    },
    {
        q: "If 5 pens cost ₹50, what is the cost of one pen?",
        options: ["₹5", "₹10", "₹15", "₹20"],
        answer: "₹10"
    },
    {
        q: "Which is the largest number?",
        options: ["25", "45", "35", "15"],
        answer: "45"
    },
    {
        q: "A person travels 60 km in 2 hours. What is the speed?",
        options: ["20 km/h", "25 km/h", "30 km/h", "40 km/h"],
        answer: "30 km/h"
    }
];

// Save career selection and open roadmap
function selectCareer(key) {
    selectedCareer = key;
    localStorage.setItem("nextStepCareer", key);

    renderRoadmap();
    renderProjects();

    document.getElementById("roadmap").scrollIntoView({
        behavior: "smooth"
    });
}

// Display career cards
function renderCareers() {
    const container = document.getElementById("careerContainer");

    container.innerHTML = Object.entries(careerData).map(([key, career]) => `
        <div class="career-card">
            <h3>${career.icon} ${career.name}</h3>
            <p>${career.description}</p>
            <button onclick="selectCareer('${key}')">
                View Learning Roadmap →
            </button>
        </div>
    `).join("");
}

// Display learning roadmap
function renderRoadmap() {
    const container = document.getElementById("roadmapContainer");

    if (!selectedCareer || !careerData[selectedCareer]) {
        container.innerHTML = "Select a career to view its learning roadmap.";
        return;
    }

    const career = careerData[selectedCareer];

    if (!completedSkills[selectedCareer]) {
        completedSkills[selectedCareer] = [];
    }

    let html = `
        <h2>${career.icon} ${career.name}</h2>
        <p>${career.description}</p>
        <h3>Recommended Learning Skills</h3>
    `;

    Object.entries(career.skills).forEach(([level, skills]) => {
        html += `<h3 class="roadmap-level">${level}</h3>`;

        skills.forEach(skill => {
            const checked = completedSkills[selectedCareer].includes(skill);

            html += `
                <label class="skill-item">
                    <input type="checkbox"
                        ${checked ? "checked" : ""}
                        onchange="toggleSkill('${skill.replace(/'/g, "\\'")}', this.checked)">
                    <span>${skill}</span>
                </label>
            `;
        });
    });

    html += `
        <p class="roadmap-progress">
            Complete the skills above to track your learning progress.
        </p>
    `;

    container.innerHTML = html;
    updateDashboard();
}

// Save completed skills
function toggleSkill(skill, checked) {
    if (!completedSkills[selectedCareer]) {
        completedSkills[selectedCareer] = [];
    }

    if (checked) {
        if (!completedSkills[selectedCareer].includes(skill)) {
            completedSkills[selectedCareer].push(skill);
        }
    } else {
        completedSkills[selectedCareer] =
            completedSkills[selectedCareer].filter(item => item !== skill);
    }

    localStorage.setItem(
        "nextStepSkills",
        JSON.stringify(completedSkills)
    );

    updateDashboard();
}

// Display project recommendations
function renderProjects() {
    const container = document.getElementById("projectContainer");

    if (!selectedCareer || !careerData[selectedCareer]) {
        container.innerHTML = `
            <div class="content-card">
                <p>Select a career in Explore Careers to see related projects.</p>
            </div>
        `;
        return;
    }

    const career = careerData[selectedCareer];

    container.innerHTML = career.projects.map((project, index) => {
        const id = selectedCareer + "-" + index;
        const viewed = viewedProjects.includes(id);

        return `
            <div class="career-card">
                <h3>📁 ${project}</h3>
                <p>Suggested practical project for ${career.name} learners.</p>
                <button onclick="markProjectViewed('${id}')">
                    ${viewed ? "✓ Viewed" : "Mark as Viewed"}
                </button>
            </div>
        `;
    }).join("");
}

function markProjectViewed(id) {
    if (!viewedProjects.includes(id)) {
        viewedProjects.push(id);
    }

    localStorage.setItem(
        "nextStepProjects",
        JSON.stringify(viewedProjects)
    );

    renderProjects();
    updateDashboard();
}

// Display interview questions
function renderInterview() {
    const container = document.getElementById("interviewContainer");

    container.innerHTML = interviewQuestions.map((item, index) => `
        <div class="question-item">
            <h3>${index + 1}. ${item.q}</h3>
            <button onclick="toggleAnswer(${index})">
                ${revealedAnswers.includes(index) ? "Hide Answer" : "Show Answer"}
            </button>
            <p id="answer-${index}" class="answer-text"
                style="display:${revealedAnswers.includes(index) ? "block" : "none"}">
                ${item.a}
            </p>
        </div>
    `).join("");
}

function toggleAnswer(index) {
    if (revealedAnswers.includes(index)) {
        revealedAnswers = revealedAnswers.filter(item => item !== index);
    } else {
        revealedAnswers.push(index);
    }

    renderInterview();
}

// Display aptitude quiz
function renderAptitude() {
    const container = document.getElementById("aptitudeContainer");

    container.innerHTML = aptitudeQuestions.map((item, index) => `
        <div class="question-item">
            <h3>${index + 1}. ${item.q}</h3>

            <div class="quiz-options">
                ${item.options.map(option => `
                    <button class="quiz-option"
                        onclick="checkAnswer(${index}, '${option}')">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <p id="quiz-result-${index}" class="answer-text"></p>
        </div>
    `).join("");

    const result = document.getElementById("aptitudeResult");

    if (result) result.remove();

    container.insertAdjacentHTML(
        "beforeend",
        '<h3 id="aptitudeResult">Correct answers: ' +
        answeredQuestions.filter(Boolean).length +
        ' / ' + aptitudeQuestions.length + '</h3>'
    );
}

// Check quiz answers
function checkAnswer(index, option) {
    const question = aptitudeQuestions[index];
    const result = document.getElementById("quiz-result-" + index);

    const correct = option === question.answer;

    if (answeredQuestions[index] === undefined) {
        answeredQuestions[index] = correct;
    } else {
        answeredQuestions[index] = correct;
    }

    result.textContent = correct
        ? "Correct answer! Well done."
        : "Not quite. Correct answer: " + question.answer;

    result.style.display = "block";
    renderQuizScore();
}

function renderQuizScore() {
    const result = document.getElementById("aptitudeResult");

    if (result) {
        result.textContent =
            "Correct answers: " +
            answeredQuestions.filter(Boolean).length +
            " / " + aptitudeQuestions.length;
    }
}

// Update dashboard statistics
function updateDashboard() {
    let totalSkills = 0;
    let completedCount = 0;

    Object.entries(careerData).forEach(([key, career]) => {
        const skills = Object.values(career.skills).flat();

        totalSkills += skills.length;
        completedCount += (completedSkills[key] || []).length;
    });

    const percentage = totalSkills
        ? Math.round((completedCount / totalSkills) * 100)
        : 0;

    document.getElementById("skillsCompleted").textContent = completedCount;
    document.getElementById("overallProgress").textContent = percentage + "%";
    document.getElementById("careersExplored").textContent =
        Object.keys(completedSkills).filter(
            key => completedSkills[key].length > 0
        ).length;
    document.getElementById("projectsViewed").textContent =
        viewedProjects.length;
}

// Navigation active state
function setupNavigation() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function() {
            document.querySelectorAll(".nav-link").forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");
        });
    });
}

// Start the application
function initNextStep() {
    renderCareers();
    renderRoadmap();
    renderProjects();
    renderInterview();
    renderAptitude();
    updateDashboard();
    setupNavigation();
}

document.addEventListener("DOMContentLoaded", initNextStep);
