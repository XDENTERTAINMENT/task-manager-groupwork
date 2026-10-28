const taskForm = document.getElementById(`taskForm`);
const taskTitleInput = document.getElementById(`taskTitle`);
const taskDescInput = document.getElementById(`taskDesc`);
const titleError = document.getElementById(`titleError`);
const descError = document.getElementById(`descError`);
const choose = document.getElementById(`choose`);

taskForm.addEventListener("submit", (event)=> {
  event.preventDefault();


  alert("HELLO")

  const task = 
    {
      titleInput: taskTitleInput.value.trim(),
      descInput: taskDescInput.value.trim(),
      choose: choose.value,
    },
  ];

  console.log(task);

  const { titleInput, descInput, choose } = task;

  if (titleInput === `` && titleInput.length <= 10) {
    titleError.textContent = `task tilte cannot be empty.`;
    titleError.textContent = `input cannot be less then 10 characters.`;
    return;
  }
});
