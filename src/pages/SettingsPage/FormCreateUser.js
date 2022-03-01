import React, { useEffect, useState } from "react";
import { FormInput } from "../../components/atoms";

const FormCreateUser = () => {
  const defaultValue = { name: "", username: "", deskripsi: "" };
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState({
    name: false,
    username: false,
    password: false,
  });
  const [ready, setReady] = useState(false);

  const getName = (e) => {
    setValue({ ...value, name: e.target.value });
  };

  const getUsername = (e) => {
    setValue({ ...value, username: e.target.value });
  };

  const cekValid = () => {
    // if (value.name !== "") {
    //   setValid({ ...valid, name: true });
    // } else {
    //   setValid({ ...valid, name: false });
    // }
    // if (value.username !== "") {
    //   setValid({ ...valid, username: true });
    // } else {
    //   setValid({ ...valid, username: false });
    // }
    // if (value.username !== "") {
    //   setValid({ ...valid, username: true });
    // } else {
    //   setValid({ ...valid, username: false });
    // }
    // if (value.password !== "") {
    //   setValid({ ...valid, password: true });
    // } else {
    //   setValid({ ...valid, password: false });
    // }
    // if (value.name && value.username && value.password) {
    //   setReady(true);
    // } else {
    //   setReady(false);
    // }
  };

  useEffect(() => {
    cekValid();
  }, [value]);

  return (
    <>
      {console.log(valid)}
      {console.log(ready)}
      <FormInput
        valid={valid.name}
        getData={getName}
        value={value.name}
        label="Name"
        type="text"
        placeholder="Cth:Ilham Ramdhani"
      />
      <FormInput
        valid={valid.username}
        getData={getUsername}
        label="Username"
        type="text"
        placeholder="Cth:ramdhaniit"
      />
      <FormInput
        valid={valid.password}
        value={value.deskripsi}
        label="Password"
        type="password"
      />
    </>
  );
};

export default FormCreateUser;
