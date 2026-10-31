
const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");
const date = document.getElementById("dateId");
const container = document.getElementById("container");
const cleardata = document.getElementById("cleardata");

// GENERATE UNIQUE IDs
function generateId() {
  return crypto.randomUUID();
}

// ESCAPE HTML
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// FORM SUBMISSION
const handleSubmit = (e) => {
  e.preventDefault();

  const task = {
    id: generateId(),
    titles: taskTitleInput.value.trim(),
    description: taskDescInput.value.trim(),
    level: choose.value,
    time: date.value,
  };

  const { titles, description } = task;

  titleError.textContent = "";
  descError.textContent = "";

  if (titles === "") {
    titleError.textContent = "Input cannot be empty";
  } else if (titles.length < 5) {
    titleError.textContent = "Characters should not be less than 5";
  } else if (description === "") {
    descError.textContent = "Input cannot be empty";
  } else if (description.length < 10) {
    descError.textContent = "Characters should not be less than 10";
  } else {
    saveTask(task);
    taskForm.reset();
  }
};

// SAVE TASK TO LOCAL STORAGE
function saveTask(task) {
  const tasks = getTask();

  tasks.push(task);

  localStorage.setItem("Mytask", JSON.stringify(tasks));

  renderTask();
}

// GET TASKS
function getTask() {
  const tasks = JSON.parse(localStorage.getItem("Mytask")) || [];
  return tasks;
}

// CLEAR LOCAL STORAGE DATA
function clearData() {
  localStorage.removeItem("Mytask");
  renderTask();
}

// RENDER TASKS
function renderTask() {
  const tasks = getTask();

  container.innerHTML = tasks
    .map((data) => `
      <div class="parentdiv" data-id="${escapeHTML(data.id)}">

        <div class="taskmapping">

          <div>
            <p>Title</p>
            <h3 class="title">${escapeHTML(data.titles)}</h3>
            <input
              class="edit-title"
              type="text"
              value="${escapeHTML(data.titles)}"
              hidden
            >
          </div>

          <div>
            <p>Description</p>
            <p class="description">${escapeHTML(data.description)}</p>
            <textarea class="edit-description" hidden>${escapeHTML(data.description)}</textarea>
          </div>

          <div>
            <p>Priority</p>
            <p class="priority">${escapeHTML(data.level)}</p>
          </div>

          <div>
            <p>Due date</p>
            <p class="date">${escapeHTML(data.time)}</p>
          </div>

        </div>

        <div class="inline-button">

          <button type="button" data-action="update">
            <i class="fa-solid fa-pen"></i>
            update
          </button>

          <button type="button" class="save" data-action="save">
            <i class="fa-solid fa-floppy-disk"></i>
            save
          </button>

          <button type="button" class="delete" data-action="delete">
            <i class="fa-solid fa-trash"></i>
            delete
          </button>

        </div>

      </div>
    `)
    .join("");

  return tasks;
}

// INLINE UPDATE, SAVE AND DELETE
container.addEventListener("click", (e) => {

  const button = e.target.closest("button");

  if (!button || !container.contains(button)) return;

  const action = button.dataset.action;

  const parentdiv = button.closest(".parentdiv");

  if (!parentdiv) return;

  const taskId = parentdiv.dataset.id;

  // UPDATE BUTTON
  if (action === "update") {

    const title = parentdiv.querySelector(".title");
    const description = parentdiv.querySelector(".description");
    const priority = parentdiv.querySelector(".priority");

    const titleInput = parentdiv.querySelector(".edit-title");
    const descriptionInput = parentdiv.querySelector(".edit-description");

    title.hidden = true;
    priority.hidden = true
    description.hidden = true;

    titleInput.hidden = false;
    priority.
    descriptionInput.hidden = false;

    titleInput.focus();
  }

  // SAVE BUTTON
  if (action === "save") {

    const titleInput = parentdiv.querySelector(".edit-title");
    const descriptionInput = parentdiv.querySelector(".edit-description");

    const newTitle = titleInput.value.trim();
    const newDescription = descriptionInput.value.trim();

    if (newTitle.length < 5) {
      alert("Title must contain at least 5 characters");
      return;
    }

    if (newDescription.length < 10) {
      alert("Description must contain at least 10 characters");
      return;
    }

    const tasks = getTask();

    const updatedTasks = tasks.map((task) => {

      if (task.id === taskId) {
        return {
          ...task,
          titles: newTitle,
          description: newDescription
        };
      }

      return task;
    });

    localStorage.setItem("Mytask", JSON.stringify(updatedTasks));

    // IMMEDIATELY UPDATE UI
    renderTask();
  }

  // DELETE BUTTON
  if (action === "delete") {

    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const tasks = getTask();

    const remainingTasks = tasks.filter(
      (task) => task.id !== taskId
    );

    localStorage.setItem("Mytask", JSON.stringify(remainingTasks));

    // IMMEDIATELY UPDATE UI
    renderTask();
  }

});

// EVENT LISTENERS
taskForm.addEventListener("submit", handleSubmit);

cleardata.addEventListener("click", clearData);

// RENDER EXISTING TASKS WHEN PAGE LOADS
renderTask();
