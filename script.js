
"use strict";

/* =========================================
   NEXTSTEP - STUDENT CAREER PORTAL
   Complete JavaScript functionality
========================================= */

const $ = (id) => document.getElementById(id);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE = {
  career: "nsCareer",
  skills: "nsSkills",
  explored: "nsExplored",
  projects: "nsCompletedProjects",
  viewed: "nsViewedProjects",
  activity: "nsActivity",
  quiz: "nsQuizHistory"
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

let selectedCareer = readStorage(STORAGE.career, "developer");
let completedSkills = readStorage(STORAGE.skills, []);
let exploredCareers = readStorage(STORAGE.explored, []);
let completedProjects = readStorage(STORAGE.projects, []);
let viewedProjects = readStorage(STORAGE.viewed, []);
let activities = readStorage(STORAGE.activity, []);
let quizHistory = readStorage(STORAGE.quiz, []);

function saveData() {
  localStorage.setItem(STORAGE.career, JSON.stringify(selectedCareer));
  localStorage.setItem(STORAGE.skills, JSON.stringify(completedSkills));
  localStorage.setItem(STORAGE.explored, JSON.stringify(exploredCareers));
  localStorage.setItem(STORAGE.projects, JSON.stringify(completedProjects));
  localStorage.setItem(STORAGE.viewed, JSON.stringify(viewedProjects));
  localStorage.setItem(STORAGE.activity, JSON.stringify(activities));
  localStorage.setItem(STORAGE.quiz, JSON.stringify(quizHistory));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function recordActivity(message) {
  activities.unshift({
    message,
    date: new Date().toLocaleDateString()
  });
  activities = activities.slice(0, 8);
  saveData();
  renderActivity();
}

/* =========================================
   CAREER DATA
========================================= */

const careers = {
  developer: {
    title: "Full Stack Developer",
    category: "development",
    icon: "💻",
    description: "Build modern websites and applications using frontend and backend technologies.",
    skills: [
      "HTML", "CSS", "JavaScript", "Git and GitHub",
      "React", "Node.js", "Express.js", "Databases", "REST APIs"
    ],
    projects: [
      "Personal Portfolio Website",
      "Student Management System",
      "E-commerce Website"
    ],
    resources: [
      ["HTML", "https://developer.mozilla.org/en-US/docs/Web/HTML"],
      ["CSS", "https://developer.mozilla.org/en-US/docs/Web/CSS"],
      ["JavaScript", "https://javascript.info/"],
      ["React", "https://react.dev/learn"],
      ["Node.js", "https://nodejs.org/en/learn"]
    ]
  },

  analyst: {
    title: "Data Analyst",
    category: "data",
    icon: "📊",
    description: "Use data to discover patterns, create reports and support business decisions.",
    skills: [
      "Excel", "SQL", "Python", "Statistics",
      "Data Cleaning", "Power BI", "Data Visualization",
      "Pandas", "Data Analysis"
    ],
    projects: [
      "Sales Data Analysis",
      "Student Performance Dashboard",
      "Customer Data Analysis"
    ],
    resources: [
      ["Excel", "https://support.microsoft.com/excel"],
      ["SQL", "https://www.w3schools.com/sql/"],
      ["Python", "https://docs.python.org/3/tutorial/"],
      ["Pandas", "https://pandas.pydata.org/docs/"],
      ["Power BI", "https://learn.microsoft.com/power-bi/"]
    ]
  },

  designer: {
    title: "UI/UX Designer",
    category: "design",
    icon: "🎨",
    description: "Design user-friendly digital experiences and attractive interfaces.",
    skills: [
      "Design Principles", "Color Theory", "Typography",
      "Wireframing", "Figma", "Prototyping",
      "User Research", "Responsive Design", "Usability Testing"
    ],
    projects: [
      "Mobile App Design",
      "E-commerce UI Design",
      "Student Dashboard Design"
    ],
    resources: [
      ["Figma", "https://help.figma.com/"],
      ["Design Basics", "https://www.interaction-design.org/"],
      ["UX Research", "https://www.nngroup.com/articles/"]
    ]
  },

  ai: {
    title: "AI / Machine Learning Engineer",
    category: "data",
    icon: "🤖",
    description: "Build intelligent systems using data, algorithms and machine learning.",
    skills: [
      "Python", "Mathematics", "Statistics", "NumPy",
      "Pandas", "Machine Learning", "Scikit-learn",
      "Deep Learning", "Model Evaluation"
    ],
    projects: [
      "House Price Prediction",
      "Movie Recommendation System",
      "Image Classification"
    ],
    resources: [
      ["Python", "https://docs.python.org/3/"],
      ["Google ML", "https://developers.google.com/machine-learning/crash-course"],
      ["Kaggle Learn", "https://www.kaggle.com/learn"],
      ["Scikit-learn", "https://scikit-learn.org/stable/"]
    ]
  },

  cyber: {
    title: "Cybersecurity Analyst",
    category: "security",
    icon: "🔐",
    description: "Help protect systems, networks and information from security threats.",
    skills: [
      "Networking", "Linux", "Python", "Cybersecurity Basics",
      "Web Security", "OWASP", "Security Monitoring",
      "Risk Assessment", "Incident Response"
    ],
    projects: [
      "Password Strength Checker",
      "Network Security Analysis",
      "Security Awareness Website"
    ],
    resources: [
      ["Cisco Networking", "https://skillsforall.com/"],
      ["Linux", "https://ubuntu.com/tutorials"],
      ["OWASP", "https://owasp.org/www-project-top-ten/"],
      ["TryHackMe", "https://tryhackme.com/"]
    ]
  },

  cloud: {
    title: "Cloud Engineer",
    category: "cloud",
    icon: "☁️",
    description: "Deploy, manage and maintain applications and infrastructure in the cloud.",
    skills: [
      "Linux", "Networking", "Python", "Cloud Basics",
      "AWS", "Azure", "Docker", "Git",
      "Deployment"
    ],
    projects: [
      "Cloud Hosted Portfolio",
      "Dockerized Web Application",
      "Cloud Storage Application"
    ],
    resources: [
      ["AWS Skill Builder", "https://skillbuilder.aws/"],
      ["Microsoft Learn", "https://learn.microsoft.com/training/"],
      ["Docker", "https://docs.docker.com/"],
      ["Linux", "https://ubuntu.com/tutorials"]
    ]
  }
};

/* =========================================
   NAVIGATION
========================================= */

function showPage(pageName) {
  const pages = $$(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const target = $(pageName);
  if (target) {
    target.classList.add("active");
  }

  $$(".nav-link").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageName
    );
  });

  const titles = {
    dashboard: "Dashboard",
    careers: "Explore Careers",
    roadmap: "Learning Roadmap",
    projects: "Project Studio",
    placement: "Placement Center",
    resources: "Resource Library"
  };

  if ($("pageTitle")) {
    $("pageTitle").textContent = titles[pageName] || "NextStep";
  }

  const sidebar = $("sidebar");
  if (sidebar) sidebar.classList.remove("open");

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (pageName === "dashboard") renderDashboard();
  if (pageName === "careers") renderCareers();
  if (pageName === "roadmap") renderRoadmap();
  if (pageName === "projects") renderProjects();
  if (pageName === "placement") renderPlacement();
  if (pageName === "resources") renderResources();
}

function setupNavigation() {
  $$(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  $$("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  if ($("menuToggle")) {
    $("menuToggle").addEventListener("click", () => {
      $("sidebar")?.classList.toggle("open");
    });
  }
}

/* =========================================
   CAREER EXPLORER
========================================= */

function renderCareers() {
  const container = $("careerContainer");
  if (!container) return;

  const search = ($("careerSearch")?.value || "").toLowerCase();
  const filter = $("careerFilter")?.value || "all";

  const entries = Object.entries(careers).filter(([id, career]) => {
    const matchesSearch =
      career.title.toLowerCase().includes(search) ||
      career.description.toLowerCase().includes(search);

    return matchesSearch &&
      (filter === "all" || career.category === filter);
  });

  container.innerHTML = entries.map(([id, career]) => `
    <article class="career-card">
      <div class="career-icon">${career.icon}</div>
      <h3>${escapeHTML(career.title)}</h3>
      <p>${escapeHTML(career.description)}</p>
      <p><strong>${career.skills.length} key skills</strong></p>
      <button class="btn btn-primary" data-career="${id}">
        Explore Career
      </button>
    </article>
  `).join("") || "<p>No careers found. Try another search.</p>";

  container.querySelectorAll("[data-career]").forEach(button => {
    button.addEventListener("click", () => {
      selectCareer(button.dataset.career);
    });
  });
}

function selectCareer(id) {
  if (!careers[id]) return;

  selectedCareer = id;

  if (!exploredCareers.includes(id)) {
    exploredCareers.push(id);
  }

  saveData();
  recordActivity("Explored " + careers[id].title);

  const career = careers[id];
  const detail = $("careerDetail");

  if (detail) {
    detail.innerHTML = `
      <h2>${career.icon} ${escapeHTML(career.title)}</h2>
      <p>${escapeHTML(career.description)}</p>
      <h3>Important Skills</h3>
      <ul>${career.skills.map(skill =>
        `<li>${escapeHTML(skill)}</li>`
      ).join("")}</ul>
      <h3>Recommended Projects</h3>
      <ul>${career.projects.map(project =>
        `<li>${escapeHTML(project)}</li>`
      ).join("")}</ul>
      <button class="btn btn-primary" id="startCareerRoadmap">
        Start Learning Roadmap
      </button>
    `;

    $("startCareerRoadmap")?.addEventListener("click", () => {
      showPage("roadmap");
    });
  }

  renderDashboard();
}

/* =========================================
   LEARNING ROADMAP
========================================= */

function getAllSkills() {
  return Object.values(careers).flatMap(c => c.skills);
}

function renderRoadmap() {
  const careerSelect = $("roadmapCareer");
  const container = $("roadmapContainer");

  if (!container) return;

  if (careerSelect) {
    if (!careerSelect.dataset.ready) {
      careerSelect.innerHTML = Object.entries(careers).map(([id, c]) =>
        `<option value="${id}">${escapeHTML(c.title)}</option>`
      ).join("");
      careerSelect.dataset.ready = "true";
    }

    careerSelect.value = selectedCareer;
  }

  const id = careerSelect?.value || selectedCareer;
  const career = careers[id] || careers.developer;

  container.innerHTML = career.skills.map((skill, index) => {
    const key = id + ":" + skill;
    const checked = completedSkills.includes(key);

    return `
      <div class="roadmap-item">
        <label>
          <input type="checkbox"
            data-skill="${escapeHTML(skill)}"
            ${checked ? "checked" : ""}>
          <span>${index + 1}. ${escapeHTML(skill)}</span>
        </label>
        <span>${checked ? "Completed ✓" : "Not completed"}</span>
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-skill]").forEach(input => {
    input.addEventListener("change", () => {
      const key = id + ":" + input.dataset.skill;

      if (input.checked && !completedSkills.includes(key)) {
        completedSkills.push(key);
        recordActivity("Completed skill: " + input.dataset.skill);
      } else {
        completedSkills = completedSkills.filter(s => s !== key);
        saveData();
      }

      renderRoadmap();
      renderDashboard();
    });
  });
}

/* =========================================
   PROJECT STUDIO
========================================= */

const projectIdeas = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    career: "developer",
    level: "Beginner",
    description: "Create a responsive personal website to showcase your skills and projects.",
    tools: "HTML, CSS, JavaScript"
  },
  {
    id: "student",
    title: "Student Management System",
    career: "developer",
    level: "Intermediate",
    description: "Build an application to manage student information and records.",
    tools: "JavaScript, React, Database"
  },
  {
    id: "sales",
    title: "Sales Data Analysis",
    career: "analyst",
    level: "Beginner",
    description: "Analyze sales data and identify important business trends.",
    tools: "Excel, SQL, Python"
  },
  {
    id: "dashboard",
    title: "Student Performance Dashboard",
    career: "analyst",
    level: "Intermediate",
    description: "Visualize academic performance using charts and reports.",
    tools: "Python, Power BI"
  },
  {
    id: "mobile",
    title: "Mobile App UI Design",
    career: "designer",
    level: "Beginner",
    description: "Design an attractive mobile application interface.",
    tools: "Figma, Design Principles"
  },
  {
    id: "ecommerce",
    title: "E-commerce UI Design",
    career: "designer",
    level: "Intermediate",
    description: "Design an online shopping experience with product pages.",
    tools: "Figma, Prototyping"
  },
  {
    id: "prediction",
    title: "House Price Prediction",
    career: "ai",
    level: "Intermediate",
    description: "Build a machine learning model to estimate house prices.",
    tools: "Python, Pandas, Scikit-learn"
  },
  {
    id: "recommendation",
    title: "Movie Recommendation System",
    career: "ai",
    level: "Advanced",
    description: "Create a recommendation system based on movie preferences.",
    tools: "Python, Machine Learning"
  },
  {
    id: "password",
    title: "Password Strength Checker",
    career: "cyber",
    level: "Beginner",
    description: "Create a tool that checks password strength and security.",
    tools: "HTML, CSS, JavaScript"
  },
  {
    id: "security",
    title: "Security Awareness Website",
    career: "cyber",
    level: "Intermediate",
    description: "Build an educational website about common security threats.",
    tools: "HTML, CSS, JavaScript"
  },
  {
    id: "cloudportfolio",
    title: "Cloud Hosted Portfolio",
    career: "cloud",
    level: "Beginner",
    description: "Deploy a portfolio website using a cloud hosting service.",
    tools: "HTML, Git, Cloud Hosting"
  },
  {
    id: "docker",
    title: "Dockerized Web Application",
    career: "cloud",
    level: "Advanced",
    description: "Package a web application using Docker.",
    tools: "Docker, Linux, Web Development"
  }
];

function renderProjects() {
  const container = $("projectContainer");
  if (!container) return;

  const career = $("projectCareer")?.value || "all";
  const level = $("projectLevel")?.value || "all";

  const filtered = projectIdeas.filter(project =>
    (career === "all" || project.career === career) &&
    (level === "all" || project.level === level)
  );

  container.innerHTML = filtered.map(project => `
    <article class="project-card">
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <p><strong>Level:</strong> ${project.level}</p>
      <p><strong>Tools:</strong> ${escapeHTML(project.tools)}</p>
      <button class="btn btn-primary"
        data-project="${project.id}">
        ${completedProjects.includes(project.id)
          ? "Completed ✓"
          : "Mark as Completed"}
      </button>
    </article>
  `).join("") || "<p>No projects match these filters.</p>";

  container.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.project;

      if (completedProjects.includes(id)) {
        completedProjects = completedProjects.filter(p => p !== id);
      } else {
        completedProjects.push(id);
        recordActivity("Completed project: " +
          projectIdeas.find(p => p.id === id).title);
      }

      saveData();
      renderProjects();
      renderDashboard();
    });
  });
}

/* =========================================
   RESOURCE LIBRARY
========================================= */

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
  const container = $("resourceContainer");
  if (!container) return;

  const search = ($("resourceSearch")?.value || "").toLowerCase();
  const category = $("resourceCategory")?.value || "all";

  const filtered = resources.filter(resource =>
    resource[0].toLowerCase().includes(search) &&
    (category === "all" || resource[1] === category)
  );

  container.innerHTML = filtered.map(resource => `
    <article class="resource-card">
      <h3>${escapeHTML(resource[0])}</h3>
      <p>${escapeHTML(resource[1])}</p>
      <a href="${resource[2]}" target="_blank"
         rel="noopener noreferrer">
        Visit Learning Resource ↗
      </a>
    </article>
  `).join("") || "<p>No resources found.</p>";
}

/* =========================================
   PLACEMENT CENTER - INTERVIEW PREPARATION
========================================= */

const interviewQuestions = {
  technical: [
    ["What is HTML?", "HTML is the standard markup language used to structure web pages."],
    ["What is CSS?", "CSS is used to style and design web pages."],
    ["What is JavaScript?", "JavaScript is a programming language used to create interactive web experiences."],
    ["What is a database?", "A database is an organized collection of information."],
    ["What is Git?", "Git is a version control system used to track changes in code."]
  ],
  hr: [
    ["Tell me about yourself.", "Introduce your education, technical skills, projects and career goals."],
    ["What are your strengths?", "Explain your strengths with a real example."],
    ["Why should we hire you?", "Connect your skills, learning attitude and project experience to the role."],
    ["Where do you see yourself in five years?", "Describe realistic professional growth and learning goals."],
    ["How do you handle challenges?", "Explain how you identify a problem, plan a solution and learn from it."]
  ],
  aptitude: [
    ["What is 20% of 250?", "50"],
    ["What is the average of 10, 20 and 30?", "20"],
    ["If a product costs ₹500 and has a 10% discount, what is its price?", "₹450"],
    ["What is the next number: 2, 4, 8, 16, ...?", "32"],
    ["A person travels 60 km in 2 hours.
