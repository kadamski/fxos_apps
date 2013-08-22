function processMsg(m) {
    var a = [];
    for(var i in m) {
        a.push(i+": "+m[i]);
    }
    document.getElementById('out').innerHTML+="<li>"+a.join(", ")+"</li>";    
}

function main() {
    function _clickSend() {
        saveText();
        var sms = window.navigator.mozSms;
        var text=document.getElementById('text').value;
        var con=document.getElementById('contacts').getElementsByTagName('LI');;
        var i, cb, numbers=[];
        for(i=0; i<con.length; i++) {
            cb=con[i].getElementsByTagName('input')[0];
            if(!cb.checked) {
                continue;
            }
            numbers.push(cb.value);
            console.log(cb.value);
        }
        if(numbers.length>0) {
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
    function _clickClear() {
        if(confirm("Clear text area?")) {
            clearText();
        }
    }
    document.getElementById('send').addEventListener('click', _clickSend);
//    document.getElementById('to').addEventListener('click', _clickTo);
    document.getElementById('clear').addEventListener('click', _clickClear);
    showContacts(document.getElementById('contacts'));
}

function showContacts(ul) {
    var contacts, all, i, filter, count=0;

    contacts=navigator.mozContacts;
    request=contacts.getAll({ sortBy: 'givenName', sortOrder: 'ascending' });
    request.onsuccess = function () {
        var c, li, checkbox, text;
        if(this.result) {
            c=this.result;
            li=document.createElement("LI");
            checkbox=document.createElement("INPUT");
            checkbox.type="checkbox";
            checkbox.value=c.tel[0].value;
            checkbox.name="tel";
            checkbox.style.display="inline";
            checkbox.setAttribute('data-tel', c.tel[0].value);
            checkbox.id="tel"+(count++);
            li.appendChild(checkbox);
            ul.appendChild(li);
            text=document.createTextNode([c.givenName, c.familyName].join(' '));
            li.appendChild(text);
            this.continue();
        }
    };
    request.onerror = function (err) {
        console.log(this.error.name);
    };
}

function restoreText() {
    var text=document.getElementById('text');

    console.log("retore" + localStorage.getItem("text"));
    text.value=localStorage.getItem("text") || "";
}

function saveText() {
    var text=document.getElementById('text');
    console.log("save" + text.value);
    localStorage.setItem("text", text.value);
}

function clearText() {
    var text=document.getElementById('text');
    text.value="";
    saveText();
}

document.addEventListener("DOMContentLoaded", function () {
    main();
    restoreText();
    setInterval(saveText, 5000);
})
