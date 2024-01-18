document.addEventListener("DOMContentLoaded", function () {
    const inputB = document.querySelector(".enter-task");
    const listContainer = document.querySelector(".task-view");
    const inputT = document.querySelector(".tasks");

    function addtask(taskText, isDone) {
        if (taskText === '') {
            alert("Nothing");
        } else {
            let li = document.createElement("li");
            li.innerHTML = taskText;
            li.className = isDone ? 'checked' : 'unchecked';
            inputT.appendChild(li);

            let spn = document.createElement('span');
            spn.innerHTML = '\u00d7';
            li.appendChild(spn);
            saveData();
        }
        inputB.value = "";
    }

    listContainer.addEventListener("click", function (del) {
        if (del.target.tagName === "LI") {
            del.target.classList.toggle("checked");
            saveData();
        } else if (del.target.tagName === "SPAN") {
            del.target.parentElement.remove();
            saveData();
        }
    }, false);

    function saveData() {
        let tasks = [];
        document.querySelectorAll('.tasks li').forEach(function (task) {
            tasks.push({
                task: task.innerHTML,
                done: task.classList.contains("checked")
            });
        });
        localStorage.setItem("data", JSON.stringify(tasks));
    }

    function showData() {
        let stored = localStorage.getItem("data");
        if (stored) {
            let tasks = JSON.parse(stored);
            tasks.forEach(function (task) {
                addtask(task.task, task.done);
            });
        }
    }

    showData();
});
