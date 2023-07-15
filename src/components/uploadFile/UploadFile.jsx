import React, { useEffect } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import styles from "./UploadFile.module.css";
import { useNavigate } from "react-router-dom";

const UploadFile = ({handleFileUpload, handleUpload, fileInputRef,selectedPdf}) => {
  const navigate= useNavigate()
  useEffect(()=>{
    console.log(selectedPdf)
    if(selectedPdf !=null){
      navigate('/viewPdf')
    }
      },[selectedPdf, navigate])
  return (
    <div className={styles.main_div}>
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
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
