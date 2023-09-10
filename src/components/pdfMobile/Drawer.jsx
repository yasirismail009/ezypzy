import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Typist from "react-typist";
import { Reveal } from "react-reveal";
import styles from "./PDFMobile.module.css";
import MermaidChatMessage from "../pdfUploaded/Mermaid";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "../pdfUploaded/Modal";
import { Mermaid } from "mdx-mermaid/Mermaid";
import { SwipeableDrawer } from "@mui/material";
import Slide from "react-reveal/Slide";
import myGif from "../../assets/gif_data.gif";
import { RotatingLines } from "react-loader-spinner";

const drawerBleeding = 56;

export default function TemporaryDrawer({
  toggleDrawer1,
  bottom,
  searchHighlight,
  lines,
  dropDownData,
  mermaidCode,
  Thread,
  trackerView,
  highlights,
  handleChat,
  loading,
  updateHash,
  setSearchHighlight,
  chatLoading,
  askedQuestion,
  TypingTextState,
  setTypingTextState,
  handleOpenModal,
  openModal,
  handleCloseModal,
  modalMermaidCode,
  setBgColor,
  bgColor,
  handleSearch,
  handleTechAndDiagram,
  addHighlight
}) {
  // const mobileparagraphRef = useRef();
  const mobileContainerRef = useRef();

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [zoomOutLevel, setZoomOutLevel] = useState(0);
  const [typingKey, setTypingKey] = useState(0);
  const [showFields, setShowFields] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [initialY, setInitialYY] = useState(0);
  const [historY, setHistorY] = useState(0);
  const [oldsearchHistory, setOldsearchHistory] = useState(0);
  const [newsearchHistory, setnewsearchHistory] = useState(0);
  const typistRef = useRef(null);
  console.log(scrollY)
  console.log(initialY)
  const handleScroll = () => {
    if (mobileContainerRef.current) {
      setScrollY(mobileContainerRef.current.scrollTop);
    }
  };

  // Attach scroll event listener on mount
  useEffect(() => {
    if (mobileContainerRef.current) {
      mobileContainerRef.current.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener on unmount
    return () => {
      if (mobileContainerRef.current) {
        mobileContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lines]);
  useEffect(()=>{
    if(historY===0 && scrollY>50){
      setInitialYY(scrollY-150)
      setHistorY(scrollY)
    } else{
      if(scrollY>historY && historY!==0){
        setInitialYY(scrollY-150)
        setHistorY(scrollY)
      }
    }
  },[scrollY])
  useEffect(() => {
    if (typistRef.current) {
      const typistNode = typistRef.current;
      const observer = new MutationObserver(() => {
        typistNode.scrollTop = typistNode.scrollHeight;
      });
      observer.observe(typistNode, { childList: true });

      return () => observer.disconnect();
    }
  }, []);

  const scrollToBottom2 = () => {
    console.log("call")
    if (mobileContainerRef.current) {
      const { scrollHeight, clientHeight } = mobileContainerRef.current;
      mobileContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom2();
  }, []);
  const handleTypingDone = async () => {
    setShowFields(true);
    scrollToBottom2();
  };
  useEffect(() => {
    scrollToBottom2();
  }, [showDropDown, bottom]);

  const [showData, setShowData] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

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
  }, [showDropDown, lines, Thread]);
  useEffect(() => {
    setShowFields(false);
    scrollToBottom2();
    setTypingKey((prevKey) => prevKey + 1);
  }, [lines]);
  const handleLinedChange = async (line) => {
    console.log("Line typed:", line);
    scrollToBottom2();
  };
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"bottom"}
          open={bottom}
          onClose={toggleDrawer1("bottom", false)}
          onOpen={toggleDrawer1(
            "bottom",
            true,
            "tracker",
            handleTechAndDiagram,
            searchHighlight,
            handleSearch
          )}
          sx={{
            zIndex: "999999999999",
          }}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div>
            <Puller />
          </div>

          <div
            className={styles.second_section_text}
            style={{ background: bgColor }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
              }}
            >
              <div className={styles.menuIcon}>
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
                        localStorage.setItem(
                          "themeColor",
                          "var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"
                        );
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
                        localStorage.setItem("themeColor", "#FFF");
                      }}
                      className={styles.dot}
                      style={{ background: "#FFF" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#E2FAD7");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor", "#E2FAD7");
                      }}
                      className={styles.dot}
                      style={{ background: "#E2FAD7" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#FDF2E0");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor", "#FDF2E0");
                      }}
                      className={styles.dot}
                      style={{ background: "#FDF2E0" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("#EFEFEF");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor", "#EFEFEF");
                      }}
                      className={styles.dot}
                      style={{ background: "#EFEFEF" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("var(--aibg-4, #ECFAFF)");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor", "#ECFAFF");
                      }}
                      className={styles.dot}
                      style={{ background: "var(--aibg-4, #ECFAFF)" }}
                    ></div>
                    <div
                      onClick={(e) => {
                        setBgColor("var(--aibg-5, #F3F1FA)");
                        setShowTheme(!showTheme);
                        localStorage.setItem("themeColor", "#F3F1FA");
                      }}
                      className={styles.dot}
                      style={{ background: "var(--aibg-5, #F3F1FA)" }}
                    ></div>
                  </>
                ) : null}
              </div>
            </div>
            {searchHighlight != oldsearchHistory ? (
              <div
                ref={mobileContainerRef}
                className={styles.scrollView}
                style={{
                  transform: scrollY < initialY ? `scale(0.8)` : `scale(1)`,
                  transition: "transform 2s",
                  transition: "transform 0.2s, opacity 0.2s",
                  height: loading ? "100vh" : "100vh",
                  overflow: "scroll",
                  width: "88%",
                }}
              >
                {loading ? (
                  <div className={styles.loadingstate}>
                    <img src={myGif} alt="Fire Gif" width="20%" />
                    {/* <p style={{ fontSize: "22px" }}>Ai is loading...</p> */}
                  </div>
                ) : (
                  <>
                    {Thread?.map((data, index) => (
                      <div className={styles.childDiv} key={index}>
                        <div style={{ height: "100%" }}>
                          <p
                            className={styles.question}
                            style={{ textAlign: "end" }}
                          >
                            {data?.title}
                          </p>
                          {data?.diagram ? (
                            <div
                              className={styles.mermaidData}
                              onClick={(e) => handleOpenModal(data.diagram)}
                            >
                              <MermaidChatMessage
                                key={data?.diagram}
                                diagramDefinition={data?.diagram}
                              />
                            </div>
                          ) : null}
                          <p className={styles.typing}>{data?.aires}</p>
                        </div>
                      </div>
                    ))}
                    {lines || searchHighlight ? (
                      <div className={styles.childDivTypist}>
                        {mermaidCode ? (
                          <div
                            className={styles.mermaidData}
                            onClick={(e) => handleOpenModal(mermaidCode)}
                          >
                            <Mermaid chart={mermaidCode} />
                          </div>
                        ) : null}
                        <Slide bottom>
                          <>
                            <p
                              className={styles.question}
                              style={{
                                display: chatLoading ? "none" : "block",
                              }}
                            >
                              {askedQuestion}
                            </p>
                            {chatLoading ? (
                              <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                visible={true}
                              />
                            ) : null}
                          </>
                        </Slide>
                        <div className={styles.fade_in_paragraph}>
                        {searchHighlight?<p className={styles.typing}>{lines}</p>: <span className={styles.fade_in_line} ref={typistRef}>
                              <Typist
                                key={typingKey}

                                avgTypingDelay={5}
                                onCharacterTyped={handleLinedChange}
                                cursor={{ hideWhenDone: true }}
                                className={styles.typing}
                                onTypingDone={handleTypingDone}
                              >
                                {lines}
                              </Typist>
                            <br />
                          </span>}
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
                              if (event.key === "Enter") {
                                handleChat(TypingTextState);
                                setTypingTextState("");
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
                          >
                            <span
                              className={styles.dropDown}
                              onClick={(e) => {
                                setShowDropDown(!showDropDown);
                              }}
                            >
                              Topics you may want to explore
                            </span>
                            <span
                              onClick={(e) => {
                                setShowDropDown(!showDropDown);
                              }}
                            >
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
                    ) : Thread.length === 0 ? (
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
                            src={myGif}
                            className={styles.gif_container_gif}
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            ) : trackerView ? (
              <div style={{ marginTop: "30px", width: "100%" }}>
                <h5 className={styles.tracker_title}>Tracker</h5>
                {highlights.map((val, key) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 14px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.26)",
                      borderBlockEndStyle: "dashed",
                    }}
                    key={key}
                    onClick={(e) => {
                      updateHash(val, setSearchHighlight);
                      setShowData(true);
                    }}
                  >
                    <p className={styles.tracker_highlights}>
                      {key + 1} &nbsp;{" "}
                      {val.content.text.length > 30
                        ? val.content.text.slice(0, 30) + "..."
                        : val.content.text}
                    </p>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.02112 4.77148L10.3024 8.05273C10.3903 8.14062 10.4489 8.25781 10.4489 8.375C10.4489 8.52148 10.3903 8.63867 10.3024 8.72656L7.02112 12.0078C6.84534 12.1836 6.52307 12.1836 6.34729 12.0078C6.17151 11.832 6.17151 11.5098 6.34729 11.334L9.30628 8.375L6.34729 5.44531C6.17151 5.26953 6.17151 4.94727 6.34729 4.77148C6.52307 4.5957 6.84534 4.5957 7.02112 4.77148ZM7.63635 0.875C11.7672 0.875 15.1364 4.24414 15.1364 8.375C15.1364 12.5352 11.7672 15.875 7.63635 15.875C3.4762 15.875 0.136354 12.5352 0.136354 8.375C0.136354 4.24414 3.4762 0.875 7.63635 0.875ZM7.63635 14.9375C11.2399 14.9375 14.1989 12.0078 14.1989 8.375C14.1989 4.77148 11.2399 1.8125 7.63635 1.8125C4.00354 1.8125 1.07385 4.77148 1.07385 8.375C1.07385 12.0078 4.00354 14.9375 7.63635 14.9375Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={mobileContainerRef}
                className={styles.scrollView}
                style={{
                  transform: scrollY < initialY ? `scale(0.8)` : `scale(1)`,
                  transition: "transform 2s",
                  transition: "transform 0.2s, opacity 0.2s",
                  height: loading ? "100vh" : "98vh",
                  overflow: "scroll",
                  width: "88%",
                }}
              >
                {loading ? (
                  <div className={styles.loadingstate}>
                    <img src={myGif} alt="Fire Gif" width="20%" />
                    {/* <p style={{ fontSize: "22px" }}>Ai is loading...</p> */}
                  </div>
                ) : (
                  <>
                    {Thread?.map((data, index) => (
                      <div className={styles.childDiv} key={index}>
                        <div style={{ height: "100%" }}>
                          <p
                            className={styles.question}
                            style={{ textAlign: "end" }}
                          >
                            {data?.title}
                          </p>
                          {data?.diagram ? (
                            <div
                              className={styles.mermaidData}
                              onClick={(e) => handleOpenModal(data.diagram)}
                            >
                              <MermaidChatMessage
                                key={data?.diagram}
                                diagramDefinition={data?.diagram}
                              />
                            </div>
                          ) : null}
                          <p className={styles.typing}>{data?.aires}</p>
                        </div>
                      </div>
                    ))}
                    {lines || searchHighlight ? (
                      <div className={styles.childDivTypist}>
                        {mermaidCode ? (
                          <div
                            className={styles.mermaidData}
                            onClick={(e) => handleOpenModal(mermaidCode)}
                          >
                            <Mermaid chart={mermaidCode} />
                          </div>
                        ) : null}

                        <Slide bottom>
                        <>
                            <p
                              className={styles.question}
                              style={{
                                display: chatLoading ? "none" : "block",
                              }}
                            >
                              {askedQuestion}
                            </p>
                            {chatLoading ? (
                              <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                visible={true}
                              />
                            ) : null}
                          </>
                        </Slide>
                        <div className={styles.fade_in_paragraph}>
                          <span className={styles.fade_in_line}>
                              <Typist
                                key={typingKey}
                                avgTypingDelay={5}
                                onCharacterTyped={handleLinedChange}
                                cursor={{ hideWhenDone: true }}
                                className={styles.typing}
                                onTypingDone={handleTypingDone}
                              >
                                {lines}
                              </Typist>
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
                              if (event.key === "Enter") {
                                handleChat(TypingTextState);
                                setTypingTextState("");
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
                              Topics you may want to explore{" "}
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
                    ) : Thread.length === 0 ? (
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
                            src={myGif}
                            className={styles.gif_container_gif}
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            )}
          </div>
          <Modal
            open={openModal}
            handleClose={handleCloseModal}
            handleOpen={handleOpenModal}
            mermaidCode={modalMermaidCode}
          />
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
