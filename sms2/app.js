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
        var numbers=$('#contacts-select option:selected').map(function() {
            return this.getAttribute('data-tel');
        }).get();
        console.log(numbers.toString());
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
    var contacts, all, i, filter, count=0, html='';

    contacts=navigator.mozContacts;
    request=contacts.getAll({ sortBy: 'givenName', sortOrder: 'ascending' });
    request.onsuccess = function () {
        var c;
        if(this.result) {
            c=this.result;
            for(var i=0; i<1; i++) {
                html+=[
                       '<option id="tel', count++, '" data-tel="', 
                       c.tel[0].value, '">', c.givenName, c.familyName,
                       '</option>'
                      ].join(' ');
            }
            this.continue();
        } else {
            $('#contacts-select').append(html).selectmenu('refresh');
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

$(document).bind("mobileinit", function(){
  $.extend( $.mobile , {
    maxTransitionWidth: 1,
    defaultDialogTransition: "none",
    defaultPageTransition: "none"
  });
});
