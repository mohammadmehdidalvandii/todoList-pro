const addTodo = document.querySelector('#addTodo');
const todoModel = document.querySelector('#todoModel');
const cancelBtn = document.querySelector('#cancel_model_addTodo')
const todoTitle  = document.querySelector("#title_todo")
const todoSubject  = document.querySelector("#subject_todo")
const saveTodo = document.querySelector('#addTodo_save');
const errorElem = document.querySelector("#error");

function handlerSaveTodo (){
    const titleValue = todoTitle.value;
    const subjectValue = todoSubject.value;
    if(!titleValue.trim() || !subjectValue.trim()){
        alert("All filed required");
        return
    }
    if(titleValue.length > 25 ){
        alert("Title must be at least 25 characters")
        return
    }
    const todo = {
        id:crypto.randomUUID(),
        title: titleValue,
        subject: subjectValue,
        date:Date.now()
    }

    let todos = JSON.parse(localStorage.getItem("todos"))|| [];

    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos));
    todoTitle.value ="";
    todoSubject.value = "";
    alert("Todo Add Successfully ✅");
    todoModel.classList.remove('active')
}


 function handlerAddTodo (){
    if(!todoModel.classList.contains('active')){
        todoModel.classList.add('active')
    }
  
};

function handlerExitModel (){
    todoModel.classList.remove('active')
}

export function  addTodos (){
    handlerAddTodo;
    handlerSaveTodo;
}   


addTodo.addEventListener("click" ,handlerAddTodo)
cancelBtn.addEventListener("click" , handlerExitModel)
saveTodo.addEventListener('click', handlerSaveTodo)