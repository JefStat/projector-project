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
    console.log('Displaying tweet ', tweet);
    if (tweetHideInterval) { clearInterval(tweetHideInterval); }
    $('#tweet-container').show();
    if (withImage) {
      var entities = tweet.entities || {};
      var media = entities.media || [];
      var image = _.find(media, function(o) { return o.type === 'photo' ;});
      if (image) {
        console.log('Applying a tweet image');
        $('#tweet-img').show();
        var url = image.media_url_https
        $('#tweet-img').attr('src', url);
      }
    } else { $('#tweet-img').hide(); }
    $('#tweet-user-pic').attr('src', tweet.user.profile_image_url_https);
    $('#tweet-user-name').text(tweet.user.screen_name);
    $('#tweet-text').text(tweet.text);
    tweetHideInterval = setInterval(function() {
      $('#tweet-container').hide();
    }, autoplaySpeed);
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
  $('#slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    console.log('beforeChange', nextSlide);
    var nextSlideImg = slick.$slides[nextSlide].getElementsByTagName('img')[0];
    var nextSlideImgWidth = nextSlideImg.offsetWidth;

    $('#tweet-container').width(nextSlideImgWidth);

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
    setTweet(tweet, true);
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
