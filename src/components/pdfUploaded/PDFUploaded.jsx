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
import axios from "axios";
import myGif from "../../assets/gif_data.gif";
import Modal from "./Modal";
import myGifUpload from "../../assets/EzPz_Upload.svg";
import Slide from 'react-reveal/Slide';

const PDFUploaded = () => {
  const messageContainerRef = useRef(null);
  const [lines, setLines] = useState();
  const [mermaidCode, setMermaidCode] = useState();
  const [Thread, setThread] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [zoomOutLevel, setZoomOutLevel] = useState(0);
  const [fileData, setFileData] = useState();
  const [searchHighlight, setSearchHighlight] = useState("");
  const [bgColor, setBgColor] = useState(
    "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
  );
  const [dropDownData, setDropDownData] = useState([]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setFileData(JSON.parse(localStorage.getItem("doc_data")));
    localStorage.setItem("themeColor","var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))")
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setFontScale(-4);
        setHighlighterKey(1691865075703);
      } else if (window.innerWidth >768  && window.innerWidth <= 1024){
        setFontScale(-3.5);
        setHighlighterKey(1691865075707);
      }else if (window.innerWidth >1024  && window.innerWidth <= 1440){
        setFontScale(-1.3);
        setHighlighterKey(1691865075707);
      }else if (window.innerWidth >1440  && window.innerWidth <= 1920){
        setFontScale(-1);
        setHighlighterKey(1691865075707);
      }else if (window.innerWidth >1920 && window.innerWidth <= 2560){
        setFontScale(1);
        setHighlighterKey(1691865075707);
      }else {
        setFontScale(-1.3);
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
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // You can use 'auto' instead of 'smooth' for instant scrolling
    });
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
  const [showDrawer, setShowDrawer] = useState(false);
  const [textAlign, setTextAlign] = useState("start");
  const [summeryData, setSummeryData] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState("");
  const [modalMermaidCode, setModalMermaidCode] = useState("");
  const [showTheme, setShowTheme] = useState(false);
const [TypingTextState, setTypingTextState]= useState("")
  const [position, setPosition] = useState(50); // Initial position (percentage)
  const [typingKey, setTypingKey] = useState(0);
  const [askedQuestion, setAskedQuestion] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [threadHistory, setThreadHistory] = useState([]);
  const [lastTeachHistory, setLastTeachHistory] = useState({});
  const [lastChatHistory, setLastChatHistory] = useState({});
  const [trackerList, setTrackerList] = useState([]);
  const handleOpenModal = (mermaidCode) => {
    setOpenModal(true);
    setModalMermaidCode(mermaidCode);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleTypingDone = async () => {
     setShowFields(true);
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
    console.log("multiLineTemplate", multiLineTemplate);
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
    setLines('')
    if(trackerList.length===0){
      setTrackerList([value])
    }else{
      setTrackerList([...trackerList,value])
    }
    if(lastTeachHistory?.user_highlight){
      setThread([
        ...Thread,
        {
          main:lastTeachHistory.user_highlight,
          aires: lastTeachHistory.TxtResponse,
          dropDownData:lastTeachHistory.relatedQuestions,
          createDate: Date.now(),
          diagram: lastTeachHistory.mermaidCode ? lastTeachHistory.mermaidCode : "",
        },
      ]);
      setLastTeachHistory({})
    } else if(lastChatHistory?.message){
      setThread([
        ...Thread,
        {
          main:"",
          title:askedQuestion,
          aires: lastChatHistory.message,
          dropDownData:lastChatHistory.relatedQuestions,
          createDate: Date.now(),
          diagram: "",
        },
      ]);
      setLastChatHistory({})
    }
    setAskedQuestion('')
    
    
    if (value !== activeHighlight) {
      setActiveHighlight(value.content.text);
      
    } 
    if (value === "no data") {
      alert("Select Any Line from Pdf");
    } else {
      if (action === "teach") {
        setLoading(true);
        setMermaidCode("")
        axios
          .get(
            `https://api.mrezpz.ai/teachme?user_highlight=${value.content.text}&documentID=${fileData?.document_id}`
          )
          .then((res) => {
            setShowDropDown(false);
            setShowFields(false);
            setLines(res.data.TxtResponse);
            setDropDownData(res.data.relatedQuestions);
            setLastTeachHistory(res.data)
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
            `https://api.mrezpz.ai/visualize?user_highlight=${value.content.text}&documentID=${fileData?.document_id}&orginalFileExtension=${fileExtension}`
          )
          .then((res) => {
            setShowDropDown(false);
            setShowFields(false);
            setLines(res.data.TxtResponse);
            setDropDownData(res.data.relatedQuestions);
            setMermaidCode(res.data?.mermaidJSCode);
            setLastTeachHistory(res.data)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    
    }

  };

  const handleChat = (message) => {
    setLines('')
    if(lastTeachHistory?.user_highlight){
      setThread([
        ...Thread,
        {
          main:lastTeachHistory.user_highlight,
          aires: lastTeachHistory.TxtResponse,
          dropDownData:lastTeachHistory.relatedQuestions,
          createDate: Date.now(),
          diagram: lastTeachHistory.mermaidCode ? lastTeachHistory.mermaidCode : "",
        },
      ]);
      setLastTeachHistory({})
    } else if(lastChatHistory?.message){
      setThread([
        ...Thread,
        {
          main:"",
          title:askedQuestion,
          aires: lastChatHistory.message,
          dropDownData:lastChatHistory.relatedQuestions,
          createDate: Date.now(),
          diagram: "",
        },
      ]);
      setLastChatHistory({})
    }
    setAskedQuestion(message);
    setMermaidCode("")
    const conversation_id = JSON.parse(localStorage.getItem("conversation_id"));
    if (conversation_id) {
      setChatLoading(true)
      axios
        .get(
          `https://api.mrezpz.ai/chat?message=${message}&user_highlight=${activeHighlight}&documentID=${fileData?.document_id}&conversation_id=${conversation_id}`
        )
        .then((res) => {
          setShowDropDown(false);
          setShowFields(false);
          setLines(res.data.message);
          localStorage.setItem(
            "conversation_id",
            JSON.stringify(res.data.conversation_id)
          );
          setDropDownData(res.data.relatedQuestions);
          setLastChatHistory(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setChatLoading(false);
        });
    } else {
      setChatLoading(true)
      axios
        .get(
          `https://api.mrezpz.ai/chat?message=${message}&user_highlight=${activeHighlight}&documentID=${fileData?.document_id}`
        )
        .then((res) => {
          setShowDropDown(false);
          setShowFields(false);
          setLines(res.data.message);
          localStorage.setItem(
            "conversation_id",
            JSON.stringify(res.data.conversation_id)
          );
          setDropDownData(res.data.relatedQuestions);
          setLastChatHistory(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setChatLoading(false);
        });
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
      if(Thread?.length>0){
        setThreadHistory([...threadHistory,Thread])
      }
    }
  }, [activeHighlight]);

  const handleScroll = () => {
    if (messageContainerRef.current) {
      console.log(messageContainerRef.current.scrollTop);
      const newScale =
        messageContainerRef.current.scrollTop < 170 ? 0.8 : 1;
      const opacity =
        messageContainerRef.current.scrollTop < fullHeight ? 1 : 1;
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
      .get(`https://api.mrezpz.ai/summary?documentID=${fileData?.document_id}`)
      .then((res) => {
        console.log(res);
        setSummeryData(res.data.generated_summary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fileData]);
  useEffect(() => {
    // Add the scroll event listener when the component mounts
    messageContainerRef.current?.addEventListener("scroll", handleScroll);
    // Function to check if the child is in the center of the parent

    // Remove the scroll event listener when the component unmounts
    return () => {
      messageContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
    setTypingKey((prevKey) => prevKey + 1);
  }, [lines]);
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
  }, [showDropDown, lines, Thread]);

  useEffect(()=>{
    if(searchHighlight){
      handleTrackedata();
    } else{
      setThread([]);
    }
      
  },[threadHistory])
  useEffect(()=>{
    if(searchHighlight){
    
      if(lastTeachHistory?.user_highlight){
        const tempData = Thread
        tempData.push( {
          main:lastTeachHistory.user_highlight,
          aires: lastTeachHistory.TxtResponse,
          dropDownData:lastTeachHistory.relatedQuestions,
          createDate: Date.now(),
          diagram: lastTeachHistory.mermaidCode ? lastTeachHistory.mermaidCode : "",
        })
        setThreadHistory([...threadHistory, tempData])
        setLastTeachHistory({})
      } else if(lastChatHistory?.message){
      
        const tempData = Thread
        tempData.push( {
          main:"",
          title:askedQuestion,
          aires: lastChatHistory.message,
          dropDownData:lastChatHistory.relatedQuestions,
          createDate: Date.now(),
          diagram: "",
        })
        setThreadHistory([...threadHistory, tempData])
        setLastChatHistory({})
      } else if(threadHistory?.length>0){
        handleTrackedata()
      }
    }
  },[searchHighlight])
  const handleTrackedata=()=>{
    let foundIndex = -1;
    

    for (let i = 0; i < threadHistory.length; i++) {
      const innerArray = threadHistory[i];
      const indexWithMain = innerArray.findIndex(item => item.main === searchHighlight);
      
      if (indexWithMain !== -1) {
        foundIndex = i;
        break;
      }
    }
    if (threadHistory?.length>0){
      
      setThread(threadHistory[foundIndex])
      const len= threadHistory[foundIndex].length
      setLines('')
      setDropDownData(threadHistory[foundIndex][len-1]?.dropDownData)
      setShowFields(true)
      setAskedQuestion('')
      scrollToTop()
    }
 
  }
  console.log(Thread)
  console.log(threadHistory)
  return (
    <div className={styles.main_div} id="slider-container">
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
            setSearchHighlight={setSearchHighlight}
            searchHighlight={searchHighlight}
            bgColor={bgColor}
            setShowDrawer={setShowDrawer}
            showDrawer={showDrawer}
            chatLoading={chatLoading}
            askedQuestion={askedQuestion}
            TypingTextState={TypingTextState}
            setTypingTextState={setTypingTextState}
            trackerList={trackerList}
            handleOpenModal={handleOpenModal}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            modalMermaidCode={modalMermaidCode}
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
                <AiOutlineFormatPainter
                  style={{
                    marginBottom: showTheme ? "18px" : "5px",
                    marginTop: "5px",
                  }}
                  size={18}
                  onClick={(e) => {
                    setShowTheme(!showTheme);
                  }}
                />
                {showTheme ? (
                  <>
                    <div
                      onClick={(e) => {
                        setBgColor(
                          "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
                        );
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))")
                      }}
                      className={styles.dot}
                      style={{
                        background:
                          "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))",
                      }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#FFF");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","#FFF")

                      }}
                      className={styles.dot}
                      style={{ background: "#FFF" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#E2FAD7");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","#E2FAD7")

                      }}
                      className={styles.dot}
                      style={{ background: "#E2FAD7" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#FDF2E0");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","#FDF2E0")
                      }}
                      className={styles.dot}
                      style={{ background: "#FDF2E0" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#EFEFEF");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","#EFEFEF")
                      }}
                      className={styles.dot}
                      style={{ background: "#EFEFEF" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("var(--aibg-4, #ECFAFF)");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","#ECFAFF")
                      }}
                      className={styles.dot}
                      style={{ background: "var(--aibg-4, #ECFAFF)" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("var(--aibg-5, #F3F1FA)");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor","#F3F1FA")
                      }}
                      className={styles.dot}
                      style={{ background: "var(--aibg-5, #F3F1FA)" }}
                    ></div>
                  </>
                ) : null}
              </div>
              <div
                className={styles.second_section_text}
                style={{ marginTop: lines ? "-180px" : "0" }}
              >
                <div
                  ref={messageContainerRef}
                  className={styles.scrollView}
                  style={{
                    transform: `scale(${scrollScale})`,
                    transition: "transform 0.5s",
                    opacity: opacityScale,
                    transition: "transform 0.2s, opacity 0.2s",
                    height: loading ? "100vh" : "90vh",
                  }}
                >
                  {loading ? (
                    <div className={styles.loadingstate}>
                      <img src={myGif} alt="Fire Gif" width="15%" />
                      {/* <p style={{ fontSize: "22px" }}>Ai is loading...</p> */}
                    </div>
                  ) : (
                    <>
                      {Thread?.map((data, index) => (
                        <div className={styles.childDiv} key={index}>
                          <div style={{ height: "100%" }}>
                            <div  style={{width:"100%", display:'flex',justifyContent:'end', alignItems:'end'}}>
                            <p className={styles.question} style={{textAlign:'start', width:"86%"}}>{data?.title}</p>
                            </div>
                            {data?.diagram ? (
                              <div className={styles.mermaidData}>
                                <MermaidDiagram
                                  diagramDefinition={data.diagram}
                                  handleOpenModal={handleOpenModal}
                                />
                              </div>
                            ) : null}
                            <p className={styles.typing}>{data?.aires}</p>
                          </div>
                        </div>
                      ))}
                      {lines || searchHighlight? (
                        <div className={styles.childDivTypist}>
                          <div className={styles.mermaidData}>
                            {mermaidCode ? (
                              <MermaidDiagram
                                diagramDefinition={mermaidCode}
                                handleOpenModal={handleOpenModal}
                              />
                            ) : null}
                          </div>
                          <div className={styles.fade_in_paragraph}>
                          <Slide bottom>
                            <p className={styles.question} style={{display:chatLoading?"none":"block"}}>{askedQuestion}</p>
                            </Slide>
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
                              value={TypingTextState}
                              className={styles.inputAi}
                              style={{ background: "transparent" }}
                              onChange={(e) => {
                                setTypingTextState(e.target.value);
                              }}
                              onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                  handleChat(TypingTextState);
                                  setTypingTextState('');
                                }
                              }}
                            ></input>
                            <div
                              style={{
                                width: "100%",
                                textAlign: "start",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
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
                                    style={{
                                      fontSize: "20px",
                                      marginTop: "10px",
                                    }}
                                  />
                                ) : (
                                  <MdArrowDropDown
                                    style={{
                                      fontSize: "20px",
                                      marginTop: "10px",
                                    }}
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
                      ) : Thread.length===0? (
                        <div className={styles.nodata}>
                          <div className={styles.nodata_text}>
                            <div>
                              <p>Document's ready!</p>
                              <p>
                                Highlight any text, and I'll step in to teach.
                              </p>
                            </div>
                          </div>
                          <div className={styles.gif_container}>
                            <img
                              src={myGifUpload}
                              className={styles.gif_container_gif}
                            />
                          </div>
                        </div>
                      ):null}
                    </>
                  )}
                </div>
              </div>
              <Modal
                open={openModal}
                handleClose={handleCloseModal}
                handleOpen={handleOpenModal}
                mermaidCode={modalMermaidCode}
              />
            </div>
            {/* </Reveal> */}
            <div
              className={styles.character_img}
              style={{ display: lines || Thread.length>0 || threadHistory.length>0 ? "block" : "none" }}
            >
              <EyesCom />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFUploaded;
