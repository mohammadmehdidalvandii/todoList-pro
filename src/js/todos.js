const wrapperTodos = document.querySelector("#todos_container");
const showDetailsModel = document.querySelector('#showDetails');
const btnDetails = document.querySelector('#btn_details_model');
const btnEdit = document.querySelector('#showEditModel');
const exitModelEdit = document.querySelector("#cancel_model_edit");
const showDeleteModel = document.querySelector('#deleteModel');
const btnExitDeleteModel =document.querySelector("#cancel_model_delete");

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
        if(!showDeleteModel.classList.contains('active')){
            showDeleteModel.classList.add('active')
        }
        if(todoID){
            const findTodo = todos.find((todo)=>todo.id == todoID);
            const todoModelDelete = document.querySelector(".model_deleteTodo")
            todoModelDelete.insertAdjacentHTML('beforebegin',`
                <p class="modelDelete_text">Are you sure you want to delete this <span class='modelDelete_text_span'>${findTodo.title}</span>?</p>
                `)    
            }
            const deleteBtn = document.querySelector('#model_delete_todos');
        
            deleteBtn.onclick = function(){
                todos = todos.filter((todo)=>todo.id !== todoID);
                localStorage.setItem('todos',JSON.stringify(todos))
                alert('todo is deleted successfully ✅')
                window.location.reload();
            }

        // if(todoID){
        // todos = todos.filter((todo)=> todo.id !== todoID);
        // localStorage.setItem('todos', JSON.stringify(todos))
        // showTodos();
        // }
    };
    if(button.classList.contains("btn_details")){
        if(!showDetailsModel.classList.contains('active')){
            showDetailsModel.classList.add('active');

            const findTodo = todos.find((todo)=>todo.id == todoID);
            const date = new Date(findTodo.date);
            if(findTodo){
                const todoContainer = document.querySelector('#todo_details');
                todoContainer.innerHTML = '';
                todoContainer.insertAdjacentHTML('beforeend',`
                        <ul class="model_details_items" >
                    <li class="item">
                        <span class="title">Title :</span>
                        <span class="text">${findTodo.title}</span>
                    </li>
                    <li class="item">
                        <span class="title">Subject :</span>
                        <span class="text">${findTodo.subject}</span>
                    </li>
                    <li class="item">
                        <span class="title">degree of difficulty :</span>
                        <span class="text">${findTodo.rating < 2 ? "Low difficulty level":"High level of difficulty"} - level = ${findTodo.rating}</span>
                    </li>
                    <li class="item">
                        <span class="title">Date  :</span>
                        <span class="text">${date}</span>
                    </li>
                </ul>
                    `)
            }
        }
    }
    if(button.classList.contains('btn_edit')){
        if(!btnEdit.classList.contains('active')){
            btnEdit.classList.add('active');
        };
        const findTodo = todos.find((todo)=> todo.id == todoID);
        if(findTodo){
            const titleTodo = document.querySelector("#title_todo_edit"); 
            const subjectTodo  = document.querySelector("#subject_todo_edit");
            titleTodo.value = findTodo.title;
            subjectTodo.value = findTodo.subject;

            let ratingSelect = findTodo.rating;

             const stars = document.querySelectorAll('.icon-star');
             stars.forEach((star , index)=>{
                if(index < ratingSelect){
                    star.classList.add('active')
                }
                star.onclick = function() {
                    stars.forEach((star)=>{star.classList.remove("active")})
                    ratingSelect = star.getAttribute('data-value')
                    for (let i = 0; i < ratingSelect; i++) {
                    stars[i].classList.add('active'); 
                }
            };
             })
            
            const saveEdit = document.querySelector("#model_Edit_todos");
            saveEdit.onclick = function(){
                findTodo.title = titleTodo.value;
                findTodo.subject = subjectTodo.value;
                findTodo.rating = ratingSelect;
                localStorage.setItem('todos',JSON.stringify(todos));
                alert("update todos is successfully ✅");
                window.location.reload();
            }

        }
    }   
    
} 

function handlerExitModelDetails(){
    if(showDetailsModel.classList.contains('active')){
        showDetailsModel.classList.remove('active')
    }
}
function handlerExitEditModel (){
    if(btnEdit.classList.contains('active')){
        btnEdit.classList.remove('active')
    }
}

function handlerExitDeleteModel (){
    if(showDeleteModel.classList.contains('active')){
        showDeleteModel.classList.remove('active')
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
                           <button class="todoCart_btn btn success btn_edit" data-id="${todo.id}"><i class="fas fa-edit"></i></button>
                           <button class="todoCart_btn btn secondary btn_details" data-id="${todo.id}"><i class="fa-solid fa-eye"></i></button>
                       </div>
                   </div>
               `);
});

 }
wrapperTodos.addEventListener("click", handlerButtonClick)
btnDetails.addEventListener('click', handlerExitModelDetails)
exitModelEdit.addEventListener('click',handlerExitEditModel)
btnExitDeleteModel.addEventListener('click', handlerExitDeleteModel )
export function operationTodos (){
    showTodos()
}

operationTodos()



