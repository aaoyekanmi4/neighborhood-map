
//viewmodel for knockout
var ViewModel = function () {

    //setting self variable to refer to viewmodel
    var self = this;

    //observables to show each restaurant's details
    self.category = ko.observable();
    self.title = ko.observable();
    self.street = ko.observable();
    self.cityCountry = ko.observable();
    self.imgSrc = ko.observable();
    self.overallRating = ko.observable();
    self.phone = ko.observable();
    self.review = ko.observable();
    self.hours = ko.observable();
    self.priceRange = ko.observable();
    self.menu = ko.observable();
    self.foursquareHeading = ko.observable();
    self.tipsList = ko.observableArray();

    //observable for map error
    self.mapError = ko.observable();

    //create observable with value in filter input box set to blank
    self.filterValue = ko.observable("");

    //set restaurant list's visibility to true
    self.listVisible = ko.observable(true);

    //set individual restaurant visiblity to false
    self.detailsVisible = ko.observable(false);



    //set back buttons visibilty to false
    self.showBackButton = ko.observable(false);


    //animation when  name in list is clicked
    self.startBounce = function (location){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title === location.title){
                markers[i].setAnimation(google.maps.Animation.BOUNCE);
                populateInfoWindow(markers[i], infowindow);
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
                //Create address for directions API
                location.address = location.street + "," + location.cityCountry

                self.restaurantList().push(location);
            });

            return self.restaurantList();

        }

        else {
            var filteredRestaurants = [];

            locations.forEach(function (location) {
                location.address = location.street + "," + location.cityCountry
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
                    filteredRestaurants.push(location);


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
        self.listVisible(false);

        //show restaurant details div
        self.detailsVisible(true);



        self.showBackButton(true);



        //Set value in filter to blank
        self.filterValue("");

        //animate marker on click
        self.startBounce(clickedRestaurant);

        //show marker of clicked location only
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title === clickedRestaurant.title){
                map.setCenter(markers[i].position);
            }
            else {
                markers[i].setMap(null);
            }
        }

        //Get yelpName and foursquareId to run getApiInfo
        self.title(clickedRestaurant.title);
        self.street(clickedRestaurant.street);
        self.cityCountry(clickedRestaurant.cityCountry);
        self.imgSrc(clickedRestaurant.imgSrc);

        var yelpName = clickedRestaurant.yelpFormat;
        var foursquareId = clickedRestaurant.foursquare_id;

        //function from yelp&foursquareApi to show info for restaurant
        getApiInfo(yelpName, foursquareId);

    };

    //Reset list when restaurant is clicked
    self.restoreList = function() {
        //hide back button and show restaurants
        self.listVisible(!self.listVisible());

        self.showBackButton(!self.showBackButton());

        //clear selected restaurant
        self.detailsVisible(!self.detailsVisible());



        //clear foursquare tips list
        self.tipsList([]);

        //put markers back for all locations
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);



    };

};


vm = new ViewModel();

ko.applyBindings(vm);

