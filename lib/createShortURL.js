const base62 = require('base62');

const createShortURL = () => {
    charSet = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    high = 64 ^ 7;
    low = 1000000;
    base62.setCharacterSet(charSet)
    num = randomIntInc(high, low)
    console.log(num);
    a = base62.encode(num);
    return a
}

function randomIntInc(high, low) {
    return Math.floor(Math.random() * (high - low + 1) + low)
}

module.exports = createShortURL;
