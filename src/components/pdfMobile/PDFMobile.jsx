import react from "react";
import styles from "./PDFMobile.module.css";
import highlighticon from "../../assets/highlight_icon.png";
import teach from "../../assets/chalkboard-user.png";
import draw from "../../assets/pen-swirl.png";
import tracker from "../../assets/rectangle-vertical-history.png";
import character from "../../assets/ezpz.png";

export const PDFMobile = () => {
  return (
    <div className={styles.main_div}>
      <div className={styles.header}>
        <p className={styles.heading}>Diversity13812.</p>
        <div className={styles.summary_edit_section}>
          <button>Summary</button>
          <div className={styles.edit_section}>
            <div className={styles.highlighter}>
              <img src={highlighticon} />
            </div>
            <div className={styles.text_edit_section}>
              <p className={styles.small_A}>A</p>
              <p style={{margin:0}}>|</p>
              <p className={styles.capital_A}>A</p>
            </div>
          </div>
        </div>
        <div className={styles.summary_section}>
          <p className={styles.summary_heading}>Summary</p>
          <p>
            This document outlines the critical role of sustainable energy
            technologies in fostering a greener future. It examines the current
            energy landscape, identifies key challenges, and presents innovative
            solutions to address them.
          </p>
          <button>Hide</button>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_icons}>
          <div className={styles.teach_icon}>
            <img src={teach} />
            <p>Teach</p>
          </div>
          <div className={styles.draw_icon}>
            <img src={draw} />
            <p>Draw</p>
          </div>
          <div className={styles.tracker_icon}>
            <img src={tracker} />
            <p>Tracker</p>
          </div>
        </div>
        <img className={styles.character_img} src={character} />
      </div>
    </div>
  );
};
