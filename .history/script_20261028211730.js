const taskForm = document.getElementById(`taskForm`);
const taskTitleInput = document.getElementById(`taskTitle`);
const taskDescInput = document.getElementById(`taskDesc`);
const titleError = document.getElementById(`titleError`);
const descError = document.getElementById(`descError`);
const choose = document.getElementById(`choose`);



 alert("HELLO")

taskForm.addEventListener("submit", (event)=> {
  event.preventDefault();

console.log("we are coding");
 

  const task = 
    {
      title: taskTitleInput.value.trim(),
      description: taskDescInput.value.trim(),
      choose: choose.value,
    };

  console.log(task);

  const { titleInput, description, choose } = task;

  if (titleInput === ``) {
    titleError.textContent = `task tilte cannot be empty.`;
    
  }
  else if( titleInput.length <10){
        titleError.textContent = `input cannot be less then 10 characters.`;
  }


});
