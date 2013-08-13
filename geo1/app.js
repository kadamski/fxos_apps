
function geo(output) {
    output.innerHTML = "<p>Locating…</p>";

    function _lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
    function _long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }


    function _success(position) {
        var c = position.coords;
        var latitude  = c.latitude;
        var longitude = c.longitude;

        var h  = '<ul><li>Time: ' + position.timestamp;
        h += ' <li>Latitude: ' + latitude + ' °';
        h += ' <li>Longitude: ' + longitude +  '°';
        h += ' <li>Accuracy: ' + c.accuracy + ' m';
        h += ' <li>Altitude: ' + c.altitude + ' m';
        h += ' <li>Altitude accuracy: ' + c.altitudeAccuracy + ' m';
        h += ' <li>Heading: ' + c.heading + ' °';
        h += ' <li>Speed: ' + c.speed + ' m/s';
        h += '</ul>';
        output.innerHTML=h;

        var img = new Image();
        var zoom = 15;
        var y = _lat2tile(latitude, zoom);
        var x = _long2tile(longitude, zoom);
        img.src = "http://c.tile.openstreetmap.org/"+zoom+"/"+x+"/"+y+".png";

        output.appendChild(img);
    };

    function _error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    navigator.geolocation.getCurrentPosition(_success, _error);
}

function main() {
    var msgDiv = document.getElementById('msg');

    if (!navigator.geolocation){
        msg.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    geo(msgDiv);
}

document.addEventListener("DOMContentLoaded", function () {
    main();
})
