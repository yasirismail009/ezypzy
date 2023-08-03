import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Typist from "react-typist";
import { Reveal } from "react-reveal";
import styles from "../pdfMobile/PDFMobile.module.css";
import MermaidDiagram from "../pdfUploaded/Mermaid";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiMenuKebab } from "react-icons/ci";
import { SwipeableDrawer } from "@mui/material";

const drawerBleeding = 56;

export default function TemporaryDrawer({ toggleDrawer1, bottom }) {
  // const mobileparagraphRef = useRef();
  const mobileContainerRef = useRef();
  const [lines, setLines] = useState();
  const [Thread, setThread] = useState([]);
  // const sortedThreads = Thread.sort((a, b) => b.createDate - a.createDate);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [zoomOutLevel, setZoomOutLevel] = useState(0);
  const [bgColor, setBgColor] = useState(
    "var(--aibg-1, rgba(196, 248, 183, 0.30))"
  );
  const [dropDownData, setDropDownData] = useState([
    "Lorem Ipsum is simply dummy text of the printingLorem Ipsum is simply dummy text of the printingLorem Ipsum is simply?",
    "Lorem Ipsum is simply dummy text of the?",
    "Ipsum is simply dummy text of the printingLorem Ipsum is simply?",
  ]);

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
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));
  
  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"bottom"}
          open={bottom}
          onClose={toggleDrawer1("bottom", false)}
        > 
        <StyledBox
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
        }}
      >
        <Puller />
        <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
      </StyledBox>
          <div className={styles.second_section_text}>
            <div className={styles.menuIcon}>
              <CiMenuKebab onClick={handleClick} />
            </div>
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
                    <span className={styles.fade_in_line}>
                      <Reveal effect="fadeIn">
                        <Typist
                          avgTypingDelay={50}
                          cursor={{ hideWhenDone: true }}
                          onTypingDone={handleTypingDone}
                        >
                          {lines}
                        </Typist>
                      </Reveal>
                      <br />
                    </span>
                  </div>
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
                        <p key={key} className={styles.dropdownItem}>
                          {val}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className={styles.nodata}>
                  <p>Look at that, your document is all set and ready to go!</p>
                  <p>
                    Feel free to start highlighting parts that feel like a tough
                    nut to crack. Consider each highlight a secret handshake
                    between us - a sign for me to step in and lend a hand.
                  </p>
                  <p>
                    But remember, there's no rush, we're here to enjoy the
                    journey as much as the destination. So, take a deep breath
                    and when you're ready, let's jump in and make learning fun!
                  </p>
                </div>
              )}
            </div>
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
