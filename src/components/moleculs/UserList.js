import React from "react";
import styled from "styled-components";

const UserList = () => {
  const users = [
    { id: 1, name: "Ilham Ramdhani", username: "ilham", password: "1234" },
    { id: 2, name: "Ryan PA", username: "ryan", password: "1234" },
    { id: 3, name: "Faisal PA Ramdhani", username: "faisal", password: "1234" },
  ];

  return (
    <Wrapper>
      <Head>
        <a style={{ fontSize: "0.9em", color: "gray" }}>Search :</a>
        <Input />
      </Head>
      <table
        style={{ width: "96%", marginLeft: "2%", marginTop: "20px" }}
        cellspacing="0"
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
          {users.map((user, id) => {
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
                <td style={{ textAlign: "left", border: "solid 1px #e5e7ef" }}>
                  {user.name}
                </td>
                <td style={{ textAlign: "left", border: "solid 1px #e5e7ef" }}>
                  {user.username}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  <Button bg="#AB372C">Delete</Button>
                  <Button bg="#343A40">Edit</Button>
                </td>
              </tr>
            );
          })}
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
  height: 26px;
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
  :hover {
    transform: scale(1.025);
  }
`;

export default UserList;
