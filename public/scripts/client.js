/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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
    };
  };
 
  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET'})
    .then(function (moreTweets) {
      console.log('Successfully get: ', moreTweets);
      renderTweets(moreTweets);
    });
  };

  loadtweets();

  $(function() {
    const $form = $('#tweet-form');
    $form.submit(function(event) {
      console.log("Form submitted. Performing ajax call...");
      event.preventDefault();
      const formData = $(this).serialize();
      console.log(formData);
      console.log(formData.length);
      const tweetLength = $('#tweet-text').val().length;
      if (tweetLength > 140) {
        alert("Maximum tweet is 140 characters");
      }
      else if (tweetLength === "" || tweetLength === null || tweetLength === 0) {
        alert("Minimum tweet is 1 characters");
      } else {
        $.ajax('./tweets', {data: formData, method: "POST"})
        .then(function() {
          console.log('Successfully posted: ', formData);
        });
      };
    });
  });
});
