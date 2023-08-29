import React, {useEffect, useRef, useState } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import styles from "./UploadFile.module.css";
import { useNavigate } from "react-router-dom";
import myGif from '../../assets/EzPz_Upload.svg'
import { RotatingLines } from "react-loader-spinner";
import { unauth } from "../../axios";

const UploadFile = () => {
 const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading]= useState(false)
  const [bgColor, setBgColor] = useState(
    "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      // Adjust the width threshold as needed
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
   
    const fileExtension = file?.name.split(".").pop().toLowerCase();

    const supportedFormats = ["doc", "docx", "pptx", "ppt", "pdf"];
    if (!supportedFormats.includes(fileExtension)) {
      alert(
        "Unsupported file format. Please upload a doc, docx, ppt, pptx, or pdf file."
      );
      return;
    } else{
      const fileSizeInBytes = file?.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
  
      console.log("File size:", fileSizeInBytes, "bytes", fileSizeInKB.toFixed(2), "KB", fileSizeInMB.toFixed(2), "MB");
      if(fileSizeInMB.toFixed(2)<=50){
        uploadFile(file,fileExtension)
      } else{
        alert("File size is greater than 50 mb")
      }
    }

  
  };
  const uploadFile =(file,fileExtension)=>{
    setLoading(true)
    const formData=  new FormData();
    formData.append("uploaded_file",file)
    formData.append("orginalFileExtension",fileExtension)
    unauth.post("/process_document_upload/",formData).then((res)=>{
      localStorage.setItem("doc_data",JSON.stringify(res.data))
      localStorage.setItem("access_token",JSON.stringify(res.data.access_token))
      localStorage.setItem("fileExtension",JSON.stringify(fileExtension))
      if(isSmallScreen){
        navigate('/letstart')
      } else{
        navigate('/viewPdf')
      }
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
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
    {/* {loading?<div className={styles.loading}><img src={myGif} className={styles.story_gif}/></div>: */}
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
      {loading?<RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="70"
  visible={true}
/>:<> <button  className={styles.upload_btn} onClick={handleUpload}>Upload File</button>
            <p className={styles.drag_and_drop}>or drag and drop here</p></>}
           
          </div>
          <p className={styles.pdf_format_only}>
          PDF, PPTX, and DOCX format only. Not exceeding 50 Mbs
          </p>
        </div>
      </div>
      <div className={styles.second_section}  style={{
                background: bgColor,
              }}>
        <div className={styles.second_section_text}>
          {isSmallScreen? <div className={styles.text_box}>
          <p>
          Your documents are the start; true learning is the goal. Let's get there together. 
          </p>
          </div>: <div>
          <p>
          Your documents are the start; true learning is the goal. 
          </p>
          <p>
          Let's get there together. 
          </p>
          </div>}
        </div>
        <div className={styles.gif_container}>
          <img src={myGif} className={styles.story_gif}/>
          </div>
      </div>
    </div>
    
    </>
  );
};

export default UploadFile;
