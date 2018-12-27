var express = require('express');
var router = express.Router();

const feedContents = require('../feed-reader');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', feedItems: feedContents.items });
});

router.get('/feed-reader', function(req, res, next) {
    res.json(feedContents);
});

module.exports = router;
