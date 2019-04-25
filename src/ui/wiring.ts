import Vue from 'vue';

var app = new Vue({

    el: '#app',
    
    data: {
        ssologin: '/nothing',
        message: "test message"
    }
    })
    
    console.log("Loaded")
    document.addEventListener('DOMContentLoaded', function () {
    
    console.log("after vue")
    fetch("http://localhost:2424/GetSSOURL")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
    
            app.ssologin = data;
            console.log("Test: " + app.ssologin)
        });
    });