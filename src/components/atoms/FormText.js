import React from "react";
import styled from "styled-components";

const FormText = ({ label, placeholder, value, getData, valid }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Textarea
        valid={valid}
        onChange={(e) => getData(e)}
        value={value}
        placeholder={placeholder}
      ></Textarea>
    </FormGroup>
  );
};

export default FormText;

const FormGroup = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
`;

const Label = styled.div`
  width: 100%;
  padding-left: 6%;
  font-size: 0.9em;
  color: gray;
  float: left;
`;

const Textarea = styled.textarea`
  margin-top: 8px;
  width: 85%;
  margin-left: 6%;
  height: 50px;
  outline: none;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: solid 1px #ccc;
  border-color: ${(props) => (props.valid ? "#ccc" : "red")};
  border-radius: 2px;
  ::-webkit-input-placeholder {
    color: #eee;
  }

  /*support mozilla*/
  ::-moz-input-placeholder {
    color: #eee;
  }

  /*support internet explorer*/
  ::-ms-input-placeholder {
    color: #eee;
  }
`;
