window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from localStorage on page load
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(savedTask => {
        createTaskElement(savedTask.text, savedTask.completed);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim(); 

        // Check if the task is not empty before creating a new task element
        if (task !== "") {
            createTaskElement(task);
            saveTasksToLocalStorage();
        } else {
            // Display an alert or provide feedback to the user that the task cannot be empty
            alert("Please enter a task before adding it.");
        }
    });

    function createTaskElement(task, completed = false) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_done_el = document.createElement('button');
        task_done_el.classList.add('done');
        task_done_el.innerText = completed ? 'Undone' : 'Done';

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_done_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';

        if (completed) {
            task_el.classList.add('completed');
        }

        task_done_el.addEventListener('click', () => {
            task_el.classList.toggle('completed');
            task_done_el.innerText = task_el.classList.contains('completed') ? 'Undone' : 'Done';
            task_input_el.setAttribute('readonly', 'readonly');
            saveTasksToLocalStorage(); // Save tasks after marking as done
        });

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit" && !task_el.classList.contains('completed')) {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                updateTaskInLocalStorage(task_input_el.value);
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            removeTaskFromLocalStorage(task);
        });
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(list_el.children).map(task_el => {
            return {
                text: task_el.querySelector('.text').value,
                completed: task_el.classList.contains('completed')
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskInLocalStorage(updatedTask) {
        const tasks = Array.from(list_el.children).map(task_el => {
            return {
                text: task_el.querySelector('.text').value,
                completed: task_el.classList.contains('completed')
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(taskToRemove) {
        const tasks = Array.from(list_el.children).map(task_el => {
            return {
                text: task_el.querySelector('.text').value,
                completed: task_el.classList.contains('completed')
            };
        });
        const updatedTasks = tasks.filter(task => task.text !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        // Display alert when task is deleted
        alert('Are you sure you want to delete this task? : ' + taskToRemove);
    }
});

function getUserName() {
    var userName;
    do {
        userName = prompt("Hello there, Enter first your Name/Nickname.");
    } while (userName === null || userName === "");
    return userName;
}

function displayGreeting() {
    var userName = getUserName();
    var greetingContainer = document.createElement("div");
    greetingContainer.classList.add("greeting-container");
    greetingContainer.innerHTML = "<h1>Welcome, " + userName + "!</h1><p>What do you have planned for today?</p>";

    document.body.insertBefore(greetingContainer, document.body.firstChild);
}

displayGreeting();
