const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");
const date = document.getElementById("dateId");
const container = document.getElementById("container");
const cleardata = document.getElementById("cleardata");

const pendingTask = document.getElementById("pending-task");
const completedTask = document.getElementById("completed-task");
const totalTask = document.getElementById("total-task");
const updateTask = document.getElementById("updateTask");

// GENERATE UNIQUE IDs
function generateId() {
  return crypto.randomUUID();
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
    completed: false
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
  } else if (!task.time || Number.isNaN(Date.parse(task.time))) {
    alert("Please select a valid due date and time.");
  } else {
    saveTask(task);
    taskForm.reset();
  }
};

// GET TASKS
function getTask() {
  const tasks = JSON.parse(localStorage.getItem("Mytask")) || [];

  // Add IDs and completion status to older tasks
  let changed = false;

  tasks.forEach((task) => {
    // if (!task.id){
    //   task.id = generateId();
    //   changed = true;
    // }

    if (typeof task.completed !== "boolean") {
      task.completed = false;
      changed = true;
    }
  });

  if (changed) {
    localStorage.setItem("Mytask", JSON.stringify(tasks));
  }

  return tasks;
}

// SAVE TASK
function saveTask(task) {
  const tasks = getTask();

  tasks.push(task);

  localStorage.setItem("Mytask", JSON.stringify(tasks));

  renderTask();
}

// UPDATE DASHBOARD STATISTICS
function updateStat() {
  const tasks = getTask();

  console.log(tasks);

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed === true
  ).length;

  const pending = tasks.filter(
    (task) => task.completed !== true
  ).length;

  if (totalTask) {
    totalTask.textContent = total;
  }

  if (completedTask) {
    completedTask.textContent = completed;
  }

  if (pendingTask) {
    pendingTask.textContent = pending;
  }
}

// CLEAR TASKS
function clearData() {
  const confirmClear = confirm(
    "Are you sure you want to clear all tasks?"
  );

  if (!confirmClear) return;

  localStorage.removeItem("Mytask");

  renderTask();
}

// RENDER TASKS
function renderTask() {
  const tasks = getTask();

  container.innerHTML = tasks
    .map((data) => `
      <div
        class="parentdiv ${data.completed ? "completed" : ""}"
        data-id="${escapeHTML(data.id)}"
      >

        <div class="task-status">
          <label>
            <input
              type="checkbox"
              class="complete-checkbox"
              data-action="complete"
              ${data.completed ? "checked" : ""}
            >
            Mark as completed
          </label>
        </div>

        <div class="taskmapping">

          <div>
            <h3 class="title">
              ${escapeHTML(data.titles)}
            </h3>

            <input
              class="edit-title"
              type="text"
              value="${escapeHTML(data.titles)}"
              hidden
            >
          </div>

          <div>
            <p class="description">
              ${escapeHTML(data.description)}
            </p>

            <textarea
              class="edit-description"
              hidden
            >${escapeHTML(data.description)}</textarea>
          </div>

          <div>
            <p class="priority">
              ${data.level}
            </p>
          </div>

          <div>
            <p class="date">
              ${escapeHTML(data.time)}
            </p>
          </div>

        </div>

        <div class="inline-button">

          <button type="button" data-action="update">
            <i class="fa-solid fa-pen"></i>
            Update
          </button>

          <button
            type="button"
            class="save"
            data-action="save"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            Save
          </button>

          <button
            type="button"
            class="delete"
            data-action="delete"
          >
            <i class="fa-solid fa-trash"></i>
            Delete
          </button>

        </div>

      </div>
    `)
    .join("");

  updateStat();

  return tasks;
}

console.log(renderTask);

// INLINE UPDATE, SAVE AND DELETE
container.addEventListener("click", (e) => {
  const button = e.target.closest("button");

  if (!button || !container.contains(button)) return;

  const action = button.dataset.action;

  const parentdiv = button.closest(".parentdiv");

  if (!parentdiv) return;

  const taskId = parentdiv.dataset.id;

  // UPDATE
  if (action === "update") {
    const title = parentdiv.querySelector(".title");
    const description = parentdiv.querySelector(".description");

    const titleInput = parentdiv.querySelector(".edit-title");
    const descriptionInput =
      parentdiv.querySelector(".edit-description");

    title.hidden = true;
    description.hidden = true;

    titleInput.hidden = false;
    descriptionInput.hidden = false;

    titleInput.focus();
  }

  // SAVE
  if (action === "save") {
    const titleInput = parentdiv.querySelector(".edit-title");
    const descriptionInput =
      parentdiv.querySelector(".edit-description");

    const newTitle = titleInput.value.trim();
    const newDescription = descriptionInput.value.trim();

    if (newTitle.length < 5) {
      updateTask.textContent = "Title must contain at least 5 characters."
      return;
    }

    if (newDescription.length < 10) {
      updateTask.textContent = "Description must contain at least 10 characters."
      return;
    }
    else{
      updateTask.textContent = ""
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

    localStorage.setItem(
      "Mytask",
      JSON.stringify(updatedTasks)
    );

    renderTask();
  }

  // DELETE
  if (action === "delete") {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const tasks = getTask();

    const remainingTasks = tasks.filter(
      (task) => task.id !== taskId
    );


    // UPDATE localStorage

    localStorage.setItem(
      "Mytask",
      JSON.stringify(remainingTasks)
    );

    renderTask();
  }
});

// COMPLETION CHECKBOX
container.addEventListener("change", (e) => {
  if (e.target.dataset.action !== "complete") {
    return;
  }

  const parentdiv = e.target.closest(".parentdiv");

  if (!parentdiv) return;

  const taskId = parentdiv.dataset.id;

  const tasks = getTask();

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: e.target.checked
      };
    }

    return task;
  });

  localStorage.setItem(
    "Mytask",
    JSON.stringify(updatedTasks)
  );

  renderTask();
});

//EVENT LISTENERS
taskForm.addEventListener("submit", handleSubmit);

cleardata.addEventListener("click", clearData);

// INITIAL RENDER
renderTask();