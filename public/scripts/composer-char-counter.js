$(document).ready(function() {
  // --- our code goes here ---
  console.log('ready!');
  $('#tweet-text').on('keyup', function() {
    let maxLength = 140;
    let tweetLength = $(this).val().length;
    $('.counter').text(maxLength - tweetLength);
    if (tweetLength > 140) {
      $('.counter').css("color", "red");
    }
  })
});