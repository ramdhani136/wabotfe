import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../../components/organism/layout/Layout";
import { Helmet } from "react-helmet";
const HomePage = () => {
  const ViewHome = () => {
    return <Wrapper>Halaman Home</Wrapper>;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WAblast - Ekatunggal Tunas Mandiri</title>
      </Helmet>

      <Layout Component={ViewHome} />
    </>
  );
};

const Wrapper = styled.div``;

export default HomePage;
