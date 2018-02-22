const main = document.querySelector("main");
const template = document.querySelector("#temp");
const nav = document.querySelector("#navigation");

const container = document.querySelector("#first-container");
const arrow = document.querySelector(".arrow-down");
const container2 = document.querySelector("#second-container");
const arrow2 = document.querySelector(".arrow-down2");

/*Event listener for the first box in the index page*/

container.addEventListener('mouseover', hover);
arrow.addEventListener('mouseover', hover);

function hover() {
    arrow.style.borderTop = "60px solid #AB8FB2"
    container.style.backgroundColor = "#AB8FB2";
}
container.addEventListener('mouseout', unhover);
arrow.addEventListener('mouseout', unhover);

function unhover() {
    arrow.style.borderTop = "60px solid #6FA9B2";
    container.style.backgroundColor = "#6FA9B2";
}

/* Event listener for the second box in the index page */ //
container2.addEventListener('mouseover', hovered);
arrow2.addEventListener('mouseover', hovered);

function hovered() {
    arrow2.style.borderTop = "60px solid #AB8FB2"
    container2.style.backgroundColor = "#AB8FB2";
}
container2.addEventListener('mouseout', unhovered);
arrow2.addEventListener('mouseout', unhovered);

function unhovered() {
    arrow2.style.borderTop = "60px solid #CCC79A";
    container2.style.backgroundColor = "#CCC79A";
}


fetch("jason.json").then(result => result.json()).then(data => createContainers(data));

function createContainers(areas) {
    areas.forEach(area => {
        let section = document.createElement("section");

        const button = document.createElement("button");

        section.id = area.coreArea;
        button.textContent = area.coreArea;
        if (button.textContent == "Communication") {
            button.textContent = "Communication & Presentation";
        }
        if (button.textContent == "Design") {
            button.textContent = "Design & Visualisation";
        }
        if (button.textContent == "Interaction") {
            button.textContent = "Interaction Development";
        }
        main.appendChild(section);
        button.href = "#";
        nav.appendChild(button);
        let buttons = document.querySelectorAll("button");
        buttons[0].focus();
        filter(areas[0]); //////////////////////////<--- SHOW DATA NO 1 BY DEFAULT, ON LOAD/////////////////////////
        button.addEventListener("click", () => filter(area));


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
        if (element.coreArea == "Communication") {
            element.coreArea = "Communication & Presentation";
        }
        if (element.coreArea == "Design") {
            element.coreArea = "Design & Visualisation";
        }
        if (element.coreArea == "Interaction") {
            element.coreArea = "Interaction Development";
        }
        clone.querySelector(".name").textContent = element.coreArea;

        clone.querySelector(".content").textContent = element.content;
        clone.querySelector(".knowledge").textContent = "Knowledge";
        clone.querySelector(".skills").textContent = "Skills";
        clone.querySelector(".competences").textContent = "Competences";



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
