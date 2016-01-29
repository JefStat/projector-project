'use strict';
var _ = require('lodash');
var env = require('../config/env.js');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: env.TWITTER_CONSUMER_KEY,
  consumer_secret: env.TWITTER_CONSUMER_SECRET,
  access_token_key: env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET
});

var isPhotoBomb = function(tweet) {
  return _.toLower(tweet.text).indexOf('photobomb') !== -1;
}

var tweetBuffer = [];
var photoBombCB = function() {};

var reconnect = null;

var connect = function() {
  reconnect = null;
  client.stream('statuses/filter', {
    track: 'javascript' //'#hollyjef2016'
  }, function(stream) {
    stream.on('data', function(tweet) {
      if (isPhotoBomb(tweet)) {
        photoBombCB(tweet);
      } else {
        if (tweetBuffer.length < 100) {
          tweetBuffer.push(tweet);
          console.log('tweet buffered, buffer size ', tweetBuffer.length);
        } else {
          console.log('tweet dropped');
        }
      }
    });

    stream.on('end', function(res) {
      console.log('twitter stream ended (code, message) ', res.statusCode, res.statusMessage);
    });

    stream.on('error', function(error) {
      console.error('Twitter stream error ', error);
      if (!reconnect) {
        // try to reconnect in 10s
        reconnect = setInterval(connect, 10000);
      }
    });
  });
};

connect();

module.exports = {
  twitterClient: client,
  registerForVanillaTweets: function(cb) {
    return setInterval(function(cb) {
      if (cb && tweetBuffer.length > 0) {
        cb(tweetBuffer.shift());
        console.log('tweet sent, buffer size ', tweetBuffer.length);
      }
    }, 10000, cb);
  },
  registerForPhotoBombs: function(cb) {
    if (_.isFunction(cb)) {
      photoBombCB = cb;
    } else {
      throw 'call back is not a function';
    }
  }
};
