import React, {useRef, useState } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import styles from "./UploadFile.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myGif from '../../assets/EzpZ-Fire.gif'

const UploadFile = () => {
 const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [loading, setLoading]= useState(false)
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
      uploadFile(file)
    }

  
  };
  const uploadFile =(file)=>{
    setLoading(true)
    const formData=  new FormData();
    formData.append("fileUpload",file)
    axios.post("http://192.168.100.2:8001/ezypzy/file_save/",formData).then((res)=>{
      localStorage.setItem("file",JSON.stringify(res.data.result))
      navigate('/viewPdf')
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      navigate('/viewPdf')
      setLoading(false)
    })
  }

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
            <button  onClick={handleUpload}>Upload File</button>
            <p className={styles.drag_and_drop}>or drag and drop here</p>
          </div>
          <p className={styles.pdf_format_only}>
            PDF Format Only Not Exceeding 300 Mbs
          </p>
        </div>
      </div>
      <div className={styles.second_section}>
        <div className={styles.filters_box}>
          <BsRecordCircle size={15} />
          <AiOutlineFormatPainter size={18} />
        </div>
        <div className={styles.second_section_text}>
          <p>
            Your study materials are the starting points of a wondrous journey.
            Let's embark on a magical journey of understanding together.
          </p>
          <img src={myGif} className={styles.story_gif}/>
        </div>
      </div>
    </div>}
    
    </>
  );
};

export default UploadFile;
