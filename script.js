"use strict";
/* NextStep v2 — local-first frontend prototype. Not production authentication. */
const $=id=>document.getElementById(id),ACCOUNT_KEY="nextstep_demo_accounts",SESSION_KEY="nextstep_demo_session";
let currentUser=null,authMode="login",quizState=null;
const skills=[
["HTML & CSS","Technical","🌐","Structure and style accessible web pages.","https://developer.mozilla.org/en-US/docs/Learn_web_development"],["JavaScript","Technical","⚡","Build interactive browser experiences.","https://javascript.info/"],["Python","Technical","🐍","Learn programming fundamentals and automation.","https://docs.python.org/3/tutorial/"],["SQL","Technical","🗄️","Query, organise and analyse relational data.","https://sqlbolt.com/"],["Git & GitHub","Technical","🐙","Track changes and collaborate on code.","https://docs.github.com/en/get-started"],["Communication","Professional","🗣️","Express ideas clearly in academic and work settings.","https://www.toastmasters.org/"],["Problem Solving","Analytical","🧩","Break complex tasks into manageable steps.","https://www.hackerrank.com/domains/algorithms"],["Data Analysis","Analytical","📊","Find patterns and communicate insights from data.","https://www.kaggle.com/learn"],["UI/UX Design","Creative","🎨","Design useful and accessible digital products.","https://help.figma.com/"],["Critical Thinking","Analytical","💡","Evaluate information and make reasoned decisions.","https://www.coursera.org/"],["Teamwork","Professional","🤝","Collaborate and contribute to shared goals.","https://www.atlassian.com/team-playbook"],["Presentation Skills","Professional","🎤","Plan and deliver clear presentations.","https://www.toastmasters.org/"]];
const careers=[
{name:"Frontend Developer",cat:"Technology",icon:"💻",desc:"Build the interfaces people use on websites and web apps.",skills:"HTML, CSS, JavaScript, accessibility, responsive design",tasks:"Create pages and components, connect APIs, test usability and improve performance.",start:"Build a responsive portfolio website and learn version control.",link:"https://roadmap.sh/frontend"},
{name:"Backend Developer",cat:"Technology",icon:"⚙️",desc:"Build server-side logic, APIs and data systems behind applications.",skills:"Programming, APIs, databases, testing, security basics",tasks:"Design endpoints, validate data, integrate databases and monitor services.",start:"Create a small CRUD API with a database and documentation.",link:"https://roadmap.sh/backend"},
{name:"Data Analyst",cat:"Technology",icon:"📊",desc:"Turn raw information into useful insights for decisions.",skills:"Excel, SQL, statistics, data visualisation, communication",tasks:"Clean datasets, analyse trends, build reports and explain findings.",start:"Analyse a public dataset and publish a dashboard with findings.",link:"https://roadmap.sh/data-analyst"},
{name:"Cybersecurity Analyst",cat:"Technology",icon:"🛡️",desc:"Help organisations identify risks and protect systems and information.",skills:"Networking, Linux, security fundamentals, documentation",tasks:"Review alerts, assess vulnerabilities and support incident response.",start:"Learn networking and practise in legal beginner security labs.",link:"https://roadmap.sh/cyber-security"},
{name:"Cloud Engineer",cat:"Technology",icon:"☁️",desc:"Help deploy and operate applications on cloud infrastructure.",skills:"Linux, networking, scripting, cloud concepts, automation",tasks:"Configure services, monitor systems and improve reliability.",start:"Learn Linux and networking before trying a cloud fundamentals course.",link:"https://roadmap.sh/devops"},
{name:"UI/UX Designer",cat:"Creative",icon:"🎨",desc:"Research user needs and design clear, helpful digital experiences.",skills:"User research, wireframing, prototyping, visual design",tasks:"Interview users, map journeys, prototype ideas and test usability.",start:"Redesign one everyday app screen and explain your design decisions.",link:"https://www.figma.com/resource-library/"},
{name:"Digital Marketer",cat:"Business",icon:"📱",desc:"Plan and measure campaigns that connect products with audiences.",skills:"Content, SEO, analytics, communication, campaign planning",tasks:"Research audiences, create campaigns and review performance data.",start:"Create a sample campaign plan with audience, message and metrics.",link:"https://skillshop.withgoogle.com/"},
{name:"Financial Analyst",cat:"Business",icon:"💹",desc:"Support financial decisions through analysis and reporting.",skills:"Excel, accounting, financial statements, analytical thinking",tasks:"Prepare models, compare performance and communicate financial findings.",start:"Practise spreadsheet analysis using a sample public dataset.",link:"https://www.coursera.org/"},
{name:"Research Scientist",cat:"Science",icon:"🔬",desc:"Investigate questions using structured methods and evidence.",skills:"Research methods, statistics, subject knowledge, writing",tasks:"Review literature, design studies, analyse results and report findings.",start:"Choose a topic and write a short evidence-based literature review.",link:"https://www.khanacademy.org/"},
{name:"Public Administration",cat:"Public Service",icon:"🏛️",desc:"Support public programmes, services and administration.",skills:"Communication, policy awareness, analysis, organisation",tasks:"Coordinate services, interpret policy and support public projects.",start:"Explore public institutions and practise clear policy summaries.",link:"https://www.india.gov.in/"}
];
const roadmaps=[
["Web Development","🌐","12 weeks","Build a foundation in HTML, CSS, JavaScript and responsive design.","https://roadmap.sh/frontend",["HTML structure and semantics","CSS layout and responsive design","JavaScript fundamentals","DOM and browser APIs","Git and GitHub","Build and publish a portfolio"]],
["Python Developer","🐍","10 weeks","Learn Python fundamentals and create practical programs.","https://roadmap.sh/python",["Python syntax and data types","Conditions and loops","Functions and modules","Collections and files","Exceptions and testing","Build a practical Python project"]],
["Data Analytics","📊","10 weeks","Develop data preparation, analysis and visualisation skills.","https://roadmap.sh/data-analyst",["Spreadsheet fundamentals","Data cleaning","SQL basics","Descriptive statistics","Visualisation and storytelling","Publish an analysis project"]],
["Cybersecurity","🛡️","12 weeks","Explore networks, operating systems and security foundations.","https://roadmap.sh/cyber-security",["Computer and network basics","Linux fundamentals","Security principles","Common web risks","Safe lab practice","Document a defensive security project"]],
["UI/UX Design","🎨","8 weeks","Learn research, interface design and prototyping.","https://www.figma.com/resource-library/",["Design principles","User research basics","User flows and wireframes","Visual hierarchy","Interactive prototypes","Usability testing"]]
];
const resources=[
["MDN Web Docs","Programming","🌐","Web standards, tutorials and reference documentation.","https://developer.mozilla.org/"],["freeCodeCamp","Programming","💻","Free interactive coding lessons and projects.","https://www.freecodecamp.org/learn/"],["Python Documentation","Programming","🐍","Official Python tutorial and language reference.","https://docs.python.org/3/tutorial/"],["Kaggle Learn","Data","📊","Short practical lessons in data and machine learning.","https://www.kaggle.com/learn"],["AWS Skill Builder","Cloud","☁️","Cloud learning plans and digital training.","https://skillbuilder.aws/"],["Figma Learn","Design","🎨","Guides for interface design and prototyping.","https://help.figma.com/"],["OWASP","Security","🛡️","Application security guidance and learning materials.","https://owasp.org/"],["GitHub Docs","Programming","🐙","Guides to repositories, Git and collaboration.","https://docs.github.com/"],["Khan Academy","General","📚","Free lessons across maths, science and more.","https://www.khanacademy.org/"],["NPTEL","General","🎓","Online courses from Indian academic institutions.","https://nptel.ac.in/"],["Google Skillshop","General","🔎","Training for Google tools and digital skills.","https://skillshop.withgoogle.com/"],["roadmap.sh","Programming","🗺️","Community-created visual developer roadmaps.","https://roadmap.sh/"]];
const questions=[
{cat:"quantitative",q:"A notebook costs ₹80. A 25% discount is offered. What is the sale price?",o:["₹55","₹60","₹65","₹70"],a:1,e:"25% of ₹80 is ₹20. Sale price = ₹80 − ₹20 = ₹60."},
{cat:"quantitative",q:"What is 15% of 240?",o:["24","30","36","42"],a:2,e:"10% of 240 is 24 and 5% is 12. Total = 36."},
{cat:"quantitative",q:"A car travels 150 km in 3 hours. What is its average speed?",o:["30 km/h","40 km/h","50 km/h","60 km/h"],a:2,e:"Average speed = distance ÷ time = 150 ÷ 3 = 50 km/h."},
{cat:"quantitative",q:"The average of 12, 18 and 24 is:",o:["16","18","20","22"],a:1,e:"(12 + 18 + 24) ÷ 3 = 54 ÷ 3 = 18."},
{cat:"quantitative",q:"If 5 workers finish a task in 8 days, how many worker-days are needed?",o:["13","25","40","45"],a:2,e:"Total work at this rate = 5 × 8 = 40 worker-days."},
{cat:"logical",q:"Find the next number: 2, 4, 8, 16, __",o:["20","24","30","32"],a:3,e:"Each term is multiplied by 2. The next term is 32."},
{cat:"logical",q:"Which item does not belong?",o:["Triangle","Square","Circle","Cube"],a:3,e:"Cube is a three-dimensional solid; the others are two-dimensional shapes."},
{cat:"logical",q:"If all roses are flowers and some flowers fade quickly, which statement must be true?",o:["All roses fade quickly","Some roses fade quickly","All roses are flowers","No flowers are roses"],a:2,e:"The first premise directly states that all roses are flowers. The other options are not guaranteed."},
{cat:"logical",q:"A is taller than B. B is taller than C. Who is shortest?",o:["A","B","C","Cannot say"],a:2,e:"The order is A > B > C, so C is shortest."},
{cat:"logical",q:"Complete the pattern: AZ, BY, CX, __",o:["DV","DW","EX","CY"],a:1,e:"The first letter moves forward while the second moves backward. The answer is DW."}
];
const interviews=[
["hr","Tell me about yourself.","Give a concise introduction: your current education, relevant interests, one or two strengths, a project or experience, and what you hope to contribute. Keep it relevant to the role."],
["hr","Why are you interested in this role?","Connect the responsibilities to your interests and skills. Mention something specific about the role and explain how you hope to learn and contribute."],
["hr","What is one strength you bring?","Choose a genuine strength and support it with a short example. Explain the situation, what you did and the result."],
["hr","Tell me about a challenge you faced.","Use a simple situation, task, action and result structure. Focus on your decisions, learning and what you would do next time."],
["technical","Explain the difference between HTML, CSS and JavaScript.","HTML structures content, CSS controls presentation and layout, and JavaScript adds behaviour and interactivity in the browser."],
["technical","What is a database primary key?","A primary key is a column or set of columns that uniquely identifies each row in a table. It should be unique and not null."],
["technical","What is the difference between a list and a tuple in Python?","A list is mutable, meaning its contents can be changed. A tuple is immutable after creation. Both can store ordered collections."],
["technical","What is an API?","An API is an interface that allows software systems to communicate through defined requests, responses and rules."],
["situational","What would you do if you disagreed with a teammate?","Listen to understand their reasoning, explain your view respectfully, compare options against the shared goal and agree on a next step."],
["situational","How would you handle a task you do not know how to complete?","Clarify the expected outcome, break the task into smaller parts, research reliable sources, try a small solution and ask a focused question when needed."]
];
const readiness=["I can introduce myself clearly in about one minute.","I have an updated student resume.","I can explain at least one project I worked on.","I have practised common aptitude questions.","I can describe my key skills with examples.","I have researched roles that interest me.","I can communicate professionally by email.","I have prepared questions to ask an interviewer."];

function safe(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function accounts(){try{const a=JSON.parse(localStorage.getItem(ACCOUNT_KEY)||"{}");return a&&typeof a==="object"&&!Array.isArray(a)?a:{}}catch{return {}}}
function saveAccounts(a){localStorage.setItem(ACCOUNT_KEY,JSON.stringify(a))}
function key(){return "nextstep_profile_"+currentUser.email}
function data(){const base={name:currentUser.name,college:"",branch:"",year:"",career:"",skills:[],projects:[],saved:[],goal:5,quizHistory:[],readiness:[]};try{return {...base,...JSON.parse(localStorage.getItem(key())||"{}")}}catch{return base}}
function save(d){localStorage.setItem(key(),JSON.stringify(d))}
function change(p){const d=data();Object.assign(d,p);save(d);return d}
function toast(s){const t=$("toast");if(!t)return;t.textContent=s;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2400)}

function setAuth(mode){
authMode=mode;
$("authTitle").innerHTML=mode==="login"?'Welcome back<span>.</span>':'Create your account<span>.</span>';
$("authSubtitle").textContent=mode==="login"?"Sign in to continue your journey.":"Start building your future with NextStep.";
$("nameField").classList.toggle("hidden",mode==="login");
$("authName").required=mode==="register";
$("authSubmit").innerHTML=mode==="login"?'Sign in <span>→</span>':'Create account <span>→</span>';
$("switchText").textContent=mode==="login"?"New to NextStep?":"Already have an account?";
$("switchAuth").textContent=mode==="login"?"Create account":"Sign in";
$("authMessage").textContent="";
}
$("switchAuth").addEventListener("click",()=>setAuth(authMode==="login"?"register":"login"));

$("authForm").addEventListener("submit",e=>{
e.preventDefault();
const email=$("authEmail").value.trim().toLowerCase(),password=$("authPassword").value,name=$("authName").value.trim(),a=accounts();
if(authMode==="register"){
if(!name){$("authMessage").textContent="Please enter your name.";return}
if(a[email]){$("authMessage").textContent="This email is already registered.";return}
a[email]={name,password};saveAccounts(a);
currentUser={email,name};localStorage.setItem(SESSION_KEY,email);openApp();toast("Welcome to NextStep!");
}else{
if(!a[email]||a[email].password!==password){$("authMessage").textContent="Incorrect email or password.";return}
currentUser={email,name:a[email].name};localStorage.setItem(SESSION_KEY,email);openApp();toast("Welcome back!");
}
});

function openApp(){
$("authScreen").classList.add("hidden");
$("appScreen").classList.remove("hidden");
renderAll();navigate("dashboard");
}
function logout(){
localStorage.removeItem(SESSION_KEY);currentUser=null;
$("appScreen").classList.add("hidden");
$("authScreen").classList.remove("hidden");
$("authForm").reset();setAuth("login");
}
$("logoutBtn").addEventListener("click",logout);

function userRender(){
const d=data(),n=d.name||"Student",initial=n.charAt(0).toUpperCase();
$("welcomeName").textContent=n.split(" ")[0];
$("sidebarName").textContent=n;
$("topName").textContent=n.split(" ")[0];
$("sidebarAvatar").textContent=initial;
$("topAvatar").textContent=initial;
$("profileAvatar").textContent=initial;
$("profileDisplayName").textContent=n;
$("profileDisplayEmail").textContent=currentUser.email;
$("profileName").value=n;
$("profileCollege").value=d.college||"";
$("profileBranch").value=d.branch||"";
$("profileYear").value=d.year||"";
$("profileCareer").value=d.career||"";
$("weeklyGoal").value=String(d.goal||5);
}

$("profileForm").addEventListener("submit",e=>{
e.preventDefault();
const n=$("profileName").value.trim();if(!n)return;
const a=accounts();a[currentUser.email].name=n;saveAccounts(a);
currentUser.name=n;
change({name:n,college:$("profileCollege").value.trim(),branch:$("profileBranch").value,year:$("profileYear").value,career:$("profileCareer").value.trim()});
renderAll();toast("Profile saved!");
});

function navigate(page){
const el=$(page);if(!el||!el.classList.contains("page"))return;
document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
el.classList.add("active");
document.querySelectorAll(".nav-link").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
$("pageName").textContent=el.querySelector("h1")?.textContent||"Dashboard";
closeMenu();window.scrollTo(0,0);
}
function closeMenu(){
$("sidebar").classList.remove("open");
$("sidebarShade").classList.remove("show");
}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>{
navigate(b.dataset.go);
if(b.dataset.openTool)selectTool(b.dataset.openTool);
}));
$("menuToggle").addEventListener("click",()=>{
$("sidebar").classList.toggle("open");
$("sidebarShade").classList.toggle("show");
});
$("sidebarShade").addEventListener("click",closeMenu);

function setTheme(dark){
document.body.classList.toggle("dark-theme",dark);
$("settingsTheme").checked=dark;
localStorage.setItem("nextstep_theme",dark?"dark":"light");
}
$("themeToggle").addEventListener("click",()=>setTheme(!document.body.classList.contains("dark-theme")));
$("settingsTheme").addEventListener("change",e=>setTheme(e.target.checked));

function renderDashboard(){
const d=data(),h=d.quizHistory;
const percent=Math.round(d.skills.length/skills.length*100);
const avg=h.length?Math.round(h.reduce((s,x)=>s+x.percent,0)/h.length):0;
$("skillCount").textContent=d.skills.length;
$("progressPercent").textContent=percent+"%";
$("projectCount").textContent=d.projects.length;
$("quizAverage").textContent=h.length?avg+"%":"—";
$("quizCount").textContent=h.length;
$("circlePercent").textContent=percent+"%";
$("progressCircle").style.background=`conic-gradient(var(--primary) ${percent*3.6}deg,var(--border) 0deg)`;
$("progressMessage").textContent=percent===100?"Excellent! All listed skills completed.":"Keep learning and complete skills to grow your progress.";
$("goalDone").textContent=d.skills.length;
$("goalTarget").textContent=d.goal;
$("goalBar").style.width=Math.min(100,d.skills.length/Math.max(1,d.goal)*100)+"%";
$("recentQuizzes").innerHTML=h.length?h.slice(0,4).map(x=>`<div class="history-row"><span>${safe(x.label)} · ${safe(x.date)}</span><strong>${x.percent}%</strong></div>`).join(""):'<p class="muted-text">No practice tests yet. Try an aptitude quiz!</p>';
}

function renderSkills(){
const q=$("skillSearch").value.toLowerCase(),cat=$("skillCategory").value,d=data();
const list=skills.filter(x=>(cat==="all"||x[1]===cat)&&x.join(" ").toLowerCase().includes(q));
$("skillGrid").innerHTML=list.map(x=>{
const done=d.skills.includes(x[0]);
return `<article class="content-card"><div class="card-icon feature-icon blue">${x[2]}</div><div class="card-meta">${safe(x[1])}</div><h3>${safe(x[0])}</h3><p>${safe(x[3])}</p><a class="text-btn" href="${x[4]}" target="_blank" rel="noopener">Learn this skill ↗</a><button class="btn ${done?"btn-outline":"btn-primary"}" data-skill="${safe(x[0])}">${done?"✓ Completed":"Mark complete"}</button></article>`;
}).join("")||'<div class="empty-state">No matching skills found.</div>';
}
$("skillSearch").addEventListener("input",renderSkills);
$("skillCategory").addEventListener("change",renderSkills);
$("skillGrid").addEventListener("click",e=>{
const b=e.target.closest("[data-skill]");if(!b)return;
const d=data(),n=b.dataset.skill;
d.skills=d.skills.includes(n)?d.skills.filter(x=>x!==n):[...d.skills,n];
save(d);renderAll();toast("Skill progress updated!");
});

function renderCareers(){
const q=$("careerSearch").value.toLowerCase(),cat=$("careerCategory").value;
const list=careers.filter(x=>(cat==="all"||x.cat===cat)&&(x.name+" "+x.desc+" "+x.skills).toLowerCase().includes(q));
$("careerGrid").innerHTML=list.map(x=>`<article class="content-card"><div class="card-icon feature-icon purple">${x.icon}</div><div class="card-meta">${safe(x.cat)}</div><h3>${safe(x.name)}</h3><p>${safe(x.desc)}</p><button class="btn btn-primary" data-career="${safe(x.name)}">Explore career</button></article>`).join("")||'<div class="empty-state">No careers match your search.</div>';
}
$("careerSearch").addEventListener("input",renderCareers);
$("careerCategory").addEventListener("change",renderCareers);
$("careerGrid").addEventListener("click",e=>{
const b=e.target.closest("[data-career]");if(!b)return;
const c=careers.find(x=>x.name===b.dataset.career);if(!c)return;
change({career:c.name});
$("careerDetailContent").innerHTML=`<div class="career-detail-head"><span class="career-detail-icon">${c.icon}</span><div><div class="card-meta">${safe(c.cat)}</div><h2>${safe(c.name)}</h2></div></div><p>${safe(c.desc)}</p><h3>Key skills</h3><p>${safe(c.skills)}</p><h3>Typical tasks</h3><p>${safe(c.tasks)}</p><h3>Suggested first step</h3><p>${safe(c.start)}</p><a class="btn btn-primary" href="${c.link}" target="_blank" rel="noopener">Open learning roadmap ↗</a>`;
$("careerDetail").classList.remove("hidden");
});
$("careerDetail").addEventListener("click",e=>{if(e.target=== $("careerDetail")||e.target.closest("[data-close-career]"))$("careerDetail").classList.add("hidden")});

function renderRoadmaps(){
$("roadmapGrid").innerHTML=roadmaps.map((r,i)=>`<article class="content-card"><div class="card-icon feature-icon blue">${r[1]}</div><div class="card-meta">${r[2]}</div><h3>${safe(r[0])}</h3><p>${safe(r[3])}</p><ol>${r[5].map(s=>`<li>${safe(s)}</li>`).join("")}</ol><a class="text-btn" href="${r[4]}" target="_blank" rel="noopener">Open full roadmap ↗</a></article>`).join("");
  }
/* PROJECT STUDIO */
$("addProjectBtn").addEventListener("click",()=>{
  $("projectForm").classList.remove("hidden");
  $("projectTitle").focus();
});
$("cancelProject").addEventListener("click",()=>{
  $("projectForm").classList.add("hidden");
  $("newProjectForm").reset();
});
$("newProjectForm").addEventListener("submit",e=>{
  e.preventDefault();
  const title=$("projectTitle").value.trim();
  const description=$("projectDescription").value.trim();
  const link=$("projectLink").value.trim();
  if(!title||!description)return;
  if(link){
    try{
      const u=new URL(link);
      if(!["http:","https:"].includes(u.protocol))throw 0;
    }catch{
      $("projectLink").setCustomValidity("Enter a valid http or https URL.");
      $("projectLink").reportValidity();
      return;
    }
  }
  $("projectLink").setCustomValidity("");
  const d=data();
  d.projects.unshift({
    id:Date.now().toString(),
    title,
    description,
    tech:$("projectTech").value.trim(),
    link
  });
  save(d);
  $("newProjectForm").reset();
  $("projectForm").classList.add("hidden");
  renderAll();
  toast("Project saved!");
});

function renderProjects(){
  const list=data().projects;
  $("projectGrid").innerHTML=list.map(p=>`
    <article class="content-card">
      <div class="card-icon feature-icon orange">▣</div>
      <h3>${safe(p.title)}</h3>
      <div class="card-meta">${safe(p.tech||"Personal project")}</div>
      <p>${safe(p.description)}</p>
      ${p.link?`<a class="text-btn" href="${safe(p.link)}" target="_blank" rel="noopener">View project ↗</a>`:""}
      <button class="btn btn-outline" data-delete-project="${safe(p.id)}">Delete project</button>
    </article>
  `).join("")||'<div class="empty-state">Your project portfolio is empty. Add your first project!</div>';
}
$("projectGrid").addEventListener("click",e=>{
  const b=e.target.closest("[data-delete-project]");
  if(!b||!confirm("Delete this project?"))return;
  const d=data();
  d.projects=d.projects.filter(p=>p.id!==b.dataset.deleteProject);
  save(d);
  renderAll();
  toast("Project deleted.");
});

/* RESOURCE LIBRARY */
function renderResources(){
  const q=$("resourceSearch").value.toLowerCase();
  const cat=$("resourceCategory").value;
  const d=data();
  const list=resources.filter(x=>
    (cat==="all"||x[1]===cat)&&x.join(" ").toLowerCase().includes(q)
  );
  $("resourceGrid").innerHTML=list.map(x=>`
    <article class="content-card">
      <div class="card-icon feature-icon green">${x[2]}</div>
      <div class="card-meta">${safe(x[1])}</div>
      <h3>${safe(x[0])}</h3>
      <p>${safe(x[3])}</p>
      <a class="btn btn-primary" href="${x[4]}" target="_blank" rel="noopener">Visit resource ↗</a>
      <button class="btn btn-outline" data-save-resource="${safe(x[0])}">
        ${d.saved.includes(x[0])?"★ Saved":"☆ Save resource"}
      </button>
    </article>
  `).join("")||'<div class="empty-state">No resources found.</div>';
}
$("resourceGrid").addEventListener("click",e=>{
  const b=e.target.closest("[data-save-resource]");
  if(!b)return;
  const d=data(),n=b.dataset.saveResource;
  d.saved=d.saved.includes(n)?d.saved.filter(x=>x!==n):[...d.saved,n];
  save(d);
  renderAll();
  toast("Saved resources updated!");
});
$("resourceSearch").addEventListener("input",renderResources);
$("resourceCategory").addEventListener("change",renderResources);

/* PLACEMENT PREPARATION */
function selectTool(name){
  document.querySelectorAll(".tool-tab").forEach(b=>
    b.classList.toggle("active",b.dataset.tool===name)
  );
  document.querySelectorAll(".tool-panel").forEach(p=>p.classList.add("hidden"));
  const panel=$(name+"Tool");
  if(panel)panel.classList.remove("hidden");
}
document.querySelectorAll(".tool-tab").forEach(b=>
  b.addEventListener("click",()=>selectTool(b.dataset.tool))
);

function shuffle(items){
  return [...items].sort(()=>Math.random()-.5);
}
function renderBest(){
  const h=data().quizHistory;
  $("aptitudeBest").textContent=h.length?
    Math.max(...h.map(x=>x.percent))+"%":"—";
}

$("startQuiz").addEventListener("click",()=>{
  const cat=$("quizCategory").value;
  const n=Number($("quizLength").value);
  const pool=questions.filter(q=>cat==="all"||q.cat===cat);
  quizState={
    items:shuffle(pool).slice(0,Math.min(n,pool.length)),
    index:0,
    score:0,
    answered:false
  };
  renderQuestion();
});

function renderQuestion(){
  const q=quizState.items[quizState.index];
  const total=quizState.items.length;
  $("quizArea").innerHTML=`
    <div class="quiz-top">
      <span>Question ${quizState.index+1} of ${total}</span>
      <span>${safe(q.cat)} · Score ${quizState.score}</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width:${(quizState.index+1)/total*100}%"></div>
    </div>
    <h3 class="quiz-question">${safe(q.q)}</h3>
    <div class="answer-list">
      ${q.o.map((o,i)=>`
        <button class="answer-option" data-answer="${i}">
          ${String.fromCharCode(65+i)}. ${safe(o)}
        </button>
      `).join("")}
    </div>
    <div id="quizFeedback"></div>
    <div class="quiz-controls">
      <span class="muted-text">Choose one answer.</span>
      <button class="btn btn-primary hidden" id="nextQuestion">
        ${quizState.index===total-1?"Finish test":"Next question →"}
      </button>
    </div>
  `;
  $("quizArea").querySelectorAll("[data-answer]").forEach(b=>
    b.addEventListener("click",()=>answerQuestion(Number(b.dataset.answer)))
  );
}

function answerQuestion(i){
  if(quizState.answered)return;
  quizState.answered=true;
  const q=quizState.items[quizState.index];
  const correct=i===q.a;
  if(correct)quizState.score++;
  $("quizArea").querySelectorAll("[data-answer]").forEach((b,j)=>{
    b.disabled=true;
    if(j===q.a)b.classList.add("correct");
    else if(j===i)b.classList.add("incorrect");
  });
  $("quizFeedback").innerHTML=`
    <div class="quiz-explanation">
      <strong>${correct?"Correct!":"Not quite."}</strong>
      ${safe(q.e)}
    </div>
  `;
  $("nextQuestion").classList.remove("hidden");
  $("nextQuestion").addEventListener("click",()=>{
    if(quizState.index<quizState.items.length-1){
      quizState.index++;
      quizState.answered=false;
      renderQuestion();
    }else{
      finishQuiz();
    }
  });
}

function finishQuiz(){
  const percent=Math.round(quizState.score/quizState.items.length*100);
  const label=$("quizCategory").selectedOptions[0].text;
  const d=data();
  d.quizHistory.unshift({
    label,
    score:quizState.score,
    total:quizState.items.length,
    percent,
    date:new Date().toLocaleDateString()
  });
  d.quizHistory=d.quizHistory.slice(0,30);
  save(d);
  $("quizArea").innerHTML=`
    <div class="quiz-result">
      <span class="eyebrow">PRACTICE COMPLETE</span>
      <div class="score">${percent}%</div>
      <h2>${quizState.score} out of ${quizState.items.length} correct</h2>
      <p>${percent>=80?"Great work. Keep challenging yourself!":percent>=50?"Good effort. Review the explanations and try again.":"Practice makes progress. Review the explanations and try again."}</p>
      <button class="btn btn-primary" id="retryQuiz">Try another test →</button>
    </div>
  `;
  $("retryQuiz").addEventListener("click",()=>$("startQuiz").click());
  renderBest();
  renderDashboard();
  renderProfile();
  toast("Quiz result saved to your profile!");
}

/* INTERVIEW PRACTICE */
function renderInterviews(){
  const cat=$("interviewCategory").value;
  const q=$("interviewSearch").value.toLowerCase();
  const list=interviews.filter(x=>
    (cat==="all"||x[0]===cat)&&x.join(" ").toLowerCase().includes(q)
  );
  $("interviewGrid").innerHTML=list.map(x=>`
    <article class="content-card">
      <div class="card-meta">${safe(x[0])} interview</div>
      <h3>${safe(x[1])}</h3>
      <button class="btn btn-outline" data-interview="${interviews.indexOf(x)}">Show sample answer</button>
      <div class="interview-answer hidden" id="interviewAnswer${interviews.indexOf(x)}">${safe(x[2])}</div>
    </article>
  `).join("")||'<div class="empty-state">No matching questions found.</div>';
}
$("interviewCategory").addEventListener("change",renderInterviews);
$("interviewSearch").addEventListener("input",renderInterviews);
$("interviewGrid").addEventListener("click",e=>{
  const b=e.target.closest("[data-interview]");
  if(!b)return;
  const a=$("interviewAnswer"+b.dataset.interview);
  a.classList.toggle("hidden");
  b.textContent=a.classList.contains("hidden")?
    "Show sample answer":"Hide sample answer";
});

/* PLACEMENT READINESS CHECKLIST */
function renderReadiness(){
  const d=data();
  const done=d.readiness||[];
  $("readinessList").innerHTML=readiness.map((x,i)=>`
    <label class="readiness-item">
      <input type="checkbox" data-ready="${i}" ${done.includes(i)?"checked":""}>
      ${safe(x)}
    </label>
  `).join("");
  const n=done.length;
  $("readinessCount").textContent=n+" / "+readiness.length+" completed";
  $("readinessBar").style.width=n/readiness.length*100+"%";
}
$("readinessList").addEventListener("change",e=>{
  if(!e.target.matches("[data-ready]"))return;
  const d=data(),i=Number(e.target.dataset.ready);
  d.readiness=e.target.checked?
    [...new Set([...(d.readiness||[]),i])]:
    d.readiness.filter(x=>x!==i);
  save(d);
  renderReadiness();
});

/* PROFILE AND ACHIEVEMENTS */
function renderProfile(){
  const d=data();
  const pct=Math.round(d.skills.length/skills.length*100);
  const h=d.quizHistory;
  const avg=h.length?
    Math.round(h.reduce((s,x)=>s+x.percent,0)/h.length):null;

  $("profileProgress").textContent=pct+"%";
  $("profileProgressBar").style.width=pct+"%";
  $("profileSkills").textContent=d.skills.length;
  $("profileProjects").textContent=d.projects.length;
  $("profileQuizzes").textContent=h.length;
  $("profileQuizAverage").textContent=avg===null?"—":avg+"%";

  $("profileQuizHistory").innerHTML=h.length?
    h.slice(0,10).map(x=>`
      <div class="history-row">
        <span>${safe(x.label)} · ${safe(x.date)} · ${x.score}/${x.total}</span>
        <strong>${x.percent}%</strong>
      </div>
    `).join("") :
    '<p class="muted-text">No quiz attempts yet. Take a practice test to begin your history.</p>';

  const ach=[
    ["🌱","First steps","Complete one skill.",d.skills.length>=1],
    ["⭐","Skill builder","Complete five skills.",d.skills.length>=5],
    ["🛠️","Project creator","Add a project.",d.projects.length>=1],
    ["📚","Knowledge seeker","Save a resource.",d.saved.length>=1],
    ["🎯","Practice starter","Complete a quiz.",h.length>=1],
    ["🏅","Consistent learner","Complete ten skills.",d.skills.length>=10],
    ["🧭","Career explorer","Save a career interest.",!!d.career]
  ];
  $("achievementGrid").innerHTML=ach.map(a=>`
    <article class="content-card">
      <div class="card-icon feature-icon ${a[3]?"green":"blue"}">${a[0]}</div>
      <h3>${a[1]}</h3>
      <p>${a[2]}</p>
      <div class="card-meta">${a[3]?"✓ Unlocked":"Not unlocked yet"}</div>
    </article>
  `).join("");
}

/* SETTINGS AND FEEDBACK */
$("weeklyGoal").addEventListener("change",e=>{
  change({goal:Number(e.target.value)});
  renderDashboard();
  toast("Weekly goal saved!");
});

$("feedbackForm").addEventListener("submit",e=>{
  e.preventDefault();
  const message=$("feedbackMessage").value.trim();
  if(!message)return;
  const subject=encodeURIComponent("NextStep Website Feedback");
  const body=encodeURIComponent(
    "Feedback from: "+(currentUser?.email||"Website visitor")+"\n\n"+message
  );
  window.location.href=
    `mailto:risewithwhitewolf@gmail.com?subject=${subject}&body=${body}`;
  toast("Your email app should open with the feedback ready.");
});

/* STARTUP */
function renderAll(){
  userRender();
  renderDashboard();
  renderSkills();
  renderCareers();
  renderRoadmaps();
  renderProjects();
  renderResources();
  renderBest();
  renderProfile();
  renderInterviews();
  renderReadiness();
}

function startApp(){
  setTheme(localStorage.getItem("nextstep_theme")==="dark");
  const email=localStorage.getItem(SESSION_KEY);
  const a=accounts();
  if(email&&a[email]){
    currentUser={email,name:a[email].name};
    openApp();
  }
}
startApp();
    
