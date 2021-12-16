/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet);

const createTweetElement = function(tweetData) {
  let timestamp = timeago.format(tweetData.created_at);
  let tweetMarkup = $(
  `
  <article>
    <header>
        <div id="profile-name">
          <img src="${tweetData.user.avatars}">
          ${tweetData.user.name}
        </div>
        <div id="profile-id">
          <b>${tweetData.user.handle}</b>
        </div>
    </header>
    <p>${tweetData.content.text}</p>
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
  $(".tweet").append(tweetMarkup);
};