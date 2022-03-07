import React, { useState } from "react";
import styled from "styled-components";
import { FormInput, FormText, SelectInput } from "../../components/atoms";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

const FormCreateAr = () => {
  const [isValid, setIsValid] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");
  const [valueKey, setValueKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [keys, setKeys] = useState([
    { id: 1, name: ".menu", status: 1 },
    { id: 2, name: ".info", status: 1 },
  ]);
  const getFiles = (e) => {
    setFiles(e.target.files);
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    // setImage(e.target.files[0]);
    setFiles(e.target.files);
  };

  const filterData = (data) => {
    return _.filter(data, function (query) {
      var name = valueKey
        ? query.name.toLowerCase().includes(valueKey.toLowerCase())
        : true;

      return name;
    });
  };

  const getKey = (e) => {
    setValueKey(e);
    setIsOpen(false);
  };

  const setOpen = (e) => {
    setIsOpen(e);
  };

  return (
    <Wrapper>
      <SelectInput
        label="key"
        value={valueKey}
        onReset={() => setValueKey("")}
        data={filterData(keys)}
        setValue={(e) => setValueKey(e)}
        getSelect={getKey}
        isOpen={isOpen}
        setOpen={setOpen}
      />
      <FormText
        valid
        label="Messages"
        // value={value.deskripsi}
        // getData={getDesc}
        height="200px"
        placeholder="Input your messages"
      />
      <FormInput
        valid={true}
        label="Uri"
        type="text"
        placeholder="File Url (exp : https://www.ekatunggal.com/wp-content/uploads/2020/11/logoslider02.png)"
      />
      <ListUri>
        <Uri>
          <a>
            https://www.ekatunggal.com/wp-content/uploads/2020/11/logoslider02.png
          </a>
          <CloseIcon style={{ fontSize: "18px", marginLeft: "10px" }} />
        </Uri>
        <Uri>
          <a>https://www.ekatunggal.com/utama.png</a>
          <CloseIcon style={{ fontSize: "18px", marginLeft: "10px" }} />
        </Uri>
        <Uri>
          <a>https://www.pngfree.com/pageview.png</a>
          <CloseIcon style={{ fontSize: "18px", marginLeft: "10px" }} />
        </Uri>
      </ListUri>
      <FormInput
        getData={imageHandler}
        name="files[]"
        multiple
        valid={true}
        label="Upload File"
        type="file"
        placeholder="Select your file"
      />

      <Button svalid={isValid}>Save</Button>
    </Wrapper>
  );
};

export default FormCreateAr;

const Wrapper = styled.div`
  width: 100%;
  height: 93%;
  overflow-y: scroll;
  padding-left: 10px;
  padding-top: 10px;
  overflow-x: hidden;
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
  opacity: ${(props) => (props.valid ? 1 : 0.8)};
  background-color: #5ab75d;
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
