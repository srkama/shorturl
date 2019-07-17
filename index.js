// Simple Webserver that supports both HTTP and HTTPs requests
// can be taken and modified further

const http = require("http");
const url = require("url");
const mongodbClient = require("mongodb").MongoClient
const StringDecoder = require("string_decoder").StringDecoder;

const config = require("./config.js");
const handleRoute = require("./route");


//Handles all the request for
const CommonServer = (req, res) => {
    const parsedURL = url.parse(req.url, true);

    var buffer = "";
    let decoder = new StringDecoder("utf-8");

    req.on("data", data => {
        buffer += decoder.write(data);
    });

    req.on("end", () => {
        buffer += decoder.end();
        if (
            req.headers['content-type'] && req.headers["content-type"].toLowerCase() ===
            "application/json".toLowerCase() &&
            buffer.length > 0
        ) {
            buffer = JSON.parse(buffer);
        }

        const data = {
            path: parsedURL.pathname,
            headers: req.headers,
            method: req.method,
            queryParams: parsedURL.query,
            payload: buffer
        };
        console.log(data);

        locals = req.client.server.locals

        handleRoute(locals, data, (statusCode, response, responseType = 'json') => {
            if (responseType === 'redirect') {
                res.writeHead(302, {
                    Location: response
                });
                res.end();
            } else {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);
                res.end(JSON.stringify(response));
            }
        });
    });

}

const httpServer = http.createServer(CommonServer);

mongodbClient.connect(config.db, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log("Error in connecting to DB!! exiting");
        process.exit(1);
    }
    const db = client.db('shorturl');
    httpServer.locals = {}
    httpServer.locals.db = db;
    httpServer.listen(config.http.port, () => {
        console.log("http server listening in" + config.http.port);
    });
});
