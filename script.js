
const careerSkills = {
    developer: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "AI Tools",
        "Problem Solving"
    ],

    analyst: [
        "Excel",
        "SQL",
        "Python",
        "Data Visualization",
        "AI Tools",
        "Critical Thinking"
    ],

    designer: [
        "HTML",
        "CSS",
        "UI Design",
        "Figma",
        "Creativity",
        "AI Tools"
    ]
};

let selectedCareer = "";
let completedSkills = JSON.parse(
    localStorage.getItem("nextStepProgress") || "{}"
);

function showSkills() {
    selectedCareer = document.getElementById("career").value;

    const list = document.getElementById("skillsList");

    if (!selectedCareer) {
        alert("Please select a career!");
        return;
    }

    list.innerHTML = "";

    const skills = careerSkills[selectedCareer];

    if (!completedSkills[selectedCareer]) {
        completedSkills[selectedCareer] = [];
    }

    skills.forEach(skill => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            completedSkills[selectedCareer].includes(skill);

        checkbox.addEventListener("change", function() {
            if (this.checked) {
                if (!completedSkills[selectedCareer].includes(skill)) {
                    completedSkills[selectedCareer].push(skill);
                }
            } else {
                completedSkills[selectedCareer] =
                    completedSkills[selectedCareer].filter(
                        item => item !== skill
                    );
            }

            localStorage.setItem(
                "nextStepProgress",
                JSON.stringify(completedSkills)
            );

            updateProgress();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(skill));

        list.appendChild(label);
    });

    updateProgress();
}

function updateProgress() {
    const skills = careerSkills[selectedCareer] || [];

    const completed = completedSkills[selectedCareer] || [];

    const total = skills.length;

    const count = completed.length;

    const percentage = total === 0
        ? 0
        : Math.round((count / total) * 100);

    document.getElementById("progress").textContent =
        percentage + "% Completed";

    document.getElementById("skillCount").textContent =
        count + " / " + total + " skills";

    document.getElementById("progressBar").value =
        percentage;
}
