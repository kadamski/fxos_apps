var app = (function(T) {
    'use strict';

    var _c = null;
    var _t = null;

    var _resize = function () {
        _c.width = window.innerWidth;
        _c.height = window.innerHeight;
        _t.redraw();
    };

    var _finished = function () {
        alert("END");
    };

    var init = function (canv) {
        _c = canv;
        _t = timerWidget(_c);
        _c.addEventListener("finished", _finished);
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
