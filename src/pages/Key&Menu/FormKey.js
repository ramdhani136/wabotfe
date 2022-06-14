import React, { useEffect, useState } from "react";
import { FormInput, FormText } from "../../components/atoms";
import styled from "styled-components";
import { API_URI, SOCKET_URI } from "../../utils";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import { io } from "socket.io-client";
const Swal = require("sweetalert2");
const axios = require("axios");

const FormKey = ({ data }) => {
  const defaultValue = { name: "", status: 1 };
  const [value, setValue] = useState(defaultValue);
  const [prevValue, setPrevValue] = useState({});
  const [validName, setValidName] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isDuplicate, setIsDUplicate] = useState(false);

  const getName = (e) => {
    setValue({ ...value, name: e.target.value });
  };

  const socket = io(SOCKET_URI, {
    withCredentials: true,
    extraHeaders: {
      "react-client": "react-client",
    },
  });

  useEffect(() => {
    if (data) {
      if (
        value.name !== "" &&
        JSON.stringify(prevValue) !== JSON.stringify(value)
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      if (value.name !== "") {
        setValidName(true);
      } else {
        setValidName(false);
      }
    } else {
      if (value.name !== "") {
        setIsValid(true);
        setValidName(true);
      } else {
        setIsValid(false);
        setValidName(false);
      }
    }
  }, [value]);

  useEffect(() => {
    socket.on("init", (data) => {
      setUsers(data);
    });
    if (data) {
      setPrevValue({
        name: data.item.name,
        status: data.item.status ? "1" : "0",
      });
      setValue({ name: data.item.name, status: data.item.status ? "1" : "0" });
    }
    return () => {
      socket.off("init");
    };
  }, []);

  // useEffect(() => {
  //   const duplc = users.filter((user) => user.username === value.username);
  //   console.log(users[0].username);
  //   console.log(value.username);
  //   if (users[0].username === value.username) {
  //     console.log("tes");
  //   }
  // }, [users, value.username]);

  const onSubmit = () => {
    if (isValid) {
      Swal.fire({
        title: "Are you sure?",
        text: "Save this data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            modalSet({ active: true, page: "createKey", isLoading: true })
          );
          axios
            .post(`${API_URI}key`, value)
            .then((res) => {
              dispatch(modalSet({ active: false, page: "", isLoading: false }));
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your data has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              dispatch(
                modalSet({
                  active: true,
                  page: "createKey",
                  isLoading: false,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your file cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({ active: true, page: "createKey", isLoading: false })
          );
        }
      });
    }
  };

  const onUpdate = () => {
    if (
      value.name !== "" &&
      JSON.stringify(prevValue) !== JSON.stringify(value)
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "Update this data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            modalSet({ active: true, page: "createKey", isLoading: true })
          );
          axios
            .put(`${API_URI}key/${data.item.id}`, value)
            .then((res) => {
              dispatch(modalSet({ active: false, page: "", isLoading: false }));
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your data has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              dispatch(
                modalSet({
                  active: true,
                  page: "createKey",
                  isLoading: false,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your data cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({ active: true, page: "createKey", isLoading: false })
          );
        }
      });
    }
  };

  return (
    <>
      <FormInput
        valid={validName}
        getData={getName}
        value={value.name}
        label="Name"
        type="text"
        placeholder="Cth:1,2,4,5"
      />
      <div
        style={{
          width: "87.5%",
          height: "auto",
          marginLeft: "6%",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          style={{ fontSize: ` 0.9em`, color: "gray", marginBottom: "5px" }}
        >
          Status
        </label>
        <select
          value={value.status}
          onChange={(e) => setValue({ ...value, status: e.target.value })}
          style={{
            height: "40px",
            border: "solid 1px #ccc",
            borderRadius: "3px",
            paddingLeft: "10px",
          }}
        >
          <option value="1">Active</option>
          <option value="0">Disabled</option>
        </select>
      </div>
      <Button onClick={data ? onUpdate : onSubmit} valid={isValid}>
        {data ? "Update" : "Save"}
      </Button>
    </>
  );
};

export default FormKey;

const Button = styled.div`
  width: 83.5%;
  height: auto;
  padding: 10px;
  border: solid 1px #51a453;
  margin-left: 6%;
  text-align: center;
  margin-top: 20px;
  border-radius: 2px;
  opacity: ${(props) => (props.valid ? 1 : 0.8)};
  background-color: #5ab75d;
  color: white;
  :hover {
    cursor: pointer;
  }
`;
