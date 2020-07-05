//This is where you define the map start up options, here defined to center on Paris and to have a particular zoom. 
	var mapOptions = {
		center: [48.86, 2.33],
		zoom: 10,
		maxZoom : 20,
		minZoom: 4
	}

//This creates the map variable itself based on the options set above	
	var map = new L.map('map', mapOptions); 
	
	
	//This first is the modern world imagery, currently called from arcGIS online.
	var esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map); 
		
/*var info = L.control();

	info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.innerHTML = "<img src='DSS_stitched.jpg'>"
    return this._div;
};


info.addTo(map);*/

L.Control.Test1 = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'DSS_stitched.jpg';
        img.style.width = '600px';
		
		var draggable = new L.Draggable(img);
			draggable.enable()
        return img;
    },	
	onRemove: function(map) {
        // Nothing to do here
    }
});	
L.control.test1 = function(opts) {
    return new L.Control.Test1(opts);
}		
		
L.control.test1({ position: 'bottomleft' }).addTo(map);

		
var marker = L.marker([48.86, 2.33], {draggable: true}).addTo(map);	



var poly1 = [
  [48.86, 2.33],
  [48.92, 2.33],
  [48.92, 2.43],
  [48.86, 2.43]
];

var pg = new L.Polygon([poly1], {
  draggable: true
}).addTo(map);

var imageBounds = L.latLngBounds([
  poly1[0],
  poly1[2]
]);

var overlay = new L.ImageOverlay("DSS_stitched.jpg", imageBounds, {
  opacity: 1,
  interactive: true
}).addTo(map);


pg.on('dragstart', function (e) {
console.log(pg.getBounds());
overlay.setBounds(pg.getBounds());
});
pg.on('drag', function (e) {
console.log(pg.getBounds());
overlay.setBounds(pg.getBounds());
});
pg.on('dragend', function (e) {
console.log(pg.getBounds());
overlay.setBounds(pg.getBounds());
});

var basemap = {};
var overlays = {"Image1": overlay};
L.control.layers(basemap, overlays).addTo(map);

var opacityLayers = {
	"Image1" : overlay};

L.control.opacity(
			opacityLayers, //the variable containing all the maps
			{label: "<b>Opacity</b>", //the label for the box
			position: 'topright',
			collapsed: true} //if we want the opacity box to be collapsed or not. We can do the same thing for the control layers box if desired
			).addTo(map);

//Function to see map coordinates in console on click
		map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
		});