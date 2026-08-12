// ==========================================
// STEP 1: Get HTML Elements
// ==========================================

const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");


// ==========================================
// STEP 2: Create an Array
// ==========================================

let tasks = [];


// ==========================================
// STEP 3: Add Task
// ==========================================

addBtn.addEventListener("click", function () {

    // Get value from input
    const taskText = taskInput.value.trim();


    // Check if input is empty
    if (taskText === "") {

        alert("Please enter a task");

        return;
    }


    // Create task object
    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array
    tasks.push(task);


    // Clear input
    taskInput.value = "";


    // Display tasks
    displayTasks();

});


// ==========================================
// STEP 4: Display Tasks
// ==========================================

function displayTasks() {

    // Clear existing list
    taskList.innerHTML = "";


    // Loop through tasks
    tasks.forEach(function (task) {


        // Create list item
        const li = document.createElement("li");


        // Create task text
        const span = document.createElement("span");

        span.innerText = task.text;


        // If task is completed
        if (task.completed) {

            span.classList.add("completed");

        }


        // Click task to mark completed
        span.addEventListener("click", function () {

            toggleTask(task.id);

        });


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";

        deleteButton.classList.add("delete-btn");


        // Delete button event
        deleteButton.addEventListener("click", function () {

            deleteTask(task.id);

        });


        // Add elements to li
        li.appendChild(span);

        li.appendChild(deleteButton);


        // Add li to ul
        taskList.appendChild(li);

    });


    // Update task count
    updateTaskCount();

}


// ==========================================
// STEP 5: Delete Task
// ==========================================

function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    displayTasks();

}


// ==========================================
// STEP 6: Complete / Uncomplete Task
// ==========================================

function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    displayTasks();

}


// ==========================================
// STEP 7: Update Task Count
// ==========================================

function updateTaskCount() {

    taskCount.innerText = "Total Tasks: " + tasks.length;

}