function processMsg(m) {
    var a = [];
    for(var i in m) {
        a.push(i+": "+m[i]);
    }
    document.getElementById('out').innerHTML+="<li>"+a.join(", ")+"</li>";    
}

function main() {
    function _clickSend() {
        var sms = window.navigator.mozSms;
        var text=document.getElementById('text').value;
        var number=document.getElementById('number').value;
        var numbers=number.split(';');
        if(numbers.length) {
            var req=sms.send(numbers, text);
            console.log(req);
            for(var i=0; i < req.length; i++) {
                req[i].onsuccess = function() {
                    processMsg(this.result);
                    }
            }
        }
    }
    function _clickTo() {
        var a = new MozActivity({ name: "pick", data: { type: "webcontacts/contact" }});
        a.onsuccess = function() { 
            var c=this.result;
            var n=document.getElementById('number')
            if(n.value) { n.value+=';'; }
            n.value+=c.number;
        };
        a.onerror = function() { alert("Can't pick contact list!"); };
    }
    document.getElementById('send').addEventListener('click', _clickSend);
    document.getElementById('to').addEventListener('click', _clickTo);

}

document.addEventListener("DOMContentLoaded", function () {
    main();
})