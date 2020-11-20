/* ---------------- */
/*  Tweet Textarea  */
/* ---------------- */

$(document).ready(function() {
  // Set tweet button faded until input
  $(".tweet-button").addClass("tweet-fade");
  
  // Count characters inputted and reflect it on .counter
  $("#tweet-text").on("input", function() {
    const noSpace = $.trim($(this).val());
    const countChar = noSpace.length;
    const remainingChar = 140 - countChar;
    const counter = $(this).parent().find("output");

    // change color once counter is negative
    if (remainingChar < 0) {
      counter.addClass("count-negative");
      $(this).addClass("tweet-fade");
      $(".tweet-button").addClass("tweet-fade");
    } else if (remainingChar === 140) {
      counter.removeClass("count-negative");
      $(".tweet-button").addClass("tweet-fade");
    } else {
      counter.removeClass("count-negative");
      $(this).removeClass("tweet-fade");
      $(".tweet-button").removeClass("tweet-fade");
    }

    counter.html(remainingChar);
  });
});