function setupInstallBtn() {
    if (!navigator.mozApps) {
        return;
    }

    var _install = function () {
        var request = navigator.mozApps.install('http://k.japko.eu/tmp/fxos_test/geo2/manifest.webapp');
        request.onsucces = function() {
            document.getElementById('install').style.cssText="display: none";
        }
        request.onerror = function() {
            document.getElementById('install').innerHTML="Install error" + this.error.name;
        }
    }

    var request = navigator.mozApps.getSelf();
    request.onsuccess = function() {
        var installDiv = document.getElementById('install');
        if(!this.result) {
            document.getElementById('installBtn').addEventListener("click", _install);
            installDiv.style.cssText="";
        }
    }
    request.onerror = function() {
        document.getElementById('install').innerHTML="Install error";
    }
}

function geo(output) {
    var count=0;
    var zoom = 15;
    var last_x=NaN;
    var last_y=NaN;

    output.innerHTML = "<p>Locating…</p>";

    function _lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
    function _long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }


    function _success(position) {
        var c = position.coords;
        var date = new Date(position.timestamp);
        var latitude  = c.latitude;
        var longitude = c.longitude;

        var h  = '<ul><li>Time: ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        h += ' <li>Latitude: ' + latitude + ' °';
        h += ' <li>Longitude: ' + longitude +  '°';
        h += ' <li>Accuracy: ' + c.accuracy + ' m';
        h += ' <li>Altitude: ' + c.altitude + ' m';
        h += ' <li>Altitude accuracy: ' + c.altitudeAccuracy + ' m';
        h += ' <li>Heading: ' + c.heading + ' °';
        h += ' <li>Speed: ' + c.speed + ' m/s';
        h += ' <li>Count: ' + count;
        h += '</ul>';
        output.innerHTML=h;

        var y = _lat2tile(latitude, zoom);
        var x = _long2tile(longitude, zoom);
        if(x!=last_x || y!=last_y) {
            var img=document.getElementById('mapTile');
            if(!img) {
                img = new Image();
                img.setAttribute('id', "mapTile");
                output.appendChild(img);
            }
            img.src = "http://c.tile.openstreetmap.org/"+zoom+"/"+x+"/"+y+".png";
        }
        count++;
    };

    function _error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    navigator.geolocation.watchPosition(_success, _error);
}

function main() {
    var msgDiv = document.getElementById('msg');

    if (!navigator.geolocation){
        msg.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    setupInstallBtn();
    geo(msgDiv);
}

document.addEventListener("DOMContentLoaded", function () {
    main();
})
