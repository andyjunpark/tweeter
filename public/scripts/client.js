/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
]


const createTweetElement = function(tweet) {
  let timestamp = timeago.format(tweet.created_at);
  let $tweet = $(
  `
  <article>
    <header>
        <div id="profile-name">
          <img src="${tweet.user.avatars}">
          ${tweet.user.name}
        </div>
        <div id="profile-id">
          <b>${tweet.user.handle}</b>
        </div>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <time class="timestamp">${timestamp}</time>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
    </footer>
  </article>
  `);
  return $tweet;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    createTweetElement(tweet);
    $('#tweets-container').append(tweet);
  }
};

renderTweets(data);

const $tweetForm = $('#tweet-form');

$tweetForm.submit()