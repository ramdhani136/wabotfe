import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/organism/layout/Layout";
import styled from "styled-components";
import ArList from "../../components/organism/ArList";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import axios from "axios";
import { API_URI, SOCKET_URI } from "../../utils/index";
import _ from "lodash";
import ReactLoading from "react-loading";
import { io } from "socket.io-client";

const ViewAutoReply = () => {
  const [bots, setBots] = useState([]);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(modalSet({ active: true, page: "createAr" }));
  };
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const socket = io(SOCKET_URI, {
    withCredentials: true,
    extraHeaders: {
      "react-client": "react-client",
    },
  });

  const getBots = () => {
    axios
      .get(`${API_URI}bots`)
      .then((res) => {
        setBots(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getValue = (e) => {
    setValue(e);
  };

  useEffect(() => {
    getBots();
    // socket.on("tes", (data) => {
    //   console.log(data);
    // });
  }, []);

  const filterData = (data) => {
    return _.filter(data, function (query) {
      var key = value
        ? query.key.toLowerCase().includes(value.toLowerCase())
        : true;

      return key;
    });
  };

  return (
    <Wrapper>
      <Title>
        <Tleft>Auto reply list</Tleft>
        <Tright>
          <Button onClick={openModal}>Create new</Button>
        </Tright>
      </Title>
      <Content>
        {isLoading ? (
          <Loading>
            <ReactLoading type="spin" color="#e5e7ef" />
          </Loading>
        ) : (
          <ArList
            data={filterData(bots)}
            getValue={getValue}
            setValue={setValue}
            value={value}
          />
        )}
      </Content>
    </Wrapper>
  );
};

const AutoReply = () => {
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

const Wrapper = styled.div`
  width: 97%;
  height: 90%;
  border: solid 1px #e5e7ef;
  margin-left: 1.5%;
  margin-top: 20px;
  border-radius: 3px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border-bottom: solid 1px #e5e7ef;
  height: 50px;
  background-color: #f8f9fc;
  color: #00a884;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
`;

const Tleft = styled.div`
  flex: 1;
  padding-left: 2%;
  font-size: 0.9em;
  font-weight: bold;
`;

const Tright = styled.div`
  justify-content: flex-end;
  flex: 1;
  padding-right: 2%;
  display: flex;
`;

const Button = styled.div`
  padding: 5px;
  padding-left: 7px;
  padding-right: 7px;
  width: auto;
  border: solid 1px red;
  font-size: 0.9em;
  text-align: center;
  border-radius: 3px;
  background-color: #00a884;
  border: solid 1px #107550;
  color: #fff;
  opacity: 0.8;
  :hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.005);
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;
