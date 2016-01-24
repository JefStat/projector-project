var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var imageDir = __dirname + '/../public/photos/';
var publicPhotoDir = 'photos/';

/* GET home page. */
router.get('/', function(req, res, next) {
  getImages(imageDir, function (err, files) {
    if (err) { console.error(err); res.status(500).send(err); return; }
    res.render('index', { title: 'Photo Project', images: files });
  });
});

function getImages(imageDir, cb) {
  var fileType = '.jpg';
  var files = [];
  fs.readdir(imageDir, function (err, list) {
    if (err) { cb(err); return; }
    for(var i=0; i<list.length; i++) {
      if(path.extname(list[i]) === fileType) {
        files.push(publicPhotoDir + list[i]); //store the file name into the array files
      }
    }
    cb(err, files);
  });
}

module.exports = router;
