
"use strict";

/* NEXTSTEP - CORE APPLICATION */

const $ = id => document.getElementById(id);

const ACCOUNT_KEY = "nextstep_demo_accounts";
const SESSION_KEY = "nextstep_demo_session";

let currentUser = null;
let authMode = "login";

const skills = [
  ["HTML & CSS","Technical","🌐","Learn website structure and styling.","https://developer.mozilla.org/en-US/docs/Learn_web_development"],
  ["JavaScript","Technical","⚡","Learn programming and interactive websites.","https://javascript.info/"],
  ["Python","Technical","🐍","Learn Python programming fundamentals.","https://docs.python.org/3/tutorial/"],
  ["SQL","Technical","🗄️","Learn database queries and management.","https://sqlbolt.com/"],
  ["Communication","Professional","🗣️","Improve professional communication.","https://www.toastmasters.org/"],
  ["Problem Solving","Analytical","🧩","Develop logical thinking skills.","https://www.hackerrank.com/domains/algorithms"],
  ["Data Analysis","Analytical","📊","Learn data analysis and visualization.","https://www.kaggle.com/learn"],
  ["UI/UX Design","Creative","🎨","Learn interface design and prototyping.","https://help.figma.com/"],
  ["Git & GitHub","Technical","🐙","Learn version control.","https://docs.github.com/en/get-started"],
  ["Critical Thinking","Analytical","💡","Develop better decision-making.","https://www.coursera.org/"],
  ["Teamwork","Professional","🤝","Improve collaboration.","https://www.atlassian.com/team-playbook"],
  ["Presentation Skills","Professional","🎤","Improve presentation confidence.","https://www.toastmasters.org/"]
];

const careers = [
  ["Frontend Developer","Technology","💻","Build interactive websites.","HTML, CSS, JavaScript","https://roadmap.sh/frontend"],
  ["Data Analyst","Technology","📊","Turn data into useful insights.","Python, SQL, Excel","https://roadmap.sh/data-analyst"],
  ["Cybersecurity Analyst","Technology","🛡️","Help protect digital systems.","Networking, Linux, Security","https://roadmap.sh/cyber-security"],
  ["Cloud Engineer","Technology","☁️","Work with cloud infrastructure.","Linux, Networking, AWS","https://roadmap.sh/devops"],
  ["UI/UX Designer","Creative","🎨","Design useful digital experiences.","Figma, Research, Design","https://help.figma.com/"],
  ["Digital Marketer","Business","📱","Help businesses reach audiences.","SEO, Content, Analytics","https://skillshop.withgoogle.com/"],
  ["Financial Analyst","Business","💹","Analyze financial information.","Excel, Accounting, Analysis","https://www.coursera.org/"],
  ["Research Scientist","Science","🔬","Explore questions through research.","Research, Statistics","https://www.khanacademy.org/"],
  ["Public Administration","Public Service","🏛️","Contribute to public services.","Communication, Governance","https://www.india.gov.in/"]
];

const roadmaps = [
  ["Web Development","🌐","12 weeks","Learn HTML, CSS, JavaScript and modern web development.","https://roadmap.sh/frontend"],
  ["Python Developer","🐍","10 weeks","Learn Python fundamentals and practical applications.","https://roadmap.sh/python"],
  ["Data Analytics","📊","10 weeks","Develop data preparation and visualization skills.","https://roadmap.sh/data-analyst"],
  ["Cybersecurity","🛡️","12 weeks","Explore networks, operating systems and security.","https://roadmap.sh/cyber-security"],
  ["UI/UX Design","🎨","8 weeks","Learn design principles and prototyping.","https://www.figma.com/resource-library/"]
];

const resources = [
  ["MDN Web Docs","Programming","🌐","Web development tutorials and documentation.","https://developer.mozilla.org/"],
  ["freeCodeCamp","Programming","💻","Free interactive coding lessons.","https://www.freecodecamp.org/learn/"],
  ["Python Documentation","Programming","🐍","Official Python tutorials.","https://docs.python.org/3/tutorial/"],
  ["Kaggle Learn","Data","📊","Practical data science courses.","https://www.kaggle.com/learn"],
  ["AWS Skill Builder","Cloud","☁️","Cloud computing training.","https://skillbuilder.aws/"],
  ["Figma Learn","Design","🎨","Design and prototyping guides.","https://help.figma.com/"],
  ["OWASP","Security","🛡️","Web application security resources.","https://owasp.org/"],
  ["GitHub Docs","Programming","🐙","Learn GitHub and version control.","https://docs.github.com/"],
  ["Khan Academy","General","📚","Free educational lessons.","https://www.khanacademy.org/"],
  ["NPTEL","General","🎓","Courses from Indian institutions.","https://nptel.ac.in/"],
  ["Google Skillshop","General","🔎","Professional digital skills training.","https://skillshop.withgoogle.com/"],
  ["roadmap.sh","Programming","🗺️","Visual learning roadmaps.","https://roadmap.sh/"]
];

/* STORAGE */

function getAccounts() {
  try {
    const data = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function saveAccounts(data) {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
}

function storageKey() {
  return "nextstep_profile_" + currentUser.email;
}

function getData() {
  try {
    return {
      name: currentUser.name,
      college: "",
      branch: "",
      year: "",
      skills: [],
      projects: [],
      saved: [],
      goal: 5,
      ...(JSON.parse(localStorage.getItem(storageKey()) || "{}"))
    };
  } catch {
    return {
      name: currentUser.name,
      college: "",
      branch: "",
      year: "",
      skills: [],
      projects: [],
      saved: [],
      goal: 5
    };
  }
}

function saveData(data) {
  localStorage.setItem(storageKey(), JSON.stringify(data));
}

function updateData(changes) {
  const data = getData();
  Object.assign(data, changes);
  saveData(data);
  return data;
}

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[char]);
}

function notify(message) {
  const box = $("toast");
  if (!box) return;
  box.textContent = message;
  box.classList.add("show");
  setTimeout(() => box.classList.remove("show"), 2500);
}

/* LOGIN AND REGISTRATION */

function setAuthMode(mode) {
  authMode = mode;
  $("authTitle").innerHTML = mode === "login"
    ? 'Welcome back<span>.</span>'
    : 'Create your account<span>.</span>';

  $("authSubtitle").textContent = mode === "login"
    ? "Sign in to continue your journey."
    : "Start building your future with NextStep.";

  $("nameField").classList.toggle("hidden", mode === "login");
  $("authName").required = mode === "register";

  $("authSubmit").innerHTML = mode === "login"
    ? 'Sign In <span>→</span>'
    : 'Create Account <span>→</span>';

  $("switchText").textContent = mode === "login"
    ? "New to NextStep?"
    : "Already have an account?";

  $("switchAuth").textContent = mode === "login"
    ? "Create account"
    : "Sign in";

  $("authMessage").textContent = "";
}

$("switchAuth").addEventListener("click", () => {
  setAuthMode(authMode === "login" ? "register" : "login");
});

$("authForm").addEventListener("submit", event => {
  event.preventDefault();

  const email = $("authEmail").value.trim().toLowerCase();
  const password = $("authPassword").value;
  const name = $("authName").value.trim();

  if (!email || !password) return;

  const accounts = getAccounts();

  if (authMode === "register") {
    if (!name) {
      $("authMessage").textContent = "Please enter your name.";
      return;
    }

    if (password.length < 6) {
      $("authMessage").textContent = "Password must have at least 6 characters.";
      return;
    }

    if (accounts[email]) {
      $("authMessage").textContent = "This email is already registered. Please sign in.";
      return;
    }

    accounts[email] = { name: name, password: password };
    saveAccounts(accounts);

    currentUser = { email: email, name: name };
    localStorage.setItem(SESSION_KEY, email);
    openApp();
    notify("Welcome to NextStep!");
    return;
  }

  const account = accounts[email];

  if (!account || account.password !== password) {
    $("authMessage").textContent = "Incorrect email or password.";
    return;
  }

  currentUser = { email: email, name: account.name };
  localStorage.setItem(SESSION_KEY, email);
  openApp();
  notify("Welcome back!");
});

/* APPLICATION */

function openApp() {
  $("authScreen").classList.add("hidden");
  $("appScreen").classList.remove("hidden");
  renderAll();
  navigate("dashboard");
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  currentUser = null;
  $("appScreen").classList.add("hidden");
  $("authScreen").classList.remove("hidden");
  $("authForm").reset();
  setAuthMode("login");
}

$("logoutBtn").addEventListener("click", logout);

/* USER PROFILE */

function renderUser() {
  const data = getData();
  const name = data.name || "Student";
  const initial = name.charAt(0).toUpperCase();

  $("welcomeName").textContent = name.split(" ")[0];
  $("sidebarName").textContent = name;
  $("topName").textContent = name.split(" ")[0];

  $("sidebarAvatar").textContent = initial;
  $("topAvatar").textContent = initial;
  $("profileAvatar").textContent = initial;

  $("profileDisplayName").textContent = name;
  $("profileDisplayEmail").textContent = currentUser.email;

  $("profileName").value = name;
  $("profileCollege").value = data.college || "";
  $("profileBranch").value = data.branch || "";
  $("profileYear").value = data.year || "";
  $("weeklyGoal").value = String(data.goal || 5);
}

$("profileForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("profileName").value.trim();
  if (!name) return;

  const accounts = getAccounts();
  accounts[currentUser.email].name = name;
  saveAccounts(accounts);

  currentUser.name = name;

  updateData({
    name,
    college: $("profileCollege").value.trim(),
    branch: $("profileBranch").value.trim(),
    year: $("profileYear").value
  });

  renderUser();
  notify("Profile saved!");
});

/* NAVIGATION */

function navigate(page) {
  const target = $(page);
  if (!target || !target.classList.contains("page")) return;

  document.querySelectorAll(".page").forEach(item => item.classList.remove("active"));
  target.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  $("pageName").textContent = target.querySelector("h1")?.textContent || "Dashboard";
  $("sidebar").classList.remove("open");
  window.scrollTo(0, 0);
}

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-page]");
  if (nav) {
    event.preventDefault();
    navigate(nav.dataset.page);
  }

  const go = event.target.closest("[data-go]");
  if (go) navigate(go.dataset.go);
});

$("menuToggle").addEventListener("click", () => {
  $("sidebar").classList.toggle("open");
});

$("topProfile").addEventListener("click", () => navigate("profile"));
$("sidebarProfile").addEventListener("click", () => navigate("profile"));

/* THEME */

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("nextstep_theme", dark ? "dark" : "light");
  $("themeToggle").textContent = dark ? "☀" : "☾";
  $("settingsTheme").textContent = dark ? "Switch to light ☀" : "Switch to dark ☾";
}

function toggleTheme() {
  setTheme(!document.body.classList.contains("dark"));
}

$("themeToggle").addEventListener("click", toggleTheme);
$("settingsTheme").addEventListener("click", toggleTheme);

/* DASHBOARD */

function renderDashboard() {
  const data = getData();
  const count = data.skills.length;
  const percent = Math.round(count / skills.length * 100);
  const goal = Number(data.goal) || 5;

  $("skillCount").textContent = count;
  $("progressPercent").textContent = percent + "%";
  $("circlePercent").textContent = percent + "%";
  $("projectCount").textContent = data.projects.length;
  $("savedCount").textContent = data.saved.length;

  $("progressCircle").style.background =
    `conic-gradient(var(--primary) ${percent}%, var(--surface-2) ${percent}%)`;

  $("progressMessage").textContent = count
    ? "You're making progress!"
    : "Your journey begins here!";

  $("goalDone").textContent = Math.min(count, goal);
  $("goalTarget").textContent = goal;
  $("goalBar").style.width = Math.min(count / goal * 100, 100) + "%";
}

/* SKILLS */

function renderSkills() {
  const search = $("skillSearch").value.toLowerCase();
  const category = $("skillCategory").value;
  const completed = getData().skills;

  const list = skills.filter(item =>
    (category === "all" || item[1] === category) &&
    item.join(" ").toLowerCase().includes(search)
  );

  $("skillGrid").innerHTML = list.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon blue">${item[2]}</div>
      <h3>${safe(item[0])}</h3>
      <div class="card-meta">${safe(item[1])}</div>
      <p>${safe(item[3])}</p>
      <a class="btn btn-outline" href="${item[4]}" target="_blank" rel="noopener">Start learning ↗</a>
      <button class="btn btn-primary skill-toggle" data-skill="${safe(item[0])}">
        ${completed.includes(item[0]) ? "✓ Completed" : "Mark completed"}
      </button>
    </article>
  `).join("") || '<div class="empty-state">No skills found.</div>';
}

$("skillGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-skill]");
  if (!button) return;

  const data = getData();
  const name = button.dataset.skill;

  data.skills = data.skills.includes(name)
    ? data.skills.filter(item => item !== name)
    : [...data.skills, name];

  saveData(data);
  renderAll();
  notify("Learning progress updated!");
});

$("skillSearch").addEventListener("input", renderSkills);
$("skillCategory").addEventListener("change", renderSkills);

/* CAREERS */

function renderCareers() {
  const search = $("careerSearch").value.toLowerCase();
  const category = $("careerCategory").value;

  const list = careers.filter(item =>
    (category === "all" || item[1] === category) &&
    item.join(" ").toLowerCase().includes(search)
  );

  $("careerGrid").innerHTML = list.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon purple">${item[2]}</div>
      <div class="card-meta">${safe(item[1])}</div>
      <h3>${safe(item[0])}</h3>
      <p>${safe(item[3])}</p>
      <p><strong>Useful skills:</strong> ${safe(item[4])}</p>
      <button class="btn btn-primary" data-career="${safe(item[0])}">Choose career →</button>
      <a class="text-btn" href="${item[5]}" target="_blank" rel="noopener">Explore resources ↗</a>
    </article>
  `).join("") || '<div class="empty-state">No careers found.</div>';
}

$("careerGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-career]");
  if (!button) return;

  updateData({ career: button.dataset.career });
  notify("Career choice saved!");
});

$("careerSearch").addEventListener("input", renderCareers);
$("careerCategory").addEventListener("change", renderCareers);

/* ROADMAPS */

function renderRoadmaps() {
  $("roadmapGrid").innerHTML = roadmaps.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon blue">${item[1]}</div>
      <div class="card-meta">${safe(item[2])}</div>
      <h3>${safe(item[0])}</h3>
      <p>${safe(item[3])}</p>
      <a class="btn btn-primary" href="${item[4]}" target="_blank" rel="noopener">Explore roadmap ↗</a>
    </article>
  `).join("");
}

/* PROJECTS */

$("addProjectBtn").addEventListener("click", () => {
  $("projectForm").classList.remove("hidden");
  $("projectTitle").focus();
});

$("cancelProject").addEventListener("click", () => {
  $("projectForm").classList.add("hidden");
  $("newProjectForm").reset();
});

$("newProjectForm").addEventListener("submit", event => {
  event.preventDefault();

  const title = $("projectTitle").value.trim();
  const description = $("projectDescription").value.trim();
  const link = $("projectLink").value.trim();

  if (!title || !description) return;

  if (link) {
    try {
      const url = new URL(link);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      notify("Please enter a valid project URL.");
      return;
    }
  }

  const data = getData();
  data.projects.push({
    id: Date.now().toString(),
    title,
    description,
    tech: $("projectTech").value.trim(),
    link
  });

  saveData(data);
  $("newProjectForm").reset();
  $("projectForm").classList.add("hidden");
  renderAll();
  notify("Project added!");
});

function renderProjects() {
  const list = getData().projects;

  $("projectGrid").innerHTML = list.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon orange">▣</div>
      <h3>${safe(item.title)}</h3>
      <div class="card-meta">${safe(item.tech || "Personal project")}</div>
      <p>${safe(item.description)}</p>
      ${item.link ? `<a class="text-btn" href="${safe(item.link)}" target="_blank" rel="noopener">View project ↗</a>` : ""}
      <button class="btn btn-outline" data-delete-project="${safe(item.id)}">Delete project</button>
    </article>
  `).join("") || '<div class="empty-state">Add your first project to get started!</div>';
}

$("projectGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-delete-project]");
  if (!button || !confirm("Delete this project?")) return;

  const data = getData();
  data.projects = data.projects.filter(item => item.id !== button.dataset.deleteProject);
  saveData(data);
  renderAll();
  notify("Project deleted.");
});

/* RESOURCES */

function renderResources() {
  const search = $("resourceSearch").value.toLowerCase();
  const category = $("resourceCategory").value;
  const saved = getData().saved;

  const list = resources.filter(item =>
    (category === "all" || item[1] === category) &&
    item.join(" ").toLowerCase().includes(search)
  );

  $("resourceGrid").innerHTML = list.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon green">${item[2]}</div>
      <div class="card-meta">${safe(item[1])}</div>
      <h3>${safe(item[0])}</h3>
      <p>${safe(item[3])}</p>
      <a class="btn btn-primary" href="${item[4]}" target="_blank" rel="noopener">Visit resource ↗</a>
      <button class="btn btn-outline" data-save-resource="${safe(item[0])}">
        ${saved.includes(item[0]) ? "★ Saved" : "☆ Save resource"}
      </button>
    </article>
  `).join("") || '<div class="empty-state">No resources found.</div>';
}

$("resourceGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-save-resource]");
  if (!button) return;

  const data = getData();
  const name = button.dataset.saveResource;

  data.saved = data.saved.includes(name)
    ? data.saved.filter(item => item !== name)
    : [...data.saved, name];

  saveData(data);
  renderAll();
  notify("Saved resources updated!");
});

$("resourceSearch").addEventListener("input", renderResources);
$("resourceCategory").addEventListener("change", renderResources);

/* ACHIEVEMENTS */

function renderAchievements() {
  const data = getData();

  const items = [
    ["🌱","First steps","Complete one skill.",data.skills.length >= 1],
    ["⭐","Skill builder","Complete five skills.",data.skills.length >= 5],
    ["🛠️","Project creator","Add a project.",data.projects.length >= 1],
    ["📚","Knowledge seeker","Save a resource.",data.saved.length >= 1]
  ];

  $("achievementGrid").innerHTML = items.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon ${item[3] ? "green" : "blue"}">${item[0]}</div>
      <h3>${item[1]}</h3>
      <p>${item[2]}</p>
      <div class="card-meta">${item[3] ? "✓ Unlocked" : "Not unlocked yet"}</div>
    </article>
  `).join("");
}

/* SETTINGS */

$("weeklyGoal").addEventListener("change", event => {
  updateData({ goal: Number(event.target.value) });
  renderDashboard();
  notify("Weekly goal saved!");
});

/* RENDER ALL */

function renderAll() {
  renderUser();
  renderDashboard();
  renderSkills();
  renderCareers();
  renderRoadmaps();
  renderProjects();
  renderResources();
  renderAchievements();
}

/* STARTUP */

function startApp() {
  const theme = localStorage.getItem("nextstep_theme");
  setTheme(theme === "dark");

  const email = localStorage.getItem(SESSION_KEY);
  const accounts = getAccounts();

  if (email && accounts[email]) {
    currentUser = { email, name: accounts[email].name };
    openApp();
  } else {
    localStorage.removeItem(SESSION_KEY);
    setAuthMode("login");
  }
}

startApp();
