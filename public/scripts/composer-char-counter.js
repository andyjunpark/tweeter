$(document).ready(function() {
  // render changing character counter
  $('#tweet-text').on('keyup', function() {
    let maxLength = 140;
    let tweetLength = $(this).val().length;
    $('.counter').text(maxLength - tweetLength);
    if (tweetLength > 140) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
  })
});