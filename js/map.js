var map;

// Array for the markers on the map
var markers = [];


//variables to display directions
var directionsDisplay;
var directionsService;


//Get directions from a restaurant to an entered location
function directionsFrom(directionsService, directionsDisplay) {
    var start = document.getElementById('directionsfrom-start').value;
    for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
    }
    var end = document.getElementById('directionsfrom-end').value;
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }, function(response, status) {
    if (status === 'OK') {
        directionsDisplay.setDirections(response);
        $("#right-panel").animate({width:'toggle'},350);
        $("#panel").animate({width:'toggle'},350);
    } else {
        window.alert('Directions request failed due to ' + status);
    }
    });
}

//Get directions to a restaurant from an entered location
function directionsTo(directionsService, directionsDisplay) {
    var start = document.getElementById('directions2-start').value;
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    var end = document.getElementById('directions2-end').value;
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    },
    function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);

            $("#right-panel").animate({width:'toggle'},350);
            $("#panel").animate({width:'toggle'},350);

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function populateInfoWindow(marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent("<div>" + marker.title + "</div><div>" + marker.street +"</div>");
        infowindow.open(map, marker);

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener("closeclick", function() {
            infowindow.marker = null;
        });
    }
}

//function to show details when marker is clicked
function changeRestaurant(marker){
    locations.forEach(function (location) {
    if (this.title === location.title) {
        console.log(this.title);
        vm.changeRestaurant(location);
    }
    });
}

//group of functions for marker click event
function focusOnMarker (marker) {
    populateInfoWindow(this, infowindow);
    map.setCenter(this.position);
    this.setAnimation(google.maps.Animation.BOUNCE);
    vm.changeRestaurant(this);
}

//Constructor for Google map
function initMap() {


//Night mode map style
    var styledMapType = new google.maps.StyledMapType(
    [{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ],
  {name: 'Night'}
);


    // Create a map object, and include the MapTypeId to add to the map type control.
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2672, lng: -97.7431},
    zoom: 13,
    mapTypeControlOptions: {
    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
  });


  //Associate the styled map with the MapTypeId.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');


  bounds = new google.maps.LatLngBounds();


  // The following group uses the locations array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {

    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    var street = locations[i].street;
    var imgSrc = locations[i].imgSrc;
    var cityCountry = locations[i].cityCountry;
    var yelpFormat = locations[i].yelpFormat;
    var foursquare_id = locations[i].foursquare_id;



    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      street: street,
      cityCountry: cityCountry,
      yelpFormat: yelpFormat,
      foursquare_id: foursquare_id,
      imgSrc: imgSrc,
      animation: google.maps.Animation.DROP,
      id: i
    });

    //Create info window
    infowindow = new google.maps.InfoWindow();

    //Show window and set center when a marker is clicked
    marker.addListener("click", focusOnMarker);

    // Push the marker to our array of markers.
    markers.push(marker);

    bounds.extend(markers[i].position);

    map.fitBounds(bounds);


}
//Code from Udacity review
  google.maps.event.addDomListener(window, 'resize', function() {
  map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
});


//Variables for directions
directionsDisplay = new google.maps.DirectionsRenderer();
directionsService = new google.maps.DirectionsService();

directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById('right-panel'));

}


















