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

var location = "";
var locationType = "brewery";



// Home Page click
//==================================================================================================

$("#submit-location").on("click", function() {

	// Don't refresh the page!
 	event.preventDefault();

 	// capture values from form entry
  location = $("#location-input").val().trim();


  console.log(location);

});



// google API
//==================================================================================================

  // var searchTerm ;
  
  // var apiKey = "&api_key=" + "";
   
  // var queryURL = "" + searchTerm + apiKey;


  // // Query google places API
  // $.ajax({
  //   url: queryURL,
  //   method: 'GET'
  // }).done(function(response) {
  //   console.log(response);
    
    
  // });



// Brewery API
//==================================================================================================


// var searchTerm ;
  
//   var apiKey = "&api_key=" + "a37a220d023a72fb358d5761d1f0f322";
   
//   var queryURL = "" + searchTerm + apiKey;


//   // Query google places API
//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).done(function(response) {
//     console.log(response);
    
    
//   });


// location click to save
//==================================================================================================

// click on "this"
//$("#").on("click", function() {
 // database.ref().push({
 //  	tableLocation: location,
 //  	tableLocationType: locationType,
 //  });
 //}



// Firebase listener
//==================================================================================================

// database.ref().on("child_added", function(snapshot) {



// }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });




//==================================================================================================


