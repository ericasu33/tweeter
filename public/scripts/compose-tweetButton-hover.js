$(document).ready(function() {

  $(".tweet-button").hover(function() {
    const counter = $(".counter").val();
    $(this).toggleClass("tweet-button-hover");
    if (counter < 0 || counter === "140") {
      $(".tweet-button").removeClass("tweet-button-hover");
    }
  });
});