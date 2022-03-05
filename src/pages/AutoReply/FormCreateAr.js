import React, { useState } from "react";
import styled from "styled-components";
import { FormInput, FormText } from "../../components/atoms";

const FormCreateAr = () => {
  const [isValid, setIsValid] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");
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

  return (
    <Wrapper>
      <FormInput
        valid={true}
        label="Key"
        type="text"
        placeholder="Select your key"
      />
      <FormText
        valid
        label="Messages"
        // value={value.deskripsi}
        // getData={getDesc}
        height="150px"
        placeholder="Input your messages"
      />
      <FormInput
        valid={true}
        label="Uri"
        type="text"
        placeholder="File Url (exp : https://www.ekatunggal.com/wp-content/uploads/2020/11/logoslider02.png)"
      />
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
