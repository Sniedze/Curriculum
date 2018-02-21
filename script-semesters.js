const main = document.querySelector("main");
const template = document.querySelector("#template-semesters");
const nav = document.querySelector("#navigation");

fetch("jason-semesters.json").then(result => result.json()).then(data => createContainers(data));

function createContainers(semesters) {
    semesters.forEach(semester => {
        let section = document.createElement("section");

        const button = document.createElement("button");

        section.id = area.coreArea;
        button.textContent = semester.semester;
        if (button.textContent == "semesterone") {
            button.textContent = "1st Semester";
        }
        if (button.textContent == "semestertwo") {
            button.textContent = "2nd Semester";
        }
        if (button.textContent == "semesterthree") {
            button.textContent = "3rd Semester";
        }
        if (button.textContent == "semesterfour") {
            button.textContent = "4th Semester";
        }
        main.appendChild(section);
        button.href = "#";
        button.addEventListener("click", () => filter(semester));
        nav.appendChild(button);
    });
    fetch("jason-semesters.json").then(result => result.json()).then(data => show(data));
}


function filter(semester) {
    document.querySelectorAll("main section").forEach(section => {
        const buttons = document.querySelectorAll("button");

        if (section.id == semester.semester) {
            section.classList.remove('hidden');

        } else {
            section.classList.add('hidden');
        }
        if (buttons.textContent == section.id) {
            buttons.classList.add("clicked");
        }
    })
}

function show(data) {
    data.forEach(element => {

        const section = document.querySelector("#" + element.semester);
        let clone = template.cloneNode(true).content;
        if (element.semester == "semesterone") {
            element.semester = "1st Semester";
        }
        if (element.semester == "semestertwo") {
            element.semester = "2nd Semester";
        }
        if (element.semester == "semesterthree") {
            element.semester = "3rd Semester";
        }
        if (element.semester == "semesterfour") {
            element.semester = "4th Semester";
        }
        clone.querySelector(".name").textContent = element.semester;

        clone.querySelector(".content").textContent = element.content;
        clone.querySelector(".knowledge").textContent = "Knowledge";

        clone.querySelector(".skills").textContent = "Skills";
        clone.querySelector(".content-skills").textContent = element.skills;
        clone.querySelector(".competences").textContent = "Competences";
        clone.querySelector(".content-competences").textContent = element.competences;


        let ul = document.createElement('ul');
        clone.querySelector(".content-knowledge").appendChild(ul);

        element.knowledge.forEach(function (name) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += name;
        });
        let ulist = document.createElement('ul');
        clone.querySelector(".content-skills").appendChild(ulist);

        element.skills.forEach(function (name) {
            let list = document.createElement('li');
            ulist.appendChild(list);
            list.innerHTML += name;
        });
        let ulis = document.createElement('ul');
        clone.querySelector(".content-competences").appendChild(ulis);

        element.competences.forEach(function (name) {
            let lis = document.createElement('li');
            ulis.appendChild(lis);
            lis.innerHTML += name;
        });

        section.appendChild(clone);

    })

}
