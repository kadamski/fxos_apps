var ring = (function() {
    'use strict';

    var _ring = null,
        _stop = false;

    var stop = function () {
        _stop = true;
        _ring.pause();
        window.close();
    };

    var init = function (canv) {
        _ring = document.getElementById('ring');

        _ring.addEventListener('ended', function() {
            if(!_stop) {
                this.play();
            }
        }, false);
        _ring.play();

        _stop = false;
    };

    return {
        'init': init,
        'stop': stop
    };
}());

document.addEventListener("DOMContentLoaded", function () {
    ring.init();
})
