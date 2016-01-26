'use strict';

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

client.stream('statuses/filter', {track: '#hollyjef2016'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('end', function(res) {
    console.log('twitter stream ended (code, message) ', res.statusCode, res.statusMessage);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});

module.exports = client;
