var app = (function(L) {
    'use strict';

    var OSMURL='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var OSMATTRIB='Map data © OpenStreetMap contributors';

    var _map=null, _marker;

    var _onLocationFound = function(e) {
        var radius = e.accuracy / 2;
        L.circle(e.latlng, radius, {'fillOpacity': 0.5}).addTo(_map);
    };

    var  _onLocationError = function(e) {
    };

    var _updatePos = function(p) {
        document.getElementById('lat').value=p.lat;
        document.getElementById('lon').value=p.lng;
    };

    var _onDrag = function(e) {
        _updatePos(e.target.getLatLng());
    };

    var _onClick = function(e) {
        if(_marker) {
            _map.removeLayer(_marker);
        }
        _marker=new L.marker(e.latlng, {'draggable': true});
        _marker.addTo(_map);
        _marker.on("dragend", _onDrag);
        _updatePos(e.latlng);
    };

    var init = function(id) {
        _map = L.map(id);
        L.tileLayer(OSMURL, {'attribution': OSMATTRIB, 
                             'maxZoom': 19
        }).addTo(_map);
        _map.locate({setView: true, maxZoom: 15});
        _map.on('locationfound', _onLocationFound);
        _map.on('locationerror', _onLocationError);
        _map.on('click', _onClick);

        return _map;
    };

    return {
        init: init
    };
}(L));

document.addEventListener("DOMContentLoaded", function () {
    app.init('map');
})
