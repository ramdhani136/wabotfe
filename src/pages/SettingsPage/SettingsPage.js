import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/organism/layout/Layout";
import { Helmet } from "react-helmet";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { UserList } from "../../components/moleculs";
import ReactLoading from "react-loading";
import { io } from "socket.io-client";
import { SOCKET_URI } from "../../utils";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";

const SettingsPage = () => {
  const ViewSettings = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [qr, setQr] = useState("");
    const [users, setUsers] = useState([]);
    const socket = io(SOCKET_URI, {
      withCredentials: true,
      extraHeaders: {
        "react-client": "react-client",
      },
    });

    useEffect(() => {
      socket.on("message", (data) => {
        if (data.id === 1) {
          setStatus(data.text);
        }
      });

      socket.on("qr", (data) => {
        if (data.id === 1) {
          setQr(data.src);
        }
      });

      socket.on("ready", (data) => {
        setQr("");
      });

      socket.on("authenticated", (data) => {
        setQr("");
      });

      socket.on("init", (data) => {
        const isUser = data.filter((dt) => dt.id === 1);
        // if (qr === "") {
        //   setStatus("Whatsapp is ready ...");
        // }
        setUsers(data);
        setIsLoading(false);
      });
    }, []);

    const filterUser = (data) => {
      return _.filter(data, function (query) {
        var name = value
          ? query.name.toLowerCase().includes(value.toLowerCase())
          : true;

        return name;
      });
    };

    const openModal = () => {
      dispatch(modalSet({ active: true, page: "createUser" }));
    };

    return (
      <>
        <Wrapper>
          <ContentLeft>
            <BtnAddUser onClick={openModal}>Add User</BtnAddUser>

            <WrapUser>
              <Title>User Data</Title>
              {isLoading ? (
                <Loading>
                  <ReactLoading type="spin" color="#e5e7ef" />
                </Loading>
              ) : (
                <UserList
                  setIsLoading={setIsLoading}
                  setValue={setValue}
                  data={filterUser(users)}
                />
              )}
            </WrapUser>
          </ContentLeft>
          <ContentRight>
            <Qrcode>
              <Title>Settings</Title>
              <QrScanner>
                <ViewQr>
                  {qr ? (
                    <img src={qr} alt="QRCODE" id="qrcode" />
                  ) : (
                    <ReactLoading type="spin" color="#e5e7ef" />
                  )}
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
                      {status ? status : "Loading .."}
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
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WAblast - Account Settings</title>
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
