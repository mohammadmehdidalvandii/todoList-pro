const addTodo = document.querySelector('#addTodo');
const todoModel = document.querySelector('#todoModel');
const cancelBtn = document.querySelector('#cancel_model_addTodo')



 function handlerAddTodo (){
    if(!todoModel.classList.contains('active')){
        todoModel.classList.add('active')
    }
  
};

function handlerExitModel (){
    todoModel.classList.remove('active')
}

export function  addTodos (){
    handlerAddTodo

}

addTodo.addEventListener("click" ,handlerAddTodo)
cancelBtn.addEventListener("click" , handlerExitModel)
