document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('#task');
    const taskDateInput = document.querySelector('#date');
    const taskList = document.querySelector('#tasks');
    const taskCounter = document.querySelector('#task-counter');
    let pendingTasks = 0;
    let completedTasks = 0;

    // Actualiza el contador de tareas
    function updateTaskCounter() {
        taskCounter.innerHTML = `Tareas pendientes: ${pendingTasks} | Tareas completadas: ${completedTasks}`;
    }

    // Añade nueva tarea
    document.querySelector('#new-task').onsubmit = (e) => {
        e.preventDefault();
        if (taskInput.value.trim() !== "") {
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.classList.add('task-checkbox');
    
            const li = document.createElement('li');
            const taskText = document.createElement('span');
            taskText.textContent = taskInput.value.trim();
            li.appendChild(taskText);
    
            // Fecha actual
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const formattedDate = `${year}-${month}-${day}`;
    
            const taskDate = document.createElement('span');
            taskDate.classList.add('task-date');
            taskDate.textContent = `Día: ${formattedDate}`; // Establece fecha automaticamente
    
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Eliminar';
            deleteBtn.classList.add('delete');
    
            const editBtn = document.createElement('button');
            editBtn.innerHTML = 'Editar'; 
            editBtn.classList.add('edit');
    
            const taskControls = document.createElement('div');
            taskControls.classList.add('task-controls');
            taskControls.appendChild(cb);
            taskControls.appendChild(deleteBtn);
            taskControls.appendChild(editBtn); 
    
            li.appendChild(taskText);
            li.appendChild(taskDate);
            li.appendChild(taskControls);
            taskList.appendChild(li);
    
            taskInput.value = '';
            taskDateInput.value = ''; 
    
            pendingTasks++;
            updateTaskCounter();
    
            // Marca tarea como completada o pendiente
            cb.addEventListener('change', function () {
                if (this.checked) {
                    li.classList.add('completed');
                    completedTasks++;
                    pendingTasks--;
                } else {
                    li.classList.remove('completed');
                    completedTasks--;
                    pendingTasks++;
                }
                updateTaskCounter();
            });
    
            editBtn.addEventListener('click', function () {
                if (li.classList.contains('editing')) {
                    // Guarda cambios
                    taskText.textContent = taskInput.value.trim();
                    taskDate.textContent = `Día: ${taskDateInput.value || formattedDate}`; // Mantiene la fecha actual si no se proporciona otra
                    li.classList.remove('editing');
                    editBtn.innerHTML = 'Editar';
                } else {
                    // Hace editable
                    li.classList.add('editing');
                    taskInput.value = taskText.textContent;
                    taskDateInput.value = taskDate.textContent.replace('Día: ', '');
                    editBtn.innerHTML = 'Guardar';
                }
            });


            // Elimina tarea
            deleteBtn.addEventListener('click', function () {
                if (cb.checked) {
                    completedTasks--;
                } else {
                    pendingTasks--;
                }
                li.remove();
                updateTaskCounter();
            });
        }
    };

    // Limpia tareas completadas
    document.querySelector('#clear-completed').onclick = () => {
        document.querySelectorAll('li.completed').forEach((item) => {
            item.remove();
        });
        completedTasks = 0;
        updateTaskCounter();
    };

    // Limpia todas las tareas
    document.querySelector('#clear-all').onclick = () => {
        taskList.innerHTML = '';
        pendingTasks = 0;
        completedTasks = 0;
        updateTaskCounter();
    };
});