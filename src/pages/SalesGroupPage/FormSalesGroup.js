import React, { useEffect, useState } from "react";
import { FormInput, FormText } from "../../components/atoms";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { API_URI } from "../../utils/";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalSet } from "../../redux/slices/ModalSlice";

const FormSalesGroup = ({ data }) => {
  const defaultValue = { name: "", notes: "", status: 1 };
  const [valueData, setValueData] = useState(defaultValue);
  const [prevValue, setPrevValue] = useState({});
  const [validName, setValidName] = useState(false);

  const dispatch = useDispatch();

  const getValueName = (e) => {
    setValueData({ ...valueData, name: e.target.value });
  };

  const getNotes = (e) => {
    setValueData({ ...valueData, notes: e });
  };

  useEffect(() => {
    if (valueData.name !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [valueData.name]);

  const saveSalesGroup = () => {
    if (validName) {
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
            .post(`${API_URI}salesgroup`, valueData)
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
                  page: "createSalesGroup",
                  isLoading: false,
                })
              );
              console.log("err");
              Swal.fire("Error!", "Your file cannot to save.", "error");
            });
        } else {
          dispatch(
            modalSet({
              active: true,
              page: "createSalesGroup",
              isLoading: false,
            })
          );
        }
      });
    }
  };

  const updateGroup = () => {
    if (validName && JSON.stringify(valueData) !== JSON.stringify(prevValue)) {
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
              page: "createSalesGroup",
              isLoading: true,
              data: data,
            })
          );
          axios
            .put(`${API_URI}salesgroup/${data.item.id}`, valueData)
            .then((res) => {
              dispatch(modalSet({ active: false, page: "", isLoading: true }));
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
                  page: "createSalesGroup",
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
              page: "createSalesGroup",
              isLoading: false,
              data: data,
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    if (data) {
      setPrevValue({
        name: data.item.name,
        notes: data.item.notes,
        status: data.item.status ? "1" : "0",
      });
      setValueData({
        name: data.item.name,
        notes: data.item.notes,
        status: data.item.status ? "1" : "0",
      });
    }
  }, []);

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

      <FormText
        valid
        label="Notes"
        value={valueData.notes}
        getData={getNotes}
        height="200px"
        placeholder="Input your Notes"
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
      <Button
        onClick={data ? updateGroup : saveSalesGroup}
        valid={
          data
            ? validName &&
              JSON.stringify(valueData) !== JSON.stringify(prevValue)
              ? true
              : false
            : validName
            ? true
            : false
        }
      >
        {data ? "Update" : "Save"}
      </Button>
    </Wrapper>
  );
};

export default FormSalesGroup;

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
