'use strict';

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var tweetBuffer = [];

client.stream('statuses/filter', {
  track: 'twitter' //'#hollyjef2016'
}, function(stream) {
  stream.on('data', function(tweet) {
    if (tweetBuffer.length < 100) {
      tweetBuffer.push(tweet);
      console.log("tweet buffered");
    } else {
      console.log("tweet dropped");
    }
  });

  stream.on('end', function(res) {
    console.log('twitter stream ended (code, message) ', res.statusCode, res.statusMessage);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

module.exports = {
  twitterClient: client,
  registerForTweets: function(cb) {
    return setInterval(function(cb) {
      if (cb && tweetBuffer.length > 0) {
        cb(tweetBuffer.shift());
      }
    }, 10000, cb);
  }
};
