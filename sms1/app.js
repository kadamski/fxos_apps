function processMsg(m) {
    var a = [];
    for(var i in m) {
        a.push(i+": "+m[i]);
    }
    document.getElementById('out').innerHTML+="<li>"+a.join(", ")+"</li>";    
}

function main() {
    var sms = window.navigator.mozSms;
    var cur=sms.getMessages(new MozSmsFilter(), false);
    cur.onsuccess = function() {
        var m = this.result.message;
        if(!m) {
            return;
        }
        processMsg(m);
        this.result.continue();
    }
    cur.onerror = function() {alert("ERR: " + this.error.name);};
}

document.addEventListener("DOMContentLoaded", function () {
    main();
})
