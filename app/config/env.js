'use strict';


var TWITTER_CONSUMER_KEY        = process.env.TWITTER_CONSUMER_KEY          || 'lp77lnqtR8ryWMV7LtlVGL5my';
var TWITTER_CONSUMER_SECRET     = process.env.TWITTER_CONSUMER_SECRET       || 'i04MdnADlXHRphg526JYDefobkDNpXVdrnrCuLANCODpoHQnFg';
var TWITTER_ACCESS_TOKEN_KEY    = process.env.TWITTER_ACCESS_TOKEN_KEY      || '429636054-yXFDr5zRPLCfWGQ566T71pIp6yqQDzoxFkkkuOlt';
var TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET   || 'lQz6DiNzV9SRlW6ZmhHlIMNyQh1iz495a7UWhLEXS9jzM';
var IMGIX_SECURE_TOKEN          = process.env.IMGIX_SECURE_TOKEN            || '';
var IMGIX_DOMAIN                = process.env.IMGIX_DOMAIN                  || '';
var NODE_ENV                    = process.env.NODE_ENV;

var TwitterStream = {
  track: 'javascript'
};
if (NODE_ENV === 'production') {
  TwitterStream = {
    track: process.env.TWITTER_STREAM || '#hollyjef2016'
  };
}


module.exports = {
  TWITTER_CONSUMER_KEY:         TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET:      TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY:     TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET:  TWITTER_ACCESS_TOKEN_SECRET,
  IMGIX_SECURE_TOKEN:           IMGIX_SECURE_TOKEN,
  IMGIX_DOMAIN:                 IMGIX_DOMAIN,
  NODE_ENV:                     NODE_ENV,
  TwitterStream:                TwitterStream
};

