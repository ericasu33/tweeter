/* ---------------- */
/*  Tweet Textarea  */
/* ---------------- */

$(document).ready(function() {
  // Set tweet button faded until input
  $(".tweet-button").css("opacity", "0.4");
  
  // Count characters inputted and reflect it on .counter
  $("#tweet-text").on("input", function() {
    const noSpace = $.trim($(this).val());
    const countChar = noSpace.length;
    const remainingChar = 140 - countChar;
    const counter = $(this).parent().find("output");

    // change color once counter is negative
    if (remainingChar < 0) {
      counter.addClass("count-negative");
      $(this).css("opacity", "0.4");
      $(".tweet-button").css("opacity", "0.4");
    } else if (remainingChar === 140) {
      counter.removeClass("count-negative");
      $(".tweet-button").css("opacity", "0.4");
    } else {
      counter.removeClass("count-negative");
      $(this).css("opacity", "");
      $(".tweet-button").css("opacity", "");
    }

    counter.html(remainingChar);
  });
});