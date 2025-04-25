
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('tasks.json');
    const data = await res.json();

    Object.entries(data).forEach(([categoriaNombre, tareas]) => {
      const categoriaElement = createTask(categoriaNombre, tareas);
      document.getElementById('container').appendChild(categoriaElement);
    });

  } catch (err) {
    console.error('Error cargando el JSON:', err);
  }
});


  function crearElementoTarea(tarea) {
    const task = document.createElement('li');
    task.classList.add('task-app__task__item');
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = tarea.id;
    checkbox.classList.add('task-app__checkbox');
  
    const label = document.createElement('label');
    label.htmlFor = tarea.id;
    label.classList.add('task-app__label');
    label.textContent = tarea.labelText;
  
    const span = document.createElement('span');
    span.classList.add('task-app__span');
    span.textContent = tarea.dateText;
  
    const link = document.createElement('a');
    link.href = tarea.project.url;
    link.classList.add('task-app__project-link');
    link.textContent = tarea.project.name;
  
    task.append(checkbox, label, span, link);
    return task;
  }
  
  function crearEncabezadoCategoria(nombreCategoria) {
    const fragment = document.createDocumentFragment();
  
    const title = document.createElement('h3');
    title.textContent = nombreCategoria;
    title.setAttribute('id', 'nameCategori');
    fragment.appendChild(title);
  
    const addTask = document.createElement('button');
    addTask.textContent = 'Agregar tarea';
    addTask.setAttribute('id', 'addTask');
    addTask.setAttribute('onclick', 'modalTask()');
    fragment.appendChild(addTask);
  
    return fragment;
  }
  
  function createTask(categoriaNombre, tareas) {
    const newTaskList = document.createElement('ul');
    newTaskList.classList.add('task-app__tasks');
    newTaskList.setAttribute('id', categoriaNombre);
  
    // Agregar encabezado (título + botón)
    const encabezado = crearEncabezadoCategoria(categoriaNombre);
    newTaskList.appendChild(encabezado);
  
    // Agregar tareas
    tareas.forEach(tarea => {
      const tareaElemento = crearElementoTarea(tarea);
      newTaskList.appendChild(tareaElemento);
    });
  
    return newTaskList;
  }
  

function chanseMode(){
    const bodyMode = document.getElementById('mode-app')
    bodyMode.classList.toggle('Dark-mode')
}
function buttonMenu(){
    const menu = document.getElementById('menu')
    menu.classList.toggle('hidden')

}


function modalTask() {
  const modal = document.createElement('div');
  modal.classList.add('container-modal'); 
  
  //  tiulo del modal
  const title = document.createElement('h3');
  title.textContent = 'Add Task';
  
  // creacion del formulario
  const formTask = document.createElement('form');
  formTask.classList.add('add-task-form');

  // label  nombre del formulario
  const labelTaskName = document.createElement('label');
  labelTaskName.setAttribute('for', 'nameTask');
  labelTaskName.textContent='Task Name';
  
  //input de nombre del formulario
  const inputTaskName = document.createElement('input');
  inputTaskName.setAttribute('id', 'nameTask');

  // label de fecha de entrega
  const labelDueDate = document.createElement('label');
  labelDueDate.setAttribute('for', 'dueDate');
  labelDueDate.textContent='Due Date';

   // input de fecha de entrega
  const inputDueDate= document.createElement('input');
  inputDueDate.setAttribute('id', 'dueDate');

  // label proyecto
  const labelProject = document.createElement('label');
  labelProject.setAttribute('for', 'Project');
  labelProject.textContent='Project';
   
  // input proyecto
  const inputProject= document.createElement('input');
  inputProject.setAttribute('id', 'Project');

  // Botón para enviar (opcional)
  const btnSubmit = document.createElement('button');
  btnSubmit.setAttribute('type', 'submit');
  btnSubmit.textContent = 'Agregar';

  // Agregamos todos los elementos al form
  formTask.append(
    labelTaskName, inputTaskName,
    labelDueDate, inputDueDate,
    labelProject, inputProject,
    btnSubmit
  );

  modal.append(title)

  modal.appendChild(formTask);

  // Agregar el modal al DOM
  document.body.appendChild(modal);


};
