import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import CloseIcon from "@mui/icons-material/Close";
import { API_URI } from "../../utils";
import moment from "moment";
// import { useDispatch } from "react-redux";
import ReactLoading from "react-loading";
// import { modalSet } from "../../redux/slices/ModalSlice";
// const Swal = require("sweetalert2");
import { FetchApi } from "../../utils/FetchApi";

const LogCs = ({ data }) => {
  // const dispatch = useDispatch();
  const [logCs, setLogCs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    FetchApi.get(`${API_URI}logcs/cust/${data.item.id}`).then((res) => {
      setLogCs(res.data);
      setIsLoading(false);
    });
  }, []);

  const test = () => {
    console.log(new Date().toLocaleString());
  };

  return (
    <>
      {isLoading ? (
        <Loading>
          <ReactLoading type="spin" color="#e5e7ef" />
        </Loading>
      ) : (
        <Wrapper>
          <div
            onClick={test}
            style={{
              textAlign: "center",
              height: "30px",
              marginTop: "-45px",
              fontWeight: "bold",
              fontSize: "1.2em",
              marginBottom: "20px",
              width: "90%",
            }}
          >
            Log Kontak Sales
          </div>
          {logCs.length > 0 && (
            <Title>
              <div style={{ flex: 1, fontSize: "0.84m", color: "gray" }}>
                Name : {data.item.name}
              </div>
              <div style={{ flex: 1, fontSize: "0.84m", color: "gray" }}>
                Number : {data.item.phone}
              </div>
            </Title>
          )}
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
              {logCs.length < 1 ? (
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
                <table
                  style={{ width: "100%" }}
                  cellSpacing="0"
                  cellPadding="5"
                >
                  <thead
                    style={{
                      fontSize: "0.85em",
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
                        Reg
                      </th>
                      <th
                        style={{
                          border: "solid 1px #e5e7ef",

                          marginLeft: "10px",
                          textAlign: "center",
                        }}
                      >
                        Sales
                      </th>
                      <th
                        style={{
                          border: "solid 1px #e5e7ef",
                          textAlign: "center",
                          marginLeft: "10px",
                          width: "13%",
                        }}
                      >
                        Phone
                      </th>
                      <th
                        style={{
                          border: "solid 1px #e5e7ef",
                          textAlign: "center",
                          marginLeft: "10px",
                          // width: "12%",
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
                          width: "20%",
                        }}
                      >
                        Catatan
                      </th>
                      <th
                        style={{
                          border: "solid 1px #e5e7ef",
                          textAlign: "center",
                          marginLeft: "10px",
                          width: "12%",
                        }}
                      >
                        Created At
                      </th>
                      <th
                        style={{
                          border: "solid 1px #e5e7ef",
                          textAlign: "center",
                          marginLeft: "10px",
                          width: "12%",
                        }}
                      >
                        Close At
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      fontSize: "0.86em",
                      color: "gray",
                    }}
                  >
                    {logCs.map((item, id) => (
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
                          {item.sales.name}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            border: "solid 1px #e5e7ef",
                          }}
                        >
                          {item.sales.phone}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            border: "solid 1px #e5e7ef",
                          }}
                        >
                          {item.city}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            border: "solid 1px #e5e7ef",
                          }}
                        >
                          {item.interest}
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

                          <a>{item.status ? "Close" : "Open"}</a>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            border: "solid 1px #e5e7ef",
                          }}
                        >
                          {item.keterangan === null || item.keterangan === ""
                            ? "Not Set"
                            : item.keterangan}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            border: "solid 1px #e5e7ef",
                          }}
                        >
                          {moment(item.createdAt).format("LLL")}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            border: "solid 1px #e5e7ef",
                          }}
                        >
                          {item.closeAt !== null
                            ? moment(item.closeAt).format("LLL")
                            : "Not Set"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Content>
        </Wrapper>
      )}
    </>
  );
};

export default LogCs;

const Wrapper = styled.div`
  width: 96%;
  height: 94%;
  margin-left: 2%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
`;

// const Button = styled.div`
//   padding: 5px 10px 5px 10px;
//   float: left;
//   margin-right: 5px;
//   border-radius: 3px;
//   margin-bottom: 5px;
//   font-size: 0.9em;
//   color: #fff;
//   cursor: pointer;
//   background-color: ${(props) => props.bg};
//   opacity: 0.9;
//   :hover {
//     transform: scale(1.025);
//     opacity: 1;
//   }
// `;

const Loading = styled.div`
  width: 99%;
  height: 99%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;
