import React, { useState } from 'react';
import Logo from "../img/u_Logo.jpeg";
import styled from 'styled-components';
import IDicon from "../img/id.png";
import PWicon from "../img/pw.png";
import axios from 'axios';

const StyledSignUp = styled.div`
  position: absolute;
  top: 23%;
  left: 50%; 
  width: 500px;
  margin-left: -250px;
  align-items: center;
  background: white;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 30px 0px;

  input {
    height: 25px;
    margin: 15px 10px;
    border: 2px solid;
  }

  Button {
    margin-top: 15px;
  }
`

export default function SignUpBox({ signUp, closeModal, checkAdmin }) {

  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [check, setCheck] = React.useState(checkAdmin);

  const onIdHandler = (event) => {
    setId(event.currentTarget.value)
}

  const onPwHandler = (event) => {
    setPw(event.currentTarget.value)
}

  const onClickSignUp = () => {
    if(!id && !pw) {
      return alert('아이디와 비밀번호를 입력하세요!')
    }
    else if(!pw) {
      return alert('비밀번호를 입력하세요!')
    }
    else {
      SignUp()
      return alert('회원가입이 완료되었습니다!')
    }
  }

  const SignUp = () => {
    //console.log(check)
    axios.post('http://localhost:4000/login/register', {
      id: id,
      pw: pw,
      checkadmin: check
    })
  }

  return <>
    <StyledSignUp>
        <img src={Logo} className="SignUpLogo"/>
        <h2 className="signUpHead">{signUp} 회원가입</h2>
        <div id="userIDdiv">
          <img src={IDicon} className="IDiconImg"/>
          <input
            id="userID"
            type="text"
            placeholder="ID"
            value={id}
            onChange={onIdHandler}
        />
        </div>
        <div id="userPWdiv">
        <img src={PWicon} className="PWiconImg"/>
          <input
            id="userPW"
            type="password"
            placeholder="PW"
            value={pw}
            onChange={onPwHandler}
          />
        </div>
        <button className="signUpBoxButton" onClick={onClickSignUp}>
          가입하기
        </button > 
        <button className="signUpBoxButton" onClick={closeModal}>
          닫기
        </button>
    </StyledSignUp>
  </>;

}
