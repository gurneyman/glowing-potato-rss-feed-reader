var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

var req = request('http://nautil.us/rss/all');
var feedparser = new FeedParser();

const feedContents = {
    items: []
};

req.on('error', function (error) {
  // TODO: handle any request errors
  console.error(error);
});

req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});

feedparser.on('error', function (error) {
  // TODO: always handle errors
  console.error(error);
});

feedparser.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;

  while (item = stream.read()) {
    // TODO: this is dirty af... Really should parse this out and only return the info I need
    item.summary = item.summary.replace(/<br>/g," ");
    feedContents.items.push(item);
  }
});

module.exports = feedContents;