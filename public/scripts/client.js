/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* ---------------- */
/*      Tweets      */
/* ---------------- */

$(document).ready(function() {
  
  /* -----------------*/
  /*   Tweet Display  */
  /* -----------------*/

  // Timestamp for tweet creationg
  const getTimestamp = function(tweetObj) {
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const nowInMs = new Date().getTime();
    const createdInMs = tweetObj.created_at;
    const differenceMs = nowInMs - createdInMs;
    const dayBeforeNow = Math.floor(differenceMs / oneDayInMs);

    if (dayBeforeNow === 1) {
      return `${dayBeforeNow} day ago`;
    }

    return `${dayBeforeNow} days ago`;
  };

  // Prevent XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Tweet post creation
  const createTweetElement = function(tweetObj) {
    const tweetUser = tweetObj.user;
    const createdAt = getTimestamp(tweetObj);

    return `
      <article class="tweet-post">

        <header>
          <div>
            <img src=${escape(tweetUser.avatars)} alt="tweet post profile icon" />
            <div class="tweet-post-username"> ${escape(tweetUser.name)} </div>
          </div>
          <div class="tweet-post-handle"> ${escape(tweetUser.handle)} </div>
        </header>

        <div class="tweet-post-content"> ${escape(tweetObj.content.text)} </div>

        <footer>
          <div> ${createdAt} </div>
          <div class="tweeter-function-icons">
            <i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i>
          </div>
        </footer>

      </article>
    `;
  };

  // Tweets display on browser
  const renderTweets = function(tweets) {
    let tweet;
    for (const tweetObj of tweets) {
      tweet = createTweetElement(tweetObj);
      $("#tweet-display").prepend(tweet);
    }
  };

  /* ---------------- */
  /*   Post Tweets    */
  /* ---------------- */

  // Display tweets
  const loadTweets = function() {
    $.ajax("/tweets")
      .then(function(newTweetPost) {
        renderTweets(newTweetPost);
      });
  };
  
  $("form").on("submit", function(event) {
    event.preventDefault();

    // Fadeout submit button if no content
    $(".tweet-button").css("opacity", "0.4");

    // Validation
    const tweetContentChar = $("#tweet-text").val().length;

    if (tweetContentChar > 140) {
      $(".error-max-input").show();
      $("#tweet-text").focus();
      return;
    } else if (!$.trim($("#tweet-text").val())) {
      $(".error-min-input").show();
      $("#tweet-text").focus();
      return;
    }

    // Post new tweet and display on browser
    $.ajax("/tweets",
      {
        method: "POST",
        data: $("form").serialize(),
      }
    )
      .then(function() {
        loadTweets();
      });
    
    // Reset character limit to 140
    $(".counter").html(140);

    $("#tweet-text").val("").focus();
  });

  // Remove error message once validation passes
  $("#tweet-text").on("input", function() {
    const tweetContentChar = $("#tweet-text").val().length;

    if (tweetContentChar >= 1 && tweetContentChar <= 140) {
      $(".error-max-input, .error-min-input").hide();
    }
  });
  
  loadTweets();
});



