const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");
const  date  = document.getElementById("dateId");
const container = document.getElementById("container");

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
  localStorage.clear(task);
}

function renderTask() {
  const render = getTask();

  const validTasks = render.filter(data => data !== null);

  container.innerHTML = validTasks.map(data => `<div class="taskmapping">
   <div>
    <h3>${data.titles}</h3>
    </div>
   <div>
    <p>${data.description}</p>
   </div>
   <div>
   
   </div>
   <div></div>
   
   
   
    <p>${data.time}</p>
  </div>`).join("");
  return validTasks;
}


console.log(renderTask)
taskForm.addEventListener("submit", handleSubmit);