/**
 * Created by Administrator on 2016/7/21 0021.
 */
(function (exports) {
    'use strict';
    var filters = {
        all: function (todos) {
            return todos
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed;
            })
        }
    };
    exports.app = new Vue({
        el:'.todoapp',
        data:{
            todos :todoStorage.fetch(),
            newTodo:'',
            editedTodo:null,
            visibility:'all'
        },
        watch:{
            todos:{
                handler: function (todos) {
                    todoStorage.save()
                }
            },
            deep:true
        },
        computed:{
            filteredTodos: function () {
                return filters[this.visibility](this.todos);
            },
            remaining: function () {
                return filters.active(this.todos).length;
            },
            allDone:{
                get: function () {
                    return this.remaining === 0;
                },
                set: function (value) {
                    this.todos.forEach(function (todo) {
                        todo.complete = value;
                    })
                }
            }
        },
        method:{
            addTodo: function () {
                var value = this.newTodo && this.newTodo.trim();
                if (!value){
                    return;
                }
                this.todos.push({title:value,complete:false});
                this.newTodo = '';
            },
            removeTodo: function (todo) {
                this.todos.$remove(todo);
            },
            editTodo: function (todo) {
                this.beforeEditCache = todo.title;
                this.editedTodo = todo;
            },
            doneTodo: function (todo) {
                if(!this.editedTodo){
                    return;
                }
                this.editedTodo = null;
                todo.title = todo.title.trim();
                if(!todo.title){
                    this.removeTodo(todo);
                }
            },
            cancelEdit: function (todo) {
                this.editedTodo = null;
                todo.title = this.beforeEditCache;
            },
            removeCompleted: function () {
                this.todos = filters.active(this.todos);
            }
            
        },
        directives:{
            'todo-focus': function (value) {
                if(!value){
                    return;
                }
                var el = this.el;
                Vue.nextTick(function () {
                    el.focus();
                });
            }
        }

    })
})(window);