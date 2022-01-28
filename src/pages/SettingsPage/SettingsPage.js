import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/organism/layout/Layout";
import { Helmet } from "react-helmet";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { UserList } from "../../components/moleculs";
import ReactLoading from "react-loading";

const SettingsPage = () => {
  const ViewSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const users = [
      { id: 1, name: "Ilham Ramdhani", username: "ilham", password: "1234" },
      { id: 2, name: "Ryan PA", username: "ryan", password: "1234" },
      {
        id: 3,
        name: "Faisal PA Ramdhani",
        username: "faisal",
        password: "1234",
      },
    ];
    return (
      <Wrapper>
        <ContentLeft>
          <BtnAddUser>Add User</BtnAddUser>
          <WrapUser>
            <Title>User Data</Title>
            {isLoading ? (
              <Loading>
                <ReactLoading type="spin" color="#e5e7ef" />
              </Loading>
            ) : (
              <UserList data={users} />
            )}
          </WrapUser>
        </ContentLeft>
        <ContentRight>
          <Qrcode>
            <Title>Settings</Title>
            <QrScanner>
              <ViewQr>
                <ReactLoading type="spin" color="#e5e7ef" />
              </ViewQr>
              <Status>
                <b style={{ color: "gray", fontSize: "0.85em" }}>Status :</b>
                <div
                  style={{
                    color: "gray",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Brightness1Icon style={{ fontSize: "8px" }} />
                  <a style={{ fontSize: "0.9em", marginLeft: "7px" }}>
                    QR code received, scan please!
                  </a>
                </div>
              </Status>
              <WrappButton>
                <Button bg="#AB372C">Logout</Button>
                <Button bg="#3A55A5">Scan QR code</Button>
                <Button bg="#159365">Check Status</Button>
              </WrappButton>
            </QrScanner>
          </Qrcode>
        </ContentRight>
      </Wrapper>
    );
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

const Wrapper = styled.div`
  width: 96%;
  height: 100%;
  margin-left: 2%;
  display: flex;
`;
const ContentLeft = styled.div`
  flex: 1.05;
`;
const ContentRight = styled.div`
  flex: 0.95;
`;

const BtnAddUser = styled.div`
  text-align: center;
  width: 99%;
  border: solid 1px #107550;
  padding-top: 9px;
  padding-bottom: 9px;
  margin-top: 15px;
  border-radius: 3px;
  background-color: #00a884;
  color: #fff;
  font-size: 0.85em;
  opacity: 0.8;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const WrapUser = styled.div`
  width: 99%;
  height: auto;
  min-height: 200px;
  max-height: 400px;
  border: solid 1px #e5e7ef;
  background-color: #fff;
  margin-top: 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-bottom: 30px;
`;

const Title = styled.div`
  width: 98%;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 2%;
  background-color: #f8f9fc;
  color: #00a884;
  font-size: 0.87em;
  font-weight: bold;
  border-bottom: solid 1px #e5e7ef;
`;

const Qrcode = styled.div`
  width: 97%;
  height: 490px;
  border: solid 1px #e5e7ef;
  background-color: #fff;
  margin-top: 15px;
  margin-left: 3%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const QrScanner = styled.div`
  width: 90%;
  height: 80%;
  margin-left: 5%;
  margin-top: 5%;
  border: solid 1px #e5e7ef;
  border-radius: 3px;
  box-shadow: 2px 1px 30px 1px rgba(181, 176, 176, 0.25);
  -webkit-box-shadow: 2px 1px 30px 1px rgba(181, 176, 176, 0.25);
  -moz-box-shadow: 2px 1px 30px 1px rgba(181, 176, 176, 0.25);
  display: flex;
  flex-direction: column;
`;

const ViewQr = styled.div`
  width: 60%;
  height: 60%;
  margin-left: 20%;
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Status = styled.div`
  width: 100%;
  /* border: solid 1px red; */
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WrappButton = styled.div`
  width: 80%;
  margin-left: 15%;
`;

const Button = styled.div`
  padding: 5px 10px 5px 10px;
  float: left;
  margin-right: 5px;
  border-radius: 3px;
  margin-top: 10px;
  font-size: 0.9em;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) => props.bg};
  opacity: 0.9;
  :hover {
    transform: scale(1.025);
    opacity: 1;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SettingsPage;
