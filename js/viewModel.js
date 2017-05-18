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


//Make ko observables for members of locations object in model.js
var Restaurant = function (data){
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.imgSrc = ko.observable(data.imgSrc);
    this.street= ko.observable(data.street);
    this.cityCountry = ko.observable(data.cityCountry);
    this.yelpFormat = ko.observable(data.yelpFormat);
    this.foursquare_id = ko.observable(data.foursquare_id);
    this.address = ko.observable(data.street + ", " + data.cityCountry)

};


//viewmodel for knockout
var ViewModel = function () {

    //setting self variable to refer to viewmodel
    var self = this;



    //create observable with value in filter input box set to blank
    self.filterValue = ko.observable("");

    //set restaurant list's visibility to true
    self.listVisible = ko.observable(true);

    //set back buttons visibilty to false
    self.showBackButton = ko.observable(false);

    //variable for restaurant when clicked
    self.selectedRestaurant = ko.observable();

    //functions to animate marker's location on hover of restaurant name
    //place refers to a particular restaurant in restaurant list

    //for mouseover
    self.startBounce = function (place){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title === place.title()){
                markers[i].setAnimation(google.maps.Animation.BOUNCE);
                populateInfoWindow(markers[i], infowindow);
            }
        }
    };

    //for mouseout
    self.stopBounce = function (place){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title === place.title()){
                markers[i].setAnimation(null);
            }
        }
    };

//Function to determine restaurant list and markers shown based on value in filter input box
    self.generateList = ko.computed(function() {

        if (self.filterValue() === ""){

            self.restaurantList = ko.observableArray([]);

            //put markers on map for each marker in marker array
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }

            //create new restaurant using restaurant variable and push into restaurant list array
            locations.forEach(function (location) {

                self.restaurantList().push( new Restaurant (location));
            });

            return self.restaurantList();

        }

        else {
            var filteredRestaurants = [];

            locations.forEach(function (location) {

                for (var i = 0; i < markers.length; i++) {

                        if (markers[i].title === location.title ){

                            markers[i].setMap(map);
                            bounds.extend(markers[i].position);
                            map.fitBounds(bounds);
                        }
                    }

                var lowerCaseValue = self.filterValue().toLowerCase();

                var lowerCaseTitle = location.title.toLowerCase();

                if (lowerCaseTitle.startsWith(lowerCaseValue) === true) {
                    filteredRestaurants.push(new Restaurant (location));


                }

                else {
                    for (var j = 0; j < markers.length; j++) {
                        var markerTitle = markers[j].title.toLowerCase();
                        if (markerTitle.startsWith(lowerCaseValue) !== true ){
                            markers[j].setMap(null);
                        }
                    }
                }
            });

            self.restaurantList(filteredRestaurants);
            return self.restaurantList();
        }
    });


    //function for what happens when a restaurant is clicked in side panel
    self.changeRestaurant = function(clickedRestaurant) {

        //hide other restaurants and show back button
        self.listVisible(!self.listVisible());
        self.showBackButton(!self.showBackButton());

        //Set value in filter to blank
        self.filterValue("");

        //use ko observable with "with" binding to view info for clicked location
        self.selectedRestaurant(clickedRestaurant);

        //show marker of clicked location only
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title === clickedRestaurant.title()){
                map.setCenter(markers[i].position);
            }
            else {
                markers[i].setMap(null);
            }
        }

        //Get yelpName and foursquareId to run getApiInfo
        var yelpName = clickedRestaurant.yelpFormat();
        var foursquareId = clickedRestaurant.foursquare_id();

        //function from yelp&foursquareApi to show info for restaurant
        getApiInfo(yelpName, foursquareId);

    };

    //Reset list when restaurant is clicked
    self.restoreList = function() {
        //hide back button and show restaurants
        self.listVisible(!self.listVisible());

        self.showBackButton(!self.showBackButton());
        //clear selected restaurant
        self.selectedRestaurant(null);

        //put markers back for all locations
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
        //function from yelp&foursquareApi to clear restaurant info
        clearApiInfo();

    };

};


vm = new ViewModel();

ko.applyBindings(vm);

