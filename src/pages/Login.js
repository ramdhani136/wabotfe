import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { API_URI } from "../utils";
import { useNavigate } from "react-router-dom";
const image = require("./wa.jpg");

const LoginPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({ username: "", password: "" });
  const [type, setType] = useState("password");
  const history = useNavigate();

  const onLogin = async () => {
    try {
      const res = await axios.post(`${API_URI}users/login`, value);
      localStorage.setItem("token", res.data.accessToken);
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //redirect page dashboard
      history("/");
    }
    // const getUsers = async () => {
    //   const login = await refreshToken();
    //   if (login) {
    //     history("/");
    //   }
    // };
    // getUsers();
  }, []);

  return (
    <Wrapper>
      <Content>
        <Form>
          <Title>Login</Title>
          <FormGroup>
            <Label>Username :</Label>
            <Input
              type="text"
              onChange={(e) => setValue({ ...value, username: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password :</Label>
            <Input
              type={type}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
            />
            {type === "password" && (
              <VisibilityIcon
                onClick={() => setType("text")}
                style={{
                  position: "absolute",
                  marginTop: "30px",
                  fontSize: "15px",
                  marginLeft: "300px",
                  cursor: "pointer",
                  color: "#ddd",
                }}
              />
            )}
            {type === "text" && (
              <VisibilityOffIcon
                onClick={() => setType("password")}
                style={{
                  position: "absolute",
                  marginTop: "30px",
                  fontSize: "15px",
                  marginLeft: "300px",
                  cursor: "pointer",
                  color: "#ddd",
                }}
              />
            )}
          </FormGroup>
          <Button onClick={onLogin}>Login</Button>
        </Form>
      </Content>
      <div style={{ color: "white", marginTop: "100px" }}>
        &copy; (IT) PT. Ekatunggal Tunas Mandiri - 2022 (WABlash)
      </div>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  /* background-color: #1f2531; */
  background-image: url(${image});
  flex-direction: column;
  align-items: center;
  contain: cover;
`;

const Content = styled.div`
  width: 400px;
  height: 390px;
  border: solid 1px #265b4c;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  width: 90%;
  flex: 0.95;
  margin-top: 20px;
  border: solid 1.5px #ddd;
  border-radius: 5px;
`;

const Title = styled.h3`
  padding: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: 800;
  font-size: 0.95em;
`;

const Input = styled.input`
  padding: 8px;
  border: solid 1px #f6b172;
  border-radius: 3px;
  position: relative;
`;

const Button = styled.div`
  cursor: pointer;
  border: solid 1px #cbae7a;
  margin: 15px;
  margin-top: 30px;
  text-align: center;
  padding-top: 8px;
  background-color: #f6d384;
  padding-bottom: 8px;
  border-radius: 2px;
  color: #276757;
  font-weight: bold;
  :hover {
    background-color: #ddbd76;
    border: solid 1px #b0975e;
  }
`;
