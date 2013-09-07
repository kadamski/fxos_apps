var app = (function(T) {
    'use strict';

    var _c = null;
    var _t = null;
    var _a = null;

    var _resize = function () {
        _c.width = window.screen.width;
        _c.height = window.screen.height-20;
        _t.redraw();
    };

    var _finished = function () {
        var stop = false;
        _a.addEventListener('ended', function() {
            if(!stop) {
                this.play();
            }
        }, false);
        _a.play();
        alert("ALARM!");
        stop = true;
        _a.pause();
    };

    var init = function (canv) {
        _c = canv;
        _t = timerWidget(_c);
        _c.addEventListener("finished", _finished);
        _a = document.getElementById('s1');
        window.screen.addEventListener('mozorientationchange', _resize);
        _t.setTime(1*60);
        _resize();
    };

    return {
        'init': init
    };
}(timerWidget));

document.addEventListener("DOMContentLoaded", function () {
    canv = document.getElementById('timer');
    app.init(canv);
})
