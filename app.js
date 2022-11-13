window.onload = function (e) {
  console.log("able");

  //Data controller
  const TodoController = (function () {
    //Todo holder for different todos
    let TodoHolder = [];
    const Todo = function (id, title, desc, date, assignedTo) {
      (this.id = id),
        (this.title = title),
        (this.desc = desc),
        (this.date = date),
        (this.assignedTo = assignedTo);
    };

    const createTodo = (id, title, desc, date, user) => {
      return new Todo(id, title, desc, date, user);
    };

    const addTodo = (singleTodo) => {
      //read previous saved values den add to it
      const savedList = updateTodoList()
      const modifiedList = [...savedList,singleTodo];
      TodoHolder= [...modifiedList];
    };

    const getTodoList = () => {
      return TodoHolder;
    };

    const saveTodo = ()=>{
      const todoListString = JSON.stringify(getTodoList());
      localStorage.setItem('todos',todoListString);
      console.log(todoListString);
    }

    const updateTodoList = ()=>{
      const todoList = JSON.parse(localStorage.getItem('todos'));
      return todoList;

    }

    return {
      createTodo: createTodo,
      addTodo: addTodo,
      getTodoList: getTodoList,
      savetodo:saveTodo,
      updateTodoList:updateTodoList
    };
  })();

  //user interface controller
  const UiController = (function (todoCtrl) {
    //domstrings used to map css classes to object

    const todoList = todoCtrl.getTodoList();
    const DomStrings = {
      TASKBTN: ".btn-addTask",
      TASKFORM: ".add-task",
      TASKSUBMIT: ".submit-task",
      TASKCANCEL: ".cancel-task",
      TASKTITLE: ".title",
      TASKDESC: ".desc",
      TASKDATE: ".date",
      TASKASSIGNED: ".user",
      TASKITEMHOLDER: ".task-comp",

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

    //update the app ui
    //   console.log(todoList);

    const updateUI = (todoObjs) => {
      let todos = todoObjs();
      // let todos = todoObjs;
      let todoString = todos.map((todo) => {
        const { id, title, desc, date, assignedTo } = todo;
        return `
            <div class="row todo-container" data-id="${id}"><div class="radio"><input type="radio" name="" id=""/></div><div class="todo"><h1 class="todo-title">${title}</h1><p class="todo-body">${desc}</p><div class="todo-detail"><span class="time"><input type="date" name="" id="" value="${date}"></span><span class="fa fa-alt"></span> &bullet;<span class="assigned"> <span class="fa fa-user"></span>${assignedTo}</span> &bullet; <button class="btn btn-sm btn-info btn-pill"><i class="fa fa-maximize" aria-hidden="true"></i></button> <button class="btn btn-sm btn-danger btn-pill"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div></div>
            `;
      });

      return todoString;
    };

    const clearInput = ()=>{
      document.querySelector(DomStrings.TASKTITLE).value = " ";
      document.querySelector(DomStrings.TASKDESC).value = " ";
      document.querySelector(DomStrings.TASKDATE).value=" ";
    }

    return {
      DomStrings: DomStrings,
      updateUI: updateUI,
      clearInput : clearInput,
      getInputs: function () {
        return {
          title: document.querySelector(DomStrings.TASKTITLE).value,
          desc: document.querySelector(DomStrings.TASKDESC).value,
          date: document.querySelector(DomStrings.TASKDATE).value,
          user: document.querySelector(DomStrings.TASKASSIGNED).value,
        };
      },
    };
  })(TodoController);

  //main controller
  const Controller = (function (todoCtrl, uiCtrl) {
    //return constants from uiCtrl and todoCtrl
    const DomStrings = uiCtrl.DomStrings;
    const singleTodo = todoCtrl.createTodo;
    const addTodo = todoCtrl.addTodo;
    //todolist from localstorage
    const updatetodoList = todoCtrl.updateTodoList;

    //module lvl todolist
    const todoList  = todoCtrl.getTodoList
    const updateUI = uiCtrl.updateUI;
    const taskContainer = document.querySelector(DomStrings.TASKITEMHOLDER);
    taskContainer.innerHTML = " ";

    const init = () => {
      
      console.log("Application starts");

      //populate the todo lists
      const ui = uiCtrl.updateUI(todoCtrl.updateTodoList);

      taskContainer.insertAdjacentHTML("afterbegin", ui);

      //hide the form by default
      document.querySelector(DomStrings.TASKFORM).classList.add("hide-item");
    };

    const getID = () => {
      return crypto.randomUUID();
    };

    const addItem = () => {
      
      const { title, desc, date, user } = uiCtrl.getInputs();
      if (title == "" || desc == "" || date == "") {
        console.log("Empty input");
        return;
      }

      //get the todo id
      const uuid = getID();

      //get the user input and create todo object
      newTodo = singleTodo(uuid, title, desc, date, user);

      //add single todo to list
      addTodo(newTodo);

     

      //updateUI
      const ui = updateUI(todoList).join("");
      // taskContainer.innerHTML = ui;
      taskContainer.insertAdjacentHTML("afterbegin", ui);

      //clear input
      uiCtrl.clearInput();

      //hide overlay form
      document.querySelector(DomStrings.TASKFORM).classList.add('hide-item')

      todoCtrl.savetodo();
      
    };

    document
      .querySelector(DomStrings.TASKSUBMIT)
      .addEventListener("submit", function (e) {
        e.preventDefault();

        addItem();
      });

    document.addEventListener("keypress", function (e) {
      if (e.which === 13 || e.keyCode === 13) {
        e.preventDefault();
        addItem();
      }
    });

    return {
      init: init,

    };
  })(TodoController, UiController);

  Controller.init();
};

// build a random task notification slider, it should be d first page
