var http = require('http');
var https = require('https');
var fs = require('fs');


var server = http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    if (req.url.startsWith("/sb/api/")) {
        completeUsingProxy(req, res);
    } else {
        completeUsingFileSystem(req, res);
    }
});

console.log("listening on port 5050")
server.listen(5050);

function completeUsingFileSystem(req, res) {
    if (req.url == "/") {
        req.url = "/index.html";
    }

    fs.readFile("public" + req.url, (ex, buffer) => {
        if (ex) {
            // An error occured (file not found or illegal path)
            res.statusCode = 404;
            res.end(JSON.stringify(ex));
        } else {
            // Send the data in the response.
            res.end(buffer);
        }
    });
}

function completeUsingProxy(req, res) {
    var proxyReq = https.get("https://www.nttb-ranglijsten.nl" + req.url);
    proxyReq.on("response", (proxyRes) => {
        if (proxyRes.headers['content-type']) {
            res.setHeader('content-type', proxyRes.headers['content-type']);
        }

        // "pipe" the proxy result in to the current response. 
        proxyRes.pipe(res);
    });
}
