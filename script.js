const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

const tasks = loadFromLocalStorage();

addButton.addEventListener("click", () => {
  const task = todoInput.value.trim();
  tasks.push(task);
  saveToLocalStorage(tasks);
  updateUI(tasks);
  todoInput.value = "";
});

function loadFromLocalStorage() {
  const tasks = localStorage.getItem("todolist");
  return tasks ? JSON.parse(tasks) : [];
}

function saveToLocalStorage(tasks) {
  localStorage.setItem("todolist", JSON.stringify(tasks));
}

function updateUI(tasks) {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const todoLi = document.createElement("li");
    const todoSpan = document.createElement("span");
    todoSpan.textContent = task;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("btn-delete");
    deleteButton.addEventListener("click", () => {
      const index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
        saveToLocalStorage(tasks);
        updateUI(tasks);
      }
    });
    todoList.appendChild(todoLi);
    todoLi.appendChild(todoSpan);
    todoLi.appendChild(deleteButton);
  });
}
updateUI(tasks);
