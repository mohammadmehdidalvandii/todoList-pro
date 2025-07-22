const modelDownloadBtn = document.querySelector('#download_todo');
const modelDownload = document.querySelector("#downloadTodos");
const cancelDownloadBtn = document.querySelector("#cancel_model_download");
const downloadBtn = document.querySelector("#modelDownload_todos");
const downloadFormatTodos = document.querySelector("#downloadFormat");

// get todos data 
const todosData = JSON.parse(localStorage.getItem("todos")||[]);



function handlerDownloadTodos (e){
    e.preventDefault()
    const format = downloadFormatTodos.value;
    if(format === "0"){
        alert("Please select a download format");
        return;
    };
    if(todosData.length ==="0"){
        alert('No todos to download');
        return;
    };
    switch(format){
        case 'JSON':
            downloadJSON();
            break;
        case 'PDF':
            downloadPDF()
            break;
        case 'CSV':
            
            break;
    }

    format = null;
    modelDownload.classList.remove('active')
}

function downloadJSON(){
    const jsonString = JSON.stringify(todosData , null , 2);
    const blob = new Blob([jsonString], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const aElem = document.createElement('a');
    aElem.href = url;
    aElem.download = 'todos.json';
    document.body.appendChild(aElem);
    aElem.click();
    setTimeout(()=>{
        document.body.removeChild(aElem);
        URL.revokeObjectURL(url);
    },100)
}
function downloadPDF(){

}
function downloadCSV(){

}

function handlerExitModel (){
    modelDownload.classList.remove('active');
}

function handlerShowModel (){
    if(!modelDownload.classList.contains('active')){
        modelDownload.classList.add('active');
    }
};

export function downloadTodos (){
    handlerShowModel;
    handlerExitModel;
    handlerDownloadTodos;
}


modelDownloadBtn.addEventListener("click" ,handlerShowModel);
cancelDownloadBtn.addEventListener('click',handlerExitModel);
downloadBtn.addEventListener('click', handlerDownloadTodos)