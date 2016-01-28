'use strict';

var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';
var TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN_KEY || '';
var TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET || '';

module.exports = {
  TWITTER_CONSUMER_KEY: TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY: TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET: TWITTER_ACCESS_TOKEN_SECRET
};

