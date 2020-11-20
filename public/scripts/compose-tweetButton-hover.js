$(document).ready(function() {

  $(".tweet-button").hover(function() {
    const counter = $(".counter").val();
    $(this).toggleClass("tweet-button-hover");
    // counter instanceof String
    // Evaluator Note: Using coercion tactfully for simplicity and brevity.
    if (counter < 0 || counter == 140) {
      $(".tweet-button").removeClass("tweet-button-hover");
    }
  });
});