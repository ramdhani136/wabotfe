import React from "react";
import styled from "styled-components";

const Modal = () => {
  return (
    <>
      <Wrapper></Wrapper>
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
`;

export default Modal;
