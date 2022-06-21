import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormInput, FormText, SelectInput } from "../../components/atoms";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from "draft-js";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { API_URI, SOCKET_URI } from "../../utils/";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import { io } from "socket.io-client";
import { FetchApi } from "../../utils/FetchApi";

const FormCreateAr = ({ data }) => {
  const socket = io(SOCKET_URI, {
    withCredentials: true,
    extraHeaders: {
      "react-client": "react-client",
    },
  });
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState("");
  // const [image, setImage] = useState("");
  const [valueKey, setValueKey] = useState("");
  const [valueMenu, setValueMenu] = useState("");
  const [valueUpdateData, setValueUpdateData] = useState("");
  const [valueNext, setValueNext] = useState("");
  const [valueGroupSales, setValueGroupSales] = useState("");
  const [valueSales, setValueSales] = useState("");
  const [valuePrevMenu, setValuePrevMenu] = useState("Disabled");
  const [valuePrevKey, setValuePrevKey] = useState("Disabled");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenData, setIsOpenData] = useState(false);
  const [isOpenNext, setIsOpenNext] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [isOpenSales, setIsOpenSales] = useState(false);
  const [isOpenPrevMenu, setIsOpenPrevMenu] = useState(false);
  const [isOpenPrevKey, setIsOpenPrevKey] = useState(false);
  const [sendContact, setSendContact] = useState("0");
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [updateData, setUpdateData] = useState([
    { id: 1, name: "interest", active: "0", value: "" },
    { id: 2, name: "city", active: "0", value: "" },
  ]);

  const [keys, setKeys] = useState([]);
  const [menus, setMenus] = useState([]);
  const [groupSales, setGroupSales] = useState([]);
  const [sales, setSales] = useState([]);
  const [valueUri, setValueUri] = useState("");
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
    sales_message: "",
  };
  const [valueEdit, setValueEdit] = useState({});
  const [valueData, setValueData] = useState(defaultValueData);
  const [keyValid, setKeyValid] = useState(false);
  const [menuValid, setMenuValid] = useState(false);
  const [nextValid, setNextValid] = useState(false);
  const [prevKeyValid, setPrevKey] = useState(false);
  const [prevMenuValid, setPrevMenuValid] = useState(false);
  const [contactData, setContactdata] = useState([]);
  const [typeAction, setTypeAction] = useState("submit");
  const [editUrifiles, setEditUriFiles] = useState([]);
  const [editContact, setEditContact] = useState([]);
  const [otherValid, setOtherValid] = useState(false);

  const setAllKeys = () => {
    FetchApi.get(`${API_URI}key`)
      .then((res) => {
        setKeys(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setAllMenu = () => {
    FetchApi.get(`${API_URI}menu`)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const imageHandler = (e) => {
  //   const selectedFIles = [];
  //   const targetFiles = e.target.files;
  //   const targetFilesObject = [...targetFiles];
  //   targetFilesObject.map((file) => {
  //     return selectedFIles.push(URL.createObjectURL(file));
  //   });
  //   setPreviewImg(selectedFIles);
  //   setFiles(e.target.files);
  // };

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

  const filterUpdateData = (data) => {
    return _.filter(data, function (query) {
      var name = valueUpdateData
        ? query.name.toLowerCase().includes(valueUpdateData.toLowerCase())
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

  const filterGroup = (data) => {
    return _.filter(data, function (query) {
      var name = valueGroupSales
        ? query.name.toLowerCase().includes(valueGroupSales.toLowerCase())
        : true;

      return name;
    });
  };

  const filterSales = (data) => {
    return _.filter(data, function (query) {
      var name = valueSales
        ? query.name.toLowerCase().includes(valueSales.toLowerCase())
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

  const getValueData = (e) => {
    setValueUpdateData("");
    setIsOpenData(false);
    e.active = "1";
    console.log(e);
    // const newData = updateData.filter((item) => item.id !== e.id);
    // const fixdata = newData.push(e);
    // console.log(e);
  };

  const getNext = (e) => {
    setValueNext(e.name);
    setIsOpenNext(false);
    setValueData({ ...valueData, id_afterMenu: e.id });
  };

  const getGroupSales = (e) => {
    setValueGroupSales("");
    setIsOpenGroup(false);
    setSelectedGroup([]);
    // Tambah sales
    if (contactData.length < 1) {
      setContactdata(e.sales);
    } else {
      const newData = contactData.concat(
        e.sales.filter((item) => contactData.indexOf(item) < 0)
      );
      setContactdata(newData);
    }
  };

  const getSales = (e) => {
    setValueSales("");
    setIsOpenSales(false);
    // Tambah sales
    if (contactData.length < 1) {
      setContactdata([...contactData, e]);
    } else {
      const newData = contactData.filter((item) => item.id === e.id);

      if (newData.length < 1) {
        setContactdata([...contactData, e]);
      }
    }
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

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  // };

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

  const delContact = (e) => {
    const newData = contactData.filter((file) => file.id !== e);
    setContactdata(newData);
  };

  const delGroup = (e) => {
    const newData = selectedGroup.filter((file) => file.id !== e);
    setSelectedGroup(newData);
    const newContact = contactData.filter((contact) => contact.id_group !== e);
    setContactdata(newContact);
  };

  const saveKey = () => {
    if (valueCreateKey !== "") {
      const isDupl = keys.filter(
        (key) => key.name.toLowerCase() === valueCreateKey.toLocaleLowerCase()
      );
      if (isDupl.length < 1) {
        FetchApi.post(`${API_URI}key`, { name: valueCreateKey })
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
        FetchApi.post(`${API_URI}menu`, { name: valueCreateMenu })
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
        FetchApi.post(`${API_URI}menu`, { name: valueCreateNext })
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

  const getSalesMesg = (e) => {
    setValueData({ ...valueData, sales_message: e });
  };

  useEffect(() => {
    if (valueData.forward == "1") {
      if (!data) {
        setValuePrevMenu("");
        setValuePrevKey("");
        setValueData({ ...valueData, id_prevKey: "", id_prevMenu: "" });
      } else {
        setValuePrevMenu(data.item.prevMenu.name);
        setValuePrevKey(data.item.prevKey.name);
        setValueData({
          ...valueData,
          id_prevKey: data.item.id_prevKey,
          id_prevMenu: data.item.id_prevMenu,
        });
      }
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

  const removeData = (e) => {
    if (e === "interest") {
      const newState = [...updateData];
      newState[0].value = "";
      newState[0].active = "0";
      setUpdateData(newState);
    }
    if (e === "city") {
      const newState = [...updateData];
      newState[1].value = "";
      newState[1].active = "0";
      setUpdateData(newState);
    }
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
          dispatch(
            modalSet({
              active: true,
              page: "createAr",
              isLoading: true,
            })
          );
          FetchApi.post(`${API_URI}bots`, {
            ...valueData,
            interest: updateData[0].value,
            city: updateData[1].value,
          })
            .then((res) => {
              if (uriFiles.length > 0) {
                for (let i = 0; i < uriFiles.length; i++) {
                  FetchApi.post(`${API_URI}urifiles`, {
                    id_bot: res.data.id,
                    name: uriFiles[i].name,
                  });
                }
                if (contactData.length < 1) {
                  dispatch(
                    modalSet({
                      active: false,
                      page: "",
                      isLoading: false,
                    })
                  );
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your data has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              } else {
                if (contactData.length < 1) {
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
              }
              // Upload kontak sales
              if (contactData.length > 0) {
                for (let i = 0; i < contactData.length; i++) {
                  FetchApi.post(`${API_URI}botcontact`, {
                    id_bot: res.data.id,
                    id_sales: contactData[i].id,
                  });
                }
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

  const updateBot = () => {
    if (
      keyValid &&
      menuValid &&
      nextValid &&
      prevKeyValid &&
      prevMenuValid &&
      otherValid
    ) {
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
            modalSet({
              active: true,
              page: "createAr",
              isLoading: true,
              data: data,
            })
          );
          let newContact = () => {
            return FetchApi.delete(`${API_URI}botcontact/bot/${data.item.id}`)
              .then((res) => {
                // Upload kontak sales
                if (contactData.length > 0) {
                  for (let i = 0; i < contactData.length; i++) {
                    FetchApi.post(`${API_URI}botcontact`, {
                      id_bot: data.item.id,
                      id_sales: contactData[i].id,
                    });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          };

          let newUri = () => {
            return FetchApi.delete(`${API_URI}urifiles/bot/${data.item.id}`)
              .then((res) => {
                if (uriFiles.length > 0) {
                  for (let i = 0; i < uriFiles.length; i++) {
                    FetchApi.post(`${API_URI}urifiles`, {
                      id_bot: data.item.id,
                      name: uriFiles[i].name,
                    });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          };

          if (
            JSON.stringify(valueEdit) !== JSON.stringify(valueData) ||
            data.item.interest != updateData[0].value ||
            data.item.city != updateData[1].value
          ) {
            // let setValue = {};
            // if (data.item.interest != updateData[0].value) {
            //   setValue = { ...valueData, interest: updateData[0].value };
            // } else {
            //   setValue = { ...valueData };
            // }

            FetchApi.put(`${API_URI}bots/${data.item.id}`, {
              ...valueData,
              interest: updateData[0].value,
              city: updateData[1].value,
            })
              .then((res) => {
                if (
                  JSON.stringify(editContact) !== JSON.stringify(contactData) &&
                  JSON.stringify(editUrifiles) !== JSON.stringify(uriFiles)
                ) {
                  newContact().then((res) => {
                    newUri().then((res) => {
                      dispatch(
                        modalSet({
                          active: false,
                          page: "",
                          isLoading: false,
                        })
                      );
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your data has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    });
                  });
                } else {
                  if (
                    JSON.stringify(editContact) !== JSON.stringify(contactData)
                  ) {
                    newContact().then((res) => {
                      dispatch(
                        modalSet({
                          active: false,
                          page: "",
                          isLoading: false,
                        })
                      );
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your data has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    });
                  } else if (
                    JSON.stringify(editUrifiles) !== JSON.stringify(uriFiles)
                  ) {
                    newUri().then((res) => {
                      dispatch(
                        modalSet({
                          active: false,
                          page: "",
                          isLoading: false,
                        })
                      );
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your data has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    });
                  } else {
                    dispatch(
                      modalSet({
                        active: false,
                        page: "",
                        isLoading: false,
                      })
                    );
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your data has been saved",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }
              })
              .catch((err) => {
                dispatch(
                  modalSet({
                    active: true,
                    page: "createAr",
                    isLoading: false,
                    data: data,
                  })
                );
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your data has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          } else {
            if (
              JSON.stringify(editContact) !== JSON.stringify(contactData) &&
              JSON.stringify(editUrifiles) !== JSON.stringify(uriFiles)
            ) {
              newContact().then((res) => {
                newUri().then((res) => {
                  dispatch(
                    modalSet({
                      active: false,
                      page: "",
                      isLoading: false,
                    })
                  );
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your data has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              });
            } else {
              if (JSON.stringify(editContact) !== JSON.stringify(contactData)) {
                newContact().then((res) => {
                  dispatch(
                    modalSet({
                      active: false,
                      page: "",
                      isLoading: false,
                    })
                  );
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your data has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              } else if (
                JSON.stringify(editUrifiles) !== JSON.stringify(uriFiles)
              ) {
                newUri().then((res) => {
                  dispatch(
                    modalSet({
                      active: false,
                      page: "",
                      isLoading: false,
                    })
                  );
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your data has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              } else {
                dispatch(
                  modalSet({
                    active: false,
                    page: "",
                    isLoading: false,
                  })
                );
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your data has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            }
          }
        } else {
          dispatch(
            modalSet({
              active: true,
              page: "createAr",
              isLoading: false,
              data: data,
            })
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

  useEffect(() => {
    if (contactData.length > 0) {
      let newData = [];
      for (let i = 0; i < contactData.length; i++) {
        if (newData.length < 1) {
          newData.push({
            id: contactData[i].group.id,
            name: contactData[i].group.name,
          });
        } else {
          const dupl = newData.filter(
            (item) => item.id === contactData[i].id_group
          );

          if (dupl.length < 1) {
            newData.push({
              id: contactData[i].group.id,
              name: contactData[i].group.name,
            });
          }
        }
      }
      setSelectedGroup(newData);
    } else {
      setSelectedGroup([]);
    }
  }, [contactData]);

  useEffect(() => {
    if (!data) {
      if (sendContact === 1 || sendContact === "1") {
        setContactdata([]);
      }
    } else {
      if (sendContact === 0 || sendContact === "0") {
        setContactdata([]);
      }
    }
  }, [sendContact]);

  useEffect(() => {
    if (data) {
      var isChangeBot = false;
      if (JSON.stringify(valueEdit) !== JSON.stringify(valueData)) {
        isChangeBot = true;
      } else {
        isChangeBot = false;
      }
      var isChangeIntr = false;
      if (data.item.interest != updateData[0].value) {
        isChangeIntr = true;
      } else {
        isChangeIntr = false;
      }

      var isChangeCity = false;
      if (data.item.city != updateData[1].value) {
        isChangeCity = true;
      } else {
        isChangeCity = false;
      }

      var isChangeUri = false;
      if (JSON.stringify(editUrifiles) !== JSON.stringify(uriFiles)) {
        isChangeUri = true;
      } else {
        isChangeUri = false;
      }

      var isChangeContact = false;
      if (JSON.stringify(editContact) !== JSON.stringify(contactData)) {
        isChangeContact = true;
      } else {
        isChangeContact = false;
      }

      if (
        isChangeBot ||
        isChangeIntr ||
        isChangeUri ||
        isChangeContact ||
        isChangeCity
      ) {
        setOtherValid(true);
      } else {
        setOtherValid(false);
      }
    }
  }, [
    valueData,
    updateData[0].value,
    updateData[1].value,
    uriFiles,
    contactData,
  ]);

  useEffect(() => {
    socket.on("salesgroup", (data) => {
      setGroupSales(data);
    });

    FetchApi.get(`${API_URI}sales`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      setSales(response.data);
      socket.on("sales", (data) => {
        setSales(data);
      });
    });
    // socket.on("sales", (data) => {
    //   setSales(data);
    // });
    setAllKeys();
    setAllMenu();

    if (data) {
      if (data.item.interest) {
        updateData[0].active = "1";
        updateData[0].value = data.item.interest;
      }
      if (data.item.city) {
        updateData[1].active = "1";
        updateData[1].value = data.item.city;
      }
      if (data.item.urifiles.length > 0) {
        setEditUriFiles(data.item.urifiles);
        seturiFiles(data.item.urifiles);
      }

      if (data.item.botcontact.length > 0) {
        setSendContact("1");
        let rangkumContact = [];
        for (let i = 0; i < data.item.botcontact.length; i++) {
          rangkumContact.push(data.item.botcontact[i].sales);
        }
        setEditContact(rangkumContact);
        setContactdata(rangkumContact);
      }

      setValueEdit({
        message: data.item.message,
        sales_message: data.item.sales_message,
        status: data.item.status === true ? "1" : "0",
        forward: data.item.forward === true ? "1" : "0",
        id_key: data.item.id_key,
        id_menuAktif: data.item.id_menuAktif,
        id_prevMenu: data.item.id_prevMenu,
        id_prevKey: data.item.id_prevKey,
        id_afterMenu: data.item.id_afterMenu,
      });
      setValueData({
        message: data.item.message,
        sales_message: data.item.sales_message,
        status: data.item.status === true ? "1" : "0",
        forward: data.item.forward === true ? "1" : "0",
        id_key: data.item.id_key,
        id_menuAktif: data.item.id_menuAktif,
        id_prevMenu: data.item.id_prevMenu,
        id_prevKey: data.item.id_prevKey,
        id_afterMenu: data.item.id_afterMenu,
      });
      setValueMenu(data.item.menuAktif.name);
      setValueKey(data.item.key.name);
      setValueNext(data.item.afterMenu.name);
      setValuePrevKey(data.item.prevKey.name);
      setValuePrevMenu(data.item.prevMenu.name);
      setTypeAction("update");
    }

    return () => {
      socket.off("salesgroup");
      socket.off("sales");
    };
  }, []);
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
          value={valueData.forward}
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
          <option value="0">Disabled</option>
          <option value="1">Enabled</option>
        </select>
      </div>

      {valueData.forward == "1" && (
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
          value={valueData.status}
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
          <option value="1">Enabled</option>
          <option value="0">Disabled</option>
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
          Send Contact
        </label>
        <select
          value={sendContact}
          onChange={(e) => setSendContact(e.target.value)}
          style={{
            height: "40px",
            border: "solid 1px #ccc",
            borderRadius: "3px",
            paddingLeft: "10px",
          }}
        >
          <option value="1">Enabled</option>
          <option value="0">Disabled</option>
        </select>
      </div>
      {sendContact === "1" && (
        <>
          {/* <SelectInput
            valid={true}
            label="Group"
            value={valueGroupSales}
            onReset={() => setValueGroupSales("")}
            data={filterGroup(groupSales)}
            setValue={(e) => setValueGroupSales(e)}
            getSelect={getGroupSales}
            isOpen={isOpenGroup}
            setOpen={setIsOpenGroup}
            placeholder="-Select Sales Group-"
          /> */}
          {/* {selectedGroup.length > 0 && (
            <ListUri>
              {selectedGroup.map((item, id) => (
                <Uri key={id}>
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    onClick={() => toLink(item.name)}
                  >
                    {item.name.substring(0, 55)}
                  </a>
                  <CloseIcon
                    onClick={() => delGroup(item.id)}
                    style={{ fontSize: "18px", marginLeft: "10px" }}
                  />
                </Uri>
              ))}
            </ListUri>
          )} */}
          <SelectInput
            valid={true}
            label="Sales"
            value={valueSales}
            onReset={() => setValueSales("")}
            data={filterSales(sales)}
            setValue={(e) => setValueSales(e)}
            getSelect={getSales}
            isOpen={isOpenSales}
            setOpen={setIsOpenSales}
            placeholder="-Select Sales-"
          />
          {contactData.length > 0 && (
            <>
              <ListUri>
                {contactData.map((item, id) => (
                  <Uri key={id}>
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={() => toLink(item.name)}
                    >
                      {item.name.substring(0, 55)}
                    </a>
                    <CloseIcon
                      onClick={() => delContact(item.id)}
                      style={{ fontSize: "18px", marginLeft: "10px" }}
                    />
                  </Uri>
                ))}
              </ListUri>
              <FormText
                valid
                label="Sales Messages"
                value={valueData.sales_message}
                getData={getSalesMesg}
                height="200px"
                placeholder="Input your sales messages"
              />
            </>
          )}
        </>
      )}
      <h4
        style={{
          float: "left",
          marginLeft: "6%",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      >
        Update data
      </h4>

      <SelectInput
        valid={true}
        label="Data"
        value={valueUpdateData}
        onReset={() => setValueUpdateData("")}
        data={filterUpdateData(updateData)}
        setValue={(e) => setValueUpdateData(e)}
        getSelect={getValueData}
        isOpen={isOpenData}
        setOpen={setIsOpenData}
        placeholder="-Select Data-"
      />
      {updateData[0].active === "1" && (
        <FormInput
          value={updateData[0].value}
          getData={(e) => {
            const newState = [...updateData];
            newState[0].value = e.target.value;
            setUpdateData(newState);
          }}
          label="Interest"
          type="text"
          placeholder="Input your interest value"
          btnRemove
          actionRemove={removeData}
          refRemov="interest"
          valid
        />
      )}
      {updateData[1].active === "1" && (
        <FormInput
          value={updateData[1].value}
          getData={(e) => {
            const newState = [...updateData];
            newState[1].value = e.target.value;
            setUpdateData(newState);
          }}
          label="City"
          type="text"
          placeholder="Input your city value"
          btnRemove
          actionRemove={removeData}
          refRemov="city"
          valid
        />
      )}
      <Button
        onClick={typeAction == "submit" ? saveBot : updateBot}
        valid={
          !data
            ? keyValid &&
              menuValid &&
              nextValid &&
              prevKeyValid &&
              prevMenuValid
              ? true
              : false
            : keyValid &&
              menuValid &&
              nextValid &&
              prevKeyValid &&
              prevMenuValid &&
              otherValid
            ? true
            : false
        }
      >
        {typeAction == "submit" ? "Save" : "Update"}
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
