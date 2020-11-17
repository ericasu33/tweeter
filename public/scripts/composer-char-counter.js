$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const countChar = $(this).val().length;
    const remainingChar = 140 - countChar;

    let counter = $(this).parent().find("output");
    // console.log(this.form[2]);
    if (remainingChar < 0) {
      // console.log($(this).val());
      counter.addClass("count-negative");
      $(this).css("color", "#FF8AFD");
    } else {
      counter.removeClass("count-negative");
      $(this).css("color", "#FF9B71");
    }
    
    counter.html(remainingChar);
  });







});