import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/organism/layout/Layout";

const AutoReply = () => {
  const ViewAutoReply = () => {
    return <>tes</>;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WAblast - Auto Reply</title>
      </Helmet>
      <Layout Component={ViewAutoReply} />
    </>
  );
};

export default AutoReply;
