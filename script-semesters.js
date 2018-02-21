const main = document.querySelector("main");
const template = document.querySelector("template");
const nav = document.querySelector("#navigation");

fetch("jason-semesters.json").then(result => result.json()).then(data => createContainers(data));

function createContainers(areas) {
    areas.forEach(area => {
        let section = document.createElement("section");

        const button = document.createElement("button");

        section.id = area.semester;
        button.textContent = area.semester;
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
        nav.appendChild(button);
        let buttons = document.querySelectorAll("button");
        buttons[0].focus();
        filter(areas[0]); //////////////////////////<--- SHOW DATA NO 1 BY DEFAULT, ON LOAD/////////////////////////
        button.addEventListener("click", () => filter(area));


    });

    fetch("jason-semesters.json").then(result => result.json()).then(data => show(data));


}



function filter(area) {
    document.querySelectorAll("main section").forEach(section => {

        if (section.id == area.semester) {
            section.classList.remove('hidden');

        } else {
            section.classList.add('hidden');
        }

    })
}

function show(data) {
    data.forEach(element => {

        const section = document.querySelector("#" + element.semester);
        let clone = template.cloneNode(true).content;
        /*if (element.coreArea == "Communication") {
            element.coreArea = "Communication & Presentation";
        }
        if (element.coreArea == "Design") {
            element.coreArea = "Design & Visualisation";
        }
        if (element.coreArea == "Interaction") {
            element.coreArea = "Interaction Development";
        }*/
        clone.querySelector(".name").textContent = element.semester;


        clone.querySelector(".ects-name").textContent = "Ects";
        clone.querySelector(".exams-name").textContent = "Exams";



        let ul = document.createElement('ul');
        clone.querySelector(".ects").appendChild(ul);

        element.content.forEach(function (name) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += name;
        });
        let ulist = document.createElement('ul');
        clone.querySelector(".exams").appendChild(ulist);

        element.objective.forEach(function (name) {
            let list = document.createElement('li');
            ulist.appendChild(list);
            list.innerHTML += name;
        });

        section.appendChild(clone);

    })

}
