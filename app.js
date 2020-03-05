const express = require('express');
const app = express();
const port = 3000;

app.listen(port, function () {
    return console.log('Example app listening on port ' + port + '!');
});

let birds = require('./routes/birds');
app.use('/birds', birds);

app.route('/')
    .get(function (req, res) {
        res.send('Hello World!');
    })
    .post(function (req, res) {
        res.send('Got a POST request');
    })
    .put(function (req, res) {
        res.send('Update the book');
    });

app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});
