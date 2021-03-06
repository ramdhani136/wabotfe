import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ContactList = ({ data, getValue, setValue, value, setIsLoading }) => {
  return (
    <Wrapper>
      <Title>
        <div style={{ flex: 1 }}>
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
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <Export>
            <a>Export</a>
            <FileDownloadIcon style={{ fontSize: "16px", marginLeft: "8px" }} />
          </Export> */}
          <ReactHTMLTableToExcel
            className="download-table-xls-button"
            table="table-to-xls"
            filename="Log CS"
            sheet="Log CS"
            buttonText="Export To Excel"
          />
        </div>
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
            <table
              id="table-to-xls"
              style={{ width: "130%" }}
              cellSpacing="0"
              cellPadding="5"
            >
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
                    Reg
                  </th>
                  <th
                    style={{
                      border: "solid 1px #e5e7ef",
                      marginLeft: "10px",
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    Customer
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
                      width: "15%",
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
                    Keterangan
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
                      {item.customer.name}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        border: "solid 1px #e5e7ef",
                      }}
                    >
                      {item.customer.phone}
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
                        textAlign: "left",
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
                        textAlign: "left",
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
                        border: "solid 1px #e5e7ef",
                        textAlign: "center",
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
