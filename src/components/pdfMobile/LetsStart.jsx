import React from 'react'
import styles from "./Letstart.module.css";
import myGif from '../../assets/EzPz_Upload.svg'
import { useNavigate } from 'react-router-dom';

export default function LetsStart() {
  const navigate = useNavigate()
  return (
    <div className={styles.main_div}>
       <div className={styles.second_section}>
        <div className={styles.second_child}>
    <p>
    Document's ready!
    </p>
    <p>
    Highlight any text, and I'll step in to teach.
    </p>
    <div className={styles.btn_parent}>
    <button onClick={e=>{navigate('/viewpdf')}}>Let’s Start</button>
    </div>
    </div>
    <div className={styles.btn_parent}>
    <img src={myGif} className={styles.story_gif}/>
    </div>
  </div></div>
  )
}
