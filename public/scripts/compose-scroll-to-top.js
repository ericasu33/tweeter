/* ---------------- */
/*   Scroll To Top  */
/* ---------------- */

$(document).ready(function() {

  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 20) {
      $("#scroll-to-top-button").show(700);
      $(".nav-new-tweet").fadeOut(1000);
    } else {
      $("#scroll-to-top-button").hide(1000);
      $(".nav-new-tweet").fadeIn(1000);
    }
  });

  $("#scroll-to-top-button").on("click", function() {
    $(window).scrollTop(0);

    $("#tweet-text").focus();
  });
});