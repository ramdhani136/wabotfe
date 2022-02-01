import React from "react";
import styled from "styled-components";
import { API_URI } from "../../utils";
const axios = require("axios");

const UserList = ({ data, setValue }) => {
  const deleteUser = (id) => {
    axios
      .delete(`${API_URI}akun/${id}`)
      .then((res) => {
        console.log("delete");
      })
      .catch((err) => {
        console.log("err");
      });
  };

  return (
    <Wrapper>
      <Head>
        <a style={{ fontSize: "0.9em", color: "gray" }}>Search :</a>
        <Input onChange={(e) => setValue(e.target.value)} />
      </Head>
      <table
        style={{ width: "96%", marginLeft: "2%", marginTop: "20px" }}
        cellSpacing="0"
        cellPadding="5"
      >
        <thead style={{ fontSize: "0.87em", color: "gray" }}>
          <tr style={{ border: "solid 1px #e5e7ef" }}>
            <th style={{ border: "solid 1px #e5e7ef", height: "28px" }}>No</th>
            <th
              style={{
                border: "solid 1px #e5e7ef",
                textAlign: "left",
                marginLeft: "10px",
              }}
            >
              Name
            </th>
            <th style={{ border: "solid 1px #e5e7ef", textAlign: "left" }}>
              Username
            </th>
            <th style={{ border: "solid 1px #e5e7ef" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.86em", color: "gray" }}>
          {data.length < 1 ? (
            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  height: "110px",
                  fontSize: "0.9em",
                  color: "#ddd",
                }}
              >
                No data result
              </td>
            </tr>
          ) : (
            data.map((user, id) => {
              return (
                <tr key={id} style={{ cursor: "pointer" }}>
                  <td
                    style={{
                      textAlign: "center",
                      border: "solid 1px #e5e7ef",
                      height: "30px",
                    }}
                  >
                    {id + 1}
                  </td>
                  <td
                    style={{ textAlign: "left", border: "solid 1px #e5e7ef" }}
                  >
                    {user.name}
                  </td>
                  <td
                    style={{ textAlign: "left", border: "solid 1px #e5e7ef" }}
                  >
                    {user.username}
                  </td>
                  <td
                    style={{
                      border: "solid 1px #e5e7ef",
                    }}
                  >
                    <Button bg="#AB372C" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                    <Button bg="#343A40">Edit</Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-top: 10px;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 200px;
  height: 29px;
  margin-left: 10px;
  border: solid 1px #e5e7ef;
  padding-left: 10px;
  padding-right: 10px;
`;

const Button = styled.div`
  padding: 5px 10px 5px 10px;
  float: left;
  margin-right: 5px;
  border-radius: 3px;
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

export default UserList;
