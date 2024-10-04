document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('#task');
    const taskList = document.querySelector('#tasks');
    const taskCounter = document.querySelector('#task-counter');
    let pendingTasks = 0;
    let completedTasks = 0;

    // Actualizar el contador de tareas
    function updateTaskCounter() {
        taskCounter.innerHTML = `Pending tasks: ${pendingTasks} | Completed tasks: ${completedTasks}`;
    }

    // Añadir nueva tarea
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

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Eliminar';
            deleteBtn.classList.add('delete');

            const taskControls = document.createElement('div');
            taskControls.classList.add('task-controls');
            taskControls.appendChild(cb);
            taskControls.appendChild(deleteBtn);

            li.appendChild(taskControls);
            taskList.appendChild(li);

            taskInput.value = '';

            pendingTasks++;
            updateTaskCounter();

            // Marcar tarea como completada o pendiente
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

            // Eliminar tarea
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

    // Limpiar tareas completadas
    document.querySelector('#clear-completed').onclick = () => {
        document.querySelectorAll('li.completed').forEach((item) => {
            item.remove();
        });
        completedTasks = 0;
        updateTaskCounter();
    };

    // Limpiar todas las tareas
    document.querySelector('#clear-all').onclick = () => {
        taskList.innerHTML = '';
        pendingTasks = 0;
        completedTasks = 0;
        updateTaskCounter();
    };
});