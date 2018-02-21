const main = document.querySelector("main");
const template = document.querySelector("#temp");
const nav = document.querySelector("#navigation");

fetch("jason.json").then(result => result.json()).then(data => createContainers(data));

function createContainers(areas) {
    areas.forEach(area => {
        let section = document.createElement("section");
        const button = document.createElement("a");
        section.id = area.coreArea;
        button.textContent = area.coreArea;
        main.appendChild(section);
        button.href = "#";
        button.addEventListener("click", () => filter(area));
        nav.appendChild(button);
    });
    fetch("jason.json").then(result => result.json()).then(data => show(data));
}


function filter(area) {
    document.querySelectorAll("main section").forEach(section => {

        if (section.id == area.coreArea) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');

        }
    })
}

function show(data) {
    data.forEach(element => {
        const section = document.querySelector("#" + element.coreArea);
        let clone = template.cloneNode(true).content;
        clone.querySelector(".name").textContent = element.coreArea;
        clone.querySelector(".content").textContent = element.content;
        clone.querySelector(".knowledge").textContent = "Knowledge";

        clone.querySelector(".skills").textContent = "Skills";
        clone.querySelector(".content-skills").textContent = element.skills;
        clone.querySelector(".competences").textContent = "Competences";
        clone.querySelector(".content-competences").textContent = element.competences;

        var ul = document.createElement('ul');
        clone.querySelector(".content-knowledge").appendChild(ul);

        element.knowledge.forEach(function (name) {
            var li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += name;
        });

        section.appendChild(clone);

    })
}
