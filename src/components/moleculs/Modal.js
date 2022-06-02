import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { modalSet, selectModal } from "../../redux/slices/ModalSlice";
import { useDispatch } from "react-redux";
import FormCreateUser from "../../pages/SettingsPage/FormCreateUser";
import ReactLoading from "react-loading";
import FormCreateAr from "../../pages/AutoReply/FormCreateAr";
import FormKey from "../../pages/Key&Menu/FormKey";
import FormMenu from "../../pages/Key&Menu/FormMenu";
import FormSales from "../../pages/SalesPage/FormSales";
import FormSalesGroup from "../../pages/SalesGroupPage/FormSalesGroup";

const Modal = () => {
  const dataModal = useSelector(selectModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSet({ active: false, page: "" }));
  };

  return (
    <>
      <Wrapper onClick={closeModal} active={dataModal.active}></Wrapper>
      <Content
        active={dataModal.active}
        width="40%"
        height="auto"
        maxHeight="85%"
        left="30%"
      >
        <HeaderContent>
          <CloseIcon
            style={{ cursor: "pointer", fontSize: "25px", color: "gray" }}
            onClick={closeModal}
          />
        </HeaderContent>
        <MainContent>
          {dataModal.isLoading && (
            <Loading>
              <ReactLoading type="spin" color="#e5e7ef" />
            </Loading>
          )}
          {dataModal.page === "createUser" && !dataModal.isLoading && (
            <FormCreateUser data={dataModal.data} />
          )}
          {dataModal.page === "createAr" && !dataModal.isLoading && (
            <FormCreateAr data={dataModal.data} />
          )}
          {dataModal.page === "createKey" && !dataModal.isLoading && (
            <FormKey data={dataModal.data} />
          )}
          {dataModal.page === "createMenu" && !dataModal.isLoading && (
            <FormMenu data={dataModal.data} />
          )}
          {dataModal.page === "createSales" && !dataModal.isLoading && (
            <FormSales data={dataModal.data} />
          )}
          {dataModal.page === "createSalesGroup" && !dataModal.isLoading && (
            <FormSalesGroup data={dataModal.data} />
          )}
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
  z-index: 1000;
  display: ${(props) => (props.active ? "flex" : "none")};
`;

const Content = styled.div`
  border-radius: 3px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxHeight};
  border: solid 1px gray;
  z-index: 1001;
  background-color: white;
  position: absolute;
  left: ${(props) => props.left};
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: column;
  top: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 10px;
  padding-bottom: 30px;
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
  height: 90%;
`;

const Loading = styled.div`
  width: 99%;
  height: 99%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;

export default Modal;
