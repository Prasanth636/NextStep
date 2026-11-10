
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

let completedSkills = JSON.parse(
    localStorage.getItem("completedSkills") || "[]"
);

let selectedSkills = [];

function showSkills() {
    const career = document.getElementById("career").value;
    const list = document.getElementById("skillsList");

    if (!career) {
        alert("Please select your career!");
        return;
    }

    selectedSkills = careerSkills[career];
    list.innerHTML = "";

    selectedSkills.forEach(skill => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = completedSkills.includes(skill);

        checkbox.addEventListener("change", function() {
            if (this.checked) {
                if (!completedSkills.includes(skill)) {
                    completedSkills.push(skill);
                }
            } else {
                completedSkills = completedSkills.filter(
                    item => item !== skill
                );
            }

            localStorage.setItem(
                "completedSkills",
                JSON.stringify(completedSkills)
            );

            updateProgress();
        });

        label.appendChild(checkbox);
        label.append(" " + skill);
        label.style.display = "block";
        label.style.margin = "12px 0";

        list.appendChild(label);
    });

    updateProgress();
}

function updateProgress() {
    const total = selectedSkills.length;

    const completed = selectedSkills.filter(
        skill => completedSkills.includes(skill)
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progress").textContent =
        percentage + "% Completed";

    document.getElementById("progressBar").value =
        percentage;
}
