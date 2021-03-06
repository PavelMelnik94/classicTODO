function onPageLoaded() {
//selecting dom elements for manipulation
let input = document.querySelector("input[type = 'text']"),
    ul = document.querySelector('.todos'),
    container = document.querySelector("div"),
    lists = document.querySelectorAll("li"),
    spans = document.getElementsByTagName("span"),
    pencil = document.querySelector("#pencil"),
    saveBtn = document.querySelector(".save"),
    clearBtn = document.querySelector(".clear"),
    tipsBtn = document.querySelector(".showTips"),
    tipsLi = document.querySelector('.tips'),
    publish = document.getElementById('publish'),
    wrapper = document.querySelector('.wrapper');
    
    // открыть\скрыть инпут с добавлением дел на иконку карандаша
    pencil.addEventListener('click', () => {
        wrapper.classList.toggle('hide');
    });

    // открыть список справки по клику на бтн Справка
    tipsBtn.addEventListener('click', () => {
         tipsLi.classList.toggle('hide');
    });


    console.log(ul);
    
    

function createTodo() {
    // создаем элемент ли
    const li = document.createElement("li"); 
    // создаем спэн   
    const textSpan = document.createElement("span");
    // добавляем спэну класс todo-text
    textSpan.classList.add("todo-text");
    // забираем инпан.велью 
    const newTodo = input.value;
    //впихуем в спэн значение с велью
    textSpan.append(newTodo);


    //создаем спэн
    const deleteBtn = document.createElement("span");
    //добавляем ему класс todo-trash
    deleteBtn.classList.add("todo-trash");
    // получаем иконку
    const icon = document.createElement("i");
    //добавляем классы
    icon.classList.add("fas", "fa-trash-alt");
    deleteBtn.appendChild(icon);

    ul.appendChild(li).append(textSpan, deleteBtn);
  
    input.value = "";
    listenDeleteTodo(deleteBtn);


    li.addEventListener('click', () => {
        textSpan.classList.toggle('completed');
        localStorage.setItem('todos', ul.innerHTML);
    });

   
}



// удаление отдельного элемента через уконку корзины
function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
        element.parentElement.remove();
        event.stopPropagation();
    });
}

// добавление нового дела через enter
input.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
        createTodo();
        localStorage.setItem('todos', ul.innerHTML);
    } 
});


//добавление нового дела от кнопки Добавить
publish.addEventListener('click', (e) => {
    e.preventDefault();

    if (input.value != '') {
        createTodo();
        localStorage.setItem('todos', ul.innerHTML);
    }
});


//очитстить все элементы в списке
clearBtn.addEventListener('click', () => {
    ul.innerHTML = '';
    localStorage.removeItem('todos', ul.innerHTML);
});


//сохраняем в localStorage
// saveBtn.addEventListener('click', (e) => {
// e.preventDefault();

//     localStorage.setItem('todos', ul.innerHTML);
//     saveBtn.classList.add('save-green');

//     setTimeout( () => {
//         saveBtn.classList.remove('save-red');
//         saveBtn.classList.remove('save-green');
//     }, 300);
// });




function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
        ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll("span.todo-trash");
    for (const button of deleteButtons) {
        listenDeleteTodo(button);
    }


}

// ...

loadTodos();





}


document.addEventListener("DOMContentLoaded", onPageLoaded);
