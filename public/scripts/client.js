$(document).ready(function() {

  // XSS to prevent malicious attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creates tweets in a templeate
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
      <p>${escape(tweet.content.text)}</p>
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

  // Renders new tweets
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('.tweet').prepend($newTweet);
    };
  };
 
  // Loads tweets
  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET'})
    .then(function (moreTweets) {
      console.log('Successfully get: ', moreTweets);
      renderTweets(moreTweets);
    });
  };

  loadtweets();

  // Event listener for user tweet submissions
  $(function() {
    const $form = $('#tweet-form');
    $form.submit(function(event) {
      console.log("Form submitted. Performing ajax call...");
      event.preventDefault();
      const formData = $(this).serialize();
      const tweetLength = $('#tweet-text').val().length;
      // Check for character length
      if (tweetLength > 140) {
        alert("Maximum tweet is 140 characters");
        // Error message popup
        $().msgpopup({
          text: 'Maximum tweet is 140 characters!',
          type: 'error',
          time: 4000,
          x: true,
        });
      }
      else if (tweetLength === "" || tweetLength === null || tweetLength === 0) {
        // Alert message popup
        $().msgpopup({
          text: 'Minimum tweet is 1 characters!',
          type: 'alert',
          time: 4000, 
          x: true,
        });
      } else {
        // AJAX POST and then reload tweets without refreshing
        $.ajax('./tweets', {data: formData, method: "POST"})
        .then(function() {
          loadtweets();
          console.log('Successfully posted: ', formData);
          // Success message popup
          $().msgpopup({
            text: 'Post successful',
            type: 'success',
            time: 4000, 
            x: true,
          });
        });
      };
    });
  });
});
