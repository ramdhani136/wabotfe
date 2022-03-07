import React, { useState } from "react";
import styled from "styled-components";
import { FormInput, FormText, SelectInput } from "../../components/atoms";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

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
  const [valueUri, setValueUri] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [uriFiles, seturiFiles] = useState([]);
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
      <Label>Messages</Label>
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
      </div>
      {/* <FormText
        valid
        label="Messages"
        // value={value.deskripsi}
        // getData={getDesc}
        height="200px"
        placeholder="Input your messages"
      /> */}
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
