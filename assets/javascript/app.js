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
    
    // get referance to favorites
    var tBody = $(".favorites-table");
    var tRow = $("<tr>");
    
    // Create a button for deleting favorites
    var trashImg = $("<img>");
    trashImg.attr("src", "assets/images/trash-2x.png");
    var trashButton = $("<button>").append(trashImg);
    var tableTrash = $("<td>").append(trashButton);
    tableTrash.addClass("trashButton");
    
    
    var icon = $("<img>");
    icon.attr("src", response.data[0].images.icon);
    
    
    var name = $("<td>").text(response.data[0].name);
    var established = $("<td>").text(response.data[0].established);
    
    tRow.append(icon, name, established, tableTrash);
    tBody.append(tRow);
      
  });
    
  }
         
  breweryInfo();


// When clicking on a result on the google map page
//==================================================================================================

// Don't refresh the page!
//  event.preventDefault();

  // capture values from form entry
  // breweryIcon = 
  // breweryName = 
  // established = 
  
  // console.log(breweryIcon);
  // console.log(breweryName);
  // console.log(established);
  
  
  // push data into the firebase database
  // database.ref().push({
  //   breweryIcon: breweryIcon,
  //   breweryName: breweryName,
  //   established: established,
  // });
  


// Firebase listener
//==================================================================================================

// database.ref().on("child_added", function(snapshot) {
//   console.log(snapshot);
  
  // capture results from clicking on a button on the map page
  // var breweryIcon = 
  // var breweryName = 
  // var established = 
  
  // Update Table with values
  // I will have to move the Brewyer API jquery down here once Dylan is done with the google api
  
  



// }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });






//==================================================================================================