window.onload = function(e){

    console.log("able");
   const addTaskWindow =  document.querySelector('.add-task');

   const btnAddTask = document.querySelector('.btn-addTask');

   addTaskWindow.classList.add('hide-item'); 

   btnAddTask.addEventListener('click',function(e){
    addTaskWindow.classList.add('scroll');
    addTaskWindow.classList.toggle('hide-item');
   })
}