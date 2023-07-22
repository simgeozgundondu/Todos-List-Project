//Tüm elementleri seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteToTodo);
    filter.addEventListener("keyup",filterTodos);   
    clearButton.addEventListener("click",clearAllTodos);
}

function showAlert(type,message){
    
        
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.role="alert";
    alert.textContent= message;

    firstCardBody.appendChild(alert);

    //setTimeOut
    setTimeout(function(){
        alert.remove();
    },2000);//2 sn sonra yazı kalkacak

}

function addTodo(e){
    const newTodo=todoInput.value.trim();
    let todos=getTodosFromStorage();
    for(let i=0;i<=todos.length;i++){
        if(newTodo.value===todo.value){
            showAlert("danger","Bu Todo Zaten Mevcut");
            return;
        }
    };

    if(newTodo===""){
        showAlert("danger","Lütfen bir todo giriniz...");
    }else{
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...");
    }
    
    e.preventDefault();
} 
function addTodoToUI(newTodo){
    
    const listItem=document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between";
    //link
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    //Text Node
    listItem.appendChild(document.createTextNode(newTodo));

    listItem.appendChild(link);
    //Todo liste listItem ı ekleme
    todoList.appendChild(listItem);

    todoInput.value="";

    console.log(listItem);

}



function addTodoStorage(newTodo){

    let todos=getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
    
}


function getTodosFromStorage(){            //Storagedan Todoları Alma
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

function deleteToTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();

        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);    
        showAlert("success","Todo başarıyla silindi...");
    }

}

function deleteTodoFromStorage(deleteTodo,index){
    let todos= getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1); //verieln indexten itibaren 1 tane eleman sil
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            
            listItem.setAttribute("style","display:none !important"); //important koymazsak flex displayı förmüyor
        }else{
            listItem.setAttribute("style","display:block");
        }
    });
}

function clearAllTodos(e){
    if(confirm("Tüm Todoları Silmek İstediğinize Emin misiz?")){
        //Arayüzden tüm todolari silöe
        // todoList.innerHTML=""; //Yavaş bir yöntem ama en basiti

        while(todoList.value!=null){
            todoList.removeChild(todoList.firstElementChild);
        }

        //Local Storage den tüm taskları temizleme
        localStorage.removeItem("todos");
    }
}




