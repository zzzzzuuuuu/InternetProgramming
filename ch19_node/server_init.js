// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
// request.param()은 레거시므로 이제 request.body() 사용, 이를 위해서는 body-parser 추가
var bodyParser = require('body-parser');

// 변수를 선언합니다.
var people = [{
  name: '홍길동',
  major: '정보통신공학과',
  num: '60191919'
}, {
  name: 'SonHeungMin',
  major: '컴퓨터공학과',
  num: '60181818'
}, {
  name: 'ParkJiSung',
  major: '전자공학과',
  num: '60202020'
}];

// 웹 서버를 생성합니다.
var app = express();
var router = express.Router();

// body-parser를 사용합니다.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(router);
// 라우트합니다.
app.all('/data.html', function (request, response) {
  var output = '';
  output += '<!DOCTYPE html>';
  output += '<html>';
  output += '<head>';
  output += '    <title>Data HTML</title>';
  output += '</head>';
  output += '<body>';
  people.forEach(function (people) {
    output += '<div>';
    output += '    <h1>' + people.name + '</h1>';
    output += '    <h2>' + people.major + '</h2>';
    output += '    <h2>' + people.num + '</h2>';
    output += '</div>';
  });
  output += '</body>';
  output += '</html>';
  response.send(output);
});

app.all('/data.json', function (request, response) {
  response.send(people);
});

app.all('/data.xml', function (request, response) {
  var output = '';
  output += '<?xml version="1.0" encoding="UTF-8" ?>';
  output += '<students>';
  people.forEach(function (people) {
    output += '<students>';
    output += '    <name2>' + people.name + '</name2>';
    output += '    <major>' + people.major + '</major>';
    output += '    <num>' + people.num + '</num>';
    output += '</students>';
  });
  output += '</students>';
  response.type('text/xml');
  response.send(output);
});

app.all('/parameter', function (request, response) {
  // 변수를 선언합니다.
  var name = request.query.name;
  var major = request.query.major;
  var num = request.query.num;

  // 응답합니다.
  response.send('<h1>' + name + ':' + major + num + '</h1>');
});

app.all('/parameter/:id', function (request, response) {
  // 변수를 선언합니다.
  var id = request.params.id;

  // 응답합니다.
  response.send('<h1>' + id + '</h1>');
});

app.get('/people', function (request, response) { // get 방식으로 모든 아이템이 다 보이도록
  response.send(people);
});

app.get('/people/:id', function (request, response) { // get 방식으로 특정 인덱스만 동적으로 보이도록
  var id = Number(request.params.id);

  if (isNaN(id)) {
    // 오류: 잘못된 경로
    response.send({
      error: '숫자를 입력하세요!'
    });
  } else if (people[id]) {
    // 정상
    response.send(people[id]);
  } else {
    // 오류: 요소가 없을 경우
    response.send({
      error: '존재하지 않는 데이터입니다!'
    });
  }
});

app.post('/people', function (request, response) { // 이름 학과 학번 정보 추가 -> 걍 안됨 에러뜸
  var name = request.body.name;
  var major = request.body.major;
  var num = request.body.num;

  var newPerson = {
    name: name,
    major: major,
    num: num
  };

  // 데이터를 추가합니다.
  people.push(newPerson);
  // 응답합니다.
  response.send({
    message: '데이터를 추가했습니다.',
    data: newPerson
  });
});

app.put('/people/:id', function (request, response) { // 특정인 정보 일부 수정
  var id = Number(request.params.id);
  var name = request.body.name;
  var major = request.body.major;
  var num = request.body.num;

  if (people[id]) {
    // 데이터를 수정합니다.
    if (name) {
      people[id].name = name;
    }
    if (major) {
      people[id].major = major;
    }
    if (num) {
      people[id].num = num;
    }

    // 응답합니다.
    response.send({
      message: '데이터를 수정했습니다.',
      data: people[id]
    });
  } else {
    // 오류: 요소가 없을 경우
    response.send({
      error: '존재하지 않는 데이터입니다!'
    });
  }
});

app.del('/people/:id', function (request, response) { // 특정인 삭제
  var id = Number(request.params.id);

  if (isNaN(id)) {
    // 오류: 잘못된 경로
    response.send({
      error: '숫자를 입력하세요!'
    });
  } else if (people[id]) {
    // 정상: 데이터 삭제
    people.splice(id, 1);
    response.send({
      message: '데이터를 삭제했습니다.'
    });
  } else {
    // 오류: 요소가 없을 경우
    response.send({
      error: '존재하지 않는 데이터입니다!'
    });
  }
});

// 웹 서버를 실행합니다.
http.createServer(app).listen(52273, function () {
  console.log('Server Running at http://127.0.0.1:52273');
});
