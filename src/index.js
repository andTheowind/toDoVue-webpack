console.log("Hello World!");
import Vue from 'vue'
import './css/style.css'
const template = require('./template.v.html');
// console.log(template);
const body = {
    template: template,
    el: '#app',
    data() {
        return {
            appTitle: 'Список дел на Vue',
            inputValue: '',
            isAppActive: false,
            isActive: false,
            inputPlaceholder: 'Введите задачу',
            tasks: []
        }
    },
    async mounted() {
        const data = await localStorage.getItem('tasks')
        if (data) {
            this.tasks = JSON.parse(data)
        }
    },
    methods: {
        inputCreateTaskHandler(event) {
            this.inputTask = event.target.value
        },
        addNewTask() {
            let newTask = this.inputTask
            if (newTask !== undefined) { // проверка введены ли символы в input
                let newTaskWithOutSpaces = newTask.replace(/ /g, "")
                if (newTaskWithOutSpaces !== '') { // проверка не состоит ли строка только из пробелов
                    this.tasks.unshift(this.inputTask)
                    this.inputTask = ''
                    localStorage.setItem('tasks', JSON.stringify(this.tasks))
                }
            }
        },
        toUpperCase(item) {
            let firstSymbol = item[0].toUpperCase()
            return firstSymbol + item.substr(1)
        },
        inputKeyPress(event) {
            if (event.key === 'Enter') {
                this.addNewTask()
            }
        },
        deleteTask(index) {
            this.tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    }
}

new Vue(body)

// Vue.createApp(body).mount('body')