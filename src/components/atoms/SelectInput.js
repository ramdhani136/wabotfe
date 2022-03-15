import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const SelectInput = ({
  value,
  label,
  onReset,
  data,
  setValue,
  getSelect,
  setOpen,
  isOpen,
  createNew,
  valueCreate,
  setValueCreate,
  plCreate,
  placeholder,
}) => {
  return (
    <Wrapper onMouseLeave={() => setOpen(false)}>
      <Label>{label}</Label>
      <ButtonSelect onClick={() => setOpen(true)}>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <CloseIcon
            onClick={onReset}
            style={{ color: "#ccc", fontSize: "19px", marginRight: "5px" }}
          />
        )}
      </ButtonSelect>
      <ListSelect isOpen={isOpen}>
        {data.length < 1 && <Nodata>Data does not exits</Nodata>}
        {data.map((list, id) => (
          <IsData onClick={(e) => getSelect(list)} key={id}>
            {list.name}
          </IsData>
        ))}
        <input
          placeholder={plCreate}
          style={{
            width: "90%",
            height: "33px",
            marginLeft: "2%",
            border: "solid 1px #ccc",
            borderRadius: "2px",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginTop: "5px",
            marginBotton: "5px",
          }}
          value={valueCreate}
          onChange={(e) => setValueCreate(e.target.value)}
        />
        <IsData
          style={{ color: "#000", display: "flex", alignItems: "center" }}
          onClick={(e) => createNew()}
        >
          <a>Add New</a>
          <AddIcon
            style={{ fontSize: "14px", marginLeft: "5px", marginTop: "2px" }}
          />
        </IsData>
      </ListSelect>
    </Wrapper>
  );
};

export default SelectInput;

const Wrapper = styled.div`
  width: 88%;
  margin-left: 6%;
  height: auto;
  position: "relative";
  float: left;
  margin-bottom: 10px;
`;

const ButtonSelect = styled.div`
  width: 97.3%;
  height: 40px;
  border: solid 1px #ccc;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding-left: 10px;
  cursor: pointer;
  float: left;
  border-radius: 2px;
`;

const ListSelect = styled.div`
  width: 99.5%;
  max-height: 200px;
  background-color: white;
  border: solid 1px #ccc;
  float: left;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 0px 0px 2px 2px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const Label = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 0.9em;
  color: gray;
  float: left;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
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

const Nodata = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  color: #ccc;
  font-size: 0.85em;
  background-color: whitesmoke;
`;

const IsData = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  font-size: 0.85em;
  color: gray;
  :hover {
    background-color: whitesmoke;
  }
`;
