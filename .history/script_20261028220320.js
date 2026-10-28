const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");

const display = (e) => {
  e.preventDefault();

  const task = {
    title: taskTitleInput.value.trim(),
    description: taskDescInput.value.trim(),
    choose: choose.value.trim(),
  };

  const { title, description, choose } = task;

  if(title==""){
     titleError.textContent= "input can not be empty"
  }
  else if

  console.log("i am rich");
  alert("hello");
};

taskForm.addEventListener("submit", display);
