var google;

function init() {
    var defaultLatlng = new google.maps.LatLng(45.7326507,7.3029441);

    var mapOptions = {
        zoom: 15,
        center: defaultLatlng, 
        scrollwheel: false,
        styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions); 

    var marker = new google.maps.Marker({
		position: defaultLatlng,
		map: map,
		title: 'Siamo qui',
		icon: 'images/loc.png'
	});
	
	var infowindow = new google.maps.InfoWindow({
		content: 'Via Chambéry 125, 11100 Aosta'
	});

	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
}
google.maps.event.addDomListener(window, 'load', init);