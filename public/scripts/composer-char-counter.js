$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const countChar = $(this).val().length;
    const remainingChar = 1 - countChar;

    let counter = $(this).parent().find("output");
    // console.log(this.form[2]);
    if (remainingChar < 0) {
      counter.css({"color": "#FF8AFD"});
    }
    counter.html(remainingChar);
  });






});