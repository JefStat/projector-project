$(document).ready(function() {

var autoplaySpeed = 15000; //15s
var tweetHideInterval = null;

  // Static functions
  var toggleContainers = function(elementId) {
    switch (elementId) {
      case 'tweet':
        $('#slick').slick('slickPause');
        $('#slick-container').hide();
        $('#tweet-container').show();
        setTimeout(toggleContainers, autoplaySpeed, 'slick');
        break;
      case 'slick':
      default:
        $('#slick-container').show();
        $('#tweet-container').hide();
        $('#slick').slick('slickPlay');
        break;
    }
  };

  var setTweet = function(tweet, withImage) {
    //TODO array of last 3 tweets as a separate section 
    // that is not in the main 2 contents which are toggled
    console.log('Displaying tweet');
    if (withImage) {
      // tweet.entities.media[where type === photo].media_url_https
      //$('#tweet-img').attr('src',tweet.);
    }
    $('#tweet-user-pic').attr('src', tweet.user.profile_image_url_https);
    $('#tweet-user-name').text(tweet.user.screen_name);
    $('#tweet-text').text(tweet.text);
  }


  var photoBombList = [];

  console.log('Starting slick');
  $('#slick').slick({
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'autoplay': true,
    'arrows': false,
    'lazyLoad': 'progressive',
    'pauseOnHover': false,
    'pauseOnFocus': false,
    'autoplaySpeed': autoplaySpeed
  });

  // On before slide change
  $('.your-element').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    console.log('beforeChange', nextSlide);
    if (photoBombList.length > 0) {
      var tweet = photoBombList.shift();
      setTweet(tweet, true);
      toggleContainers('tweet');
    }
  });

  console.log('Connecting to server socket.io');
  var socket = io();
  socket.on('Tweet', function(tweet) {
    console.log('Tweet recieved');
    setTweet(tweet);
  });

  socket.on('PhotoBomb', function(tweet) {
    console.log('Image recieved');
    photoBombList.push(tweet);
    $('#photoBombCount').text(photoBombList.length);
  });


  var goto = function(index) {
    $('#slick').slick('slickGoTo', index);
  }

});
