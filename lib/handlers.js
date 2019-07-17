
const createShortURL = require('./createShortURL');

const handlers = {
    getLongURL: (app, data, callback) => {
        shorturl = data.path.replace("/", "")
        if (shorturl === 'googl') {
            callback("301", "https://google.com", "redirect");
        }
        callback("404", "Not found");
    },

    createshorturl: (app, data, callback) => {
        url = data.payload['url']
        console.log(url)
        shortURLCollection = app.db.collection('shorturl');
        shortURLCollection.findOne({
            longURL: url
        }, (err, data) => {
            if (data) {
                callback(200, data.shortURL);
            } else {
                uniqueVal = createShortURL();
                shortURL = "localhost/" + uniqueVal
                shortURLCollection.insertOne({
                    shortURL: shortURL,
                    longURL: url
                }, (err, data) => {
                    if (err) throw err;
                    callback("200", shortURL);
                });
            }
        })
    },
}

module.exports = handlers;
