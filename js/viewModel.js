//making ko observables for members of locations object in model.js
var Restaurant = function (data){
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.imgSrc = ko.observable(data.imgSrc);
    this.street= ko.observable(data.street);
    this.cityCountry = ko.observable(data.cityCountry);
    this.yelpFormat = ko.observable(data.yelpFormat);
    this.foursquare_id = ko.observable(data.foursquare_id)
};

var ViewModel = function () {

    var self = this;

    this.restaurantList = ko.observableArray([]);

    locations.forEach(function(location) {
        self.restaurantList().push( new Restaurant (location));
    });


    this.selectedRestaurant = ko.observable();


    $("#back").hide()
    //function for what happens when a restaurant is clicked in side panel
    this.changeRestaurant = function(clickedRestaurant) {
      //Hide other restaurants and show back button
      $("#restaurant-list").hide()
      self.selectedRestaurant(clickedRestaurant)
      var yelpName = clickedRestaurant.yelpFormat()
      var foursquareId = clickedRestaurant.foursquare_id()

      //Set value in filter to blank
      $("#filter").val("")

      //function from yelp&foursquareApi to show info for restaurant
      getApiInfo(yelpName, foursquareId)

      //Show back button
      $("#back").show()



    };
    //Reset list when restaurant is clicked
    $("#back").click(function() {
        $(".restaurant-name").show()
        $("#restaurant-list").show()
        self.selectedRestaurant(null);
        $(this).hide()
        $("#area").text('')
        $("#foursquare").text('')
        $("#tips-list").text('')
        $(".list").show()


    });

};

vm = new ViewModel();

ko.applyBindings(vm);

