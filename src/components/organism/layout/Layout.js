import React from "react";
import styled from "styled-components";
import HeaderComponent from "../header/HeaderComponent";
// import FooterComponent from "../footer/FooterComponent";
import ContentComponent from "../content/ContentComponent";
import { Modal } from "../../moleculs";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URI } from "../../../utils";

const Layout = ({ Component }) => {
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      //redirect page dashboard
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login !!",
      });
      history("/login");
    }
    const fetchAPI = axios.create({});

    fetchAPI.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      },
      (error) => {
        Promise.reject(error);
      }
    );
    axios
      .get(`${API_URI}users/token`)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <>
      <Modal />
      <Wrapper>
        <HeaderComponent />
        <ContentComponent Page={Component} />
        {/* <FooterComponent /> */}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default Layout;
