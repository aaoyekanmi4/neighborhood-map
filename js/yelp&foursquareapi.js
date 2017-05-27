/*jshint multistr:true */

//yelp oauth requirements
//code from MarkN Udacity Coach
var consumerKey = "Vdul4_EpXvHQ96eVwrU--Q";
var consumerSecret = "cK44a_oWkG_oWJT5g87hdrAN04I";
var token = "JgFGGfp6V_mELb-qEzhraebx0EBFyrp-";
var tokenSecret = "x7CmIaXES37WgYnB_9FiYT88OjU";


function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
}


var parameters = {
    oauth_consumer_key: consumerKey,
    oauth_token: token,
    oauth_nonce: nonce_generate(),
    oauth_timestamp: Math.floor(Date.now()/1000),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version : '1.0',
    callback: 'cb',              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    actionlinks:'True'
  };


//Get today's date in right format to use as foursquare version
function foursquareVersion(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var fullDate = yyyy.toString()+mm.toString()+dd.toString();
    return fullDate;
}

//foursquare api requirements
var CLIENT_ID = "AZCBAVC10XZBJS4CSYUZ22HLL3WQSQGFQW1BPXRIEERW03QX";
var CLIENT_SECRET = "0RO45WSUF510UQ11IFJUXOXS1CO2GMKU3SBDD25CI1I1A4Y3";

//AJAX calls for Yelp and Foursquare

function getApiInfo(yelpName, foursquareId) {

    //generate yelpUrl for business using yelp format business name
    var yelpUrl = "https://api.yelp.com/v2/business/" + yelpName + "?actionlinks=True";

    // generate oauth signature
    var encodedSignature = oauthSignature.generate('GET', yelpUrl, parameters, consumerSecret, tokenSecret);
    parameters.oauth_signature = encodedSignature;

    //get data from Yelp and append to page
    $.ajax({
        url: yelpUrl,
        data: parameters,
        dataType: 'jsonp',
        cache: true,
        success: function(response) {
            //Gather restaurant details from json object and handle errors for each one
            var category = response.categories[0][0] || "Category not available";
            var overallRating = response.rating_img_url || "Yelp rating not available";
            var phone = response.display_phone || "No phone number available";
            var review = response.reviews[0].excerpt || "Yelp review not available";
            var url = response.url || "Yelp link not accesible";
            var user = response.reviews[0].user.name || "Reviewer's name not provided";
            var userRating = response.reviews[0].rating_image_small_url || "Reviewer's rating not available";


           //Put information on page using ko viewModel data binding
            vm.category('Category: ' + category);
            vm.overallRating(overallRating);
            vm.phone('Phone: ' + phone);
            vm.review('<h3>Featured Yelp<sup><i class="fa fa-yelp" aria-hidden="true"></i></sup> Review:</h3>\
                <div id="excerpt">'+ review + '<a href="' + url + '" target="_blank" id="order"> Read more at Yelp...</a>\
                </div><div id="username">- '+ user +'</div><div class="user-rating">\
                ' + user + " 's" + ' rating: <img class="user-rating" src="' + userRating + '"></div>');

            //get rid of signature so it can be added next call
            delete parameters.oauth_signature;

        },
        //Comprehnsive error functioning by stackoverflow user palash
        //http://stackoverflow.com/questions/6792878/jquery-ajax-error-function
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connected.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Yelp info not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Yelp Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Data requested incorrectly (parserror)';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            vm.yelpMsg(msg);
        },
    });
    //get venue id and generate foursquare url for venue detail API
    var version = foursquareVersion();

    var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + foursquareId + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + version + '&m=foursquare';

    $.ajax({
        url: foursquareUrl,
        dataType:'jsonp',
        success: function(data) {

            (data.response.venue.hours) ? status= data.response.venue.hours.status: status = "Open status not available.";
            var priceRange = data.response.venue.price.message || "Price range not available";
            (data.response.venue.menu) ? menu = data.response.venue.menu.url: menu = 'Menu not available for this restaurant';
            var tips = data.response.venue.tips.groups[0].items || "Foursquare tips not available";

            vm.hours(status);

            vm.priceRange('Price Range: ' + priceRange);

            if (data.response.venue.menu) {
                vm.menu('<form action="' + menu +
                    '" target="_blank"><button id="menu-button" type="submit">View Menu <i class="fa fa-cutlery" aria-hidden="true"></i></button></form>');
            }

            vm.foursquareHeading('<h3><i class="fa fa-foursquare" aria-hidden="true"></i> Featured foursquare tips:</h3>');

            var chosenTips = [];

            for (var i = 0; i < 5; i++){

                chosenTips.push({tip: '<p>' + tips[i].text + '</p><p>Likes: ' + tips[i].agreeCount +'</p>'});

            }
            var firstFive = chosenTips.slice(0,5);
            vm.tipsList(firstFive);
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connected.\n Verify Network.';
            }
            else if (jqXHR.status == 404) {
                msg = 'Foursquare info not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Foursquare Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Data requested incorrectly (parserror)';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            vm.foursquareMsg(msg);
        },
    });
}
