// Initialize Firebase
//==================================================================================================
var config = {
    apiKey: "AIzaSyC-AM58u5iUbGJuIhN3-GFFXsqf0RQfEUE",
    authDomain: "remembeer-e06cd.firebaseapp.com",
    databaseURL: "https://remembeer-e06cd.firebaseio.com",
    projectId: "remembeer-e06cd",
    storageBucket: "remembeer-e06cd.appspot.com",
    messagingSenderId: "952581043095"
  };

  firebase.initializeApp(config);


// Variables
//==================================================================================================

var database = firebase.database();

// google API
//==================================================================================================

//search terms that the user will input and google will return with breweries
      var city = "Minneapolis";
      var state = "MN";
      var globalLatSearch = "";
      var globalLngSearch = "";
      
      

      //turn inputted city and state into latitude/longitude
      function turnQueryToLatLng() {
         
        var queryURL1 = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "+" + state +"&key=AIzaSyDVWyEiCdvzn-H3nOsn9NuJ7LfEa-zLCw8";

        $.ajax({
          url: queryURL1,
          method: "GET"
        }).done(function(response1) {
          //create variables for latitude & longitude
          var brewSearchLat = String(response1.results[0].geometry.location.lat);
          var brewSearchLng = String(response1.results[0].geometry.location.lng);
          //set the global search variables for lat/lng
          globalLatSearch = response1.results[0].geometry.location.lat;
          globalLngSearch = response1.results[0].geometry.location.lng;
          //call the search for breweries function
          searchForBreweries(brewSearchLat, brewSearchLng);

        });
      }

      //global variables for holding list of breweries (name, lat, lng) and then the inputted city/state search lat/lng as a string
      var brewArry = [];
      

      //function that searches google map api for top 5 breweries in area
      function searchForBreweries(latSearch, lngSearch) {
                 
        var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latSearch + "," + lngSearch + "&type=establishment&radius=1000&keyword=brewery&key=AIzaSyDVWyEiCdvzn-H3nOsn9NuJ7LfEa-zLCw8";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          for (i =0; i < 5; i++) {
            var helpArr = [];
            helpArr.push(response.results[i].name);
            helpArr.push(response.results[i].geometry.location.lat);
            helpArr.push(response.results[i].geometry.location.lng);
            helpArr.push(response.results[i].vicinity);
            helpArr.push(response.results[i].rating);
            helpArr.push(response.results[i].photos[0].html_attributions[0]);
            brewArry.push(helpArr);
            

            // get referance to favorites
            var tBody = $(".google-results-table");
            var tRow = $("<tr>");
            
            // Create a button for saving favorites
            var saveImg = $("<img>");
            saveImg.attr("src", "assets/images/Icon_20x20.png");
            var saveButton = $("<button>").append(saveImg);
            saveButton.attr("id", "save-button")
            saveButton.attr("dataname", response.results[i].name);
            saveButton.attr("datalat", response.results[i].geometry.location.lat);
            saveButton.attr("datalng", response.results[i].geometry.location.lng);
            saveButton.attr("datalink", response.results[i].photos[0].html_attributions[0]);
            var tableSave = $("<td>").append(saveButton);
            tableSave.addClass("saveButton");
            
            var bPhoto = $("<td>").html(response.results[i].photos[0].html_attributions[0]);
            var bName = $("<td>").text(response.results[i].name);
            var bAddress = $("<td>").text(response.results[i].vicinity);
            var bRating = $("<td>").text(response.results[i].rating);
            
            tRow.append(bPhoto, bName, bAddress, bRating, tableSave);
            tBody.append(tRow);
          }
        });
      }

      turnQueryToLatLng();



      //create map of the top 5 breweries with markers
      var map;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new google.maps.LatLng(globalLatSearch,globalLngSearch),
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < brewArry.length; i++) {
          var lat = brewArry[i][1];
          var lng = brewArry[i][2];
          console.log(lat, lng);
          //var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(lat,lng);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      };



// Click event for submitting city and state
//==================================================================================================

$("#submit-city-state").on("click", function() {
  
  // Don't refresh the page!
  event.preventDefault();
  
  city = $("#city-input").val().trim();
  state = $("#state-input").val().trim();;
  
  turnQueryToLatLng();

});


// Brewery API
//==================================================================================================

  // name will come from google api results based on the button clicked
  var name = "schells";
  var apiKey = "?key=" + "a37a220d023a72fb358d5761d1f0f322";
  var brewery = "&q=" + name;
    
       
  function breweryInfo() {
    
    var queryURL = "https://cors-anywhere.herokuapp.com/" + "http://api.brewerydb.com/v2/search" + apiKey + brewery + "&type=brewery";
    
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    console.log(response);
      
  });
    
  }
         
  breweryInfo();


// When clicking on a result on the google map page
//==================================================================================================
 
  $(document).on("click", "#save-button", function(){

  // capture values from form entry
  var brewName = $(this).attr("dataname");
  var brewLat = $(this).attr("datalat");
  var brewLng = $(this).attr("datalng");
  var brewLink = $(this).attr("datalink");

  
  
  
  // push data into the firebase database
  database.ref().push({
    brewName: brewName,
    brewLat: brewLat,
    brewLng: brewLng,
    brewLink: brewLink,
  });
  
  });


// Firebase listener
//==================================================================================================

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot);
  
  //capture results from clicking on a button on the map page
  var brewName = snapshot.val().brewName;
  var brewLat = snapshot.val().brewLat;
  var brewLng = snapshot.val().brewLng;
  var brewLink = snapshot.val().brewLink;
  
  //Update Table with values
  //I will have to move the Brewyer API jquery down here once Dylan is done with the google api
  
  // get referance to favorites
    var tBody = $(".favorites-table");
    var tRow = $("<tr>");
    
    // Create a button for deleting favorites
    var trashImg = $("<img>");
    trashImg.attr("src", "assets/images/trash-2x.png");
    var trashButton = $("<button>").append(trashImg);
    var tableTrash = $("<td>").append(trashButton);
    tableTrash.addClass("trashButton");
    
    
    var name = $("<td>").text(brewName);
    var b_link = $("<td>").html(brewLink);
    //var established = $("<td>").text(response.data[0].established);
    
    tRow.append(name,b_link,tableTrash);
    tBody.append(tRow);



}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });






//==================================================================================================