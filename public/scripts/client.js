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

    //==== Article Container ====//
    const article = $(`<article></article>`);

    //==== Header ====//
    const header = $(`<header></header>`);
  
    // Create tweet-post user profile
    const tweetPostUser = $(`<div class="tweet-post-user"></div>`);

    // Profile Icon
    $(tweetPostUser).append(`<img src=${tweetUser.avatars} alt="tweet post profile icon"/>`);

    // Profile Name
    $(tweetPostUser).append(`<div class="tweet-post-username"> ${tweetUser.name} </div>`);

    // Profile Handle
    const tweetPostHandle = $(`<div class="tweet-post-handle"> ${tweetUser.handle} </div>`);

    header.append(tweetPostUser).append(tweetPostHandle);

    //==== Content ====//
    const content = $(`<div class="tweet-post-content"> ${tweetObj.content.text} </div>`);

    //article -> footer
    const footer = $(`<footer></footer>`);

    const tweet = article.append(header).append(content);
    // const tweet = $(`<article> ${tweetObj.content.text} </article>`);
    console.log(tweet);
    return tweet;



    //return <article> containing entire HTML structure of the tweet
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



