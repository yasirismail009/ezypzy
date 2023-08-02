import React, { useEffect, useRef, useState } from "react";
import styles from "./PDFUploaded.module.css";
import character from "../../assets/1-a.png";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import PDFsection from "../pdfSection/PDFsection";
import Typist from "react-typist";
import EyesCom from "./EyesAnimation";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import MermaidDiagram from "./Mermaid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Reveal } from "react-reveal";
import { useScrollDirection } from "react-use-scroll-direction";
import axios from "axios";

// const [Thread, setThread] = useState([
//   {
//     title: "Lorem Ipsum is simply dummy text of the?",
//     aires:
//       "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun!",
//     diagram: "",
//     createDate: new Date("2022-07-20"),
//   },
//   {
//     title: "Lorem Ipsum is simply dummy text of the 12?",
//     aires:
//       "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun! 122",
//     diagram: "",
//     createDate: new Date("2022-07-21"),
//   },
//   {
//     title: "Lorem Ipsum is simply dummy text of the 12?",
//     aires:
//       "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun! 122",
//     diagram: "",
//     createDate: new Date("2022-07-22"),
//   },
//   {
//     title: "Lorem Ipsum is simply dummy text of the 12?",
//     aires: "",
//     diagram: `
//       graph TD;
//     A-->B;
//     A-->C;
//     B-->D;
//     C-->D;
//       `,
//     createDate: new Date("2022-07-22"),
//   },
// ]);

const PDFUploaded = () => {
  const messageContainerRef = useRef(null);
  const [lines, setLines] = useState();
  const [Thread, setThread] = useState([]);
  // const sortedThreads = Thread.sort((a, b) => b.createDate - a.createDate);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [zoomOutLevel, setZoomOutLevel] = useState(0);
  const [fileData, setFileData] = useState();
  const [bgColor, setBgColor] = useState(
    "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
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

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setFileData(JSON.parse(localStorage.getItem("file")));
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the width threshold as needed
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

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      const { scrollHeight, clientHeight } = messageContainerRef.current;
      setZoomOutLevel(messageContainerRef.current.scrollTop);
      messageContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [showDropDown]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isCentered, setIsCentered] = useState(false);
  const [scrollScale, setScrollScale] = useState(1);
  const [opacityScale, setOpacityScale] = useState(1);
  const [textAlign, setTextAlign] = useState("start");
  const UpdateFileTitle = (title) => {
    const data = {
      fileId: fileData.fileId,
      fileName: title,
    };
    axios
      .patch("http://192.168.100.2:8001/ezypzy/file_save/", data)
      .then((res) => {
        ResetFiledata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ResetFiledata = () => {
    axios
      .get(
        `http://192.168.100.2:8001/ezypzy/file_save/?fileId=${fileData.fileId}`
      )
      .then((res) => {
        setFileData(res.data.result);
        localStorage.setItem("file", JSON.stringify(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // Function to check if the child is in the center of the parent
    const checkCentered = () => {
      // ... (same as the previous example)
    };

    // Attach the event listener to check for centering when the window is resized
    window.addEventListener("resize", checkCentered);

    // Initial check on mount
    checkCentered();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", checkCentered);
    };
  }, []);

  // const scrollTargetRef = useRef(null);
  var fullHeight = 0;
  if (messageContainerRef) {
    setTimeout(() => {
      if (messageContainerRef.current) {
        fullHeight = messageContainerRef.current.scrollTop - 150;
      }
    }, 1000); // Check if messageContainerRef is not null
  }

  const handleTechAndDiagram = (action, value) => {
    alert(JSON.stringify(value));
  };

  const handleScroll = () => {
    if (messageContainerRef.current) {
      console.log(messageContainerRef.current.scrollTop);
      const newScale =
        messageContainerRef.current.scrollTop < fullHeight ? 0.8 : 1;
      const opacity =
        messageContainerRef.current.scrollTop < fullHeight ? 0.6 : 1;
      const alignItem =
        messageContainerRef.current.scrollTop < fullHeight ? "end" : "start";

      // Update the scroll scale state
      setScrollScale(newScale);
      setOpacityScale(opacity);
      setTextAlign(alignItem);
    }
  };
  useEffect(() => {
    // Add the scroll event listener when the component mounts
    messageContainerRef.current.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      messageContainerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(fileData);
  return (
    <div className={styles.main_div}>
      <div
        className={
          isSmallScreen ? styles.first_section_small : styles.first_section
        }
      >
        <PDFsection
          fileData={fileData}
          isSmallScreen={isSmallScreen}
          UpdateFileTitle={UpdateFileTitle}
          handleTechAndDiagram={handleTechAndDiagram}
        />
      </div>
      {isSmallScreen ? null : (
        <>
          {/* <Reveal effect="fadeIn"> */}
          <div
            className={styles.second_section}
            style={{ background: bgColor }}
          >
            <div className={styles.filters_box}>
              {/* <BsRecordCircle size={15} /> */}
              <AiOutlineFormatPainter size={18} onClick={handleClick} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={(e) => {
                    setBgColor(
                      "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
                    );
                    handleClose();
                  }}
                >
                  <div
                    className={styles.dot}
                    style={{
                      backgroundColor:
                        "var(--aibg-1, rgba(196, 248, 183, 0.30))var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))",
                    }}
                  ></div>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    setBgColor("var(--aibg-4, #ECFAFF)");
                    handleClose();
                  }}
                >
                  <div
                    className={styles.dot}
                    style={{ backgroundColor: "var(--aibg-4, #ECFAFF)" }}
                  ></div>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    setBgColor("var(--aibg-5, #F3F1FA)");
                    handleClose();
                  }}
                >
                  <div
                    className={styles.dot}
                    style={{ backgroundColor: "var(--aibg-5, #F3F1FA)" }}
                  ></div>
                </MenuItem>
              </Menu>
            </div>
            <div className={styles.second_section_text}>
              <div
                ref={messageContainerRef}
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
                    <p>
                      Look at that, your document is all set and ready to go!
                    </p>
                    <p>
                    Feel free to start highlighting parts that feel like a tough nut to crack. Consider each highlight a secret handshake between us - a sign for me to step in and lend a hand. 
                    </p>
                    <p>But remember, there's no rush, we're here to enjoy the journey as much as the destination. So, take a deep breath and when you're ready, let's jump in and make learning fun!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </Reveal> */}
          <div className={styles.character_img}>
            <EyesCom />
          </div>
        </>
      )}
    </div>
  );
};

export default PDFUploaded;
