const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");


const display = (e) => { 
  e.preventDefault();
  
    const task={
        title:taskTitleInput.value.trim()
        description:taskDescInput.value.trim()
        title:taskTitleInput.value.trim()
    }

  console.log("i am rich"); 
  alert("hello"); 
} 

taskForm.addEventListener("submit", display);
