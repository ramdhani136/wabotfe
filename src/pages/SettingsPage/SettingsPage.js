import React from "react";
import styled from "styled-components";
import Layout from "../../components/organism/layout/Layout";
import { Helmet } from "react-helmet";

const SettingsPage = () => {
  const ViewSettings = () => {
    return <Wrapper>Halaman Settings</Wrapper>;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WAblast - Accountg Settings</title>
      </Helmet>
      <Layout Component={ViewSettings} />
    </>
  );
};

const Wrapper = styled.div``;

export default SettingsPage;
