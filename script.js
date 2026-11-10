
/* =========================================
   NEXTSTEP 2.0 - COMPLETE APPLICATION
========================================= */

const careers = {
    developer: {
        name: "Software Developer",
        icon: "💻",
        category: "development",
        description: "Design, develop and maintain websites, applications and software systems.",
        roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
        skills: {
            Beginner: ["HTML", "CSS", "JavaScript"],
            Intermediate: ["Git and GitHub", "React", "SQL"],
            Advanced: ["Node.js", "System Design", "API Development"]
        },
        projects: [
            "Personal Portfolio Website",
            "Student Management System",
            "Online Quiz Application"
        ],
        resources: ["MDN Web Docs", "freeCodeCamp", "JavaScript.info"]
    },

    analyst: {
        name: "Data Analyst",
        icon: "📊",
        category: "data",
        description: "Transform raw data into useful information through analysis and visualization.",
        roles: ["Data Analyst", "Business Analyst", "BI Analyst"],
        skills: {
            Beginner: ["Excel", "Statistics", "SQL Basics"],
            Intermediate: ["Python", "Power BI", "Data Visualization"],
            Advanced: ["Advanced SQL", "Predictive Analytics", "AI Tools"]
        },
        projects: [
            "Student Performance Analysis",
            "Sales Analytics Dashboard",
            "Movie Data Analysis"
        ],
        resources: ["Kaggle", "Microsoft Learn", "Python.org"]
    },

    designer: {
        name: "UI/UX Designer",
        icon: "🎨",
        category: "design",
        description: "Create attractive, accessible and user-friendly digital experiences.",
        roles: ["UI Designer", "UX Designer", "Product Designer"],
        skills: {
            Beginner: ["Design Principles", "Color Theory", "Typography"],
            Intermediate: ["Figma", "Wireframing", "Prototyping"],
            Advanced: ["User Research", "Design Systems", "Usability Testing"]
        },
        projects: [
            "Mobile App Design",
            "Food Delivery App UI",
            "College Website Design"
        ],
        resources: ["Figma Learn", "Nielsen Norman Group", "Google UX Design"]
    },

    ai: {
        name: "AI / ML Engineer",
        icon: "🤖",
        category: "data",
        description: "Build intelligent systems using machine learning and artificial intelligence.",
        roles: ["AI Engineer", "ML Engineer", "AI Developer"],
        skills: {
            Beginner: ["Python", "Mathematics", "Statistics"],
            Intermediate: ["NumPy", "Pandas", "Machine Learning"],
            Advanced: ["Deep Learning", "Neural Networks", "Generative AI"]
        },
        projects: [
            "Spam Detection System",
            "Student Result Predictor",
            "AI Chatbot"
        ],
        resources: ["Google ML Crash Course", "Kaggle", "PyTorch"]
    },

    cyber: {
        name: "Cybersecurity Analyst",
        icon: "🔐",
        category: "security",
        description: "Help protect networks, applications and information from security threats.",
        roles: ["Security Analyst", "SOC Analyst", "Security Engineer"],
        skills: {
            Beginner: ["Networking", "Linux Basics", "Security Fundamentals"],
            Intermediate: ["Python", "Network Security", "Security Monitoring"],
            Advanced: ["Threat Analysis", "Incident Response", "Security Auditing"]
        },
        projects: [
            "Password Strength Checker",
            "Phishing Awareness Website",
            "Security Monitoring Dashboard"
        ],
        resources: ["Cisco Networking Academy", "TryHackMe", "OWASP"]
    },

    cloud: {
        name: "Cloud Engineer",
        icon: "☁️",
        category: "security",
        description: "Build, deploy and manage applications and infrastructure using cloud platforms.",
        roles: ["Cloud Engineer", "DevOps Engineer", "Cloud Administrator"],
        skills: {
            Beginner: ["Networking", "Linux", "Cloud Fundamentals"],
            Intermediate: ["AWS Basics", "Docker", "Git"],
            Advanced: ["Kubernetes", "Cloud Security", "CI/CD"]
        },
        projects: [
            "Cloud File Storage Concept",
            "Website Deployment",
            "Cloud Monitoring Dashboard"
        ],
        resources: ["AWS Training", "Microsoft Learn", "Docker Docs"]
    }
};

/* =========================================
   LEARNING RESOURCE DATABASE
========================================= */

const resources = [
    {
        name: "MDN Web Docs",
        category: "web",
        icon: "🌐",
        description: "Official guides and tutorials for HTML, CSS and JavaScript.",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
        level: "All levels"
    },
    {
        name: "freeCodeCamp",
        category: "web",
        icon: "💻",
        description: "Free coding lessons and hands-on programming projects.",
        url: "https://www.freecodecamp.org/learn/",
        level: "Beginner"
    },
    {
        name: "JavaScript.info",
        category: "web",
        icon: "📘",
        description: "Detailed JavaScript tutorials from fundamentals to advanced topics.",
        url: "https://javascript.info/",
        level: "All levels"
    },
    {
        name: "roadmap.sh",
        category: "general",
        icon: "🗺️",
        description: "Visual roadmaps for technology careers and learning paths.",
        url: "https://roadmap.sh/",
        level: "All levels"
    },
    {
        name: "GitHub Skills",
        category: "programming",
        icon: "🐙",
        description: "Interactive lessons to learn GitHub and development workflows.",
        url: "https://skills.github.com/",
        level: "Beginner"
    },
    {
        name: "Python Official Tutorial",
        category: "programming",
        icon: "🐍",
        description: "Official Python programming language tutorial.",
        url: "https://docs.python.org/3/tutorial/",
        level: "Beginner"
    },
    {
        name: "Kaggle Learn",
        category: "data",
        icon: "📊",
        description: "Practical courses in Python, SQL, machine learning and data analysis.",
        url: "https://www.kaggle.com/learn",
        level: "Beginner"
    },
    {
        name: "Google ML Crash Course",
        category: "data",
        icon: "🤖",
        description: "Machine learning lessons and practical exercises.",
        url: "https://developers.google.com/machine-learning/crash-course",
        level: "Intermediate"
    },
    {
        name: "Microsoft Learn",
        category: "cloud",
        icon: "☁️",
        description: "Technical learning paths for cloud, AI and Microsoft technologies.",
        url: "https://learn.microsoft.com/training/",
        level: "All levels"
    },
    {
        name: "AWS Skill Builder",
        category: "cloud",
        icon: "🔶",
        description: "Cloud computing and AWS training resources.",
        url: "https://skillbuilder.aws/",
        level: "All levels"
    },
    {
        name: "Docker Documentation",
        category: "cloud",
        icon: "🐳",
        description: "Official documentation and tutorials for Docker.",
        url: "https://docs.docker.com/get-started/",
        level: "Intermediate"
    },
    {
        name: "Figma Learn",
        category: "design",
        icon: "🎨",
        description: "Design tutorials and resources for Figma users.",
        url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design",
        level: "Beginner"
    },
    {
        name: "Nielsen Norman Group",
        category: "design",
        icon: "🖌️",
        description: "Research and articles about user experience and usability.",
        url: "https://www.nngroup.com/articles/",
        level: "All levels"
    },
    {
        name: "OWASP",
        category: "general",
        icon: "🔐",
        description: "Application security guidance and security best practices.",
        url: "https://owasp.org/",
        level: "Intermediate"
    },
    {
        name: "TryHackMe",
        category: "general",
        icon: "🛡️",
        description: "Interactive cybersecurity learning and practice labs.",
        url: "https://tryhackme.com/",
        level: "Beginner"
    },
    {
        name: "LeetCode",
        category: "programming",
        icon: "🧩",
        description: "Programming challenges and technical interview practice.",
        url: "https://leetcode.com/problemset/",
        level: "All levels"
    },
    {
        name: "HackerRank",
        category: "programming",
        icon: "💡",
        description: "Coding challenges and technical skill assessments.",
        url: "https://www.hackerrank.com/domains",
        level: "All levels"
    }
];

/* =========================================
   INTERVIEW QUESTION DATABASE
========================================= */

const interviewQuestions = [
    {
        category: "web",
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language. It defines the structure and content of web pages."
    },
    {
        category: "web",
        question: "What is CSS?",
        answer: "CSS stands for Cascading Style Sheets. It controls the appearance, layout and design of web pages."
    },
    {
        category: "web",
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to add dynamic behavior and interactivity to websites."
    },
    {
        category: "programming",
        question: "What is a variable?",
        answer: "A variable is a named storage location used to hold a value in a program."
    },
    {
        category: "programming",
        question: "What is object-oriented programming?",
        answer: "OOP is a programming approach based on objects and concepts such as encapsulation, inheritance, polymorphism and abstraction."
    },
    {
        category: "programming",
        question: "What is an algorithm?",
        answer: "An algorithm is a finite sequence of well-defined steps used to solve a problem."
    },
    {
        category: "database",
        question: "What is SQL?",
        answer: "SQL stands for Structured Query Language. It is used to manage and retrieve data from relational databases."
    },
    {
        category: "database",
        question: "What is a primary key?",
        answer: "A primary key uniquely identifies each record in a database table."
    },
    {
        category: "database",
        question: "What is a foreign key?",
        answer: "A foreign key is a column or set of columns that refers to a key in another table and establishes a relationship."
    },
    {
        category: "ai",
        question: "What is Artificial Intelligence?",
        answer: "AI is a field of computing that develops systems capable of performing tasks that typically require human intelligence."
    },
    {
        category: "ai",
        question: "What is Machine Learning?",
        answer: "Machine Learning is a branch of AI that allows systems to learn patterns from data and make predictions."
    }
];

/* =========================================
   APTITUDE QUESTIONS
========================================= */

const aptitudeQuestions = [
    {
        category: "Mathematics",
        question: "What is 20% of 200?",
        options: ["20", "30", "40", "50"],
        answer: 2,
        explanation: "20% of 200 = (20 / 100) × 200 = 40."
    },
    {
        category: "Number Series",
        question: "Find the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "12", "14"],
        answer: 1,
        explanation: "Each number increases by 2. Therefore, the next number is 10."
    },
    {
        category: "Mathematics",
        question: "Five pens cost ₹50. What is the cost of one pen?",
        options: ["₹5", "₹10", "₹15", "₹20"],
        answer: 1,
        explanation: "₹50 divided by 5 pens = ₹10 per pen."
    },
    {
        category: "Logical Reasoning",
        question: "Which is the odd one out?",
        options: ["Apple", "Mango", "Carrot", "Banana"],
        answer: 2,
        explanation: "Carrot is a vegetable, while the other options are fruits."
    },
    {
        category: "Speed and Distance",
        question: "A person travels 60 km in 2 hours. What is the speed?",
        options: ["20 km/h", "25 km/h", "30 km/h", "40 km/h"],
        answer: 2,
        explanation: "Speed = Distance / Time = 60 / 2 = 30 km/h."
    },
    {
        category: "Number Series",
        question: "Find the next number: 3, 6, 12, 24, ?",
        options: ["30", "36", "42", "48"],
        answer: 3,
        explanation: "Each number is multiplied by 2. Therefore, 24 × 2 = 48."
    },
    {
        category: "Mathematics",
        question: "What is the average of 10, 20 and 30?",
        options: ["15", "20", "25", "30"],
        answer: 1,
        explanation: "Average = (10 + 20 + 30) / 3 = 20."
    }
];

/* =========================================
   SAVED STUDENT DATA
========================================= */

function loadData(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch {
        return fallback;
    }
}

let selectedCareer = localStorage.getItem("nsCareer") || "";

let completedSkills = loadData("nsSkills", {});
let exploredCareers = loadData("nsExplored", []);
let completedProjects = loadData("nsCompletedProjects", []);
let viewedProjects = loadData("nsViewedProjects", []);
let activityHistory = loadData("nsActivity", []);
let quizHistory = loadData("nsQuizHistory", []);
let currentQuizAnswers = {};
let quizSubmitted = false;

function saveData() {
    localStorage.setItem("nsCareer", selectedCareer);
    localStorage.setItem("nsSkills", JSON.stringify(completedSkills));
    localStorage.setItem("nsExplored", JSON.stringify(exploredCareers));
    localStorage.setItem("nsCompletedProjects", JSON.stringify(completedProjects));
    localStorage.setItem("nsViewedProjects", JSON.stringify(viewedProjects));
    localStorage.setItem("nsActivity", JSON.stringify(activityHistory));
    localStorage.setItem("nsQuizHistory", JSON.stringify(quizHistory));
}

function recordActivity(message, icon = "✓") {
    activityHistory.unshift({
        message,
        icon,
        date: new Date().toLocaleDateString()
    });

    activityHistory = activityHistory.slice(0, 8);
    saveData();
    renderActivity();
}

/* =========================================
   HELPER FUNCTIONS
========================================= */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function getAllSkills(career) {
    return Object.values(career.skills).flat();
}

function getCompletedForCareer(key) {
    return completedSkills[key] || [];
}

function getTotalStats() {
    let total = 0;
    let completed = 0;

    Object.entries(careers).forEach(([key, career]) => {
        total += getAllSkills(career).length;
        completed += getCompletedForCareer(key).length;
    });

    return {
        total,
        completed,
        percentage: total ? Math.round(completed / total * 100) : 0
    };
}

/* =========================================
   PAGE NAVIGATION
========================================= */

function navigateTo(pageName) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageName
        );
    });

    const target = document.getElementById(pageName);

    if (!target) return;

    target.classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        careers: "Explore Careers",
        roadmap: "Learning Roadmap",
        projects: "Project Studio",
        placement: "Placement Center",
        resources: "Resource Library"
    };

    document.getElementById("pageTitle").textContent =
        titles[pageName] || "NextStep";

    document.getElementById("sidebar").classList.remove("open");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
        navigateTo(button.dataset.page);
    });
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        navigateTo(button.dataset.go);
    });
});

document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
});

/* =========================================
   CAREER EXPLORER
========================================= */

function renderCareers() {
    const container = document.getElementById("careerContainer");
    const search = document.getElementById("careerSearch").value.toLowerCase();
    const filter = document.getElementById("careerFilter").value;

    const filtered = Object.entries(careers).filter(([key, career]) => {
        const matchesSearch =
            career.name.toLowerCase().includes(search) ||
            career.description.toLowerCase().includes(search);

        const matchesFilter =
            filter === "all" || career.category === filter;

        return matchesSearch && matchesFilter;
    });

    if (!filtered.length) {
        container.innerHTML = '<div class="empty-state">No matching career paths found.</div>';
        return;
    }

    container.innerHTML = filtered.map(([key, career]) => `
        <article class="career-card">
            <div class="career-icon">${career.icon}</div>
            <h3>${escapeHTML(career.name)}</h3>
            <p>${escapeHTML(career.description)}</p>

            <div class="career-meta">
                <span class="meta-tag">${Object.values(career.skills).flat().length} skills</span>
                <span class="meta-tag">${career.roles.length} job roles</span>
            </div>

            <button class="primary-btn" data-career="${key}">
                Explore Career →
            </button>
        </article>
    `).join("");

    container.querySelectorAll("[data-career]").forEach(button => {
        button.addEventListener("click", () => {
            selectCareer(button.dataset.career);
        });
    });
}

function selectCareer(key) {
    if (!careers[key]) return;

    selectedCareer = key;

    if (!exploredCareers.includes(key)) {
        exploredCareers.push(key);
        recordActivity("Explored " + careers[key].name, "◇");
    }

    saveData();

    document.getElementById("roadmapCareer").value = key;

    renderCareerDetail(key);
    renderRoadmap();
    renderProjects();
    updateDashboard();

    navigateTo("careers");
}

function renderCareerDetail(key) {
    const career = careers[key];
    const container = document.getElementById("careerDetail");

    container.innerHTML = `
        <p class="eyebrow">CAREER PROFILE</p>
        <h2>${career.icon} ${escapeHTML(career.name)}</h2>
        <p class="muted">${escapeHTML(career.description)}</p>

        <h3 style="margin-top:20px">Possible Job Roles</h3>
        <div class="career-meta">
            ${career.roles.map(role =>
                `<span class="meta-tag">${escapeHTML(role)}</span>`
            ).join("")}
        </div>

        <h3 style="margin-top:15px">Recommended Skills</h3>
        <p class="muted">${getAllSkills(career).map(escapeHTML).join(" · ")}</p>

        <button class="primary-btn" id="openRoadmap" style="margin-top:20px">
            Start Learning Roadmap →
