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

  // Gets time difference between now and tweet creation
  const getTimestamp = function(tweetObj) {
    // Milliseconds in a day
    const oneDayByMs = 1000 * 60 * 60 * 24;

    // Time now
    const nowInMs = new Date().getTime();

    // Time tweet created
    const createdInMs = tweetObj.created_at;

    // Time difference (in ms)
    const differenceMs = nowInMs - createdInMs;

    // Convert to day
    const dayBeforeNow = Math.floor(differenceMs / oneDayByMs);

    if (dayBeforeNow === 1) {
      return `${dayBeforeNow} day ago`;
    }

    return `${dayBeforeNow} days ago`;
  };

  // Tweet post creation
  const createTweetElement = function(tweetObj) {
    const tweetUser = tweetObj.user;
    const createdAt = getTimestamp(tweetObj);

    return `
    <article class="tweet-post">
    <header>
      <div>
        <img src=${tweetUser.avatars} alt="tweet post profile icon" />
        <div class="tweet-post-username"> ${tweetUser.name} </div>
      </div>
      <div class="tweet-post-handle"> ${tweetUser.handle} </div>
    </header>
      <div class="tweet-post-content"> ${tweetObj.content.text} </div>
    <footer>
      <div>
        <div> ${createdAt} </div>
      </div>
      <div>
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
    
    // Reset character limit to 140
    $(".counter").html(140);

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

    $("#tweet-text").val("").focus();
  });

  loadTweets();
});



