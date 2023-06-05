var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var taskSearchInput = document.getElementById("task-search");
var themeSelector = document.getElementById("theme-selector");

// New Task List Item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

var searchTasks = function () {
  var filter = taskSearchInput.value.toLowerCase();
  var tasks = incompleteTasksHolder.getElementsByTagName("li");

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var label = task.querySelector("label");
    var taskName = label.innerText.toLowerCase();

    if (taskName.indexOf(filter) === -1) {
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  }
};

var toggleTheme = function () {
  var theme = themeSelector.value;

  if (theme === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }
};

addButton.addEventListener("click", addTask);
taskSearchInput.addEventListener("keyup", searchTasks);
themeSelector.addEventListener("change", toggleTheme);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
