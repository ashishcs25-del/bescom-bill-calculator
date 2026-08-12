let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let allBtn = document.getElementById("allBtn");
let completedBtn = document.getElementById("completedBtn");
let pendingBtn = document.getElementById("pendingBtn");


addBtn.addEventListener("click", function() {

    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.textContent = task + " ";


    let completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";


    completeBtn.addEventListener("click", function() {

        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {
            completeBtn.textContent = "Undo";
        } else {
            completeBtn.textContent = "Complete";
        }

    });


    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";


    deleteBtn.addEventListener("click", function() {
        li.remove();
    });


    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";

});



allBtn.addEventListener("click", function() {

    let tasks = taskList.children;

    for (let task of tasks) {
        task.style.display = "list-item";
    }

});



completedBtn.addEventListener("click", function() {

    let tasks = taskList.children;

    for (let task of tasks) {

        if (task.classList.contains("completed")) {
            task.style.display = "list-item";
        } 
        else {
            task.style.display = "none";
        }

    }

});



pendingBtn.addEventListener("click", function() {

    let tasks = taskList.children;

    for (let task of tasks) {

        if (task.classList.contains("completed")) {
            task.style.display = "none";
        } 
        else {
            task.style.display = "list-item";
        }

    }

});