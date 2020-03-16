// Express framework 엔진을 이용하여 HTTP 환경을 구성한다.
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, function () {
    return console.log('Example app listening on port ' + port + '!');
});

// 라우트 설정에 해당하는 디렉토리.
let birds = require('./routes/birds');
app.use('/birds', birds);

// 정적 파일을 제공하기 위함. 원래는 css 호출에 대한 각각의 app.get 디렉토리 설정을 추가해야 함.
// app.get('/style.css', function(req, res) {
//  res.sendFile(__dirname + "/" + "style.css");
// });
// 보통 CSS 와 JS 등은 아래와 같이 public 설정을 하여 오픈한다.
app.use(express.static(__dirname + '/views'));
app.use(express.static("public"));

app.route('/')
    .get(function (req, res) {
        // send 이후에는 sendFile 등등을 다시 못한다.
        //res.send('Hello World!');
        res.sendFile(__dirname + '/views/index.html');
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

console.log('aaa');
