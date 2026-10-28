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

  const { title, description } = task;

   if (description.length < 10) {
    descError.textContent = "characters should not be less than 10";
    return;
  } else if (title.length < 5) {
    titleError.textContent = "characters should not be less than 5";
    return;
  } else{
      titleError
  }
  
   if (title === "") {
    titleError.textContent = "input can not be empty";
    return;
  } else if (description === "") {
    descError.textContent = " input can not be empty";
    return;
  } 

};

taskForm.addEventListener("submit", display);
