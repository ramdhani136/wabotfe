import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";

const ArList = () => {
  return (
    <Wrapper>
      <Title>
        <a
          style={{
            marginRight: "5px",
            color: "gray",
            fontSize: "0.9em",
            paddingRight: "20px",
          }}
        >
          Search :{" "}
        </a>
        <Search />
        <CloseIcon
          style={{
            marginLeft: "-25px",
            fontSize: "19px",
            marginTop: "3px",
            color: "#eee",
            cursor: "pointer",
          }}
        />
      </Title>
      <Content>
        <div
          style={{
            width: "100%",
            height: "300px",
            overflowY: "scroll",
            marginTop: "10px",
          }}
        >
          {" "}
          <table style={{ width: "100%" }} cellSpacing="0" cellPadding="5">
            <thead style={{ fontSize: "0.87em", color: "gray" }}>
              <tr style={{ border: "solid 1px #e5e7ef" }}>
                <th
                  style={{
                    border: "solid 1px #e5e7ef",
                    height: "28px",
                    width: "5%",
                  }}
                >
                  No
                </th>
                <th
                  style={{
                    border: "solid 1px #e5e7ef",
                    textAlign: "left",
                    marginLeft: "10px",
                    width: "15%",
                  }}
                >
                  Key
                </th>
                <th
                  style={{
                    border: "solid 1px #e5e7ef",
                    textAlign: "left",
                    width: "45%",
                  }}
                >
                  Reply
                </th>
                <th
                  style={{
                    border: "solid 1px #e5e7ef",
                    textAlign: "center",
                    width: "15%",
                  }}
                >
                  Status
                </th>
                <th style={{ border: "solid 1px #e5e7ef", width: "20%" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.86em", color: "gray" }}>
              <tr style={{ cursor: "pointer" }}>
                <td
                  style={{
                    textAlign: "center",
                    border: "solid 1px #e5e7ef",
                    height: "30px",
                  }}
                >
                  1
                </td>
                <td
                  style={{
                    textAlign: "left",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  .menu
                </td>
                <td
                  style={{
                    textAlign: "left",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  Selamat data di PT.Ekatunggal Tunas Mandiri untuk bantuan
                  operator ketik 1
                </td>
                <td
                  style={{
                    textAlign: "center",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  <FiberManualRecordIcon
                    style={{
                      fontSize: "10px",
                      marginRight: "3px",
                      color: "#98D85B",
                    }}
                  />
                  <a>Active</a>
                </td>
                <td
                  style={{
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  <Button bg="#AB372C">Delete</Button>
                  <Button bg="#343A40">Edit</Button>
                </td>
              </tr>
              <tr style={{ cursor: "pointer" }}>
                <td
                  style={{
                    textAlign: "center",
                    border: "solid 1px #e5e7ef",
                    height: "30px",
                  }}
                >
                  2
                </td>
                <td
                  style={{
                    textAlign: "left",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  .info
                </td>
                <td
                  style={{
                    textAlign: "left",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  Ekatunggal Tunas Mandiri adalah perusahan yang bergerak di
                  bidang penjualan bahan baku springbed dan sofa
                </td>
                <td
                  style={{
                    textAlign: "center",
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  <FiberManualRecordIcon
                    style={{
                      fontSize: "10px",
                      marginRight: "3px",
                      color: "#F85B5B",
                    }}
                  />
                  <a>Disabled</a>
                </td>
                <td
                  style={{
                    border: "solid 1px #e5e7ef",
                  }}
                >
                  <Button bg="#AB372C">Delete</Button>
                  <Button bg="#343A40">Edit</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Content>
    </Wrapper>
  );
};

export default ArList;

const Wrapper = styled.div`
  width: 96%;
  height: 94%;
  margin-left: 2%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
`;

const Search = styled.input`
  width: 250px;
  height: 30px;
  height: 30px;
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