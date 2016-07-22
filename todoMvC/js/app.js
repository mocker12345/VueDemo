/**
 * Created by Administrator on 2016/7/21 0021.
 */
(function (exports) {
    exports.app = new Vue({
        el:'.todoapp',
        data:{
            newTodo:'',
            editedTodo:null,
            visibility:'all'
        },
        watch:{
            todo:{
                handler: function (todos) {
                    todoStorage.save()
                }
            }
        }


    })
})(window);