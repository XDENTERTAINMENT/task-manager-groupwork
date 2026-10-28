const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");
const  date

const display = (e) => {
  e.preventDefault();

  const task = {
    title: taskTitleInput.value.trim(),
    description: taskDescInput.value.trim(),
    level: choose.value,
  };

  console.log(task);

  const { title, description } = task;

  if (title === "") {
    titleError.textContent = "input can not be empty";
  } else if (title.length < 5) {
    titleError.textContent = "characters should not be less than 5";
  } else if (description === "") {
    descError.textContent = " input can not be empty";
  } else if (description.length < 10) {
    descError.textContent = "characters should not be less than 10";
  } else {
    titleError.textContent = "";
    descError.textContent = "";
  }

  return;
};

taskForm.addEventListener("submit", display);
