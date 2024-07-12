// Llamamos al formulario, input de tareas y listado de tareas para ser tratados
const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

//cargamos las tareas almacenadas en el Local Storage
document.addEventListener('DOMContentLoaded', loadTask);

//eventListener para manejar el evento de enviar y CREAR, mas no mostras la tarea 
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    //Con el valor de input creamos una nueva tarea
    const taskText = newTaskInput.value.trim();
    if (taskText != '') { //si input es diferente de vacio, agrega una nueva tarea
        addTask(taskText);
        newTaskInput.value = '';
    }
});

//Funcion para añadir una nueva tarea
function addTask(taskText) {
    const li = document.createElement('li'); //creamos un nuevo elemento li
    li.textContent = taskText; //Añadimos el texto del input a la tarea creada

    const deleteButton = document.createElement('button'); // cada tarea creada tendra un delete button
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li); //Eliminamos la tarea de la lista
        removeTaskFromLocalStorage(taskText); //Eliminamos la tarea del local storage
    });

    li.appendChild(deleteButton); //Añadimos el boton de eliminar a la tarea
    taskList.appendChild(li); //Añadimos la tarea a la lista

    saveTaskToLocalStorage(taskText); //Guardamos la tarea en el local storage
}

//Funcion para cargar las tareas del local storage
function loadTask() {
    const tasks = getTastFromLocalStorage(); //Obtenemos la tarea del localStorage
    tasks.forEach(taskText => addTask(taskText));// añadimos las tareas a la lista
}

//Funcion para obtener las tareas del local storage
function getTastFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

//funcion para guardar una tarea en el local storage 
function saveTaskToLocalStorage(taskText) {
    const tasks = getTastFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTastFromLocalStorage();
    tasks = tasks.filter(tasks => tasks !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

