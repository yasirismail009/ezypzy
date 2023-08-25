import React, { useState } from "react";
import styles from "./Homepage.module.css";
import { Grid } from "@mui/material";
import myGif from '../../assets/EzpZ-Fire.gif'


export default function Story() {
  const [storyArray, setStoryArray] = useState([
    {
      title: "I come from the high peaks of the Karakoram Mountains,",
      descr: "and my love for learning sent me on a journey to different corners of the world.",
    },
    {
        title: "I discovered rich histories,",
        descr: "uncovered scientific wonders and unique lifestyles, and acquired the flame of knowledge.",
      },
  ]);
  return (
    <div className={styles.story_div}>
      <div className={styles.centerBlock}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item lg={6} md={6} xs={12} sx={{padding:"0 30px"}}>
            <p className={styles.mini_title}>Story</p>
            {storyArray.map((val , key)=>(
 <div key={key}>
 <p className={styles.story_title}>{val.title}</p>
 <p className={styles.story_desc}>{val.descr}</p>
</div>
            ))}
            <p className={styles.story_describe}>I hope to pass these flames on to you.</p>
           
          </Grid>
          <Grid item lg={4} md={6} xs={12}><img src={myGif} className={styles.story_gif}/></Grid>
        </Grid>
      </div>
    </div>
  );
}
