import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/organism/layout/Layout";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import axios from "axios";
import { API_URI } from "../../utils/index";
import _ from "lodash";
import ReactLoading from "react-loading";
import KeyList from "../../components/organism/KeyList";
import MenuList from "../../components/organism/MenuList";

const ViewKeyMenu = () => {
  const [keys, setKeys] = useState([]);
  const [menus, setMenu] = useState([]);
  const dispatch = useDispatch();
  const [valueKey, setValueKey] = useState("");
  const [valueMenu, setValueMenu] = useState("");
  const openModalKey = () => {
    dispatch(modalSet({ active: true, page: "createKeys" }));
  };

  const openModalMenu = () => {
    dispatch(modalSet({ active: true, page: "createMenu" }));
  };
  const [isLoadingKey, setIsLoadingKey] = useState(true);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const getKeys = () => {
    axios
      .get(`${API_URI}key`)
      .then((res) => {
        setKeys(res.data);
        setIsLoadingKey(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMenu = () => {
    axios
      .get(`${API_URI}menu`)
      .then((res) => {
        setMenu(res.data);
        setIsLoadingMenu(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getValueKey = (e) => {
    setValueKey(e);
  };

  const getValueMenu = (e) => {
    setValueMenu(e);
  };

  useEffect(() => {
    getKeys();
    getMenu();
  }, []);

  const filterKey = (data) => {
    return _.filter(data, function (query) {
      var name = valueKey
        ? query.name.toLowerCase().includes(valueKey.toLowerCase())
        : true;

      return name;
    });
  };

  const filterMenu = (data) => {
    return _.filter(data, function (query) {
      var name = valueMenu
        ? query.name.toLowerCase().includes(valueMenu.toLowerCase())
        : true;

      return name;
    });
  };

  return (
    <Wrapper>
      <KeysComponent>
        <Header>
          <Tleft>Key List</Tleft>
          <Tright>
            <Button>Create new</Button>
          </Tright>
        </Header>
        <Content>
          {isLoadingKey ? (
            <Loading>
              <ReactLoading type="spin" color="#e5e7ef" />
            </Loading>
          ) : (
            <KeyList
              data={filterKey(keys)}
              getValue={getValueKey}
              setValue={setValueKey}
              value={valueKey}
              setIsLoading={setIsLoadingKey}
            />
          )}
        </Content>
      </KeysComponent>
      <MenuComponent>
        <Header>
          <Tleft>Menu list</Tleft>
          <Tright>
            <Button>Create new</Button>
          </Tright>
        </Header>
        <Content>
          {isLoadingMenu ? (
            <Loading>
              <ReactLoading type="spin" color="#e5e7ef" />
            </Loading>
          ) : (
            <MenuList
              data={filterMenu(menus)}
              getValue={getValueMenu}
              setValue={setValueMenu}
              value={valueMenu}
              setIsLoading={setIsLoadingMenu}
            />
          )}
        </Content>
      </MenuComponent>
    </Wrapper>
  );
};

const KeyAndMenuPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WAblast - Keys & Menu</title>
      </Helmet>
      <Layout Component={ViewKeyMenu} />
    </>
  );
};

export default KeyAndMenuPage;

const Wrapper = styled.div`
  width: 97%;
  height: 93%;
  padding: 15px;
  display: flex;
`;

const KeysComponent = styled.div`
  flex: 1;
  border: solid 1px #e5e7ef;
  margin: 10px;
  margin-right: 13px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const MenuComponent = styled.div`
  flex: 1;
  border: solid 1px #e5e7ef;
  margin: 10px;
  background-color: white;
  margin-left: 13px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 47px;
  border-bottom: solid 1px #e5e7ef;
  background-color: #f8f9fc;
  display: flex;
  color: #00a884;
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
