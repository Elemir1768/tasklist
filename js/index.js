require("bootstrap");
import "../styles/index.scss";
var Vue = require("vue/dist/vue.js");
const maincontent = require("./components/main.vue").default;

console.log("index runed3704");
new Vue({
    el: "#app",
    data: {
        title: "Task List",
    },
    components: {
        maincontent: maincontent
    }
});
