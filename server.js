const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, x-auth-token, content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

const port = process.env.PORT || 3000;
app.listen(port);
