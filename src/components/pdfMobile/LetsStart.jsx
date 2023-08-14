import React from 'react'
import styles from "./Letstart.module.css";
import myGif from '../../assets/EzpZ-Fire.gif'
import { useNavigate } from 'react-router-dom';

export default function LetsStart() {
  const navigate = useNavigate()
  return (
    <div className={styles.main_div}>
       <div className={styles.second_section}>
        <div className={styles.second_child}>
    <p>
    "Your documents are the start; true learning is the goal. Let's get there together. 
    </p>
    <p>
    Upload your document to get started"
    </p>
    <button onClick={e=>{navigate('/viewpdf')}}>Let’s Start</button>
    </div>
    <img src={myGif} className={styles.story_gif}/>
  </div></div>
  )
}
