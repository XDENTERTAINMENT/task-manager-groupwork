const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const choose = document.getElementById("choose");




taskForm.addEventListener("submit", (e) => { 
  e.preventDefault(); // 2. Stop the page from refreshing
  console.log("i am rich"); 
  alert("hello"); 
} );
