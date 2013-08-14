function handleVisibilityChange() {
    if(document.hidden) {
        document.getElementById('out').innerHTML+='hidden ';
    } else {
        document.getElementById('out').innerHTML+='visible ';
    }
}

function main() {
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

document.addEventListener("DOMContentLoaded", function () {
    main();
})
