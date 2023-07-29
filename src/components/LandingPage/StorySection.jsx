import React, { useState } from "react";
import styles from "./Homepage.module.css";
import { Grid } from "@mui/material";
import myGif from '../../assets/EzpZ-Fire.gif'


export default function Story() {
  const [storyArray, setStoryArray] = useState([
    {
      title: "I come from the high peaks of the Karakoram Mountains,",
      descr: " but my love for learning sent me on a journey across the world. I began to travel to different corners of the world. ",
    },
    {
        title: "I discovered the rich histories of countless places,",
        descr: "uncovered the scientific wonders and unique lifestyles across cultures along the way. Through this, I acquired the flame of knowledge.",
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
          <Grid item lg={4} xs={6} sx={{padding:"0 30px"}}>
            <p className={styles.mini_title}>Story</p>
            {storyArray.map((val , key)=>(
 <div key={key}>
 <p className={styles.story_title}>{val.title}</p>
 <p className={styles.story_desc}>{val.descr}</p>
</div>
            ))}
            <p className={styles.story_describe}>I hope through our time together, I can pass these flames on to you.</p>
           
          </Grid>
          <Grid item lg={4} xs={6}><img src={myGif} className={styles.story_gif}/></Grid>
        </Grid>
      </div>
    </div>
  );
}
