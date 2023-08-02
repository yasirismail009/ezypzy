import React, { useState } from "react";
import styles from "./Homepage.module.css";
import { Grid } from "@mui/material";
import FeatureImage from '../../assets/Sidepose.gif'

export default function () {
  const [featureOption, setFeatureOption] = useState([
    "Receive simplified explanations for your content",
    "Immerse in the visual learning experience",
    "Engage in dynamic dialogue",
    "Revisit and reinforce with ease",
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredData, setIsHoveredData] = useState(false);
  const [isHoveredThird, setIsHoveredThird] = useState(false);
  const [isHoveredFour, setIsHoveredFour] = useState(false);
  const [isHoveredFive, setIsHoveredFive] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Add your logic for onMouseEnter here
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Add your logic for onMouseLeave here
  };
  const handleMouseEnterSecond = () => {
    setIsHoveredData(true);
    // Add your logic for onMouseEnter here
  };

  const handleMouseLeaveSecond = () => {
    setIsHoveredData(false);
    // Add your logic for onMouseLeave here
  };
  const handleMouseEnterThird = () => {
    setIsHoveredThird(true);
    // Add your logic for onMouseEnter here
  };

  const handleMouseLeaveThird = () => {
    setIsHoveredThird(false);
    // Add your logic for onMouseLeave here
  };
  const handleMouseEnterFour = () => {
    setIsHoveredFour(true);
    // Add your logic for onMouseEnter here
  };

  const handleMouseLeaveFour = () => {
    setIsHoveredFour(false);
    // Add your logic for onMouseLeave here
  };
  const handleMouseEnterFive = () => {
    setIsHoveredFive(true);
    // Add your logic for onMouseEnter here
  };

  const handleMouseLeaveFive = () => {
    setIsHoveredFive(false);
    // Add your logic for onMouseLeave here
  };

  return (
    <div className={styles.feature}>
      <div className={styles.centerBlock}>
        <div style={{width:"70%"}}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "start", alignItems: "center" }}
          >
            <Grid item lg={8} xs={12} sx={{ padding: "0 30px" }}>
              <div>
                <p className={styles.feature_title}>Feature</p>
                <p className={styles.feature_des}>
                  Let’s begin our journey of making learning{" "}
                  <span style={{ color: "#F96033" }}>easy peasy</span> for you.
                </p>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "start", alignItems: "center" }}
          >
            <Grid item lg={5} xs={12} sx={{ padding: "0 30px" }}>
              <div
                className={styles.feature_icon}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className={styles.feature_option_main}>
                  Start by uploading a document
                </p>
                {isHovered ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.3946 0.816575C15.0041 0.426051 14.3709 0.426051 13.9804 0.816575C13.5899 1.2071 13.5899 1.84026 13.9804 2.23079L21.7496 10H1C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12H21.7494L13.9804 19.769C13.5899 20.1595 13.5899 20.7927 13.9804 21.1832C14.3709 21.5737 15.0041 21.5737 15.3946 21.1832L24.8526 11.7252C25.0444 11.543 25.1641 11.2855 25.1641 11C25.1641 10.7169 25.0464 10.4613 24.8574 10.2794L15.3946 0.816575Z"
                      fill="#F96033"
                    />
                  </svg>
                ) : null}
              </div>
              <div
                  className={styles.feature_icon}
                  onMouseEnter={handleMouseEnterSecond}
                  onMouseLeave={handleMouseLeaveSecond}
                >
                  <p  className={styles.feature_option}>
                  Receive simplified explanations for your content
                  </p>
                  {isHoveredData ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.3946 0.816697C15.0041 0.426173 14.3709 0.426173 13.9804 0.816697C13.5899 1.20722 13.5899 1.84039 13.9804 2.23091L21.7496 10.0001H1C0.447715 10.0001 0 10.4478 0 11.0001C0 11.5524 0.447715 12.0001 1 12.0001H21.7494L13.9804 19.7691C13.5899 20.1596 13.5899 20.7928 13.9804 21.1833C14.3709 21.5739 15.0041 21.5739 15.3946 21.1833L24.8526 11.7254C25.0444 11.5431 25.1641 11.2856 25.1641 11.0001C25.1641 10.717 25.0464 10.4614 24.8574 10.2795L15.3946 0.816697Z"
                        fill="#0F172A"
                      />
                    </svg>
                  ) : null}
                </div>
                <div
                  className={styles.feature_icon}
                  onMouseEnter={handleMouseEnterThird}
                  onMouseLeave={handleMouseLeaveThird}
                >
                  <p  className={styles.feature_option}>
                  Immerse in the visual learning experience
                  </p>
                  {isHoveredThird ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.3946 0.816697C15.0041 0.426173 14.3709 0.426173 13.9804 0.816697C13.5899 1.20722 13.5899 1.84039 13.9804 2.23091L21.7496 10.0001H1C0.447715 10.0001 0 10.4478 0 11.0001C0 11.5524 0.447715 12.0001 1 12.0001H21.7494L13.9804 19.7691C13.5899 20.1596 13.5899 20.7928 13.9804 21.1833C14.3709 21.5739 15.0041 21.5739 15.3946 21.1833L24.8526 11.7254C25.0444 11.5431 25.1641 11.2856 25.1641 11.0001C25.1641 10.717 25.0464 10.4614 24.8574 10.2795L15.3946 0.816697Z"
                        fill="#0F172A"
                      />
                    </svg>
                  ) : null}
                </div>
                <div
                  className={styles.feature_icon}
                  onMouseEnter={handleMouseEnterFour}
                  onMouseLeave={handleMouseLeaveFour}
                >
                  <p  className={styles.feature_option}>
                  Engage in dynamic dialogue
                  </p>
                  {isHoveredFour ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.3946 0.816697C15.0041 0.426173 14.3709 0.426173 13.9804 0.816697C13.5899 1.20722 13.5899 1.84039 13.9804 2.23091L21.7496 10.0001H1C0.447715 10.0001 0 10.4478 0 11.0001C0 11.5524 0.447715 12.0001 1 12.0001H21.7494L13.9804 19.7691C13.5899 20.1596 13.5899 20.7928 13.9804 21.1833C14.3709 21.5739 15.0041 21.5739 15.3946 21.1833L24.8526 11.7254C25.0444 11.5431 25.1641 11.2856 25.1641 11.0001C25.1641 10.717 25.0464 10.4614 24.8574 10.2795L15.3946 0.816697Z"
                        fill="#0F172A"
                      />
                    </svg>
                  ) : null}
                </div>
                <div
                  className={styles.feature_icon}
                  onMouseEnter={handleMouseEnterFive}
                  onMouseLeave={handleMouseLeaveFive}
                >
                  <p  className={styles.feature_option}>
                  Engage in dynamic dialogue
                  </p>
                  {isHoveredFive ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.3946 0.816697C15.0041 0.426173 14.3709 0.426173 13.9804 0.816697C13.5899 1.20722 13.5899 1.84039 13.9804 2.23091L21.7496 10.0001H1C0.447715 10.0001 0 10.4478 0 11.0001C0 11.5524 0.447715 12.0001 1 12.0001H21.7494L13.9804 19.7691C13.5899 20.1596 13.5899 20.7928 13.9804 21.1833C14.3709 21.5739 15.0041 21.5739 15.3946 21.1833L24.8526 11.7254C25.0444 11.5431 25.1641 11.2856 25.1641 11.0001C25.1641 10.717 25.0464 10.4614 24.8574 10.2795L15.3946 0.816697Z"
                        fill="#0F172A"
                      />
                    </svg>
                  ) : null}
                </div>
              
            </Grid>
            <Grid item lg={6} xs={12}>
                <p className={styles.feature_notes}>Notes, articles, or powerpoint presentations. Notes, articles, or powerpoint presentations.
Notes, articles, or powerpoint presentations.
</p>
              <img src={FeatureImage} className={styles.feature_gif}/>
            </Grid>
          </Grid>
        </div>
      </div>
      <p style={{textAlign:"center", backgroundColor:"#FAF5EA", padding:"10px 0", margin:'0'}}>© 2023 Mr. EzPz | All Rights Reserved  </p>
    </div>
  );
}
