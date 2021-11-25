const express = require('express');
const app = express();
const sql = require('mysql');
const cors = require('cors');
const request = require('request');
const bodyParser = require("body-parser");
const { send } = require('process');
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const db = sql.createConnection({
  "host": 'localhost',
  "port":'3306', //포트 번호
  "user": 'root',
  "password": '', //DB 서버 비밀번호
  "database": 'weborrow',
});

db.connect();

 


//전체 logindata relation 출력
db.query('SELECT * FROM login', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});

//전체 rentaldata relation 출력
db.query('SELECT * FROM prod', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});




//받을 데이터가 필요할때
//로그인
app.post("/api/login", (request, response) => {
  const id = request.body.id
  const pw = request.body.pw 
  console.log(id, pw)
  db.query('select * from login where id = ? and password = ?',[id, pw], (err,rows) => {
    if(err) throw err;
    //console.log(Object.keys(rows).length)
    if(Object.keys(rows).length === 0) {
      //console.log("x");
      response.send("");
    } else {
      //console.log(rows)
      response.send(rows);
    }
  });
})

//회원가입
app.post("/login/register", (request, response) => {
  const id = request.body.id
  const pw = request.body.pw 
  const checkadmin = request.body.checkadmin

  //console.log('INSERT INTO login VALUES(?,?,?)',[id, pw, checkadmin])
  db.query('INSERT INTO login VALUES(?,?,?)',[id, pw, checkadmin], (err,rows) => {
    if(err) throw err;
  });
})

//물품 등록
app.post("/rental/insert", (request, response) => {
  const name = request.body.prodName //물품 이름
  const num = request.body.prodNumber //물품 번호
  const day = request.body.Day //물품 대여 가능 일수
  const borrow="대여가능"
  //console.log('INSERT INTO prod(prodName,prodNumber,rentalDay) VALUES (?,?,?)',[name, num,day])
  db.query('INSERT INTO prod(prodName,prodNumber,rentalDay,state) VALUES (?,?,?,?)',[name, num, day, borrow], (err,rows) => {
    if(err) throw err;
  });
})

//물품 삭제
app.post("/rental/delete", (request, response) => {
  const id = request.body.id

  db.query('delete from prod where prodId = ?',[id], (err,rows) => {
    if(err) throw err;
  });
})

//물품 대여
//returndate 값 넣어주는 거 필요

app.post("/rental/startrental", (request, response) => {
  const id = request.body.id //사용자 아이디
  const num = request.body.num //물품 아이디
  const borrow="대여중"
  const date=new Date();
  const year=date.getFullYear();
  const month=date.getMonth()+1%13;
  const day=date.getDate()%31;
  const nowdate=year+"-"+month+"-"+day
  var returndate="";
  db.query('SELECT rentalDay, state FROM prod where prodId=?',[num], (err,rows) => {
    if(err) throw err;
    //console.log(rows[0].state);
    
    if(rows[0].state=="대여가능") {
      db.query('UPDATE prod SET rentalUser=?,state=?,rentalDate=? WHERE prodId=? ',[id,borrow,nowdate,num], (err,rows) => {
        if(err) throw err;
        });
      response.send(`${rows[0].state}`);
    }
    else {
      response.send(`${rows[0].state}`);
    }

    console.log(`${rows[0].state}`);
  });

})

//물품 반납
app.post("/rental/trental", (request, response) => {
  const num = request.body.num //물품 아이디
  const borrow="대여가능"
  //console.log(num)
  //const q = `UPDATE prod SET rentalUser=null,rentalDate=null,returnDate=null,state="${borrow}" WHERE prodId=${num}`
  db.query('UPDATE prod SET rentalUser=?,rentalDate=?,returnDate=?,state=? WHERE prodId=? ',[null,null,null,borrow,num], (err,rows) => {
    if(err) throw err;
    //console.log(rows)
    //response.send(rows);
    });
})
  
//물품 대여 리스트 출력
app.get("/api/printprod", (request, response) => {
  db.query('SELECT prodId, prodName, prodNumber, rentalDay, state, Date_format(rentalDate, "%Y-%m-%d") as rentalDate FROM prod', (err,rows) => {
    if(err) throw err;
    if(Object.keys(rows).length === 0) {
      response.send(null);
    } else {
      response.send(rows);
      //console.log(rows)
    }
  });
})

app.post("/api/temp", (request, response) => {
  const userId = request.body.userId
  db.query('UPDATE temp SET userId = ? ',[userId], (err,rows) => {
    if(err) throw err;
    });
})

app.get("/api/tempUser", (request, response) => {
  db.query('SELECT * FROM temp', (err,rows) => {
    console.log(Object.keys(rows).length)
    //console.log(rows)
    if(err) throw err;
    if(Object.keys(rows).length === 0) {
      response.send(null);
    } else {
      response.send(rows);
    }
  });
})

// 검색
app.post("/api/search", (request, response) => {
  const prodName = request.body.prodName
  const q = `SELECT prodId, prodName, prodNumber, rentalDay, state, Date_format(rentalDate, "%Y-%m-%d") as rentalDate FROM prod WHERE prodName LIKE "%${prodName}%"`
  //'SELECT prodId, prodName, prodNumber, rentalDay, state, Date_format(rentalDate, "%Y-%m-%d") as rentalDate FROM prod WHERE prodName LIKE "%?%"', [prodName]
  db.query(q, (err,rows) => {
    if(err) throw err;
    if(Object.keys(rows).length === 0) {
      response.send(null);
    } else {
      response.send(rows);
      //console.log(rows)
    }
    });
})

  app.listen(port, () => {console.log(`Listening on port ${port}`)});