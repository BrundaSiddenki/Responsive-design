let taskList = [];

window.onload = () => {
  if (localStorage.getItem("tasks")) {
    taskList = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const dueDate = document.getElementById("dueDateInput").value;

  if (!text) return alert("Enter task!");

  taskList.push({
    text,
    completed: false,
    date: new Date().toLocaleString(),
    due: dueDate
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("dueDateInput").value = "";
  saveAndRender();
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveAndRender();
}

function editTask(index) {
  const newText = prompt("Edit your task:", taskList[index].text);
  if (newText !== null) {
    taskList[index].text = newText.trim();
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTasks();
}

function renderTasks() {
  const taskUl = document.getElementById("taskList");
  taskUl.innerHTML = "";
  let total = taskList.length;
  let completed = taskList.filter(t => t.completed).length;
  let pending = total - completed;

  document.getElementById("total").textContent = total;
  document.getElementById("completed").textContent = completed;
  document.getElementById("pending").textContent = pending;

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const isToday = task.due === new Date().toISOString().split("T")[0];
    const reminder = isToday ? "🔔 Today!" : "";

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${index})">
      <div class="task-info" onclick="editTask(${index})">
        <div>${task.text}</div>
        <div class="task-meta">Created: ${task.date}${task.due ? ` | Due: ${task.due}` : ""} ${reminder}</div>
      </div>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;

    taskUl.appendChild(li);
  });
}
