/* ---------------- */
/*  Write New Tweet */
/* ---------------- */

$(document).ready(function() {
  $(".nav-new-tweet").on("click", function() {
    $("#tweet-input").toggle(1000);
    $("#tweet-text").focus();
  });
});