/**
 * Created by Administrator on 2016/7/22 0022.
 */
(function (exports) {
    'use strict';
    var STORAGE_KEY = 'todos-vuejs';

    exports.todoStorage = {
        fetch:function(){
            return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
        },
        save: function () {
            localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
        }
    }
})(window);