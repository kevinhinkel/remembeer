// Home page validation
//==================================================================================================

$(".alert").hide();

$(".age-submit-button").on("click", function() {

  var userAge = $("#inputAge").val().trim();
  console.log(userAge);
  
  if (userAge > 20) {
    // if user is 21 or older redirect them to the map page
    window.location.replace("map.html");
    
  } else {
    // if user is under 21 alert that they are under 21.
    $('.alert-danger').show();
    $('.alert-danger').alert()
  }


});




//==================================================================================================


