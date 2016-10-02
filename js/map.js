
      // Array for the markers on the map
      var markers = [];

      var map;
      $("#right-panel").hide()
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var styledMapType = new google.maps.StyledMapType(
 [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
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

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));


        var bounds = new google.maps.LatLngBounds();

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          var street = locations[i].street;
          var imgSrc = locations[i].imgSrc;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            street: street,
            imgSrc: imgSrc,
            animation: google.maps.Animation.DROP,
            id: i
          });

          // Push the marker to our array of markers.
          markers.push(marker);

          bounds.extend(markers[i].position);


          map.fitBounds(bounds);

         //Show window and set center when a marker is clicked
          marker.addListener('click', function() {

              populateInfoWindow(this, infowindow)
              map.setCenter(this.position);
              //$("#panel").animate({width:'toggle'},350);
          });

        }

        //Center map on clicked value and remove all other markers
        $(".restaurant-name").click(selectRestaurant)

        function selectRestaurant() {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].title === $(this).text()){
                    map.setCenter(markers[i].position);
                }
                else {
                    markers[i].setMap(null);
                }
            }
        };

        var getThere = function() {
            directionsTo(directionsService, directionsDisplay);

        };

        var getBack = function(){
          directionsFrom(directionsService, directionsDisplay);
        }
        document.getElementById('get-directions-to').addEventListener('click', getThere);
        document.getElementById('get-directions-from').addEventListener('click', getBack);

 $("#back-to-list").click(function(){
        $("#right-panel").animate({width:'toggle'},350);
             $("#panel").animate({width:'toggle'},350);
   directionsDisplay.setDirections({routes: []});
 for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);

      })

 $("#filter").keyup(function(){
  var val = $(this).val().toLowerCase();

  var places = $(".restaurant-name")

  places.each(function(){
    var text = $(this).text().toLowerCase()
     if (val ===""){
      $(".list").show()
      $(".restaurant-name").show()
      for (var i = 0; i < markers.length; i++) {
        console.log('this should happen 10 times')
                markers[i].setMap(map);
                bounds.extend(markers[i].position);

            }
               map.fitBounds(bounds);
    }

    else if (text.startsWith(val)!== true){
      $(".list").hide()
      $(this).hide()
      for (var i = 0; i < markers.length; i++) {
                if (markers[i].title === $(this).text()){
                    markers[i].setMap(null);
                }

            }
   } else {
    $(this).show()


   }

   })



  });



        //Functions to toggle bounce animations and windows on hover

        function startBounce(){
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].title === $(this).text()){
                    markers[i].setAnimation(google.maps.Animation.BOUNCE)
                    populateInfoWindow(markers[i], infowindow)
                }
            }
        };

        function stopBounce(){
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].title === $(this).text()){
                    markers[i].setAnimation(null)
                }

            }
        };

        //Toggle bounce and open window on marker when name in panel is hovered over
        $(".restaurant-name").hover(startBounce, stopBounce);



        // Put markers back when back button clicked

        $("#back").click(function(){

            $(this).hide();

            // Reset Map
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        });


      var infowindow = new google.maps.InfoWindow();



      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div><div>' + marker.street +'</div');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      };


}

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












