import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Typist from "react-typist";
import { Reveal } from "react-reveal";
import styles from "../pdfMobile/PDFMobile.module.css";
import MermaidDiagram from "../pdfUploaded/Mermaid";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiMenuKebab } from "react-icons/ci";
import { SwipeableDrawer } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import myGif from '../../assets/EzpZ-Fire.gif'

const drawerBleeding = 56;

export default function TemporaryDrawer({
  toggleDrawer1,
  bottom,
  summeryData,
  lines,
  dropDownData,
  mermaidCode,
  Thread,
  trackerView,
  highlights,
  handleChat,
  loading,
}) {
  // const mobileparagraphRef = useRef();
  const mobileContainerRef = useRef();
  // const sortedThreads = Thread.sort((a, b) => b.createDate - a.createDate);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [zoomOutLevel, setZoomOutLevel] = useState(0);
  const [typingKey, setTypingKey] = useState(0);
  const [showFields, setShowFields] = useState(false);
  const [bgColor, setBgColor] = useState(
    "var(--aibg-1, rgba(196, 248, 183, 0.30))"
  );

  const handleTypingDone = async () => {
    if (currentLineIndex < lines.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay between lines as needed, in milliseconds.
      setCurrentLineIndex((prevIndex) => prevIndex + 1);
    }
  };

  const scrollToBottom2 = () => {
    setTimeout(() => {
      if (mobileContainerRef.current) {
        console.log("calls");
        // Check if mobileContainerRef is not null
        const { scrollHeight, clientHeight } = mobileContainerRef.current;
        setZoomOutLevel(mobileContainerRef.current.scrollTop);
        mobileContainerRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }, 1000);
    handleScroll();
    handlesetFullHeight();
  };

  useEffect(() => {
    scrollToBottom2();
  }, [showDropDown, bottom]);

  const [scrollScale, setScrollScale] = useState(1);
  const [opacityScale, setOpacityScale] = useState(1);
  const [textAlign, setTextAlign] = useState("start");

  // const scrollTargetRef = useRef(null);
  var fullHeight = 0;
  const handlesetFullHeight = () => {
    setTimeout(() => {
      if (mobileContainerRef.current) {
        fullHeight = mobileContainerRef.current.scrollTop - 150;
      } // Check if mobileContainerRef is not null
    }, 2000);
  };

  const handleScroll = () => {
    setTimeout(() => {
      if (mobileContainerRef.current) {
        console.log(mobileContainerRef.current.scrollTop);
        const newScale =
          mobileContainerRef.current.scrollTop < fullHeight ? 0.8 : 1;
        const opacity =
          mobileContainerRef.current.scrollTop < fullHeight ? 0.6 : 1;
        const alignItem =
          mobileContainerRef.current.scrollTop < fullHeight ? "end" : "start";

        // Update the scroll scale state
        setScrollScale(newScale);
        setOpacityScale(opacity);
        setTextAlign(alignItem);
      }
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      if (mobileContainerRef.current) {
        mobileContainerRef.current.addEventListener("scroll", handleScroll);
      }
      // Clean up the event listener on unmount
      return () => {
        if (mobileContainerRef.current) {
          mobileContainerRef.current?.removeEventListener(
            "scroll",
            handleScroll
          );
        }
      };
    }, 1000);
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  }));

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));
  useEffect(() => {
    scrollToBottom2();
  }, [showDropDown, lines,Thread]);
  useEffect(() => {
    if (lines) {
      setTimeout(() => {
        setShowFields(true);
      }, 10000);
    }
    scrollToBottom2()
    setTypingKey((prevKey) => prevKey + 1);
  }, [lines]);
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"bottom"}
          open={bottom}
          onClose={toggleDrawer1("bottom", false)}
          sx={{
            background:
              "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))",
            zIndex: "999999999999",
          }}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              51 results
            </Typography>
          </StyledBox>
          <div className={styles.second_section_text}>
            <div className={styles.menuIcon}>
              <CiMenuKebab onClick={handleClick} />
            </div>
            {trackerView ? (
              <div>
                <h5 className={styles.tracker_title}>Tracker</h5>
                  {highlights.map((val, key)=>(
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 10px"}} key={key}>
                    <p className={styles.tracker_highlights}>{key+1}  {val.content.text.length > 30
                      ? val.content.text.slice(0, 28) + "..."
                      : val.content.text}</p>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.02112 4.77148L10.3024 8.05273C10.3903 8.14062 10.4489 8.25781 10.4489 8.375C10.4489 8.52148 10.3903 8.63867 10.3024 8.72656L7.02112 12.0078C6.84534 12.1836 6.52307 12.1836 6.34729 12.0078C6.17151 11.832 6.17151 11.5098 6.34729 11.334L9.30628 8.375L6.34729 5.44531C6.17151 5.26953 6.17151 4.94727 6.34729 4.77148C6.52307 4.5957 6.84534 4.5957 7.02112 4.77148ZM7.63635 0.875C11.7672 0.875 15.1364 4.24414 15.1364 8.375C15.1364 12.5352 11.7672 15.875 7.63635 15.875C3.4762 15.875 0.136354 12.5352 0.136354 8.375C0.136354 4.24414 3.4762 0.875 7.63635 0.875ZM7.63635 14.9375C11.2399 14.9375 14.1989 12.0078 14.1989 8.375C14.1989 4.77148 11.2399 1.8125 7.63635 1.8125C4.00354 1.8125 1.07385 4.77148 1.07385 8.375C1.07385 12.0078 4.00354 14.9375 7.63635 14.9375Z" fill="black"/>
</svg>
                </div>
                  ))}       
              </div>
            ) : (
              <div
                ref={mobileContainerRef}
                className={styles.scrollView}
                style={{
                  transform: `scale(${scrollScale})`,
                  transition: "transform 0.5s",
                  opacity: opacityScale,
                  transition: "transform 0.2s, opacity 0.2s",
                }}
              >
                 {loading ? (
                    <div className={styles.loadingstate}><img src={myGif} alt="Fire Gif" width="40%" /><p style={{fontSize:"22px"}}>Ai is loading...</p></div>
                  ) : (<>
                {Thread?.map((data, index) => (
                  <div className={styles.childDiv} key={index}>
                    <div>
                      <p style={{ textAlign: `${textAlign}` }}>
                        {index + 1}: <b>{data?.title}</b>
                      </p>
                      {data?.diagram ? (
                        <div className={styles.mermaidData}>
                          <MermaidDiagram diagramDefinition={data.diagram} />
                        </div>
                      ) : null}
                      <p>{data?.aires}</p>
                    </div>
                  </div>
                ))}

                {lines ? (
                  <div className={styles.childDiv}>
                    <div className={styles.fade_in_paragraph}>
                      <div className={styles.mermaidData}>
                        {mermaidCode ? (
                          <MermaidDiagram diagramDefinition={mermaidCode} />
                        ) : null}
                      </div>
                      <span className={styles.fade_in_line}>
                        <Reveal effect="fadeIn">
                          <Typist
                             key={typingKey}
                             avgTypingDelay={20}
                             cursor={{ hideWhenDone: true }}
                             className={styles.typing}
                             onTypingDone={handleTypingDone}
                          >
                            {lines}
                          </Typist>
                        </Reveal>
                        <br />
                      </span>
                    </div>
                    <div
                            style={{
                              width: "100%",
                              display: showFields ? "block" : "none",
                            }}
                          >
                    <input
                      placeholder="Type here to ask"
                      type="text"
                      className={styles.inputAi}
                      style={{ background: bgColor }}
                    ></input>
                    <div
                      style={{
                        width: "100%",
                        textAlign: "start",
                        display: "flex",
                        alignItems: "center",
                        zIndex: 3,
                      }}
                      onClick={(e) => {
                        setShowDropDown(!showDropDown);
                      }}
                    >
                      <span className={styles.dropDown}>
                        Questions you may want to ask{" "}
                      </span>
                      <span>
                        {showDropDown ? (
                          <MdArrowDropUp
                            style={{ fontSize: "20px", margin: 0 }}
                          />
                        ) : (
                          <MdArrowDropDown
                            style={{ fontSize: "20px", margin: 0 }}
                          />
                        )}
                      </span>
                    </div>
                    {showDropDown ? (
                      <div>
                        {dropDownData.map((val, key) => (
                          <p key={key} className={styles.dropdownItem} onClick={e=>{handleChat(val)}}>
                            {val}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    </div>
                  </div>
                ) : (
                  <div className={styles.nodata}>
                    <p>
                      Look at that, your document is all set and ready to go!
                    </p>
                    <p>
                      Feel free to start highlighting parts that feel like a
                      tough nut to crack. Consider each highlight a secret
                      handshake between us - a sign for me to step in and lend a
                      hand.
                    </p>
                    <p>
                      But remember, there's no rush, we're here to enjoy the
                      journey as much as the destination. So, take a deep breath
                      and when you're ready, let's jump in and make learning
                      fun!
                    </p>
                  </div>
                )}</>)}
              </div>
            )}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem key={"option"} onClick={toggleDrawer1("bottom", false)}>
          Learn More
        </MenuItem>
        <MenuItem key={"option"} onClick={toggleDrawer1("bottom", false)}>
          Close
        </MenuItem>
      </Menu>
    </div>
  );
}
