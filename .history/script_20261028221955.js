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

  console.log(task);

  const { title} = task;
  task.title


  if(title==""){
     titleError.textContent= "input can not be empty"
  }
  else if(title<10){
    titleError.textContent="characters should not be less than 10"
  }

  console.log("i am rich");
  alert("hello");
};



taskForm.addEventListener("submit", display);
