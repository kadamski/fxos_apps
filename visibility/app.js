function handleVisibilityChange() {
    document.getElementById('out').innerHTML+='<br>'+document.hidden+","+document.visibilityState;
}

function main() {
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

document.addEventListener("DOMContentLoaded", function () {
    main();
})
