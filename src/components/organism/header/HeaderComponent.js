import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SeacrhMenu } from "../../moleculs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import { API_URI } from "../../../utils";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Swal from "sweetalert2";

const HeaderComponent = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const logout = () => {
    axios.delete(`${API_URI}users/logout`).then((res) => {
      localStorage.removeItem("token");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    });
  };

  useEffect(() => {
    const user = jwt_decode(localStorage.getItem("token"));
    setUsers(user);
  }, []);

  return (
    <Wrapper>
      <Logo>WAblast</Logo>
      <SeacrhMenu />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "gray",
        }}
      >
        <a onClick={logout} style={{ fontSize: "0.9em" }}>
          {users && users.name}
        </a>
        <ArrowDropDownIcon style={{ fontSize: "20px", marginTop: "5px" }} />
      </div>
    </Wrapper>
  );
};

export default HeaderComponent;

const Wrapper = styled.div`
  width: 96%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid whitesmoke;
  padding-left: 2%;
  padding-right: 2%;
`;

const Logo = styled.h2`
  color: #101a32;
`;
