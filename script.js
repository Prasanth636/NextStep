alert("NextStep JavaScript is running!");
"use strict";

/* =====================================
   NEXTSTEP - MAIN APPLICATION
===================================== */

const $ = id => document.getElementById(id);
const $$ = selector => [...document.querySelectorAll(selector)];

const STORE = {
  career: "nsCareer",
  skills: "nsSkills",
  explored: "nsExplored",
  projects: "nsCompletedProjects",
  activity: "nsActivity"
};

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

let selectedCareer = load(STORE.career, "developer");
let completedSkills = load(STORE.skills, []);
let exploredCareers = load(STORE.explored, []);
let completedProjects = load(STORE.projects, []);
let activities = load(STORE.activity, []);

function save() {
  localStorage.setItem(STORE.career, JSON.stringify(selectedCareer));
  localStorage.setItem(STORE.skills, JSON.stringify(completedSkills));
  localStorage.setItem(STORE.explored, JSON.stringify(exploredCareers));
  localStorage.setItem(STORE.projects, JSON.stringify(completedProjects));
  localStorage.setItem(STORE.activity, JSON.stringify(activities));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  })[char]);
}

function activity(message) {
  activities.unshift({
    message,
    date: new Date().toLocaleDateString()
  });
  activities = activities.slice(0, 8);
  save();
  renderActivity();
}

/* CAREER INFORMATION */

const careers = {
  developer: {
    title: "Full Stack Developer",
    icon: "💻",
    category: "development",
    description: "Create websites and applications using frontend and backend technologies.",
    skills: ["HTML", "CSS", "JavaScript", "Git and GitHub", "React", "Node.js", "Express.js", "Databases", "REST APIs"],
    projects: ["Personal Portfolio Website", "Student Management System", "E-commerce Website"]
  },
  analyst: {
    title: "Data Analyst",
    icon: "📊",
    category: "data",
    description: "Analyze information and discover insights that help businesses make decisions.",
    skills: ["Excel", "SQL", "Python", "Statistics", "Data Cleaning", "Power BI", "Data Visualization", "Pandas", "Data Analysis"],
    projects: ["Sales Data Analysis", "Student Performance Dashboard", "Customer Data Analysis"]
  },
  designer: {
    title: "UI/UX Designer",
    icon: "🎨",
    category: "design",
    description: "Design attractive, accessible and user-friendly digital experiences.",
    skills: ["Design Principles", "Color Theory", "Typography", "Wireframing", "Figma", "Prototyping", "User Research", "Responsive Design", "Usability Testing"],
    projects: ["Mobile App Design", "E-commerce UI Design", "Student Dashboard Design"]
  },
  ai: {
    title: "AI / Machine Learning Engineer",
    icon: "🤖",
    category: "data",
    description: "Develop intelligent applications using data and machine learning algorithms.",
    skills: ["Python", "Mathematics", "Statistics", "NumPy", "Pandas", "Machine Learning", "Scikit-learn", "Deep Learning", "Model Evaluation"],
    projects: ["House Price Prediction", "Movie Recommendation System", "Image Classification"]
  },
  cyber: {
    title: "Cybersecurity Analyst",
    icon: "🔐",
    category: "security",
    description: "Protect digital systems and networks from security threats.",
    skills: ["Networking", "Linux", "Python", "Cybersecurity Basics", "Web Security", "OWASP", "Security Monitoring", "Risk Assessment", "Incident Response"],
    projects: ["Password Strength Checker", "Network Security Analysis", "Security Awareness Website"]
  },
  cloud: {
    title: "Cloud Engineer",
    icon: "☁️",
    category: "cloud",
    description: "Deploy and maintain applications and infrastructure using cloud technologies.",
    skills: ["Linux", "Networking", "Python", "Cloud Basics", "AWS", "Azure", "Docker", "Git", "Deployment"],
    projects: ["Cloud Hosted Portfolio", "Dockerized Web Application", "Cloud Storage Application"]
  }
};

/* NAVIGATION */

const pageTitles = {
  dashboard: "Dashboard",
  careers: "Explore Careers",
  roadmap: "Learning Roadmap",
  projects: "Project Studio",
  placement: "Placement Center",
  resources: "Resource Library"
};

function showPage(name) {
  if (!pageTitles[name]) return;

  $$(".page").forEach(page => {
    page.classList.toggle("active", page.id === name);
  });

  $$(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.page === name);
  });

  $("pageTitle").textContent = pageTitles[name];
  $("sidebar").classList.remove("open");

  if (name === "dashboard") renderDashboard();
  if (name === "careers") renderCareers();
  if (name === "roadmap") renderRoadmap();
  if (name === "projects") renderProjects();
  if (name === "placement") {
    renderInterview();
    renderQuiz();
  }
  if (name === "resources") renderResources();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
  $$(".nav-link").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  $$("[data-go]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.go));
  });

  document.querySelector(".brand")?.addEventListener("click", event => {
    event.preventDefault();
    showPage("dashboard");
  });

  $("menuToggle").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
  });
}

/* CAREER EXPLORER */

function renderCareers() {
  const container = $("careerContainer");
  const search = $("careerSearch").value.toLowerCase();
  const category = $("careerFilter").value;

  const results = Object.entries(careers).filter(([id, career]) => {
    const matchesText =
      career.title.toLowerCase().includes(search) ||
      career.description.toLowerCase().includes(search);

    return matchesText &&
      (category === "all" || career.category === category);
  });

  container.innerHTML = results.length
    ? results.map(([id, career]) => `
      <article class="career-card">
        <div class="career-icon">${career.icon}</div>
        <h3>${escapeHTML(career.title)}</h3>
        <p>${escapeHTML(career.description)}</p>
        <p><strong>${career.skills.length} key skills</strong></p>
        <button class="btn btn-primary" data-career="${id}">
          Explore Career →
        </button>
      </article>
    `).join("")
    : "<p>No careers found. Try another search.</p>";

  container.querySelectorAll("[data-career]").forEach(button => {
    button.addEventListener("click", () => selectCareer(button.dataset.career));
  });
}

function selectCareer(id) {
  const career = careers[id];
  if (!career) return;

  selectedCareer = id;
  if (!exploredCareers.includes(id)) exploredCareers.push(id);
  save();

  $("careerDetail").innerHTML = `
    <p class="eyebrow">CAREER PROFILE</p>
    <h2>${career.icon} ${escapeHTML(career.title)}</h2>
    <p>${escapeHTML(career.description)}</p>
    <h3>Skills to develop</h3>
    <ul>${career.skills.map(skill => `<li>${escapeHTML(skill)}</li>`).join("")}</ul>
    <h3>Suggested projects</h3>
    <ul>${career.projects.map(project => `<li>${escapeHTML(project)}</li>`).join("")}</ul>
    <button class="btn btn-primary" id="careerStart">Start this roadmap →</button>
  `;

  $("careerStart").addEventListener("click", () => showPage("roadmap"));

  activity("Explored " + career.title);
  renderDashboard();
}

/* LEARNING ROADMAP */

function renderRoadmap() {
  const select = $("roadmapCareer");

  if (!select.options.length) {
    select.innerHTML = Object.entries(careers).map(([id, career]) =>
      `<option value="${id}">${escapeHTML(career.title)}</option>`
    ).join("");
  }

  select.value = selectedCareer;

  const career = careers[select.value];
  const container = $("roadmapContainer");

  const completed = career.skills.filter(skill =>
    completedSkills.includes(select.value + ":" + skill)
  ).length;

  $("roadmapSummary").textContent =
    `${completed} of ${career.skills.length} skills completed · ${Math.round(completed / career.skills.length * 100)}% progress`;

  container.innerHTML = career.skills.map((skill, index) => {
    const key = select.value + ":" + skill;
    const checked = completedSkills.includes(key);

    return `
      <div class="roadmap-item">
        <label>
          <input type="checkbox" data-skill="${escapeHTML(skill)}" ${checked ? "checked" : ""}>
          <span>${index + 1}. ${escapeHTML(skill)}</span>
        </label>
        <span>${checked ? "Completed ✓" : "In progress"}</span>
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-skill]").forEach(input => {
    input.addEventListener("change", () => {
      const key = select.value + ":" + input.dataset.skill;

      if (input.checked) {
        if (!completedSkills.includes(key)) completedSkills.push(key);
        activity("Completed skill: " + input.dataset.skill);
      } else {
        completedSkills = completedSkills.filter(item => item !== key);
        save();
      }

      renderRoadmap();
      renderDashboard();
    });
  });
}

/* PROJECT STUDIO */

const projects = [
  { id: "portfolio", title: "Personal Portfolio Website", career: "developer", level: "Beginner", tools: "HTML, CSS, JavaScript", description: "Create a responsive personal website to showcase your skills." },
  { id: "student", title: "Student Management System", career: "developer", level: "Intermediate", tools: "JavaScript, React, Database", description: "Build a system to manage student details and academic records." },
  { id: "ecommerce", title: "E-commerce Website", career: "developer", level: "Advanced", tools: "React, Node.js, Database", description: "Create an online shopping application." },
  { id: "sales", title: "Sales Data Analysis", career: "analyst", level: "Beginner", tools: "Excel, SQL, Python", description: "Analyze sales data and identify business trends." },
  { id: "performance", title: "Student Performance Dashboard", career: "analyst", level: "Intermediate", tools: "Python, Power BI", description: "Visualize academic results using charts." },
  { id: "mobile", title: "Mobile App UI Design", career: "designer", level: "Beginner", tools: "Figma, Design Principles", description: "Design an attractive mobile application." },
  { id: "shopdesign", title: "E-commerce UI Design", career: "designer", level: "Intermediate", tools: "Figma, Prototyping", description: "Create a complete online shopping interface." },
  { id: "house", title: "House Price Prediction", career: "ai", level: "Intermediate", tools: "Python, Pandas, Scikit-learn", description: "Predict house prices using machine learning." },
  { id: "movie", title: "Movie Recommendation System", career: "ai", level: "Advanced", tools: "Python, Machine Learning", description: "Recommend movies based on user preferences." },
  { id: "password", title: "Password Strength Checker", career: "cyber", level: "Beginner", tools: "HTML, CSS, JavaScript", description: "Build a tool to evaluate password strength." },
  { id: "awareness", title: "Security Awareness Website", career: "cyber", level: "Intermediate", tools: "HTML, CSS, JavaScript", description: "Educate users about common online threats." },
  { id: "cloudsite", title: "Cloud Hosted Portfolio", career: "cloud", level: "Beginner", tools: "HTML, Git, Cloud Hosting", description: "Deploy a portfolio website to a cloud host." },
  { id: "dockerapp", title: "Dockerized Web Application", career: "cloud", level: "Advanced", tools: "Docker, Linux", description: "Package a web application using Docker." }
];

function renderProjects() {
  const career = $("projectCareer").value;
  const level = $("projectLevel").value;

  const filtered = projects.filter(project =>
    (career === "all" || project.career === career) &&
    (level === "all" || project.level === level)
  );

  $("projectContainer").innerHTML = filtered.length
    ? filtered.map(project => `
      <article class="project-card">
        <h3>${escapeHTML(project.title)}</h3>
        <span class="level">${project.level}</span>
        <p>${escapeHTML(project.description)}</p>
        <p><strong>Tools:</strong> ${escapeHTML(project.tools)}</p>
        <button class="btn btn-primary" data-project="${project.id}">
          ${completedProjects.includes(project.id) ? "Completed ✓" : "Mark as completed"}
        </button>
      </article>
    `).join("")
    : "<p>No projects found for these filters.</p>";

  $("projectContainer").querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.project;
      const project = projects.find(item => item.id === id);

      if (completedProjects.includes(id)) {
        completedProjects = completedProjects.filter(item => item !== id);
        save();
      } else {
        completedProjects.push(id);
        activity("Completed project: " + project.title);
      }

      renderProjects();
      renderDashboard();
    });
  });
}

/* PLACEMENT CENTER - INTERVIEW QUESTIONS */

const interviewQuestions = {
  technical: [
    ["What is HTML?", "HTML is the markup language used to structure web pages."],
    ["What is CSS?", "CSS styles and controls the appearance of web pages."],
    ["What is JavaScript?", "JavaScript adds logic and interactive behaviour to websites."],
    ["What is a database?", "A database is an organized collection of information."],
    ["What is Git?", "Git is a version control system used to track code changes."]
  ],
  hr: [
    ["Tell me about yourself.", "Introduce your education, skills, projects and career interests."],
    ["What are your strengths?", "Describe your strengths and support them with a real example."],
    ["Why should we hire you?", "Explain how your skills, attitude and project experience can help the team."],
    ["Where do you see yourself in five years?", "Describe realistic professional growth and learning goals."],
    ["How do you handle challenges?", "Explain how you understand a problem, plan a solution and learn from it."]
  ],
  aptitude: [
    ["What is 20% of 250?", "50"],
    ["What is the average of 10, 20 and 30?", "20"],
    ["A product costs ₹500 with a 10% discount. What is the price?", "₹450"],
    ["Find the next number: 2, 4, 8, 16, ...", "32"],
    ["A person travels 60 km in 2 hours. Find the speed.", "30 km/h"]
  ]
};

function renderInterview() {
  const category = $("interviewCategory").value;
  const questions = interviewQuestions[category];

  $("interviewContainer").innerHTML = questions.map((item, index) => `
    <div class="interview-card">
      <h3>${index + 1}. ${escapeHTML(item[0])}</h3>
      <button class="btn btn-secondary" data-answer="${index}">Show answer</button>
      <p id="answer${index}" hidden>${escapeHTML(item[1])}</p>
    </div>
  `).join("");

  $("interviewContainer").querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => {
      const answer = $("answer" + button.dataset.answer);
      answer.hidden = !answer.hidden;
      button.textContent = answer.hidden ? "Show answer" : "Hide answer";
    });
  });
}

/* APTITUDE QUIZ */

const questions = [
  { q: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2, explanation: "25% of 200 is 50." },
  { q: "Find the next number: 3, 6, 12, 24, ...", options: ["30", "36", "48", "60"], answer: 2, explanation: "Each number is multiplied by 2. The next number is 48." },
  { q: "What is the average of 5, 10 and 15?", options: ["5", "10", "15", "20"], answer: 1, explanation: "(5 + 10 + 15) / 3 = 10." },
  { q: "A car travels 120 km in 2 hours. What is its speed?", options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"], answer: 2, explanation: "Speed = distance / time = 60 km/h." },
  { q: "Which number is prime?", options: ["9", "15", "17", "21"], answer: 2, explanation: "17 is divisible only by 1 and itself." }
];

let answers = {};
let quizFinished = false;

function renderQuiz() {
  answers = {};
  quizFinished = false;

  $("aptitudeContainer").innerHTML = `
    ${questions.map((question, index) => `
      <div class="quiz-question">
        <h4>${index + 1}. ${escapeHTML(question.q)}</h4>
        <div class="quiz-options">
          ${question.options.map((option, optionIndex) => `
            <button type="button" class="quiz-option"
              data-question="${index}" data-option="${optionIndex}">
              ${escapeHTML(option)}
            </button>
          `).join("")}
        </div>
        <p id="explanation${index}" hidden></p>
      </div>
    `).join("")}
    <button type="button" class="btn btn-primary" id="submitQuiz">Submit quiz</button>
    <div id="quizResult"></div>
  `;

  $("aptitudeContainer").querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => {
      if (quizFinished) return;

      const questionIndex = Number(button.dataset.question);
      answers[questionIndex] = Number(button.dataset.option);

      $$(`[data-question="${questionIndex}"]`).forEach(option =>
        option.classList.remove("selected")
      );

      button.classList.add("selected");
    });
  });

  $("submitQuiz").addEventListener("click", submitQuiz);
}

function submitQuiz() {
  if (quizFinished) return;

  if (Object.keys(answers).length !== questions.length) {
    alert("Please answer all five questions first.");
    return;
  }

  quizFinished = true;
  let score = 0;

  questions.forEach((question, index) => {
    const correct = answers[index] === question.answer;
    if (correct) score++;

    const explanation = $("explanation" + index);
    explanation.hidden = false;
    explanation.textContent =
      (correct ? "Correct! " : "Incorrect. ") + question.explanation;
  });

  $("quizResult").innerHTML = `
    <h3>Your score: ${score}/${questions.length}</h3>
    <p>${Math.round(score / questions.length * 100)}% accuracy</p>
    <p>${score >= 4 ? "Excellent work! Keep practising." : score >= 3 ? "Good effort. Keep improving!" : "Keep learning and try again!"}</p>
    <button class="btn btn-primary" id="retakeQuiz">Try again</button>
  `;

  $("retakeQuiz").addEventListener("click", renderQuiz);
  activity("Completed aptitude quiz: " + score + "/5");
}

/* RESOURCE LIBRARY */

const resources = [
  ["MDN Web Docs", "Web Development", "https://developer.mozilla.org/"],
  ["freeCodeCamp", "Web Development", "https://www.freecodecamp.org/"],
  ["JavaScript.info", "Web Development", "https://javascript.info/"],
  ["React Documentation", "Web Development", "https://react.dev/learn"],
  ["Node.js Learning", "Web Development", "https://nodejs.org/en/learn"],
  ["GitHub Skills", "Tools", "https://skills.github.com/"],
  ["Python Documentation", "Programming", "https://docs.python.org/3/"],
  ["Kaggle Learn", "Data Science", "https://www.kaggle.com/learn"],
  ["Google ML Crash Course", "AI and ML", "https://developers.google.com/machine-learning/crash-course"],
  ["Microsoft Learn", "Cloud", "https://learn.microsoft.com/training/"],
  ["AWS Skill Builder", "Cloud", "https://skillbuilder.aws/"],
  ["Docker Documentation", "Cloud", "https://docs.docker.com/"],
  ["Figma Learn", "Design", "https://help.figma.com/"],
  ["Nielsen Norman Group", "Design", "https://www.nngroup.com/articles/"],
  ["OWASP", "Cybersecurity", "https://owasp.org/"],
  ["TryHackMe", "Cybersecurity", "https://tryhackme.com/"],
  ["LeetCode", "Interview Preparation", "https://leetcode.com/"],
  ["HackerRank", "Interview Preparation", "https://www.hackerrank.com/"]
];

function renderResources() {
  const search = $("resourceSearch").value.toLowerCase();
  const category = $("resourceCategory").value;

  const filtered = resources.filter(resource =>
    resource[0].toLowerCase().includes(search) &&
    (category === "all" || resource[1] === category)
  );

  $("resourceContainer").
