import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { modalSet, selectModal } from "../../redux/slices/ModalSlice";
import { useDispatch } from "react-redux";
import FormCreateUser from "../../pages/SettingsPage/FormCreateUser";

const Modal = () => {
  const dataModal = useSelector(selectModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSet({ active: false, page: "" }));
  };

  return (
    <>
      <Wrapper onClick={closeModal} active={dataModal.active}></Wrapper>
      <Content active={dataModal.active} width="40%" height="87%" left="30%">
        <HeaderContent>
          <CloseIcon
            style={{ cursor: "pointer", fontSize: "25px", color: "gray" }}
            onClick={closeModal}
          />
        </HeaderContent>
        <MainContent>
          {dataModal.page === "createUser" && <FormCreateUser />}
        </MainContent>
      </Content>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: black;
  opacity: 0.5;
  z-index: 2000;
  display: ${(props) => (props.active ? "flex" : "none")};
`;

const Content = styled.div`
  border-radius: 3px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: solid 1px gray;
  z-index: 2001;
  background-color: white;
  position: absolute;
  left: ${(props) => props.left};
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: column;
  top: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  animation: animatetop 0.2s;
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

const HeaderContent = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`;

const MainContent = styled.div`
  flex: 1;
`;

export default Modal;
