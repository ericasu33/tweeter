/* ---------------- */
/*  Write New Tweet */
/* ---------------- */

$(document).ready(function() {
  $(".nav-new-tweet").on("click", function() {

    setTimeout(function() {
      $(".nav-view-tweet").toggle();
      $(".nav-write-tweet").toggle();
      $("#tweet-text").focus();
    }, 500);
    
    $("#tweet-input").toggle(1000);
    $(window).scrollTop(0);
  });

});
