function main() {
    var a = new MozActivity({ name: "pick", data: { type: "webcontacts/contact" }});
    a.onsuccess = function() { 
        var c=this.result;
        alert(c.name + "," + c.number); 
    };
    a.onerror = function() { alert("Can't pick contact list!"); };
}

document.addEventListener("DOMContentLoaded", function () {
    main();
})
