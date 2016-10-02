


    $(".towards").click(function() {
        if ( $( ".go-to" ).is( ":hidden" ) ) {
    $( ".go-to" ).show()
  } else {
    $( ".go-to" ).slideUp("slow");
  };
      $(this).toggleClass("fa fa-minus")
      $(this).toggleClass("fa fa-plus");
    });

     $(".away").click(function() {
        if ( $( ".get-from" ).is( ":hidden" ) ) {
    $( ".get-from" ).show()
  } else {
    $( ".get-from" ).slideUp("slow");
  };
      $(this).toggleClass("fa fa-minus")
      $(this).toggleClass("fa fa-plus");
    });





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

this.changeRestaurant = function(clickedRestaurant) {

$("#restaurant-list").hide()
self.selectedRestaurant(clickedRestaurant)
var yelpName = clickedRestaurant.yelpFormat()
var foursquareId = clickedRestaurant.foursquare_id()
$("#filter").val("")
//function from yelp&foursquareApi
getApiInfo(yelpName, foursquareId)


$("#back").show()



};



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

