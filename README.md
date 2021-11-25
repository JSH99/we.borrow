# :bulb:we.borrow:bulb:
## 대여물품 관리 웹사이트

## 🛠Tech Stack🛠 
<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=black"/></a> 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>

## 주제: 물품 대여 서비스를 기반으로 한 웹페이지 제작
* 관리자: 대여할 물품의 ```등록``` 및 ```삭제```를 진행 / 편리한 ```반납``` 과정 진행
* 대여자: 대여 가능한 물품 확인 및 ```대여```
* 공통: 검색을 통한 원하는 대여 물품의 현 상황```(대여중 / 대여가능)``` 확인 가능
---
### 1. 프로젝트 목적 & 필요성: 수기 작성을 통한 물품 대여 진행의 불편함 개선
* 관리자: 관리대장을 매번 확인하고 관리해야 하는 불편함
* 사용자: 수기로 작성해야 하는 대여 기록으로 인한 번거로운 절차
---
### 2. Role
|이름|역할|
|------|---|
|[김유빈(ubeeni)](https://github.com/ubeeni)|:art:Design|
|[문정호(ILWAT)](https://github.com/ILWAT)|:unlock:Back-end|
|[윤석현(master1st)](https://github.com/master1st)|:unlock:Back-end|
|[정서현(JSH99)](https://github.com/JSH99)|:computer:Front-end|

---
### 3. 주요내용
* 메인 로그인 화면, 회원가입, 물품 목록 및 대여 현황 조회, 대여 물품 등록, 물품 대여, 반납 등의 상세 페이지 구현
* 로그인 정보에 따라 서비스 제공자와 이용자를 나눠 데이터베이스에 정보 저장 -> 로그인 -> 각자 다른 메인 페이지 화면
  - ```관리자 모드```: 대여 물품 등록(삭제) & 반납
  - ```사용자 모드```: 물품 리스트 조회 & 대여
---
### 4. 기대효과
* 실생활에 적용 가능한 웹페이지
  - ex) 학생회 서비스나, 아파트 & 기숙사 등 물품 대여 서비스를 진행하고 있는 여러 곳에서 활용 가능
1. 대여 물품을 수기로 작성함으로써 겪는 불편함이나 실수를 줄일 수 있음
2. 정확하고 깔끔하게 대여 물품을 관리할 수 있음
3. 사용자(대여자)는 대여하고자 하는 물품이 있는지 미리 확인할 수 있기 때문에 대여 장소에 방문했다 헛걸음하는 수고를 줄일 수 있음
---
### 5. 구현 코드
**Front-end rent code**
``` js
const Rent = () => {
    if(!prodId) {
      return alert('대여할 물품을 선택해주세요!')
    }
    else {
      if(checked==true) {
        axios.post('http://localhost:4000/rental/startrental', {
          id: userId,
          num: prodId
          }).then((Response)=>{
            if(Response.data=="대여중") {
              alert("대여중인 물품은 대여할 수 없습니다!");
              }
            else {
              alert("대여되었습니다:)\n대여물품 수령은 학생회관으로 와주세요!");
              }
            })
        . catch((Error)=>{console.log(Error)})        
      }
      else {
        return alert('내용을 확인하고 체크해주세요!');
      }
    }
```
**Back-end rent code**
``` js
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
    if(rows[0].state=="대여가능") {
      db.query('UPDATE prod SET rentalUser=?,state=?,rentalDate=? WHERE prodId=? ',[id,borrow,nowdate,num], (err,rows) => {
        if(err) throw err;
        });
      response.send(`${rows[0].state}`);
    }
    else {
      response.send(`${rows[0].state}`);
    }
  });
})
``` 
**create table**
``` 
create table prod(
prodId int auto_increment,
prodName varchar(20),
prodNumber int,
rentalDay int,
state varchar(20),
returnDate date,
rentalDate date,
rentalUser varchar(20),
primary key(prodId),
foreign key(rentalUser) references login(id));
```
---
### 6. 실행
**최초 1회 실행**
```
npm install
```
**RUN(각각 다른 터미널을 통해)**
```
npm start
```
```
node db.js
```
### 7. 최종 구현
*Login 화면*
<br>
![image](https://user-images.githubusercontent.com/69234788/143406179-0738dc8d-d2ba-4cc7-a2d5-e198943f0378.png)
<br>
*회원가입 Modal*
<br>
![image](https://user-images.githubusercontent.com/69234788/143406342-db56dc53-1485-4d37-a2b7-c501eda493d1.png)
<br>
*아이디, 비밀번호 입력*
<br>
![image](https://user-images.githubusercontent.com/69234788/143406440-57391f46-2f30-4b88-be4c-5a614131e65c.png)
<br>
*관리자 화면*
<br>
![image](https://user-images.githubusercontent.com/69234788/143406555-24763135-5a92-4902-a8c7-7f56883cdf24.png)
<br>
*물품등록*
<br>
![image](https://user-images.githubusercontent.com/69234788/143406596-d2e2198a-42c5-4c3c-a7d2-fd958b0486e7.png)
<br>
*사용자 메인화면, MainUser 페이지*
<br>
![image](https://user-images.githubusercontent.com/69234788/143406673-6bcf29ff-c1d1-424f-a7ef-dbfc9bb15dec.png)
<br>
*대여*
<br>
![image](https://user-images.githubusercontent.com/69234788/143407092-18c1a2df-28d2-402d-8b1f-f61e8b424456.png)
<br>
*반납*
<br>
![image](https://user-images.githubusercontent.com/69234788/143407184-6a6dcecb-6e50-4789-a238-5acacfeb7088.png)
<br>
*삭제*
<br>
![image](https://user-images.githubusercontent.com/69234788/143407207-e1960c97-5bac-4ca0-8ec0-aa7165290005.png)
