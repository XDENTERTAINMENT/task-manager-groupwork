const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");
const  date  = document.getElementById("dateId");
const container = document.getElementById("container");
const cleardata = document.getElementById("cleardata");

const handleSubmit = (e) => {
  e.preventDefault();

  const task = {
    titles: taskTitleInput.value.trim(),
    description: taskDescInput.value.trim(),
    level: choose.value,
    time:date.value,
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
  }
  
    /*taskForm.reset()*/
 
};

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("Mytask")) || [];
  tasks.push(task);
  localStorage.setItem("Mytask", JSON.stringify(tasks));
}

function getTask() {
  return JSON.parse(localStorage.getItem("Mytask")) || [];
}

function clearData(){

  localStorage.clear("Mytask");
}

function renderTask() {
  const render = getTask();

  const validTasks = render.filter(data => data !== null);

  container.innerHTML = validTasks.map(data => `<div class="taskmapping">
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
   
   
   
   
  </div>`).join("");
  return validTasks;
}


console.log(renderTask)

cleardata.addEventListener
taskForm.addEventListener("submit", handleSubmit);