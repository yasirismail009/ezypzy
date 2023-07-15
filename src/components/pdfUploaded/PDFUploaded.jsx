import React from "react";
import styles from "./PDFUploaded.module.css";
import character from "../../assets/ezpz.png";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import PDFsection from "../pdfSection/PDFsection";

 const PDFUploaded = ({selectedPdf}) => {
  return (
    <div className={styles.main_div}>
      <div className={styles.first_section}>
        <PDFsection selectedPdf={selectedPdf}/>
      </div>
      <div className={styles.second_section}>
        <div className={styles.filters_box}>
          <BsRecordCircle size={15} />
          <AiOutlineFormatPainter size={18} />
        </div>
        <div className={styles.second_section_text}>
          <p>Look at that, your document is all set and ready to go!</p>
          <p>
            Feel free to start highlighting parts that feel like a tough nut to
            crack. Consider each highlight a secret handshake between us - a
            sign from me to step in and lend a hand.
          </p>
          <p>
            But remember, there's no rush, we're here to enjoy the journey as
            much as the destination. So take a deep breath and when you're
            ready, let's jump in and make learning fun!
          </p>
        </div>
        <div className={styles.character_img}>
          <img src={character} />
        </div>
      </div>
    </div>
  );
};


export default PDFUploaded;