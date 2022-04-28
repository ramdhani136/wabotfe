import React from "react";
import styled from "styled-components";

const FormInput = ({
  label,
  placeholder,
  type,
  value,
  getData,
  valid,
  multiple,
  mb,
}) => {
  return (
    <FormGroup mb={mb}>
      <Label>{label}</Label>
      <Input
        valid={valid}
        onChange={(e) => getData(e)}
        value={value}
        type={type}
        placeholder={placeholder}
        multiple={multiple}
      />
    </FormGroup>
  );
};

export default FormInput;

const FormGroup = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)};
`;

const Label = styled.div`
  width: 100%;
  padding-left: 6%;
  font-size: 0.9em;
  color: gray;
  float: left;
`;

const Input = styled.input`
  margin-top: 8px;
  width: 85%;
  margin-left: 6%;
  height: 35px;
  outline: none;
  padding-left: 10px;
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
