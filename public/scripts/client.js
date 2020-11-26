/* ---------------- */
/*      Tweets      */
/* ---------------- */

$(document).ready(function() {
  $("#tweet-text").focus();

  /* -----------------*/
  /*   Tweet Display  */
  /* -----------------*/

  // Prevent XSS
  const escape = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Tweet post creation
  const createTweetElement = function(tweet) {
    const tweetUser = tweet.user;
    const createdAt = moment(tweet.created_at).fromNow();

    return `
      <article class="tweet-post">

        <header>
          <div>
            <img src=${tweetUser.avatars} alt="tweet post profile icon" />
            <div class="tweet-post-username"> ${tweetUser.name} </div>
          </div>
          <div class="tweet-post-handle"> ${tweetUser.handle} </div>
        </header>

        <div class="tweet-post-content"> ${escape(tweet.content.text)} </div>

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
    if (!Array.isArray(tweets)) {
      const tweet = createTweetElement(tweets);
      $("#tweet-display").prepend(tweet);
      return;
    }
      
    for (const tweetObj of tweets) {
      const tweet = createTweetElement(tweetObj);
      $("#tweet-display").prepend(tweet);
    }
  };

  /* ---------------- */
  /*   Post Tweets    */
  /* ---------------- */

  // Display tweets
  const loadTweets = function(newTweet) {
    $.ajax("/tweets")
      .then(function(allTweets) {
        if (newTweet) {
          renderTweets(allTweets[allTweets.length - 1]);
        }
        if (!newTweet) {
          renderTweets(allTweets);
        }
      });
  };

  $("#tweet-text").focusout(function() {
    $(".error-max-input").hide();
    $(".error-min-input").hide();
  });
  
  $("form").on("submit", function(event) {
    event.preventDefault();

    // Fadeout submit button if no content
    $(".tweet-button").addClass("tweet-fade");

    // Validation
    const tweetContentLength = $("#tweet-text").val().length;
    const tweetContent = $("#tweet-text").val();

    if (tweetContentLength > 140) {
      $(".error-max-input").show();
      $("#tweet-text").focus();
      return;
    } else if (!$.trim(tweetContent)) {
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
        const newTweet = true;
        loadTweets(newTweet);
      });
    
    // Reset character limit to 140
    $(".counter").html(140);

    $("#tweet-text").val("").focus();
  });

  // Remove error message once validation passes
  $("#tweet-text").on("input", function() {
    const tweetContentLength = $("#tweet-text").val().length;

    if (tweetContentLength >= 1 && tweetContentLength <= 140) {
      $(".error-max-input, .error-min-input").hide();
    }
  });
  
  const newTweet = false;
  loadTweets(newTweet);
});



