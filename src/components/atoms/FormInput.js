import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const FormInput = ({
  label,
  placeholder,
  type,
  value,
  getData,
  valid,
  multiple,
  mb,
  btnRemove,
  actionRemove,
  refRemov,
}) => {
  return (
    <FormGroup mb={mb}>
      <Label>{label}</Label>
      <div
        style={{
          float: "left",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          valid={valid}
          onChange={(e) => getData(e)}
          value={value}
          type={type}
          placeholder={placeholder}
          multiple={multiple}
        />
        {btnRemove && (
          <>
            <CloseIcon
              onClick={() => actionRemove(refRemov)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#b44b42",
                marginLeft: "5px",
              }}
            />
          </>
        )}
      </div>
    </FormGroup>
  );
};

export default FormInput;

const FormGroup = styled.div`
  width: 93.5%;
  height: auto;
  margin-top: 7px;
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)};
  float: left;
`;

const Label = styled.div`
  width: 100%;
  padding-left: 6%;
  font-size: 0.9em;
  color: gray;
  float: left;
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-left: 6.5%;
  flex: 1;
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
