const main = document.querySelector("main");
const template = document.querySelector("template").content;
const nav = document.querySelector("#navigation");

fetch("jason.json").then(result => result.json()).then(data => createContainers(data));

function createContainers(areas) {
    areas.forEach(area => {
        const section = document.createElement("section");

        const button = document.createElement("button");
        section.id = area;
        button.textContent = area.coreArea;
        main.appendChild(section);
        button.addEventListener("click", () => filter(area));
        nav.appendChild(button);
    });
    fetch("jason.json").then(result => result.json()).then(data => show(data));
}


function filter(area) {
    document.querySelectorAll("main section").forEach(section => {

        if (section.id == area) {

            currentTarget.document.querySelector("button").classList.add("clicked");
            section.classList.remove("hidden");
        } else {
            console.log("work");
            section.classList.add("hidden");

        }
    })
}

function show(data) {

    data.forEach(element => {
        console.log("It works");
        const section = document.querySelector("section");
        const clone = template.cloneNode(true);
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
