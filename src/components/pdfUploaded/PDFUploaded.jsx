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
import myGif from '../../assets/EzpZ-Fire.gif'

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
  const [mermaidCode, setMermaidCode] = useState();
  const [Thread, setThread] = useState([]);
  // const sortedThreads = Thread.sort((a, b) => b.createDate - a.createDate);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [zoomOutLevel, setZoomOutLevel] = useState(0);
  const [fileData, setFileData] = useState();
  const [bgColor, setBgColor] = useState(
    "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
  );
  const [dropDownData, setDropDownData] = useState([]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setFileData(JSON.parse(localStorage.getItem("doc_data")));
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setFontScale(-4);
        setHighlighterKey(1691865075703);
      } else {
        setFontScale(-1);
        setHighlighterKey(1691865998260);
      }
      // Adjust the width threshold as needed
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
  const [summeryData, setSummeryData] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState("");

  const [position, setPosition] = useState(50); // Initial position (percentage)
  const [typingKey, setTypingKey] = useState(0);

  const handleTypingDone = async () => {
    scrollToBottom();
  };
  // Define event handlers
  const handleMouseDown = (event) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const slider = document.getElementById("slider-container");
    const rect = slider.getBoundingClientRect();
    const newPosition = Math.max(
      0,
      Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)
    );
    setPosition(newPosition);
  };
  function convertToMultiLineTemplate(mermaidCode) {
    // Remove leading and trailing whitespace
    mermaidCode = mermaidCode.trim();
    const multiLineTemplate = `\`${mermaidCode}\``;
    console.log("multiLineTemplate",multiLineTemplate)
    return multiLineTemplate;
  }
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const UpdateFileTitle = (title) => {
    const data = {
      fileId: fileData.fileId,
      fileName: title,
    };
    axios
      .patch("http://192.168.100.9:8001/ezypzy/file_save/", data)
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
        `http://192.168.100.9:8001/ezypzy/file_save/?fileId=${fileData.fileId}`
      )
      .then((res) => {
        setFileData(res.data.result);
        localStorage.setItem("file", JSON.stringify(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const scrollTargetRef = useRef(null);
  var fullHeight = 0;
  if (messageContainerRef) {
    setTimeout(() => {
      if (messageContainerRef.current) {
        fullHeight = messageContainerRef.current.scrollTop - 100;
      }
    }, 1000); // Check if messageContainerRef is not null
  }

  const handleTechAndDiagram = (action, value) => {
    if (value !== activeHighlight) {
      setActiveHighlight(value);
    }
    if (value === "no data") {
      alert("Select Any Line from Pdf");
    } else {
      if (action === "teach") {
        setLoading(true);
        axios
          .get(
            `https://api.mrezpz.ai/teachme?user_highlight=${value}&documentID=${fileData?.document_id}`
          )
          .then((res) => {
            setShowDropDown(false)
            setShowFields(false);
            setLines(res.data.TxtResponse);
            setDropDownData(res.data.relatedQuestions);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // const fileExtension=JSON.parse(localStorage.getItem("fileExtension"))
        const fileExtension = ".pdf";
        setLoading(true);
        axios
          .get(
            `https://api.mrezpz.ai/visualize?user_highlight=${value}&documentID=${fileData?.document_id}&orginalFileExtension=${fileExtension}`
          )
          .then((res) => {
            setShowDropDown(false)
            setShowFields(false);
            setLines(res.data.TxtResponse);
            setDropDownData(res.data.relatedQuestions);
            setMermaidCode(convertToMultiLineTemplate(res.data?.mermaidJSCode));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

    if (lines) {
      setThread([
        ...Thread,
        {
          title: activeHighlight,
          aires: lines,
          createDate: Date.now(),
          diagram: mermaidCode ? mermaidCode : "",
        },
      ]);
    }
  };
  const handleChat = (message) => {
    const conversation_id = JSON.parse(localStorage.getItem("conversation_id"));
    if (conversation_id) {
      setLoading(true);
      axios
        .get(
          `https://api.mrezpz.ai/chat?message=${message}&user_highlight=${activeHighlight}&documentID=${fileData?.document_id}&conversation_id=${conversation_id}`
        )
        .then((res) => {
          setShowDropDown(false)
          setShowFields(false);
          setLines(res.data.message);
          localStorage.setItem(
            "conversation_id",
            JSON.stringify(res.data.conversation_id)
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .get(
          `https://api.mrezpz.ai/chat?message=${message}&user_highlight=${activeHighlight}&documentID=${fileData?.document_id}`
        )
        .then((res) => {
    
          setShowDropDown(false)
          setShowFields(false);
          setLines(res.data.message);
          localStorage.setItem(
            "conversation_id",
            JSON.stringify(res.data.conversation_id)
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (lines) {
      setThread([
        ...Thread,
        {
          title: activeHighlight,
          aires: lines,
          createDate: Date.now(),
          diagram: mermaidCode ? mermaidCode : "",
        },
      ]);
    }
  };
  useEffect(() => {
    if (activeHighlight) {
      const conversation_id = JSON.parse(
        localStorage.getItem("conversation_id")
      );
      if (conversation_id) {
        localStorage.removeItem(conversation_id);
      }
    }
  }, [setActiveHighlight]);
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
    axios
      .get("https://api.mrezpz.ai/mocked/summary?documentID=312")
      .then((res) => {
        console.log(res);
        setSummeryData(res.data.summaryResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // Add the scroll event listener when the component mounts
    messageContainerRef.current?.addEventListener("scroll", handleScroll);
    // Function to check if the child is in the center of the parent
    const checkCentered = () => {
      // ... (same as the previous example)
    };

    // Attach the event listener to check for centering when the window is resized
    window.addEventListener("resize", checkCentered);

    // Initial check on mount
    checkCentered();

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkCentered);
      messageContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (lines) {
      setTimeout(() => {
        setShowFields(true);
      }, 10000);
    }
    scrollToBottom()
    setTypingKey((prevKey) => prevKey + 1);
  }, [lines]);
  console.log(lines);
  console.log(fileData);
  const [fontScale, setFontScale] = useState(1.0);
  const [highlighterKey, setHighlighterKey] = useState(Date.now());

  const handleZoomOut = () => {
    setFontScale((prevFontScale) => prevFontScale - 0.5);
    setHighlighterKey(Date.now());
  };

  const handleZoomIn = () => {
    setFontScale((prevFontScale) => prevFontScale + 0.5);
    setHighlighterKey(Date.now());
  };
  useEffect(() => {
    scrollToBottom();
  }, [showDropDown, lines,Thread]);

  return (
    <div className={styles.main_div} id="slider-container">
      <div
        className={styles.slider}
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.handle} />
      </div>
      <div className={styles.sections_container}>
        <div
          className={
            isSmallScreen ? styles.first_section_small : styles.first_section
          }
          style={{ width: isSmallScreen ? "100%" : `${position}%` }}
        >
          <PDFsection
            fileData={fileData}
            isSmallScreen={isSmallScreen}
            UpdateFileTitle={UpdateFileTitle}
            handleTechAndDiagram={handleTechAndDiagram}
            lines={lines}
            dropDownData={dropDownData}
            summeryData={summeryData}
            mermaidCode={mermaidCode}
            Thread={Thread}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            fontScale={fontScale}
            highlighterKey={highlighterKey}
            position={position}
            handleChat={handleChat}
            loading={loading}
            typingKey={typingKey}
          />
        </div>
        {isSmallScreen ? null : (
          <>
            {/* <Reveal effect="fadeIn"> */}
            <div
              className={styles.second_section}
              style={{
                width: `${100 - position}%`, // Adjust the width based on the slider position
                background: bgColor,
              }}
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
                  {loading ? (
                    <div className={styles.loadingstate}><img src={myGif} alt="Fire Gif" width="40%" /><p style={{fontSize:"22px"}}>Ai is loading...</p></div>
                  ) : (
                    <>
                      {Thread?.map((data, index) => (
                        <div className={styles.childDiv} key={index}>
                          <div style={{height:"100%"}}>
                            <p style={{ textAlign: `${textAlign}` }}>
                              {index + 1}: <b>{data?.title}</b>
                            </p>
                            {data?.diagram ? (
                              <div className={styles.mermaidData}>
                                <MermaidDiagram
                                  diagramDefinition={data.diagram}
                                />
                              </div>
                            ) : null}
                            <p>{data?.aires}</p>
                          </div>
                        </div>
                      ))}
                      {lines ? (
                        <div className={styles.childDiv}>
                          <div className={styles.mermaidData}>
                            {mermaidCode ? (
                              <MermaidDiagram diagramDefinition={mermaidCode} />
                            ) : null}
                          </div>
                          <div className={styles.fade_in_paragraph}>
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
                              onBlur={(e) => {
                                handleChat(e.target.value);
                              }}
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
                                  <p
                                    key={key}
                                    className={styles.dropdownItem}
                                    onClick={(e) => {
                                      handleChat(val);
                                    }}
                                  >
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
                          Document's ready!
                          </p>
                          <p>
                          Highlight any text, and I'll step in to teach.
                          </p>
                        </div>
                      )}
                    </>
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
    </div>
  );
};

export default PDFUploaded;
