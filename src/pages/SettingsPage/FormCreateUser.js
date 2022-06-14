import React, { useEffect, useState } from "react";
import { FormInput, FormText } from "../../components/atoms";
import styled from "styled-components";
import { API_URI, SOCKET_URI } from "../../utils";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import { io } from "socket.io-client";
const Swal = require("sweetalert2");
const axios = require("axios");

const FormCreateUser = () => {
  const defaultValue = { name: "", username: "", deskripsi: "" };
  const [value, setValue] = useState(defaultValue);
  const [validName, setValidName] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isDuplicate, setIsDUplicate] = useState(false);

  const getName = (e) => {
    setValue({ ...value, name: e.target.value });
  };

  const getUsername = (e) => {
    setValue({ ...value, username: e.target.value });
  };

  const getDesc = (e) => {
    setValue({ ...value, deskripsi: e });
  };

  const socket = io(SOCKET_URI, {
    withCredentials: true,
    extraHeaders: {
      "react-client": "react-client",
    },
  });

  const cekValid = () => {
    if (value.name !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }

    if (value.username !== "") {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  useEffect(() => {
    cekValid();
  }, [value]);

  useEffect(() => {
    if (validName && validUsername) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  });

  useEffect(() => {
    socket.on("init", (data) => {
      setUsers(data);
    });
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
            modalSet({ active: true, page: "createUser", isLoading: true })
          );
          axios
            .post(`${API_URI}session/create`, value)
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
                  page: "createUser",
                  isLoading: false,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your file cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({ active: true, page: "createUser", isLoading: false })
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
        placeholder="Cth:Ilham Ramdhani"
      />
      <FormInput
        valid={validUsername}
        getData={getUsername}
        label="Username"
        type="text"
        placeholder="Cth:ramdhaniit"
      />
      <FormInput
        valid={true}
        label="Password"
        type="password"
        placeholder="Set your password"
      />
      <FormText
        valid
        label="Description"
        value={value.deskripsi}
        getData={getDesc}
        placeholder="Input your description"
      />
      <Button onClick={onSubmit} valid={isValid}>
        Save
      </Button>
    </>
  );
};

export default FormCreateUser;

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
