'use strict';


var TWITTER_CONSUMER_KEY        = process.env.TWITTER_CONSUMER_KEY          || '';
var TWITTER_CONSUMER_SECRET     = process.env.TWITTER_CONSUMER_SECRET       || '';
var TWITTER_ACCESS_TOKEN_KEY    = process.env.TWITTER_ACCESS_TOKEN_KEY      || '';
var TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET   || '';
var IMGIX_SECURE_TOKEN          = process.env.IMGIX_SECURE_TOKEN            || '';
var IMGIX_DOMAIN                = process.env.IMGIX_DOMAIN                  || '';
var NODE_ENV                    = process.env.NODE_ENV;

module.exports = {
  TWITTER_CONSUMER_KEY:         TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET:      TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY:     TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET:  TWITTER_ACCESS_TOKEN_SECRET,
  IMGIX_SECURE_TOKEN:           IMGIX_SECURE_TOKEN,
  IMGIX_DOMAIN:                 IMGIX_DOMAIN,
  NODE_ENV:                     NODE_ENV
};

