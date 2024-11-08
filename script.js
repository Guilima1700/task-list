document.getElementById('addTaskButton').addEventListener('click', function () {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});

function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add("task-item");

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.classList.add('task-checkbox');

    taskCheckbox.addEventListener('change', function () {
        taskItem.classList.toggle('selected', taskCheckbox.checked);
    });

    const taskLabel = document.createElement('span');
    taskLabel.textContent = taskText;

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);

    taskItem.setAttribute("draggable", true);
    taskItem.addEventListener('dragstart', dragStart);
    taskItem.addEventListener('dragend', dragEnd);

    const taskListEmAberto = document.getElementById('taskListEmAberto');
    taskListEmAberto.appendChild(taskItem);

    updateTaskCount();
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    const taskItem = document.querySelector(".dragging");
    const target = event.target;

    if (target && target.tagName === 'UL') {
        target.appendChild(taskItem);
        updateTaskCount();
    }
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add("dragging");
}

function dragEnd(event) {
    event.target.classList.remove("dragging");
}

function updateTaskCount() {
    const taskLists = document.querySelectorAll(".task-list");
    taskLists.forEach(function (list) {
        const taskCount = list.children.length;
        const taskCountElement = list.parentElement.querySelector('div[id^="taskCount"]');
        taskCountElement.textContent = `Total de Tarefas: ${taskCount}`;
    });
}

document.getElementById('removeSelectedButton').addEventListener('click', function () {
    const selectedTasks = document.querySelectorAll('.task-checkbox:checked');
    selectedTasks.forEach(function (checkbox) {
        const taskItem = checkbox.closest('li');
        taskItem.remove();
    });
    updateTaskCount();
});