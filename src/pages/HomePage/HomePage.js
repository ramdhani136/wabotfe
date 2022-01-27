import React from "react";
import styled from "styled-components";
import Layout from "../../components/organism/layout/Layout";

const HomePage = () => {
  const ViewHome = () => {
    return <Wrapper>Halaman Home</Wrapper>;
  };

  return <Layout Component={ViewHome} />;
};

const Wrapper = styled.div``;

export default HomePage;
