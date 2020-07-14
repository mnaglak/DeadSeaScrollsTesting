//This is where you define the map start up options, here defined to center on Paris and to have a particular zoom. 
	var mapOptions = {
		center: [48.86, 2.33],
		zoom: 10,
		maxZoom : 20,
		minZoom: 10
	}

//This creates the map variable itself based on the options set above	
	var map = new L.map('map', mapOptions); 

	
//This first is the modern world imagery, currently called from arcGIS online.
	var esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map); 

//creates a DOM element with the desired HTML on map inititation		
/*var info = L.control();

	info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.innerHTML = "<img src='DSS_stitched.jpg'>"
    return this._div;
};
info.addTo(map);*/

//lets you drag the DOM
/*L.Control.Test1 = L.Control.extend({
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
		
L.control.test1({ position: 'bottomleft' }).addTo(map);*/

//Draggable Marker
//var marker = L.marker([48.86, 2.33], {draggable: true}).addTo(map);	


//Creates polygons that the images are attached to. Need to define size based on map units.
var poly1 = [
  [48.86, 2.33],
  [48.92, 2.33],
  [48.92, 2.43],
  [48.86, 2.43]
];


//Makes polygons dragable; opacity and fill opacity let you drag by clicking the interal portions of the polygon
var pg = new L.Polygon([poly1], {
  draggable: true,
  fill: true,
  color: "#FFFFFF",
  fillOpacity: .1,
  opacity: 0
}).addTo(map);


//set image bounds to equal polygon size
var imageBounds = L.latLngBounds([
  poly1[0],
  poly1[2]
]);

//add images
var overlay = new L.ImageOverlay("DSS_stitched.jpg", imageBounds, {
  opacity: 1,
  interactive: true
}).addTo(map);

		
//repeat for 2nd image		
var poly2 = [
  [48.76, 2.23],
  [48.82, 2.23],
  [48.82, 2.33],
  [48.76, 2.33]
];

var pg2 = new L.Polygon([poly2], {
  draggable: true,
  fill: true,
  color: "#FFFFFF",
  fillOpacity: .1,
  opacity: 0
}).addTo(map);



var imageBounds2 = L.latLngBounds([
  poly2[0],
  poly2[2]
]);

var overlay2 = new L.ImageOverlay("DSS_stitched2.jpg", imageBounds2, {
  opacity: 1,
  interactive: true
}).addTo(map);


//note that autoZIndex must be turned off for you to have layers automatically come to the top on click
var basemap = {};
var overlays = {"Image1": overlay, "Image2": overlay2};
L.control.layers(basemap, overlays, {autoZIndex: false}).addTo(map);

var opacityLayers = {
	"Image1" : overlay,
	"Image2" : overlay2};

//Opacity controls
L.control.opacity(
			opacityLayers, //the variable containing all the maps
			{label: "<b>Opacity</b>", //the label for the box
			position: 'topright',
			collapsed: true} //if we want the opacity box to be collapsed or not. We can do the same thing for the control layers box if desired
			).addTo(map);


//mouseover tooltips and the attachment of the images to the polygons on drag			
pg.on("mouseover", function(e){
pg.bindTooltip("Image 1", {direction: "top"} ).openTooltip();})

pg.on("mouseout", function(e){
pg.unbindTooltip();})


pg.on('dragstart', function (e) {
console.log(pg.getBounds());
overlay.setBounds(pg.getBounds());
});
pg.on('drag', function (e) {
console.log(pg.getBounds());
overlay.setBounds(pg.getBounds());
pg.unbindTooltip();
});
pg.on('dragend', function (e) {

console.log(pg.getBounds());
overlay.setBounds(pg.getBounds());
overlay.bringToFront();
});

pg2.on("mouseover", function(e){
pg2.bindTooltip("Image 2", {direction: "top"} ).openTooltip();})

pg2.on("mouseout", function(e){
pg2.unbindTooltip();})

pg2.on('dragstart', function (e) {
console.log(pg2.getBounds());
overlay2.setBounds(pg2.getBounds());
});
pg2.on('drag', function (e) {
console.log(pg2.getBounds());
overlay2.setBounds(pg2.getBounds());
pg2.unbindTooltip();
});
pg2.on('dragend', function (e) {
console.log(pg2.getBounds());
overlay2.setBounds(pg2.getBounds());
overlay2.bringToFront();
});
