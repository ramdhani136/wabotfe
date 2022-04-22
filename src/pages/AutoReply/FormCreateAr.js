import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormInput, FormText, SelectInput } from "../../components/atoms";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { API_URI } from "../../utils/";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";

const FormCreateAr = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");
  const [valueKey, setValueKey] = useState("");
  const [valueMenu, setValueMenu] = useState("");
  const [valueNext, setValueNext] = useState("");
  const [valuePrevMenu, setValuePrevMenu] = useState("Disabled");
  const [valuePrevKey, setValuePrevKey] = useState("Disabled");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenNext, setIsOpenNext] = useState(false);
  const [isOpenPrevMenu, setIsOpenPrevMenu] = useState(false);
  const [isOpenPrevKey, setIsOpenPrevKey] = useState(false);

  const [keys, setKeys] = useState([]);
  const [menus, setMenus] = useState([]);
  const [valueUri, setValueUri] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [uriFiles, seturiFiles] = useState([]);
  const [valueCreateKey, setValueCreateKey] = useState("");
  const [valueCreateMenu, setValueCreateMenu] = useState("");
  const [valueCreateNext, setValueCreateNext] = useState("");
  const defaultValueData = {
    message: "",
    status: 1,
    forward: 0,
    id_key: "",
    id_menuAktif: "",
    id_prevMenu: 23,
    id_prevKey: 20,
    id_afterMenu: "",
  };
  const [valueData, setValueData] = useState(defaultValueData);
  const [keyValid, setKeyValid] = useState(false);
  const [menuValid, setMenuValid] = useState(false);
  const [nextValid, setNextValid] = useState(false);
  const [prevKeyValid, setPrevKey] = useState(false);
  const [prevMenuValid, setPrevMenuValid] = useState(false);

  const setAllKeys = () => {
    axios
      .get(`${API_URI}key`)
      .then((res) => {
        setKeys(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setAllMenu = () => {
    axios
      .get(`${API_URI}menu`)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const imageHandler = (e) => {
    const selectedFIles = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setPreviewImg(selectedFIles);
    setFiles(e.target.files);
  };

  const filterKey = (data) => {
    return _.filter(data, function (query) {
      var name = valueKey
        ? query.name.toLowerCase().includes(valueKey.toLowerCase())
        : true;

      return name;
    });
  };

  const filterMenu = (data) => {
    return _.filter(data, function (query) {
      var name = valueMenu
        ? query.name.toLowerCase().includes(valueMenu.toLowerCase())
        : true;

      return name;
    });
  };

  const filterNext = (data) => {
    return _.filter(data, function (query) {
      var name = valueNext
        ? query.name.toLowerCase().includes(valueNext.toLowerCase())
        : true;

      return name;
    });
  };

  const filterPrevMenu = (data) => {
    return _.filter(data, function (query) {
      var name = valuePrevMenu
        ? query.name.toLowerCase().includes(valuePrevMenu.toLowerCase())
        : true;

      return name;
    });
  };

  const filterPrevKey = (data) => {
    return _.filter(data, function (query) {
      var name = valuePrevKey
        ? query.name.toLowerCase().includes(valuePrevKey.toLowerCase())
        : true;

      return name;
    });
  };

  const getKey = (e) => {
    setValueKey(e.name);
    setIsOpen(false);
    setValueData({ ...valueData, id_key: e.id });
  };

  const getMenu = (e) => {
    setValueMenu(e.name);
    setIsOpenMenu(false);
    setValueData({ ...valueData, id_menuAktif: e.id });
  };

  const getNext = (e) => {
    setValueNext(e.name);
    setIsOpenNext(false);
    setValueData({ ...valueData, id_afterMenu: e.id });
  };

  const getPrevKey = (e) => {
    setValuePrevKey(e.name);
    setIsOpenPrevKey(false);
    setValueData({ ...valueData, id_prevKey: e.id });
  };

  const getPrevMenu = (e) => {
    setValuePrevMenu(e.name);
    setIsOpenPrevMenu(false);
    setValueData({ ...valueData, id_prevMenu: e.id });
  };

  const setOpen = (e) => {
    setIsOpen(e);
  };

  const setOpenMenu = (e) => {
    setIsOpenMenu(e);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const getValueUri = (e) => {
    setValueUri(e.target.value);
  };

  const addUri = () => {
    if (valueUri !== "") {
      // alert(valueUri);

      const duplicate = uriFiles.filter((list) => list.name == valueUri);
      if (duplicate.length < 1) {
        seturiFiles([...uriFiles, { id: uriFiles.length + 1, name: valueUri }]);
        setValueUri("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This data has been saved before!",
        });
      }
    }
  };

  const toLink = (uri) => {
    window.open(uri, "_blank");
  };

  const delUriFile = (e) => {
    const newData = uriFiles.filter((file) => file.id !== e);
    seturiFiles(newData);
  };

  const saveKey = () => {
    if (valueCreateKey !== "") {
      const isDupl = keys.filter(
        (key) => key.name.toLowerCase() === valueCreateKey.toLocaleLowerCase()
      );
      if (isDupl.length < 1) {
        axios
          .post(`${API_URI}key`, { name: valueCreateKey })
          .then((result) => {
            setValueCreateKey("");
            setAllKeys();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Check your input!!",
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data already exists!!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't input anything!!",
      });
    }
  };

  const saveMenu = () => {
    if (valueCreateMenu !== "") {
      const isDupl = menus.filter(
        (menu) =>
          menu.name.toLowerCase() === valueCreateMenu.toLocaleLowerCase()
      );
      if (isDupl.length < 1) {
        axios
          .post(`${API_URI}menu`, { name: valueCreateMenu })
          .then((result) => {
            setValueCreateMenu("");
            setAllMenu();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Check your input!!",
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data already exists!!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't input anything!!",
      });
    }
  };

  const saveNext = () => {
    if (valueCreateNext !== "") {
      const isDupl = menus.filter(
        (menu) =>
          menu.name.toLowerCase() === valueCreateNext.toLocaleLowerCase()
      );
      if (isDupl.length < 1) {
        axios
          .post(`${API_URI}menu`, { name: valueCreateNext })
          .then((result) => {
            setValueCreateNext("");
            setAllMenu();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Check your input!!",
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data already exists!!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't input anything!!",
      });
    }
  };

  const getMesg = (e) => {
    setValueData({ ...valueData, message: e });
  };

  useEffect(() => {
    setAllKeys();
    setAllMenu();
  }, []);

  useEffect(() => {
    if (valueData.forward === "1") {
      setValuePrevMenu("");
      setValuePrevKey("");
      setValueData({ ...valueData, id_prevKey: "", id_prevMenu: "" });
    } else {
      setValuePrevMenu("Disabled");
      setValuePrevKey("Disabled");
      setValueData({ ...valueData, id_prevKey: 20, id_prevMenu: 23 });
    }
  }, [valueData.forward]);

  const onResetKey = () => {
    setValueKey("");
    setValueData({ ...valueData, id_key: "" });
  };

  const onResetMenu = () => {
    setValueMenu("");
    setValueData({ ...valueData, id_menuAktif: "" });
  };

  const onResetNext = () => {
    setValueNext("");
    setValueData({ ...valueData, id_afterMenu: "" });
  };

  const onResetPrevMenu = () => {
    setValuePrevMenu("");
    setValueData({ ...valueData, id_prevMenu: "" });
  };

  const onResetPrevKey = () => {
    setValuePrevKey("");
    setValueData({ ...valueData, id_prevKey: "" });
  };

  const saveBot = () => {
    if (keyValid && menuValid && nextValid && prevKeyValid && prevMenuValid) {
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
          axios
            .post(`${API_URI}bots`, valueData)
            .then((res) => {
              if (uriFiles.length > 0) {
                for (let i = 0; i < uriFiles.length; i++) {
                  axios
                    .post(`${API_URI}urifiles`, {
                      id_bot: res.data.id,
                      name: uriFiles[i].name,
                    })
                    .then((res) => {
                      dispatch(
                        modalSet({ active: false, page: "", isLoading: false })
                      );
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your data has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    });
                }
              } else {
                dispatch(
                  modalSet({ active: false, page: "", isLoading: false })
                );
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your data has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((err) => {
              dispatch(
                modalSet({
                  active: true,
                  page: "createAr",
                  isLoading: false,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your file cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({ active: true, page: "createAr", isLoading: false })
          );
        }
      });
    }
  };

  useEffect(() => {
    if (valueKey === "") {
      setValueData({ ...valueData, id_key: "" });
    }
  }, [valueKey]);

  useEffect(() => {
    if (valueMenu === "") {
      setValueData({ ...valueData, id_menuAktif: "" });
    }
  }, [valueMenu]);

  useEffect(() => {
    if (valueNext === "") {
      setValueData({ ...valueData, id_afterMenu: "" });
    }
  }, [valueNext]);

  useEffect(() => {
    if (valuePrevMenu === "") {
      setValueData({ ...valueData, id_prevMenu: "" });
    }
  }, [valuePrevMenu]);

  useEffect(() => {
    if (valuePrevKey === "") {
      setValueData({ ...valueData, id_prevKey: "" });
    }
  }, [valuePrevKey]);

  useEffect(() => {
    if (valueData.id_key !== "") {
      setKeyValid(true);
    } else {
      setKeyValid(false);
    }

    if (valueData.id_menuAktif !== "") {
      setMenuValid(true);
    } else {
      setMenuValid(false);
    }

    if (valueData.id_afterMenu !== "") {
      setNextValid(true);
    } else {
      setNextValid(false);
    }

    if (valueData.id_prevMenu !== "") {
      setPrevMenuValid(true);
    } else {
      setPrevMenuValid(false);
    }

    if (valueData.id_prevKey !== "") {
      setPrevKey(true);
    } else {
      setPrevKey(false);
    }
  }, [
    valueData.id_key,
    valueData.id_menuAktif,
    valueData.id_afterMenu,
    valueData.id_prevMenu,
    valueData.id_prevKey,
  ]);

  return (
    <Wrapper>
      <SelectInput
        valid={keyValid}
        label="key"
        value={valueKey}
        onReset={() => onResetKey()}
        data={filterKey(keys)}
        setValue={(e) => setValueKey(e)}
        getSelect={getKey}
        isOpen={isOpen}
        setOpen={setOpen}
        createNew={saveKey}
        valueCreate={valueCreateKey}
        setValueCreate={setValueCreateKey}
        plCreate="Exp : .product"
        placeholder="-Select Key-"
        formCreate
      />

      {/* <Label>Messages</Label>
      <div
        style={{
          width: "87.5%",
          marginLeft: "6%",
          float: "left",
          border: "1px solid #ccc",
          height: "370px",
          marginBottom: "10px",
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div> */}
      <SelectInput
        valid={menuValid}
        label="Base Menu"
        value={valueMenu}
        onReset={() => onResetMenu()}
        data={filterMenu(menus)}
        setValue={(e) => setValueMenu(e)}
        getSelect={getMenu}
        isOpen={isOpenMenu}
        setOpen={setOpenMenu}
        createNew={saveMenu}
        valueCreate={valueCreateMenu}
        setValueCreate={setValueCreateMenu}
        plCreate="Exp : Home, Profile, Info"
        placeholder="-Select Base Menu-"
        formCreate
      />

      <SelectInput
        valid={nextValid}
        label="Next Menu"
        value={valueNext}
        onReset={() => onResetNext()}
        data={filterNext(menus)}
        setValue={(e) => setValueNext(e)}
        getSelect={getNext}
        isOpen={isOpenNext}
        setOpen={setIsOpenNext}
        createNew={saveNext}
        valueCreate={valueCreateNext}
        setValueCreate={setValueCreateNext}
        plCreate="Exp : Home, Profile, Info"
        placeholder="-Select Next Menu-"
        formCreate
      />

      <div
        style={{
          width: "87.5%",
          height: "auto",
          marginLeft: "6%",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label
          style={{ fontSize: ` 0.9em`, color: "gray", marginBottom: "5px" }}
        >
          Show Message From Prev Menu
        </label>
        <select
          onChange={(e) =>
            setValueData({ ...valueData, forward: e.target.value })
          }
          style={{
            height: "40px",
            border: "solid 1px #ccc",
            borderRadius: "3px",
            paddingLeft: "10px",
          }}
        >
          <option value="0">Non Active</option>
          <option value="1">Active</option>
        </select>
      </div>

      {valueData.forward === "1" && (
        <>
          <SelectInput
            valid={prevKeyValid}
            label="Prev Key"
            value={valuePrevKey}
            onReset={() => onResetPrevKey()}
            data={filterPrevKey(keys)}
            setValue={(e) => setValuePrevKey(e)}
            getSelect={getPrevKey}
            isOpen={isOpenPrevKey}
            setOpen={setIsOpenPrevKey}
            formCreate={false}
            plCreate="Exp : Home, Profile, Info"
            placeholder="-Select Prev Key-"
          />

          <SelectInput
            valid={prevMenuValid}
            label="Prev Menu"
            value={valuePrevMenu}
            onReset={() => onResetPrevMenu()}
            data={filterPrevMenu(menus)}
            setValue={(e) => setValuePrevMenu(e)}
            getSelect={getPrevMenu}
            isOpen={isOpenPrevMenu}
            setOpen={setIsOpenPrevMenu}
            formCreate={false}
            plCreate="Exp : Home, Profile, Info"
            placeholder="-Select Prev Menu-"
          />
        </>
      )}

      <FormText
        valid
        label="Messages"
        value={valueData.message}
        getData={getMesg}
        height="200px"
        placeholder="Input your messages"
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
          onChange={(e) =>
            setValueData({ ...valueData, status: e.target.value })
          }
          style={{
            height: "40px",
            border: "solid 1px #ccc",
            borderRadius: "3px",
            paddingLeft: "10px",
          }}
        >
          <option value="1">Active</option>
          <option value="0">Non Active</option>
        </select>
      </div>
      <FormInput
        value={valueUri}
        getData={getValueUri}
        valid={true}
        label="Uri"
        type="text"
        placeholder="Add your file url (jpg,png,pdf,office doc)"
      />
      <BtnUri onClick={addUri}>
        <a>Add Url</a>
        <AddIcon style={{ fontSize: "14px", color: "gray" }} />
      </BtnUri>
      {uriFiles.length > 0 && (
        <ListUri>
          {uriFiles.map((item, id) => (
            <Uri key={id}>
              <a
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => toLink(item.name)}
              >
                {item.name.substring(0, 55)}
              </a>
              <CloseIcon
                onClick={() => delUriFile(item.id)}
                style={{ fontSize: "18px", marginLeft: "10px" }}
              />
            </Uri>
          ))}
        </ListUri>
      )}
      {/* <FormInput
        getData={imageHandler}
        name="files[]"
        multiple
        valid={true}
        label="Upload File"
        type="file"
        placeholder="Select your file"
      /> */}
      {previewImg.length > 0 && (
        <div
          style={{
            width: "83%",
            height: "auto",
            paddingLeft: "10px",
            border: "solid 1px #ccc",
            marginTop: "5px",
            marginLeft: "6%",
            float: "left",
            paddingTop: "15px",
          }}
        >
          {previewImg.length > 0 &&
            previewImg.map((list, id) => (
              <div key={id}>
                {files[id].type === "image/jpeg" ? (
                  <div
                    style={{
                      float: "left",
                      width: "45.5%",
                      height: "170px",
                      border: "solid 1px #eee",
                      marginRight: "4%",
                      marginBottom: "15px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={list}
                      style={{
                        contain: "content",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <CloseIcon
                      onClick={() => alert("tes")}
                      style={{
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "white",
                        backgroundColor: "red",
                        border: "solid 1px red",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      float: "left",
                      width: "40.5%",
                      height: "170px",
                      border: "solid 1px #fffbd7",
                      marginRight: "4%",
                      marginBottom: "15px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: "0.85em",
                      color: "gray",
                      backgroundColor: "#fdf9f1",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      position: "relative",
                    }}
                  >
                    <a style={{ width: "80%" }}> {files[id].name}</a>
                    <CloseIcon
                      onClick={() => alert("tes")}
                      style={{
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      <Button
        onClick={saveBot}
        valid={
          keyValid && menuValid && nextValid && prevKeyValid && prevMenuValid
            ? true
            : false
        }
      >
        Save
      </Button>
    </Wrapper>
  );
};

export default FormCreateAr;

const Wrapper = styled.div`
  width: 100%;
  height: 93%;
  padding-left: 10px;
  padding-top: 10px;
`;

const Button = styled.div`
  width: 83.5%;
  height: auto;
  padding: 10px;
  border: solid 1px #51a453;
  margin-left: 6%;
  text-align: center;
  margin-top: 20px;
  border-radius: 2px;
  opacity: ${(props) => (props.valid ? 1 : 0.5)};
  background-color: #5ab75d;
  float: left;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

const ListUri = styled.div`
  width: 85.5%;
  margin-left: 6%;
  height: auto;
  border: solid 1px #ddd;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  float: left;
  margin-top: -5px;
`;

const Uri = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #568bd3;
  width: auto;
  height: auto;
  padding: 7px;
  float: left;
  margin-right: 5px;
  font-size: 0.8em;
  margin: 2px;
  border-radius: 2px;
  background-color: #609beb;
  color: white;
  cursor: pointer;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
`;

const Label = styled.div`
  width: 100%;
  padding-left: 6%;
  font-size: 0.9em;
  color: gray;
  float: left;
  margin-bottom: 10px;
`;

const BtnUri = styled.div`
  padding: 5px;
  border: solid 1px #ddd;
  margin-top: 5px;
  float: left;
  margin-left: 6%;
  border-radius: 2px;
  font-size: 0.8em;
  padding-left:10px,
  padding-right:10px;
  cursor: pointer;
  opacity:0.7;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom:10px;
  :hover{
    opacity: 1;
  }
`;
