import React from 'react';
import styled from 'styled-components';

const StyledReturnInput = styled.div`
  position: absolute;
  align-items: center;

  input {
    height: 25px;
    margin: 15px 10px;
    border: 2px solid;
  }

  button {
    display: inline-block;
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: black;
    color: #d4f3f8;
    width: 5.5rem;
    height: 2.0rem;
    fontSize: 1.5rem;
    font-weight: bolder;
    cursor: pointer;
    padding: 0 1rem;
    text-align: center;
    margin: 2px;
  }
`

export default function ReturnInput({title, detail, addData, closeModal}) {
  
  return <>
    <StyledReturnInput>
       <h3>{title}</h3>
       <div classname="inputDiv">
        <input
          className="ReturnInput"
          type="text"
          placeholder="물품명"/>
          <input
            className="ReturnInput"
            type="text"
            placeholder="물품번호"/>
          <input
            className="ReturnInput"
            type="text"
            placeholder="대여자ID"/>
          <input
            className="detailsCheck"
            type="checkbox"/>{detail}
        </div>
        <button onClick={addData}>{title}</button>
        <button onClick={closeModal}>닫기</button>
    </StyledReturnInput>
  </>;

}