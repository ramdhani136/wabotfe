import React, { useEffect, useState } from "react";
import { FormInput, SelectInput } from "../../components/atoms";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { API_URI } from "../../utils/";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";
import { FetchApi } from "../../utils/FetchApi";

const FormSales = ({ data }) => {
  const defaultValue = { name: "", id_group: "", phone: "", status: 1 };
  const [valueData, setValueData] = useState(defaultValue);
  const [valueGroup, setValueGroup] = useState("");
  const [validName, setValidName] = useState(false);
  const [groupValid, setGroupValid] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [group, setGroup] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [prevValue, setPrevValue] = useState({});
  const [valueCreateGroup, setValueCreateGroup] = useState("");
  const dispatch = useDispatch();
  const [validUpdate, setValidUpdate] = useState(false);

  useEffect(() => {
    setAllGroup();
    if (data) {
      setPrevValue({
        name: data.item.name,
        status: data.item.status ? "1" : "0",
        id_group: data.item.id_group,
        phone: data.item.phone,
      });
      setValueGroup(data.item.group.name);
      setValueData({
        name: data.item.name,
        status: data.item.status ? "1" : "0",
        id_group: data.item.id_group,
        phone: data.item.phone,
      });
    }
  }, []);

  const setAllGroup = () => {
    FetchApi.get(`${API_URI}salesgroup`)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getValueName = (e) => {
    setValueData({ ...valueData, name: e.target.value });
  };

  const getValuePhone = (e) => {
    setValueData({ ...valueData, phone: e.target.value });
  };

  const setOpen = (e) => {
    setIsOpen(e);
  };

  const getGroup = (e) => {
    setValueGroup(e.name);
    setIsOpen(false);
    setValueData({ ...valueData, id_group: e.id });
  };

  const onResetGroup = () => {
    setValueGroup("");
    setValueData({ ...valueData, id_group: "" });
  };

  const saveGroup = () => {
    if (valueCreateGroup !== "") {
      const isDupl = group.filter(
        (group) => group.name.toLowerCase() === valueGroup.toLocaleLowerCase()
      );
      if (isDupl.length < 1) {
        FetchApi.post(`${API_URI}salesgroup`, { name: valueCreateGroup })
          .then((result) => {
            setValueCreateGroup("");
            setAllGroup();
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

  const filterGroup = (data) => {
    return _.filter(data, function (query) {
      var name = valueGroup
        ? query.name.toLowerCase().includes(valueGroup.toLowerCase())
        : true;

      return name;
    });
  };

  useEffect(() => {
    if (valueData.name !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }

    if (valueData.id_group !== "") {
      setGroupValid(true);
    } else {
      setGroupValid(false);
    }

    if (valueData.phone !== "") {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }

    if (data) {
      if (JSON.stringify(valueData) !== JSON.stringify(prevValue)) {
        setValidUpdate(true);
      } else {
        setValidUpdate(false);
      }
    }
  }, [valueData]);

  const saveSales = () => {
    if (validName && groupValid && validPhone) {
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
              page: "createSales",
              isLoading: true,
            })
          );
          FetchApi.post(`${API_URI}sales`, valueData)
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
                  page: "createSales",
                  isLoading: false,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your file cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({ active: true, page: "createSales", isLoading: false })
          );
        }
      });
    }
  };

  const updateSales = () => {
    if (validName && validPhone && validUpdate && groupValid) {
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
              page: "createSales",
              isLoading: true,
              data: data,
            })
          );
          FetchApi.put(`${API_URI}sales/${data.item.id}`, valueData)
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
                  page: "createSales",
                  isLoading: false,
                  data: data,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your data cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({
              active: true,
              page: "createSales",
              isLoading: false,
              data: data,
            })
          );
        }
      });
    }
  };

  return (
    <Wrapper>
      <FormInput
        value={valueData.name}
        getData={getValueName}
        valid={validName}
        label="Name"
        type="text"
        placeholder="Input your sales name"
        mb="10px"
      />
      <SelectInput
        valid={groupValid}
        label="Group"
        value={valueGroup}
        onReset={() => onResetGroup()}
        data={filterGroup(group)}
        setValue={(e) => setValueGroup(e)}
        getSelect={getGroup}
        isOpen={isOpen}
        setOpen={setOpen}
        createNew={saveGroup}
        valueCreate={valueCreateGroup}
        setValueCreate={setValueCreateGroup}
        plCreate="Exp : .JABODETABEK"
        placeholder="-Select Group-"
        formCreate
      />
      <FormInput
        value={valueData.phone}
        getData={getValuePhone}
        valid={validPhone}
        label="Phone"
        type="number"
        placeholder="Input your phone number"
        mb="10px"
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
          <option value="1">Active</option>
          <option value="0">Disabled</option>
        </select>
      </div>
      <Button
        onClick={data ? updateSales : saveSales}
        valid={
          data
            ? validName && groupValid && validPhone && validUpdate
              ? true
              : false
            : validName && groupValid && validPhone
            ? true
            : false
        }
      >
        {data ? "Update" : "Save"}
      </Button>
    </Wrapper>
  );
};

export default FormSales;

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

const Label = styled.div`
  width: 100%;
  padding-left: 6%;
  font-size: 0.9em;
  color: gray;
  float: left;
  margin-bottom: 10px;
`;
