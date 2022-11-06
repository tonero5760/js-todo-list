window.onload = function (e) {
  console.log("able");
  //    const addTaskWindow =  document.querySelector('.add-task');

  //    const btnAddTask = document.querySelector('.btn-addTask');

  //    addTaskWindow.classList.add('hide-item');

  //    btnAddTask.addEventListener('click',function(e){
  //     addTaskWindow.classList.add('scroll');
  //     addTaskWindow.classList.toggle('hide-item');
  //    })

  //Data controller
  const TodoController = (function () {})();

  //user interface controller
  const UiController = (function () {

    //domstrings used to map css classes to object
    const DomStrings = {
      TASKBTN: ".btn-addTask",
      TASKFORM: ".add-task",
      TASKSUBMIT: ".submit-task",
      TASKCANCEL: ".cancel-task",
      TASKTITLE: ".title",
      TASKDESC: ".desc",
      TASKDATE: ".date",
      TASKASSIGNED: ".user",
    };

    const submitTaskBtn = document.querySelector(DomStrings.TASKSUBMIT);

    //toggle task form
    document
      .querySelector(DomStrings.TASKBTN)
      .addEventListener("click", function (e) {
        const taskForm = document.querySelector(DomStrings.TASKFORM);
        taskForm.classList.add("scroll");
        taskForm.classList.toggle("hide-item");
      });

    //read user input data
  

    //get the task input
    const getTaskInput = () => {
        const inputData = {
            title: document.querySelector(DomStrings.TASKTITLE).value,
            desc: document.querySelector(DomStrings.TASKDESC).value,
            date: document.querySelector(DomStrings.TASKDATE).value,
            user: document.querySelector(DomStrings.TASKASSIGNED).value,
          };
        return inputData;
    };

    document.addEventListener("keypress", function (e) {
      if (e.which === 13 || e.keyCode === 13) {
        e.preventDefault();
        console.log(getTaskInput());
      }
    });

    submitTaskBtn.addEventListener("submit", function (e) {
      e.preventDefault();
    
      console.log(getTaskInput());

    });

    return {
      DomStrings: DomStrings,
    };
  })();

  //main controller
  const Controller = (function (todoCtrl, uiCtrl) {
    const init = () => {
      console.log("Application starts");
      const { DomStrings } = uiCtrl;
      //hide the form by default
      document.querySelector(DomStrings.TASKFORM).classList.add("hide-item");
    };

    return {
      init: init,
    };
  })(TodoController, UiController);

  Controller.init();
};
