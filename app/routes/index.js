'use strict';

var ImgixClient = require('imgix-core-js');
var env = require('../config/env.js');
var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var router = express.Router();

var imgixClient = new ImgixClient(env.IMGIX_DOMAIN, env.IMGIX_SECURE_TOKEN);
var fileNameList = path.join(__dirname, '../public/photos.txt');

var mkdirp = require('mkdirp');
var imageDir = path.join(__dirname, '../public/photos/');
var publicPhotoDir = 'photos/';

/* GET home page. */
router.get('/', function(req, res, next) {
  if (env.NODE_ENV === 'production') {
    getImgix(fileNameList, function(err, files) {
      if (err) { console.error(err); res.status(500).send(err); return; }
      res.render('index', { title: 'Photo Project', images: files, tracking: env.TwitterStream.track });
    });
  } else {
    getImages(imageDir, function(err, files) {
      if (err) { console.error(err); res.status(500).send(err); return; }
      res.render('index', { title: 'Photo Project', images: files, tracking: env.TwitterStream.track });
    });
  }
});

function getImgix(fileNameList, cb) {
  fileNameList
  fs.readFile(fileNameList, function read(err, data) {
    if (err) {
      cb(err, null);
    }
    var list = _.split(data, '\n');
    var fileNameArray = [];
    for (var i = 0; i < list.length; i++) {
      fileNameArray.push(imgixClient.path(list[i]).toUrl({
        w: 1024,
        h: 768
      }).toString());
    }
    cb(err, fileNameArray);
  });
}

function getImages(imageDir, cb) {
  var fileType = '.jpg';
  var files = [];
  cb = cb || function() {};
  mkdirp(imageDir, function(err) {
    if (err) {
      cb(err, files);
      return;
    }
    fs.readdir(imageDir, function(err, list) {
      if (err) {
        cb(err);
        return;
      }
      for (var i = 0; i < list.length; i++) {
        if (path.extname(list[i]) === fileType) {
          //store the file name into the array files
          files.push(path.join(publicPhotoDir, list[i]));
        }
      }
      cb(err, files);
    });
  });
}

module.exports = router;
