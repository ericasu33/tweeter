/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* ---------------- */
/*      Tweets      */
/* ---------------- */

$(document).ready(function() {
  /* ---------------- */
  /*   Tweet Display  */
  /* ---------------- */
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

  const createTweetElement = function(tweetObj) {
    const tweetUser = tweetObj.user;
    const createdAt = getTimestamp(tweetObj);

    //==== Article Container ====//
    const article = $(`<article class="tweet-post"></article>`);

    //==== Header ====//
    const header = $(`<header></header>`);
  
    // Create tweet-post user profile
    const tweetPostUser = $(`<div></div>`);

    // Profile Icon
    $(tweetPostUser).append(`<img src=${tweetUser.avatars} alt="tweet post profile icon"/>`);

    // Profile Name
    $(tweetPostUser).append(`<div class="tweet-post-username"> ${tweetUser.name} </div>`);

    // Profile Handle
    const tweetPostHandle = $(`<div class="tweet-post-handle"> ${tweetUser.handle} </div>`);

    header.append(tweetPostUser).append(tweetPostHandle);

    //==== Content ====//
    const content = $(`<div class="tweet-post-content"> ${tweetObj.content.text} </div>`);

    //==== Footer ====//
    const footer = $(`<footer></footer>`);

    // Timestamp
    const timeStamp = $(`<div><div> ${createdAt} </div></div>`);

    // Icons (flag, retweet, like)
    const icons = $(`<div></div>`);
    const flagIcon = $(`<i class="fa fa-flag"></i>`);
    const retweetIcon = $(`<i class="fa fa-retweet"></i>`);
    const heartIcon = $(`<i class="fa fa-heart"></i>`);
    icons.append(flagIcon).append(retweetIcon).append(heartIcon);
    
    footer.append(timeStamp).append(icons);

    // Appending article contents to <articel>
    const tweet = article.append(header).append(content).append(footer);

    return tweet;
  };

  const renderTweets = function(tweets) {
    let tweet;
    for (const tweetObj of tweets) {
      tweet = createTweetElement(tweetObj);
      $("#tweet-display").prepend(tweet);
    }
  };

  /* ---------------- */
  /*   Tweet Posts    */
  /* ---------------- */

  $("form").on("submit", function(event) {
    event.preventDefault();
    
    // Reset character counter to 140
    $(".counter").html(140);

    // New tweet content is sent to server
    $.ajax("/tweets",
      {
        type: "POST",
        data: $("form").serialize(),
      });
    

  });

});



