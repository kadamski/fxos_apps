var app = (function(T) {
    'use strict';

    var _fire = function (time) {
        var d = new Date((new Date()).getTime() + time),
            request = navigator.mozAlarms.add(d, "ignoreTimezone", {'bla': 1});

        request.onsuccess = function () {
            console.log("The alarm has been scheduled");
        };

        request.onerror = function () { 
            console.log("An error occurred: " + this.error.name);
        };
    };

    var init = function (canv) {
        var request;

        navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
            console.log("alarm!");

            var protocol = window.location.protocol;
            var host = window.location.host;
            window.open(protocol + '//' + host + '/ring.html', 'ring_screen', 'attention');
        });

        request = navigator.mozAlarms.getAll();
        request.onsuccess = function () {
            console.log("Alarms:");
            this.result.forEach(function (alarm) {
                console.log('Id: ' + alarm.id);
                console.log('date: ' + alarm.date);
                console.log('respectTimezone: ' + alarm.respectTimezone);
                console.log('data: ' + JSON.stringify(alarm.data));
            });
        };
        document.getElementById('button').onclick = function () {_fire(10000);window.close();};
    };

    return {
        'init': init
    };
}());

document.addEventListener("DOMContentLoaded", function () {
    app.init();
})
