Neighborhood Map Project README

To Run:

Open index.html in a browser.

Click on restaurant name to see Yelp and Foursquare information.

Use the Directions sections to get directions to and from restaurants.

About:

The neighborhood map project is for the Udacity Fullstack Nanodegree Program.

The app utilizes various Google Map APIs as well as APIs from Foursquare and Yelp. AJAX is used to get information from these sources when a restaurant is clicked. The map.js file and the yelp&foursquareapi.js file contain the code for how this is done.

The model.js file contains a javascript object for all the restaurants in the app. Markers are made and the list of restaurants is shown by using the info in this object.

The viewModel.js file uses Knockout to display each restaurant from the model in the html of index.html.

The oauth-signature-js file contains necessary functions for the oauth1 used with the foursquare API.

The index.html file pulls in these various javascript files to display the page.

Attributions:
Much of the code for the map.js file came from the course "Google Maps APIs"

