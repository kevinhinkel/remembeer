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

var city = "";
var locationType = "brewery";



// Home Page click
//==================================================================================================

$("#submit-location").on("click", function() {

  // Don't refresh the page!
  event.preventDefault();

  // capture values from form entry
  city = $("#location-input").val().trim();


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

  var name = "schells"
  var apiKey = "?key=" + "a37a220d023a72fb358d5761d1f0f322";
  var brewery = "&q=" + name;
    
       
  function breweryInfo() {
    
    var queryURL = "https://cors-anywhere.herokuapp.com/" + "http://api.brewerydb.com/v2/search" + apiKey + brewery + "&type=brewery";
    
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    console.log(response);
    
    var tBody = $("tbody");
    var tRow = $("<tr>");
    
    
    var icon = $("<img>");
    icon.attr("src", response.data[0].images.icon);
    
    
    var name = $("<td>").text(response.data[0].name);
    var established = $("<td>").text(response.data[0].established);
    
    tRow.append(icon, name, established);
    tBody.append(tRow);
      
  });
    
  }
         
  breweryInfo();


// location click to save
//==================================================================================================

// click on "this"
//$("#").on("click", function() {
 // database.ref().push({
 //   tableCity: city,
 //   tableLocationType: locationType,
 //  });
 //}



// Firebase listener
//==================================================================================================

// database.ref().on("child_added", function(snapshot) {



// }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });




//==================================================================================================


