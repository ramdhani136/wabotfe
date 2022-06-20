import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { API_URI } from "../../utils";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import { FetchApi } from "../../utils/FetchApi";
const Swal = require("sweetalert2");

const ArList = ({ data, getValue, setValue, value, setIsLoading }) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("ASC");
  const [newData, setNewData] = useState(data);
  const deleteAr = (id) => {
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
        FetchApi.delete(`${API_URI}bots/${id}`)
          .then((res) => {
            console.log("delete");

            Swal.fire("Deleted!", "Your bots has been deleted.", "success");
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("err");
            Swal.fire("Error!", "Your bots cannot to deleted.", "error");
            setIsLoading(false);
          });
      }
    });
  };

  const sorting = (col) => {
    let stored = [];
    if (order === "ASC") {
      if (col === "menu") {
        stored = [...data].sort((a, b) =>
          a.menuAktif["name"].toLowerCase() > b.menuAktif["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "key") {
        stored = [...data].sort((a, b) =>
          a.key["name"].toLowerCase() > b.key["name"].toLowerCase() ? 1 : -1
        );
      }
      if (col === "nextMenu") {
        stored = [...data].sort((a, b) =>
          a.afterMenu["name"].toLowerCase() > b.afterMenu["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "prevMenu") {
        stored = [...data].sort((a, b) =>
          a.prevMenu["name"].toLowerCase() > b.prevMenu["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "prevKey") {
        stored = [...data].sort((a, b) =>
          a.prevKey["name"].toLowerCase() > b.prevKey["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "reply") {
        stored = [...data].sort((a, b) =>
          a["message"].toLowerCase() > b["message"].toLowerCase() ? 1 : -1
        );
      }
      if (col === "status") {
        stored = [...data].sort((a, b) => (a["status"] > b["status"] ? 1 : -1));
      }
      setOrder("DESC");
    } else if (order === "DESC") {
      if (col === "menu") {
        stored = [...data].sort((a, b) =>
          a.menuAktif["name"].toLowerCase() < b.menuAktif["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "key") {
        stored = [...data].sort((a, b) =>
          a.key["name"].toLowerCase() < b.key["name"].toLowerCase() ? 1 : -1
        );
      }
      if (col === "nextMenu") {
        stored = [...data].sort((a, b) =>
          a.afterMenu["name"].toLowerCase() < b.afterMenu["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "prevMenu") {
        stored = [...data].sort((a, b) =>
          a.prevMenu["name"].toLowerCase() < b.prevMenu["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "prevKey") {
        stored = [...data].sort((a, b) =>
          a.prevKey["name"].toLowerCase() < b.prevKey["name"].toLowerCase()
            ? 1
            : -1
        );
      }
      if (col === "reply") {
        stored = [...data].sort((a, b) =>
          a["message"].toLowerCase() < b["message"].toLowerCase() ? 1 : -1
        );
      }
      if (col === "status") {
        stored = [...data].sort((a, b) => (a["status"] < b["status"] ? 1 : -1));
      }

      setOrder("ASC");
    }
    setNewData(stored);
  };

  useEffect(() => {
    setNewData(data);
  }, [data]);

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
            height: "350px",
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
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Menu</a>
                      <FilterListIcon
                        onClick={() => sorting("menu")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      marginLeft: "10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Key</a>
                      <FilterListIcon
                        onClick={() => sorting("key")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          marginTop: "2px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Next Menu</a>
                      <FilterListIcon
                        onClick={() => sorting("nextMenu")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                      // width: "12%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Prev Menu</a>
                      <FilterListIcon
                        onClick={() => sorting("prevMenu")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Prev Key</a>
                      <FilterListIcon
                        onClick={() => sorting("prevKey")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Reply</a>
                      <FilterListIcon
                        onClick={() => sorting("reply")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      textAlign: "center",
                      width: "10%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a style={{ flex: 1 }}>Status</a>
                      <FilterListIcon
                        onClick={() => sorting("status")}
                        style={{
                          fontSize: "13px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </th>
                  <th style={{ border: "solid 1px #e5e7ef", width: "14%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "0.86em", color: "gray" }}>
                {newData.map((item, id) => (
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
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.menuAktif.name}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.key.name}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.afterMenu.name}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.prevMenu.name}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.prevKey.name}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.message ? item.message : "No Message"}
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
                          color: item.status ? "#98D85B" : "#F85B5B",
                        }}
                      />

                      <a>{item.status ? "Active" : "Disabled"}</a>
                    </td>
                    <td
                      style={{
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      <Button bg="#AB372C" onClick={() => deleteAr(item.id)}>
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          dispatch(
                            modalSet({
                              active: true,
                              page: "createAr",
                              data: { item },
                            })
                          );
                        }}
                        bg="#343A40"
                      >
                        Edit
                      </Button>
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
  margin-bottom: 5px;
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
