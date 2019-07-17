const handlers = require("./lib/handlers");

const route = {
    "/createshorturl": handlers.createshorturl,
    defaultHandler: handlers.getLongURL
};

const handleRoute = (app, data, callback) => {
    var handler = route[data.path] ? route[data.path] : route.defaultHandler;
    handler(app, data, callback);
};

module.exports = handleRoute;
