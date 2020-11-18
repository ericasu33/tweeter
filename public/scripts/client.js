/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* ---------------- */
/*      Tweets      */
/* ---------------- */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    const tweetUser = tweetObj.user;
    const createdAt = getTimestamp(tweetObj);

    //==== Article Container ====//
    const article = $(`<article></article>`);

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
    const timeStamp = $(`<div><div> ${tweetObj.created_at} </div></div>`);

    // Icons (flag, retweet, like)
    const icons = $(`<div></div>`);
    const flagIcon = $(`<i class="fa fa-flag"></i>`);
    const retweetIcon = $(`<i class="fa fa-retweet"></i>`);
    const heartIcon = $(`<i class="fa fa-heart"></i>`);
    icons.append(flagIcon).append(retweetIcon).append(heartIcon);
    
    footer.append(timeStamp).append(icons);

    const tweet = article.append(header).append(content).append(footer);

    console.log(tweet);
    return tweet;

  };

  const renderTweets = function(tweets) {
    let tweet;
    for (const tweetObj of tweets) {
      tweet = createTweetElement(tweetObj);
      $(".tweet-display").append(tweet);
    }
  };

  renderTweets(data);
});



