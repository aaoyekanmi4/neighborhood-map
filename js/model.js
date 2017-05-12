//Info for both map markers and side panel for each restaurant

//location found using https://google-developers.appspot.com/maps/documentation/utils/geocoder/

//foursquare_id found using foursquare API explorer
//https://developer.foursquare.com/docs/explore#req=venues/search%3Fll%3D40.7,-74

var locations = [{
          title: 'Polvos',
          location: {lat: 30.245371, lng: -97.757424},
          imgSrc:"http://www.polvosaustin.com/wp-content/uploads/2009/11/Polvos-Nachos-.jpg",
          street:"2004 S 1st St",
          cityCountry:"Austin, TX 78704, USA",
          yelpFormat: "polvos-mexican-restaurant-austin",
          foursquare_id: "4414983ef964a520f2301fe3"
        },{
          title: 'Hopdoddy',
          location: {lat: 30.249802, lng: -97.749939},
          imgSrc:"http://www.thepowerof4.com/wp-content/uploads/2016/04/hopdoddy_burger_downes_thumb_550x366.jpg",
          street:"1400 S Congress Ave",
          cityCountry:"Austin, TX 78704, USA",
          yelpFormat: "hopdoddy-burger-bar-austin",
          foursquare_id:"4cb5e045e262b60c46cb6ae0"
        },{
          title: "Torchy's",
          location: {lat: 30.250744, lng:-97.754281},
          imgSrc:"http://www.trendengel.com/wp-content/uploads/2016/03/DSC_0057.jpg",
          street:"1311 S 1st St",
          cityCountry:"Austin, TX 78704, USA",
          yelpFormat: "torchys-tacos-austin",
          foursquare_id: "49be75ccf964a520ad541fe3"
        },{
          title: "Valentina's Tex Mex BBQ",
          location: {lat: 30.206938, lng: -97.835568},
          imgSrc:"http://www.valentinastexmexbbq.com/uploads/1/7/8/5/17856335/8344720.jpg",
          street:"7612 Brodie Ln",
          cityCountry:"Austin, TX 78745, USA",
          yelpFormat: "valentinas-tex-mex-bbq-austin",
          foursquare_id:"51280ef9e4b0e1bb913b8ac6"
        },{
          title: "Franklin's Barbeque",
          location: {lat: 30.270119,lng: -97.731273},
          imgSrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7zELYMCv9ROlA-p8c_6I03OsWrftMBha4FwQfFsTAuVmBpgL1Q",
          street:"900 E 11th St",
          cityCountry:"Austin, TX 78702, USA",
          yelpFormat: "franklin-barbecue-austin",
          foursquare_id:"4d755f73fc766a314d778d1a"
        },{
          title: "Las Trancas",
          location: {lat: 30.259979,lng: -97.731734},
          imgSrc:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcStCD6mnVHZq9OWsPCcPbSazalkaLbbm6AEyY7my0Q1aPvjhYCs",
          street:"1210 E Cesar Chavez St",
          cityCountry:"Austin, TX 78702, USA",
          yelpFormat: "las-trancas-austin",
          foursquare_id:"4f564a74e4b0a4bae630cc4e"
        },{
          title: "Cabo Bob's",
          location: {lat: 30.221002, lng:-97.757019},
          imgSrc:"https://s-media-cache-ak0.pinimg.com/236x/72/7f/d3/727fd3a87bc82173563b0f0d1d1999c3.jpg",
          street:" 3911 Warehouse Row",
          cityCountry:"Austin, TX 78704, USA",
          yelpFormat: "cabo-bobs-burritos-austin",
          foursquare_id:"4a99bd43f964a520313020e3"
        },{
          title: "Home Slice Pizza",
          location: {lat: 30.249225, lng:-97.749515},
          imgSrc:"https://cmga360dining.files.wordpress.com/2015/09/tmc-xlpizzahomeslicepephear.jpg?w=640&h=427",
          street:"1415 S Congress St",
          cityCountry:"Austin, TX 78704",
          yelpFormat: "home-slice-pizza-austin",
          foursquare_id: "43d1d4e9f964a520072e1fe3"
        },{
          title:"Casa Garcias",
          location: {lat: 30.201823, lng:-97.805891},
          imgSrc:"http://d3lawkbdj6aabd.cloudfront.net/singleplatform/image/upload/c_fit/cbc49e7c414d29db958f8e4ef2c28ce94edca62e.jpg",
          street:"1901 W William Cannon Dr",
          cityCountry:"Austin, TX 78745, USA",
          yelpFormat: "casa-garcias-austin-3",
          foursquare_id:"4b2e5371f964a52054de24e3"
        },{
            title:"Habernero Mexican Cafe",
            location: {lat: 30.241227, lng: -97.758236},
            imgSrc:"https://media-cdn.tripadvisor.com/media/photo-s/03/54/0a/01/habanero-mexican-cafe.jpg",
            street:"501 W Oltorf St",
            cityCountry:"Austin, TX 78704, USA",
          yelpFormat: "habanero-mexican-cafe-austin",
          foursquare_id:"4a957fa2f964a5206c2320e3"
          }];

