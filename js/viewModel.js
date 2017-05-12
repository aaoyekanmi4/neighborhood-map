
//Make ko observables for members of locations object in model.js
var Restaurant = function (data){
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.imgSrc = ko.observable(data.imgSrc);
    this.street= ko.observable(data.street);
    this.cityCountry = ko.observable(data.cityCountry);
    this.yelpFormat = ko.observable(data.yelpFormat);
    this.foursquare_id = ko.observable(data.foursquare_id)
};
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




var ViewModel = function () {



    var self = this;

      self.startBounce = function (place){
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].title === place.title()){

          markers[i].setAnimation(google.maps.Animation.BOUNCE)
          populateInfoWindow(markers[i], infowindow)
          }
      }
    };

    self.stopBounce = function (place){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title === place.title()){
                markers[i].setAnimation(null)
            }

        }
    };



    self.filterValue = ko.observable("");
    self.listVisible = ko.observable(true);


self.showBackButton = ko.observable(false);

    //Create an observable array of the restaurants in locations list


    self.generateList = ko.computed(function() {

if (self.filterValue() === ""){

  self.restaurantList = ko.observableArray([]);
   for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);

        }

     locations.forEach(function (location) {

        self.restaurantList().push( new Restaurant (location));


      });
     return self.restaurantList()

}

else {

var filteredRestaurants = []
      locations.forEach(function (location) {
        var lowerCaseValue = self.filterValue().toLowerCase()
        var lowerCaseTitle = location.title.toLowerCase()


   if (lowerCaseTitle.startsWith(lowerCaseValue) == true) {
 filteredRestaurants.push(new Restaurant (location));

for (var i = 0; i < markers.length; i++) {
          var markerTitle = markers[i].title.toLowerCase()
      if (markerTitle.startsWith(lowerCaseValue) == true ){

       markers[i].setMap(map);
       bounds.extend(markers[i].position);
       map.fitBounds(bounds);


     }
     }

   }
   else {
    for (var i = 0; i < markers.length; i++) {
      var markerTitle = markers[i].title.toLowerCase()
if (markerTitle.startsWith(lowerCaseValue) !== true ){
markers[i].setMap(null);
}

   }
 }
 });

self.restaurantList(filteredRestaurants);
  return self.restaurantList()


 }

 });



    self.selectedRestaurant = ko.observable();



    //function for what happens when a restaurant is clicked in side panel
    this.changeRestaurant = function(clickedRestaurant) {
      //Hide other restaurants and show back button
      self.listVisible(!self.listVisible());
      self.selectedRestaurant(clickedRestaurant)
for (var i = 0; i < markers.length; i++) {
          if (markers[i].title === clickedRestaurant.title()){
              map.setCenter(markers[i].position);
          }
          else {
              markers[i].setMap(null);
          }
      }
      var yelpName = clickedRestaurant.yelpFormat()
      var foursquareId = clickedRestaurant.foursquare_id()

      //Set value in filter to blank
      self.filterValue("");

      //function from yelp&foursquareApi to show info for restaurant
      getApiInfo(yelpName, foursquareId)

      //Show back button
      self.showBackButton(!self.showBackButton());


    };
    //Reset list when restaurant is clicked
    self.restoreList = function() {
      self.listVisible(!self.listVisible());
        self.selectedRestaurant(null);
        self.showBackButton(!self.showBackButton());
        for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
clearApiInfo();

    };

}



vm = new ViewModel();

ko.applyBindings(vm);


