// Count characters inputted and reflect it on .counter

$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const noSpace = $.trim($(this).val());
    const countChar = noSpace.length;
    const remainingChar = 140 - countChar;

    const counter = $(this).parent().find("output");

    // change color once counter is negative
    if (remainingChar < 0) {
      counter.addClass("count-negative");
      $(this).css("color", "#FF8AFD");
    } else {
      counter.removeClass("count-negative");
      $(this).css("color", "#FF9B71");
    }
    
    counter.html(remainingChar);
  });
});