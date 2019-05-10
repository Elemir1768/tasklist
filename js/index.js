console.log("index runed");
var app = new Vue({
    el: "#app",
    data: {
        title: "Task List",
        newTask: "",
        items: [
            {text: "First"},
            {text: "Second"},
            {text: "First"},
            {text: "Second"}
        ]
    },
    methods: {
        addItem: function () {
            if (this.newTask !== "") {
                this.items.push({
                    text: this.newTask
                });
                this.newTask = "";
            }
        },
        deleteItem: function(index) {
            this.items.splice(index, 1);
        }
    }
});