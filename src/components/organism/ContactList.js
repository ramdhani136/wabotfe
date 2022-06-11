import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import { API_URI } from "../../utils";
import moment from "moment";
const axios = require("axios");
const Swal = require("sweetalert2");

const ContactList = ({ data, getValue, setValue, value, setIsLoading }) => {
  const deleteContact = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .delete(`${API_URI}customer/${id}`)
          .then((res) => {
            console.log("delete");

            Swal.fire("Deleted!", "Your contact has been deleted.", "success");
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("err");
            Swal.fire("Error!", "Your contact cannot to deleted.", "error");
            setIsLoading(false);
          });
      }
    });
  };
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
        <Search onChange={(e) => getValue(e.target.value)} value={value} />
        <CloseIcon
          onClick={() => setValue("")}
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
          {data.length < 1 ? (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "90px",
                color: "#ddd",
                fontSize: "0.9em",
              }}
            >
              No data result
            </div>
          ) : (
            <table style={{ width: "100%" }} cellSpacing="0" cellPadding="5">
              <thead
                style={{
                  fontSize: "0.87em",
                  color: "gray",
                  position: "sticky",
                  top: "0px",
                  backgroundColor: "white",
                  zIndex: 100,
                  borderBottomWidth: "3px",
                }}
              >
                <tr style={{ border: "solid 1px #e5e7ef" }}>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      height: "28px",
                      textAlign: "center",
                    }}
                  >
                    No
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      // width: "12%",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",

                      marginLeft: "10px",
                      textAlign: "center",
                    }}
                  >
                    Phone
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      width: "13%",
                    }}
                  >
                    City
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      // width: "12%",
                    }}
                  >
                    Active Menu
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      // width: "12%",
                    }}
                  >
                    Interest
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      width: "12%",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      width: "12%",
                    }}
                  >
                    Last Update
                  </th>
                  <th style={{ border: "solid 1px #e5e7ef" }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "0.86em", color: "gray" }}>
                {data.map((item, id) => (
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
                      style={{
                        textAlign: "left",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.phone}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.kota ? item.kota : "Not set"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.menuAktif.name}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.item ? item.item : "Not set"}
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
                          color: item.status ? "#F85B5B" : "#98D85B",
                        }}
                      />

                      <a>{item.status ? "Done" : "Ready"}</a>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {moment(item.updatedAt).format("LLL")}
                    </td>
                    <td
                      style={{
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      <Button
                        bg="#AB372C"
                        onClick={() => deleteContact(item.id)}
                      >
                        Delete
                      </Button>
                      <Button bg="#343A40">Log Sales</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Content>
    </Wrapper>
  );
};

export default ContactList;

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
  margin-bottom: 5px;
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
