/* ---------------- */
/*   Nav on Scroll  */
/* ---------------- */

$(document).ready(function() {

  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 20) {
      $("nav").addClass("nav-on-scroll");
    } else {
      $("nav").removeClass("nav-on-scroll");
    }
  });
});