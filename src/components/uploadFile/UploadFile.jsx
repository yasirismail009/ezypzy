import React, {useRef, useState } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import styles from "./UploadFile.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myGif from '../../assets/EzpZ-Fire.gif'
import { Menu, MenuItem } from "@mui/material";

const UploadFile = () => {
 const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [loading, setLoading]= useState(false)
  const [bgColor, setBgColor] = useState(
    "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleUpload = () => {
    fileInputRef.current.click();
  };



  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
   
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const supportedFormats = ["doc", "docx", "pptx", "ppt", "pdf"];
    if (!supportedFormats.includes(fileExtension)) {
      alert(
        "Unsupported file format. Please upload a doc, docx, ppt, pptx, or pdf file."
      );
      return;
    } else{
      uploadFile(file,fileExtension)
    }

  
  };
  const uploadFile =(file,fileExtension)=>{
    setLoading(true)
    const formData=  new FormData();
    formData.append("uploaded_file",file)
    formData.append("orginalFileExtension",fileExtension)
    axios.post("https://api.mrezpz.ai/process_document_upload/",formData).then((res)=>{
      localStorage.setItem("doc_data",JSON.stringify(res.data))
      localStorage.setItem("fileExtension",JSON.stringify(fileExtension))
      navigate('/viewPdf')
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      navigate('/viewPdf')
      setLoading(false)
    })
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    {loading?<div className={styles.loading}><img src={myGif} className={styles.story_gif}/></div>:<div className={styles.main_div}>
      <div className={styles.first_section}>
        <div>
          <p className={styles.main_heading}>Please Upload A Document</p>
          <div className={styles.upload_section}>
          <input
        type="file"
        accept=".doc,.ppt,.pdf,.docx,.pptx"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
            <button  className={styles.upload_btn} onClick={handleUpload}>Upload File</button>
            <p className={styles.drag_and_drop}>or drag and drop here</p>
          </div>
          <p className={styles.pdf_format_only}>
            PDF Format Only Not Exceeding 300 Mbs
          </p>
        </div>
      </div>
      <div className={styles.second_section}  style={{
                background: bgColor,
              }}>
        {/* <div className={styles.filters_box}>
          <AiOutlineFormatPainter size={18} onClick={handleClick}/>
          <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      setBgColor(
                        "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
                      );
                      handleClose();
                    }}
                  >
                    <div
                      className={styles.dot}
                      style={{
                        backgroundColor:
                          "var(--aibg-1, rgba(196, 248, 183, 0.30))var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))",
                      }}
                    ></div>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setBgColor("var(--aibg-4, #ECFAFF)");
                      handleClose();
                    }}
                  >
                    <div
                      className={styles.dot}
                      style={{ backgroundColor: "var(--aibg-4, #ECFAFF)" }}
                    ></div>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setBgColor("var(--aibg-5, #F3F1FA)");
                      handleClose();
                    }}
                  >
                    <div
                      className={styles.dot}
                      style={{ backgroundColor: "var(--aibg-5, #F3F1FA)" }}
                    ></div>
                  </MenuItem>
                </Menu>
        </div> */}
        <div className={styles.second_section_text}>
          <p>
          "Your documents are the start; true learning is the goal. Let's get there together. 
          </p>
          <p>
          Upload your document to get started"
          </p>
          <img src={myGif} className={styles.story_gif}/>
        </div>
      </div>
    </div>}
    
    </>
  );
};

export default UploadFile;
