var http = require('http');
var https = require('https');
var fs = require('fs');


var server = http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);
    if (req.url.startsWith("/sb/api/")) {
        var proxyReq = https.get("https://www.nttb-ranglijsten.nl" + req.url);
        proxyReq.on("response", (proxyRes) => {
            if (proxyRes.headers['content-type']) {
                res.setHeader('content-type', proxyRes.headers['content-type']);
            }
            proxyRes.pipe(res);
        });
    } else {
        if (req.url == "/") { req.url = "/index.html"; }
        fs.realpath("public" + req.url, (ex, path) => {
            console.log(ex, path);
        });
        var f = fs.readFile("public" + req.url, (ex, buffer) => {
            if (ex) {
                res.statusCode = 500;
                res.end(JSON.stringify(ex));
                return;
            }

            res.end(buffer);
        });
    }
});

console.log("listening on port 5050")
server.listen(5050);