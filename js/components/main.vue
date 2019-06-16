<template>
    <div>
        <form class="form" v-on:submit.prevent="addTask">
            <div class="input-group mb-3">
                <input type="text" v-model="newTask" class="form-control" placeholder="Add Task">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Add</button>
                </div>
            </div>
        </form>

        <draggable v-model="taskList" @start="drag=true" @end="drag=false" v-bind="dragOptions">
            <transition-group tag="ul" class="list-group" :name="!drag ? 'flip-list' : null">
                <li v-for="(task, taskId) in taskList" :key="taskId" class="list-group-item draggable">
                    <div>{{ task }}
                        <button v-on:click="deleteItem(taskId)" class="btn btn-icon text-muted p-1" title="Delete task"><i class="fas fa-trash-alt"></i></button>
                        <button v-on:click="editTask(taskId)" class="btn btn-icon text-muted p-1" title="Edit task"><i class="fas fa-pencil-alt"></i></button>
                    </div>
                </li>
            </transition-group>

        </draggable>

    </div>
</template>

<script>
    const draggable = require('vuedraggable');

    const TASKLIST_STORAGE_KEY = "taskList";

    let taskListStorage = {
        fetch: () => JSON.parse(localStorage.getItem(TASKLIST_STORAGE_KEY) || "[]"),
        save: taskList => localStorage.setItem(TASKLIST_STORAGE_KEY, JSON.stringify(taskList))
    };

    module.exports = {
        data: function() {
            return {
                newTask: "",
                taskList: taskListStorage.fetch(),
                drag: false
            }
        },
        components: {
            draggable
        },
        methods: {
            addTask: function () {
                if (this.newTask !== "") {

                    this.taskList.push(this.newTask);
                    this.newTask = "";
                }
            },
            deleteItem: function(taskId) {
                this.taskList.splice(taskId, 1);
            },
            editTask: function(taskId) {

            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false
                };
            }
        },
        watch: {
            taskList: {
                handler: function(taskList) {
                    taskListStorage.save(taskList)
                }
            }
        }
    }
</script>
