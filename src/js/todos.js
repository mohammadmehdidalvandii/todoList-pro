const wrapperTodos = document.querySelector("#todos_container");

let todos = JSON.parse(localStorage.getItem('todos')) || []

function handlerButtonClick(event){
    const button = event.target.closest('button');
    if(!button) return;

    // get id todo by dataset = data-id
    const todoID = button.dataset.id;
    if(button.classList.contains("btn_completed")){
        const titleTodo = document.querySelector(".todoCart_title");
        const findTodoID = todos.find((todo)=>todo.id == todoID);
        if(findTodoID){
            findTodoID.complete = true;
            titleTodo.classList.add('completed', findTodoID.complete === true);
            localStorage.setItem('todos', JSON.stringify(todos))
            showTodos();
        }
    };
    if(button.classList.contains('btn_delete')){
        if(todoID){
        todos = todos.filter((todo)=> todo.id !== todoID);
        localStorage.setItem('todos', JSON.stringify(todos))
        showTodos();
        }
    }
    
} 


 const showTodos =  ()=>{
    wrapperTodos.innerHTML =''
    todos.forEach((todo) => {
               wrapperTodos.insertAdjacentHTML('beforeend', `
                   <div class="todoCart">
                       <h6 class="todoCart_title ${todo.complete ? "completed":""} ">${todo.title}</h6>
                       <div class="todoCart_buttons">
                           <button class="todoCart_btn btn primary btn_completed" data-id="${todo.id}"><i class="fa-solid fa-check"></i></button>
                           <button class="todoCart_btn btn cancel btn_delete" data-id="${todo.id}"><i class="fa-solid fa-trash"></i></button>
                           <button class="todoCart_btn btn success"><i class="fas fa-edit"></i></button>
                           <button class="todoCart_btn btn secondary"><i class="fa-solid fa-eye"></i></button>
                       </div>
                   </div>
               `);
});

 }
wrapperTodos.addEventListener("click", handlerButtonClick)

export function operationTodos (){
    showTodos()
}

operationTodos()



