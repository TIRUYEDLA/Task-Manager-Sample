$(function() {

    var taskStorageKey = "task_list";

    var getTasks = function () {
        return $.parseJSON(localStorage.getItem(taskStorageKey));
    };

    var saveTasks = function (listOfTasks) {
        localStorage.setItem(taskStorageKey, JSON.stringify(listOfTasks));
    }

    var addNewTask = function() {

        var name = $("#TaskName").val();
        var date = $("#TaskDate").val();
        var assignedTo = $("#TaskAssignedTo").val();

        var existingTasks = getTasks();

        existingTasks.unshift({ name: name, date: date, assigned: assignedTo });

        saveTasks(existingTasks);
        updateListWithData();
    };

    var updateListWithData = function () {
        var tasks = getTasks();

        var taskListContainer = $("#TaskList");
        taskListContainer.empty();

        $.each(tasks, function(inedx, task) {
            var newTaskItem = $("<li></li>");

            var taskName = $("<span></span>").text(task.name + " ");

            var date = $("<span></span>")
                .addClass("date")
                .text(task.date);

            var taskNameContainer = $("<span></span>")
                .addClass("task-name")
                .append(taskName)
                .append(date);

            var name = $("<span></span>")
                .addClass("name")
                .append(task.assigned);

            newTaskItem.append(taskNameContainer).append(name);

            taskListContainer.append(newTaskItem);
        });
    };

    updateListWithData();

    $("#CreateNewTask").on("click", addNewTask);
});