window.onload = function (e) {
  console.log("able");

  //Data controller
  const TodoController = (function (ctrl, uiCtrl) {
    
    const Todo = function(id,title,desc,date,assignedTo){
        this.id = 1,
        this.title = title,
        this.desc = desc,
        this.date = date,
        this.assignedTo = assignedTo
    }
  })();

  //user interface controller
  const UiController = (function (todoCtrl) {
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

    return {
      DomStrings: DomStrings,
      getInputs: function(){
        return{
            title: document.querySelector(DomStrings.TASKTITLE).value,
            desc: document.querySelector(DomStrings.TASKDESC).value,
            date: document.querySelector(DomStrings.TASKDATE).value,
            user: document.querySelector(DomStrings.TASKASSIGNED).value
        }
      }
    };
  })(TodoController);

  //main controller
  const Controller = (function (todoCtrl, uiCtrl) {
  const DomStrings = uiCtrl.DomStrings

    console.log(DomStrings);
    const init = () => {
      console.log("Application starts");
      //hide the form by default
      document.querySelector(DomStrings.TASKFORM).classList.add("hide-item");
    };

    const addItem = ()=>{
        const { title,desc,date } = uiCtrl.getInputs()

        if(title == "" || desc == "" || date == ""){
            console.log('Empty input');
            return;
        }
        console.log(uiCtrl.getInputs())
    }

    document.querySelector(DomStrings.TASKSUBMIT).addEventListener("submit", function (e) {
       
        e.preventDefault();
        addItem()
      
    });

    document.addEventListener("keypress", function (e) {
      if (e.which === 13 || e.keyCode === 13) {
        e.preventDefault();
        addItem()
     
      }
    });



    return {
      init: init,
    };
  })(TodoController, UiController);

  Controller.init();
};
