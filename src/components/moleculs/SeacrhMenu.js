import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const SeacrhMenu = () => {
  const [value, setValue] = useState("");
  const [isAktif, setAktif] = useState(false);
  const navigate = useNavigate();
  const Menus = [
    { nama: "Dashboard", uri: "/" },
    { nama: "Contacts", uri: "/contact" },
    // { nama: "Send Message", uri: "/send_message" },
    { nama: "Auto Reply", uri: "/bot" },
    // { nama: "Broadcast", uri: "/Broadcast" },
    { nama: "Keys & Menu", uri: "/key&menu" },
    // { nama: "Group", uri: "/group" },
    // { nama: "Report", uri: "/report" },
    { nama: "Settings", uri: "/settings" },
  ];

  const filterMenu = (data) => {
    return _.filter(data, function (query) {
      var name = value
        ? query.nama.toLowerCase().includes(value.toLowerCase())
        : true;

      return name;
    });
  };

  return (
    <Wrapper onMouseLeave={() => setAktif(false)}>
      {/* // <Wrapper> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          zIndex: 2000,
        }}
        onClick={() => setAktif(true)}
      >
        <Input
          placeholder="Search your menu"
          onChange={(e) => setValue(e.target.value)}
        />
        <SearchIcon style={{ color: "#ccc", marginTop: "6px" }} />
      </div>
      {isAktif && (
        <ListMenu>
          {filterMenu(Menus).map((menu, id) => (
            <List onClick={() => navigate(menu.uri)} key={id}>
              {menu.nama}
            </List>
          ))}
          {filterMenu(Menus).length < 1 && (
            <List style={{ textAlign: "center" }}>Menu does not exist</List>
          )}
        </ListMenu>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid 1px #e5e7ef;
  align-items: center;
  width: 350px;
  height: 37px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 3px;
`;

const Input = styled.input`
  height: 30px;
  flex: 1;
  border: none;
  outline: none;
  margin-top: 3px;
  body {
    background: #35a9db;
    font-family: roboto;
    text-align: center;
  }

  h1 {
    color: #fff;
  }

  /*contoh1*/
  /*support google chrome*/
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

const ListMenu = styled.div`
  width: 105.5%;
  position: relative;
  margin-left: -3%;
  background-color: #fff;
  z-index: 1000;
  border: solid 1px #e5e7ef;
  margin-top: 3px;
  max-height: 300px;
  overflow-y: scroll;
`;

const List = styled.a`
  width: 93.8%;
  float: left;
  font-size: 0.85em;
  padding: 3%;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #a6a6a6;
  :hover {
    /* border-top: solid 1px #dcdddf;
    border-bottom: solid 1px #dcdddf; */
    cursor: pointer;
    background-color: #f5f6f8;
    transform: scale(1.005);
    color: gray;
  }
`;

export default SeacrhMenu;
