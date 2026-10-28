const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");



const display = ()=>{
   console.log(" i am rich");
}

taskForm.addEventListener("submit", (event)=> {
  event.preventDefault();
  
  display()
  

});
