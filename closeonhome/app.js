function main() {
    var count=0;
    setInterval(function() {document.getElementById('out').innerHTML=count++;}, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("visibilitychange", function(){ window.close() });
    main();
})
