const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");
const date = document.getElementById("dateId");
const container = document.getElementById("container");
const cleardata = document.getElementById("cleardata");

const handleSubmit = (e) => {
  e.preventDefault();

  const task = {
    titles: taskTitleInput.value.trim(),
    description: taskDescInput.value.trim(),
    level: choose.value,
    time: date.value,
  };

  console.log(task);

  const { titles, description } = task;

  titleError.textContent = "";
  descError.textContent = "";

  if (titles === "") {
    titleError.textContent = "input can not be empty";
  } else if (titles.length < 5) {
    titleError.textContent = "characters should not be less than 5";
  } else if (description === "") {
    descError.textContent = " input can not be empty";
  } else if (description.length < 10) {
    descError.textContent = "characters should not be less than 10";
  } else {
    saveTask(task);
    renderTask();
    taskForm.reset();
  }
};

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("Mytask")) || [];
  tasks.push(task);
  localStorage.setItem("Mytask", JSON.stringify(tasks));
}

function getTask() {
  return JSON.parse(localStorage.getItem("Mytask")) || [];
}

function clearData() {
  localStorage.clear("Mytask");
  renderTask();
}

function renderTask() {
  const render = getTask();

  const validTasks = render.filter((data) => data !== null);

  container.innerHTML = validTasks
    .map(
      (data) => `<div class="parentdiv">
      
             <div class="taskmapping">
   <div>
   <p>Title</p>
    <h3 class=title>${data.titles}</h3>
    </div>
   <div>
   <p>Description</p>
    <p class="description">${data.description}</p>
   </div>
   <div>
   <p>Priority</p>
    <p  class="priority">${data.level}</p>
   </div>
   <div>
   <p>Due date</p>
    <p  class="date">${data.time}</p>
   </div>
  
   
  </div>




   <!-- the inline editing -->
          <div class="inline-button">
            <button>
              <div><i class="fa-solid fa-pen"></i></div>
              update
            </button>
            <button class="save">
              <div><i class="fa-solid fa-floppy-disk"></i></div>
              save
            </button>
            <button class="delete">
              <div class="trash"><i class="fa-solid fa-trash"></i></div>
              delete
            </button>
          </div>
        </div>
      </div>
      </div>
      <div>
      
      `,
    )
    .join("");


    
  return validTasks;


  
}


// INLINE UPDATE, SAVE AND DELETE
container.addEventListener("click", (e) => {

  const button = e.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;

  const parentdiv = button.closest(".parentdiv");

  if (!parentdiv) return;

  const taskId = parentdiv.dataset.id;

  // UPDATE BUTTON
  if (action === "update") {

    const title = parentdiv.querySelector(".title");
    const description = parentdiv.querySelector(".description");

    const titleInput = parentdiv.querySelector(".edit-title");
    const descriptionInput = parentdiv.querySelector(".edit-description");

    title.hidden = true;
    description.hidden = true;

    titleInput.hidden = false;
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

    // Immediately update the UI
    renderTask();
  }

  // DELETE BUTTON
  if (action === "delete") {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    const tasks = getTask();

    const remainingTasks = tasks.filter(
      (task) => task.id !== taskId
    );

    localStorage.setItem("Mytask", JSON.stringify(remainingTasks));

    // Immediately update the UI
    renderTask();
  }

console.log(renderTask);

cleardata.addEventListener("click", clearData);
taskForm.addEventListener("submit", handleSubmit);
