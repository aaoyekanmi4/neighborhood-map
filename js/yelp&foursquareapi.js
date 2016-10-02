
//yelp oauth requirements
//code from MarkN Udacity Coach

var consumerKey = "Vdul4_EpXvHQ96eVwrU--Q"
var consumerSecret = "cK44a_oWkG_oWJT5g87hdrAN04I"
var token = "JgFGGfp6V_mELb-qEzhraebx0EBFyrp-"
var tokenSecret = "x7CmIaXES37WgYnB_9FiYT88OjU"


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
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today = yyyy+dd+mm;
    return today;
};

//foursquare api requirements
var CLIENT_ID = "AZCBAVC10XZBJS4CSYUZ22HLL3WQSQGFQW1BPXRIEERW03QX"
var CLIENT_SECRET = "0RO45WSUF510UQ11IFJUXOXS1CO2GMKU3SBDD25CI1I1A4Y3"

//AJAX calls for Yelp and Foursquare

function getApiInfo(yelpName, foursquareId) {
 // generate yelpUrl for business using yelp format business name
    var yelpUrl = "https://api.yelp.com/v2/business/" + yelpName + "?actionlinks=True"
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
            var category = response.categories[0][0]
            var overallRating = response.rating_img_url
            var phone = response.display_phone
            var review = response.reviews[0].excerpt
            var url = response.url
            var user = response.reviews[0].user.name
            var userRating = response.reviews[0].rating_image_small_url

            $("#category").append(category)


             $("#selected-name").append('<img id="rating" src="' + overallRating + '">')
             $("#phone").append('<div id="phone"> Phone: ' + phone +'</div>')


            $("#yelp-review").append('<h3>Featured Yelp<sup><i class="fa fa-yelp" aria-hidden="true"></i></sup> Review:</h3><div id="excerpt">' + review + '<a href="' + url + '" target="_blank" id="order"> Read more at Yelp...</a></div><div id="username">- ' + user +'</div><div class="user-rating">' + user + " 's" + ' rating: <img class="user-rating" src="' +
                userRating + '"></div>')
            //get rid of signature so it can be added next call
            delete parameters.oauth_signature

            },
    });
    //get venue id and generate foursquare url for venue detail API
    var version = foursquareVersion()
    var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + foursquareId + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + version
    console.log(foursquareUrl)
    $.ajax({
        url: foursquareUrl,
        dataType:'jsonp',
        success: function(data) {
            var status = data.response.venue.hours.status
            var priceRange = data.response.venue.price.message
            var menu = data.response.venue.menu.url
            var tips = data.response.venue.tips.groups[0].items

            if (status) {
                $("#hours").append(status)
            }

            $("#price-range").append(data.response.venue.price.message)
            $("#menu").append('<form action="' + menu + '" target="_blank"><button id="menu-button" type="submit">View Menu <i class="fa fa-cutlery" aria-hidden="true"></i></button></form>')
            $("#foursquare").append('<h3><i class="fa fa-foursquare" aria-hidden="true"></i> Featured foursquare tips:</h3>')
            for (var i = 0; i < 3; i++){
                $("#tips-list").append('<li><p>' + tips[i].text + '</p><p>Likes: ' + tips[i].agreeCount +'</p></li>')
            }


        }
    });
}