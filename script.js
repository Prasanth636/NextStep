
/* ==========================================
   NEXTSTEP - STUDENT CAREER PLATFORM
   Demo version using browser LocalStorage
========================================== */
alert("NextStep JavaScript is running!");
const $ = (id) => document.getElementById(id);
const DB_KEY = "nextstep_demo_accounts";
const SESSION_KEY = "nextstep_demo_session";

let currentUser = null;
let authMode = "login";
let toastTimer;

/* ---------- DEMO DATA ---------- */

const careers = [
  {name:"Frontend Developer",category:"Technology",icon:"💻",description:"Build responsive and interactive websites using modern web technologies.",skills:"HTML, CSS, JavaScript, React",url:"https://developer.mozilla.org/en-US/docs/Learn"},
  {name:"Data Analyst",category:"Technology",icon:"📊",description:"Turn data into useful insights using analysis and visualization.",skills:"Excel, SQL, Python, Statistics",url:"https://www.kaggle.com/learn"},
  {name:"Cybersecurity Analyst",category:"Technology",icon:"🛡️",description:"Help organizations identify security risks and protect digital systems.",skills:"Networking, Linux, Security",url:"https://owasp.org/"},
  {name:"Cloud Engineer",category:"Technology",icon:"☁️",description:"Work with cloud infrastructure, deployment and scalable systems.",skills:"Linux, Networking, AWS",url:"https://skillbuilder.aws/"},
  {name:"UI/UX Designer",category:"Creative",icon:"🎨",description:"Create intuitive digital experiences through research and design.",skills:"Figma, Design, Prototyping",url:"https://help.figma.com/"},
  {name:"Digital Marketer",category:"Business",icon:"📱",description:"Help businesses reach audiences through digital channels.",skills:"SEO, Content, Analytics",url:"https://skillshop.withgoogle.com/"},
  {name:"Financial Analyst",category:"Business",icon:"💹",description:"Analyze financial information to support business decisions.",skills:"Excel, Accounting, Analysis",url:"https://www.coursera.org/"},
  {name:"Research Scientist",category:"Science",icon:"🔬",description:"Investigate questions, conduct experiments and develop knowledge.",skills:"Research, Statistics, Communication",url:"https://www.khanacademy.org/"},
  {name:"Public Administration",category:"Public Service",icon:"🏛️",description:"Contribute to public services, policy and community development.",skills:"Communication, Governance, Analysis",url:"https://www.india.gov.in/"}
];

const skills = [
  {name:"HTML & CSS",category:"Technical",icon:"🌐",description:"Learn the foundations of building and styling websites.",level:"Beginner",url:"https://developer.mozilla.org/en-US/docs/Learn_web_development"},
  {name:"JavaScript",category:"Technical",icon:"⚡",description:"Understand programming fundamentals and interactive web applications.",level:"Beginner",url:"https://javascript.info/"},
  {name:"Python Programming",category:"Technical",icon:"🐍",description:"Build programming fundamentals with a versatile language.",level:"Beginner",url:"https://docs.python.org/3/tutorial/"},
  {name:"SQL & Databases",category:"Technical",icon:"🗄️",description:"Learn how to organize, query and manage data.",level:"Beginner",url:"https://sqlbolt.com/"},
  {name:"Communication",category:"Professional",icon:"🗣️",description:"Improve speaking, listening and professional communication.",level:"Essential",url:"https://www.toastmasters.org/"},
  {name:"Problem Solving",category:"Analytical",icon:"🧩",description:"Practice breaking down problems and developing logical solutions.",level:"Essential",url:"https://www.hackerrank.com/domains/algorithms"},
  {name:"Data Analysis",category:"Analytical",icon:"📈",description:"Explore data analysis concepts and practical exercises.",level:"Intermediate",url:"https://www.kaggle.com/learn"},
  {name:"UI/UX Design",category:"Creative",icon:"🎨",description:"Learn visual design, user research and prototyping.",level:"Beginner",url:"https://help.figma.com/"},
  {name:"Git & GitHub",category:"Technical",icon:"🔧",description:"Understand version control and collaborative development.",level:"Beginner",url:"https://docs.github.com/en/get-started"},
  {name:"Critical Thinking",category:"Analytical",icon:"💡",description:"Develop evidence-based thinking and decision-making.",level:"Essential",url:"https://www.coursera.org/"},
  {name:"Teamwork",category:"Professional",icon:"🤝",description:"Learn collaboration, accountability and team communication.",level:"Essential",url:"https://www.atlassian.com/team-playbook"},
  {name:"Presentation Skills",category:"Professional",icon:"🎤",description:"Present ideas clearly and confidently.",level:"Essential",url:"https://www.toastmasters.org/"}
];

const roadmaps = [
  {name:"Web Development",icon:"🌐",level:"Beginner to Advanced",duration:"12 weeks",description:"Learn to build websites from HTML and CSS to JavaScript and modern frameworks.",steps:["HTML fundamentals","CSS and responsive layouts","JavaScript basics","DOM and browser APIs","Git and GitHub","Build and publish a project"],url:"https://roadmap.sh/frontend"},
  {name:"Python Developer",icon:"🐍",level:"Beginner to Intermediate",duration:"10 weeks",description:"Build programming knowledge and practical Python applications.",steps:["Python basics","Data structures","Functions and modules","Files and exceptions","Libraries and APIs","Build a Python project"],url:"https://roadmap.sh/python"},
  {name:"Data Analytics",icon:"📊",level:"Beginner to Intermediate",duration:"10 weeks",description:"Develop skills in data preparation, analysis and visualization.",steps:["Spreadsheet fundamentals","Statistics basics","SQL queries","Python for data","Data visualization","Create a data project"],url:"https://roadmap.sh/ai-data-scientist"},
  {name:"Cybersecurity",icon:"🛡️",level:"Beginner",duration:"12 weeks",description:"Explore computer networks, operating systems and security concepts.",steps:["Computer fundamentals","Networking basics","Linux fundamentals","Security principles","Web security basics","Practice in safe labs"],url:"https://roadmap.sh/cyber-security"},
  {name:"UI/UX Design",icon:"🎨",level:"Beginner",duration:"8 weeks",description:"Learn design principles and create user-friendly experiences.",steps:["Design fundamentals","Color and typography","User research","Wireframing","Prototyping","Build a portfolio case study"],url:"https://www.figma.com/resource-library/"}
];

const resources = [
  {name:"MDN Web Docs",category:"Programming",icon:"🌐",description:"Reliable documentation and tutorials for web development.",url:"https://developer.mozilla.org/"},
  {name:"freeCodeCamp",category:"Programming",icon:"💻",description:"Free interactive coding lessons and certifications.",url:"https://www.freecodecamp.org/learn/"},
  {name:"Python Documentation",category:"Programming",icon:"🐍",description:"Official Python tutorials and language documentation.",url:"https://docs.python.org/3/tutorial/"},
  {name:"Kaggle Learn",category:"Data",icon:"📊",description:"Short practical courses in data science and machine learning.",url:"https://www.kaggle.com/learn"},
  {name:"AWS Skill Builder",category:"Cloud",icon:"☁️",description:"Explore cloud computing training from AWS.",url:"https://skillbuilder.aws/"},
  {name:"Figma Learn",category:"Design",icon:"🎨",description:"Guides for interface design and prototyping.",url:"https://help.figma.com/"},
  {name:"OWASP",category:"Security",icon:"🛡️",description:"Open resources for web application security.",url:"https://owasp.org/"},
  {name:"GitHub Docs",category:"Programming",icon:"🐙",description:"Learn GitHub workflows and collaborative development.",url:"https://docs.github.com/"},
  {name:"Khan Academy",category:"General",icon:"📚",description:"Free lessons across mathematics, science and other subjects.",url:"https://www.khanacademy.org/"},
  {name:"NPTEL",category:"General",icon:"🎓",description:"Online courses from Indian institutes and educators.",url:"https://nptel.ac.in/"},
  {name:"Google Skillshop",category:"General",icon:"🔎",description:"Training resources for Google's professional tools.",url:"https://skillshop.withgoogle.com/"},
  {name:"roadmap.sh",category:"Programming",icon:"🗺️",description:"Community-maintained visual learning roadmaps.",url:"https://roadmap.sh/"}
];

/* ---------- STORAGE ---------- */

function readAccounts() {
  try {
    const data = JSON.parse(localStorage.getItem(DB_KEY) || "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(DB_KEY, JSON.stringify(accounts));
}

function userKey() {
  return "nextstep_user_" + currentUser.email.toLowerCase();
}

function readUserData() {
  try {
    return JSON.parse(localStorage.getItem(userKey())) || {};
  } catch {
    return {};
  }
}

function saveUserData(data) {
  localStorage.setItem(userKey(), JSON.stringify(data));
}

function getData() {
  return {
    name: currentUser.name || "Student",
    college: "",
    branch: "",
    year: "",
    skills: [],
    projects: [],
    saved: [],
    career: "",
    goal: 5,
    ...(readUserData())
  };
}

function updateData(changes) {
  const data = getData();
  Object.assign(data, changes);
  saveUserData(data);
  return data;
}

/* ---------- UTILITIES ---------- */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;",
    '"':"&quot;", "'":"&#039;"
  })[char]);
}

function validURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function toast(message) {
  const box = $("toast");
  if (!box) return;
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove("show"), 2600);
}

/* ---------- AUTHENTICATION DEMO ---------- */

function setAuthMode(mode) {
  authMode = mode;
  $("authTitle").innerHTML = mode === "login" ? 'Welcome back<span>.</span>' : 'Create your account<span>.</span>';
  $("authSubtitle").textContent = mode === "login"
    ? "Sign in to continue your journey."
    : "Start building your future with NextStep.";
  $("nameField").classList.toggle("hidden", mode === "login");
  $("authName").required = mode === "register";
  $("authSubmit").innerHTML = mode === "login" ? 'Sign In <span>→</span>' : 'Create Account <span>→</span>';
  $("switchText").textContent = mode === "login" ? "New to NextStep?" : "Already have an account?";
  $("switchAuth").textContent = mode === "login" ? "Create account" : "Sign in";
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

  const accounts = readAccounts();

  if (authMode === "register") {
    if (!name) {
      $("authMessage").textContent = "Please enter your full name.";
      return;
    }
    if (password.length < 6) {
      $("authMessage").textContent = "Password must contain at least 6 characters.";
      return;
    }
    if (accounts[email]) {
      $("authMessage").textContent = "An account with this email already exists.";
      return;
    }

    // Demo only: never use real or reused passwords here.
    accounts[email] = { name, password };
    saveAccounts(accounts);

    currentUser = { email, name };
    localStorage.setItem(SESSION_KEY, email);
    openApp();
    toast("Welcome to NextStep, " + name + "!");
    return;
  }

  const account = accounts[email];
  if (!account || account.password !== password) {
    $("authMessage").textContent = "Incorrect email or password.";
    return;
  }

  currentUser = { email, name: account.name };
  localStorage.setItem(SESSION_KEY, email);
  openApp();
  toast("Welcome back!");
});

function logout() {
  localStorage.removeItem(SESSION_KEY);
  currentUser = null;
  $("appScreen").classList.add("hidden");
  $("authScreen").classList.remove("hidden");
  $("authForm").reset();
  setAuthMode("login");
  $("sidebar").classList.remove("open");
}

/* ---------- APPLICATION ---------- */

function openApp() {
  if (!currentUser) return;
  $("authScreen").classList.add("hidden");
  $("appScreen").classList.remove("hidden");
  renderUser();
  renderAll();
  navigate("dashboard");
}

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
  $("profileCollege").value = data.college;
  $("profileBranch").value = data.branch;
  $("profileYear").value = data.year;
  $("weeklyGoal").value = String(data.goal);
}

/* ---------- NAVIGATION ---------- */

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
  window.scrollTo({ top: 0, behavior: "smooth" });
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

document.addEventListener("click", event => {
  if (window.innerWidth > 800) return;
  if (!event.target.closest("#sidebar") && !event.target.closest("#menuToggle")) {
    $("sidebar").classList.remove("open");
  }
});

$("topProfile").addEventListener("click", () => navigate("profile"));
$("sidebarProfile").addEventListener("click", () => navigate("profile"));
$("logoutBtn").addEventListener("click", logout);

/* ---------- THEME ---------- */

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

/* ---------- SKILL DEVELOPMENT ---------- */

function renderSkills() {
  const data = getData();
  const search = ($("skillSearch")?.value || "").toLowerCase();
  const category = $("skillCategory")?.value || "all";

  const list = skills.filter(item =>
    (category === "all" || item.category === category) &&
    (item.name + item.description + item.category).toLowerCase().includes(search)
  );

  $("skillGrid").innerHTML = list.map(item => {
    const done = data.skills.includes(item.name);
    return `
      <article class="content-card">
        <div class="card-icon feature-icon blue">${item.icon}</div>
        <h3>${escapeHTML(item.name)}</h3>
        <div class="card-meta">${escapeHTML(item.category)} · ${escapeHTML(item.level)}</div>
        <p>${escapeHTML(item.description)}</p>
        <a class="btn btn-outline" href="${item.url}" target="_blank" rel="noopener">Start learning ↗</a>
        <button class="btn ${done ? "btn-primary" : "btn-outline"} skill-toggle" data-skill="${escapeHTML(item.name)}">${done ? "✓ Completed" : "Mark completed"}</button>
      </article>`;
  }).join("") || '<div class="empty-state">No skills found. Try another search.</div>';
}

$("skillGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-skill]");
  if (!button) return;

  const data = getData();
  const name = button.dataset.skill;
  const done = data.skills.includes(name);
  data.skills = done ? data.skills.filter(item => item !== name) : [...data.skills, name];
  saveUserData(data);
  renderAll();
  toast(done ? "Skill marked as ongoing." : "Great work! Skill completed.");
});

$("skillSearch").addEventListener("input", renderSkills);
$("skillCategory").addEventListener("change", renderSkills);

/* ---------- CAREERS ---------- */

function renderCareers() {
  const search = $("careerSearch").value.toLowerCase();
  const category = $("careerCategory").value;

  const list = careers.filter(item =>
    (category === "all" || item.category === category) &&
    (item.name + item.description + item.skills).toLowerCase().includes(search)
  );

  $("careerGrid").innerHTML = list.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon purple">${item.icon}</div>
      <div class="card-meta">${escapeHTML(item.category)}</div>
      <h3>${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <p><strong>Useful skills:</strong> ${escapeHTML(item.skills)}</p>
      <button class="btn btn-primary career-select" data-career="${escapeHTML(item.name)}">Choose career →</button>
      <a class="text-btn" href="${item.url}" target="_blank" rel="noopener">Explore resources ↗</a>
    </article>`).join("") || '<div class="empty-state">No careers match your search.</div>';
}

$("careerGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-career]");
  if (!button) return;
  updateData({ career: button.dataset.career });
  toast("Career path saved!");
  renderDashboard();
});

$("careerSearch").addEventListener("input", renderCareers);
$("careerCategory").addEventListener("change", renderCareers);

/* ---------- ROADMAPS ---------- */

function renderRoadmaps() {
  $("roadmapGrid").innerHTML = roadmaps.map(item => `
    <article class="content-card">
      <div class="card-icon feature-icon blue">${item.icon}</div>
      <div class="card-meta">${escapeHTML(item.level)} · ${escapeHTML(item.duration)}</div>
      <h3>${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <ol>${item.steps.map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
      <a class="btn btn-primary" href="${item.url}" target="_blank" rel="noopener">Explore full roadmap ↗</a>
    </article>`).join("");
}

/* ---------- PROJECT STUDIO ---------- */

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
  if (link && !validURL(link)) {
    toast("Please enter a valid HTTP or HTTPS project URL.");
    return;
  }

  const data = getData();
  data.projects.push({
    id: Date.now().toString(),
    title,
    tech: $("projectTech").value.trim(),
    description,
    link
  });

  saveUserData(data);
  $("newProjectForm").reset();
  $("projectForm").classList.add("hidden");
  renderAll();
  toast("Project added to your portfolio!");
});

function renderProjects() {
  const data = 
