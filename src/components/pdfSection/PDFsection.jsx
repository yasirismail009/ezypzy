import React, { Component, createRef, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from "./react-pdf-highlighter";
import highlighticon from "../../assets/highlight_icon.png";
import chalkboarduser from "../../assets/chalkboard-user.svg";
import penswirl from "../../assets/pen-swirl.svg";
import chalkboarduserwhite from "../../assets/chalkboard-user-white.svg";
import penswirlwhite from "../../assets/pen-swirl-white.svg";
import rectangle from "../../assets/rectangle-vertical-history.png";
import Fade from 'react-reveal/Fade';
import {
  Drawer,
  Menu,
  MenuItem,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import teach from "../../assets/chalkboard-user.svg";
import draw from "../../assets/pen-swirl.svg";
import tracker from "../../assets/rectangle-vertical-history.png";
import styles from "../pdfUploaded/PDFUploaded.module.css";
import mobilestyles from "../pdfMobile/PDFMobile.module.css";
import myGif from '../../assets/mobile_menu.png'
import DrawerData from "../pdfMobile/Drawer";
import { RotatingLines } from "react-loader-spinner";

const options = ["None", "Atria"];

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const PRIMARY_PDF_URL =
  "https://pdfezypzy.s3.amazonaws.com/media/documents/Document_Service.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class PDFsection extends Component {
  constructor(props) {
    super(props);
    this.addHighlight = this.addHighlight.bind(this);
    this.pdfHighlighterRef = createRef();
    this.state = {
      url: initialUrl,
      highlights: [],
      showSummary: false,
      anchorEl: null,
      bottom: false,
      bottom2: false,
      highlighterKey: Date.now(),
      showTeachText: false,
      showDiagramText: false,
      showTrackerText: false,
      anchorEl2: null,
      trackerView: false,
      searchKey: "",
    };
  }


  toggleDrawer1 = (anchor, open, type, handleDiagram,searchHighlight,handleSearch) => (event) => {
    console.log(anchor, open);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (type==="teach"|| type==="diagram"){
      this.setState({...this.state, trackerView:false,[anchor]: open })
      handleDiagram(type, searchHighlight===""?this.state.highlights.length>0?  this.state.highlights[0]:"no data":searchHighlight)
    } else if(type==="tracker"){
      this.setState({...this.state, trackerView:true, [anchor]: open })
      if(handleSearch){

        handleSearch()
      }
    } else{
      this.setState({...this.state, trackerView:false, [anchor]: open })

    }
  };  
 
  toggleDrawer2 = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ ...this.state, [anchor]: open });
  };
  handleMouseEnterTeach = () => {
    this.setState({ showTeachText: true });
  };

  handleMouseLeaveTaech = () => {
    this.setState({ showTeachText: false });
  };

  handleMouseEnterDiagram = () => {
    this.setState({ showDiagramText: true });
  };

  handleMouseLeaveDiagram = () => {
    this.setState({ showDiagramText: false });
  };
  handleMouseEnterTracker = () => {
    this.setState({ showTrackerText: true });
  };

  handleMouseLeaveTracker = () => {
    this.setState({ showTrackerText: false });
  };

  componentDidUpdate(prevProps, prevState) {
    // Log the state after a state or prop update
    console.log("Current state after update:", this.state.highlights);
  }

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };
  handleToggleSummary = () => {
    this.setState((prevState) => ({
      showSummary: !prevState.showSummary,
    }));
  };

  toggleDocument = () => {
    const newUrl =
      this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: [],
    });
  };

  scrollViewerTo = (highlight) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    console.log(this.statefontScale)
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }
  updateHash = (highlight, setSearchHighlight) => {
    this.setState({
      highlights: [{...highlight}],
    });
    document.location.hash = `highlight-${highlight.id}`;
    setSearchHighlight(highlight.content.text);
  };
  getHighlightById(id) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  addHighlight(highlight,searchHighlight,setSearchHighlight) {
    // const { highlights } = this.state;
    if(searchHighlight){
      setSearchHighlight("")
    }
    this.setState({
      highlights: [{ ...highlight, id: getNextId() }],
    });

  }

  handleClick = (event) => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl2: null });
  };

  updateHighlight(highlightId, position, content) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    });
  }
  

  render() {
    const {
      url,
      highlights,
      showSummary,
      pdfHighlighterRef,
      anchorEl,
      showTeachText,
      showDiagramText,
      showTrackerText,
      bottom,
      trackerView
    } = this.state;
    const { 
      UpdateFileTitle, 
      fileData, 
      isSmallScreen,
      handleTechAndDiagram,
      summeryData ,
      lines,
      dropDownData,
      mermaidCode,
      Thread,
      handleZoomOut,
      handleZoomIn,
      fontScale,
      highlighterKey,
      position,
      handleChat,
      loading,
      typingKey,
      setSearchHighlight,
      searchHighlight,
      bgColor,
      setBgColor,
      setShowDrawer,
      showDrawer,
      chatLoading,
      askedQuestion,
      TypingTextState,
      setTypingTextState,
      trackerList,
      handleOpenModal,
      openModal,
      handleCloseModal,
      modalMermaidCode,
      handleSearch,
      showFields,
      summryLoading
    } = this.props;
    return (
      <>
        {isSmallScreen ? (
          <div className={mobilestyles.main_div}>
            <div className={mobilestyles.header}>
              <input
                className={mobilestyles.heading}
                defaultValue={
                  fileData?.documentTitle?.length > 15
                    ? fileData?.documentTitle.slice(0, 15) + "..."
                    : fileData?.documentTitle
                }
                onBlur={(e) => {
                  UpdateFileTitle(e.target.value);
                }}
              
              />
              <div className={mobilestyles.summary_edit_section} style={{display: showSummary ? "none" : "flex"}}>
                <button style={{background:"#1d1d1d"}} onClick={this.handleToggleSummary}>Summary</button>
                <div className={mobilestyles.edit_section}>
                  <div className={mobilestyles.highlighter}>
                    <img src={highlighticon} />
                  </div>
                  {/* <div className={mobilestyles.text_edit_section}>
                    <p
                      className={mobilestyles.small_A}
                      onClick={handleZoomOut}
                    >
                      A
                    </p>
                    <p style={{ margin: 0 }}>|</p>
                    <p
                      className={mobilestyles.capital_A}
                      onClick={handleZoomIn}
                    >
                      A
                    </p>
                  </div> */}
                </div>
              </div>
              <Fade>
              <div
                className={mobilestyles.summary_section}
                style={{display: showSummary ? "block" : "none",background:bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"rgba(189, 189, 189, 0.30)":bgColor,
                color:"#1d1d1d"
              }}
              >
                <p className={mobilestyles.summary_heading} style={{paddingTop:"7px"}}>Summary</p>
                {summryLoading?<div> <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                visible={true}
                              /></div>:<p className={mobilestyles.summary_p}>
                {summeryData}
                </p>}
                
                <div className={mobilestyles.hide_parent}>
                <button onClick={this.handleToggleSummary}>Hide</button>
                </div>
              </div>
              </Fade>
            </div>
            <div className={mobilestyles.bottomMenu}>
              <div className={mobilestyles.submenu}>
                <div className={mobilestyles.footer_icons}>
                  <div
                    className={mobilestyles.teach_icon}
                    onClick={this.toggleDrawer1("bottom", true,"teach",handleTechAndDiagram,searchHighlight)}
                  >
                    <img src={teach} />
                    <p>Teach</p>
                  </div>
                  <div
                    className={mobilestyles.draw_icon}
                    onClick={this.toggleDrawer1("bottom", true,"diagram",handleTechAndDiagram,searchHighlight)}
                  >
                    <img src={draw} />
                    <p>Draw</p>
                  </div>
                  <div
                    className={mobilestyles.tracker_icon}
                    onClick={this.toggleDrawer1("bottom", true,"tracker",handleTechAndDiagram,searchHighlight,handleSearch)}
                  >
                    <img src={tracker} />
                    <p>Tracker</p>
                  </div>
                </div>
                  {/* <img src={myGif}/> */}
                {/* <img className={mobilestyles.character_img} src={character} /> */}
              </div>
            </div>
          
            <div className={mobilestyles.footer}>
              <div
              className={mobilestyles.pdf_container}
                style={{
                  height: showSummary ? "67vh" : "79vh",
                  width: "100%",
                  position: "relative",
                }}
              >
                <PdfLoader
                  url={fileData?.documentURL}
                  ref={pdfHighlighterRef}
                  key={highlighterKey}
                  
                  // beforeLoad={<div>loading...</div>}
                >
                  {(pdfDocument) => (
                    <PdfHighlighter
                      pdfDocument={pdfDocument}
                      enableAreaSelection={(event) => event?.altKey}
                      onScrollChange={resetHash}
                      textLayerMode="visible" // Corrected typo
                      pdfScaleValue={String(Math.pow(1.2, fontScale))}
                      scrollRef={(scrollTo) => {
                        this.scrollViewerTo = scrollTo;
                        this.scrollToHighlightFromHash();
                      }}
                      onSelectionFinished={(
                        position,
                        content,
                        hideTipAndSelection,
                        transformSelection
                      ) => {
                        this.addHighlight({ content, position, comment: "" },searchHighlight,setSearchHighlight);
                        hideTipAndSelection();
                        transformSelection();
                      }}
                      highlightTransform={(
                        highlight,
                        index,
                        setTip,
                        hideTip,
                        viewportToScaled,
                        screenshot,
                        isScrolledTo
                      ) => {
                        const isTextHighlight = !Boolean(
                          highlight?.content && highlight?.content.image
                        );

                        const component = isTextHighlight ? (
                          <Highlight
                            isScrolledTo={isScrolledTo}
                            position={highlight.position}
                            comment={highlight.comment}
                           
                          />
                        ) : (
                          <AreaHighlight
                            isScrolledTo={isScrolledTo}
                            highlight={highlight}
                            onChange={(boundingRect) => {
                              this.updateHighlight(
                                highlight.id,
                                {
                                  boundingRect: viewportToScaled(boundingRect),
                                },
                                { image: screenshot(boundingRect) }
                              );
                            }}
                          />
                        );

                        return (
                          <Popup
                            popupContent={<HighlightPopup {...highlight} />}
                            onMouseOver={(popupContent) =>
                              setTip(highlight, (highlight) => popupContent)
                            }
                            onMouseOut={hideTip}
                            key={index}
                            children={component}
                          />
                        );
                      }}
                      highlights={highlights}
                    />
                  )}
                </PdfLoader>
                
              </div>

            </div>
            <DrawerData 
            toggleDrawer1={this.toggleDrawer1} 
            bottom={bottom}
            lines={lines}
            dropDownData={dropDownData}
            summeryData={summeryData}
            mermaidCode={mermaidCode}
            Thread={Thread}
            trackerView={trackerView}
            highlights={trackerList}
            handleChat={handleChat}
            loading={loading}
            typingKey={typingKey}
            updateHash={this.updateHash}
            setSearchHighlight={setSearchHighlight}
            searchHighlight={searchHighlight}
            chatLoading={chatLoading}
            askedQuestion={askedQuestion}
            TypingTextState={TypingTextState}
            setTypingTextState={setTypingTextState}
            handleOpenModal={handleOpenModal}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            modalMermaidCode={modalMermaidCode}
            bgColor={bgColor}
            setBgColor={setBgColor}
            handleSearch={handleSearch}
            handleTechAndDiagram={handleTechAndDiagram}
            addHighlight={this.addHighlight}
             />
 
           {/* \ <div className={mobilestyles.distortion}></div> */}
<SwipeableDrawer
  sx={{ maxHeight: "100vh", zIndex: 9999999 }}
  anchor={"bottom2"}
  open={this.state["bottom2"]}
  onClose={this.toggleDrawer2("bottom2", false)}
  onOpen={this.toggleDrawer2("bottom2", true)}
>
  {highlights?.map((val, key) => (
    <p
      key={key}
      className={styles.menu_item_custom}
      onClick={() => this.updateHash(val)}
    >
      {val?.content.text.length > 15
        ? val.content.text.slice(0, 15) + "..."
        : val.content.text}
    </p>
  ))}
</SwipeableDrawer>
          </div>
        ) : (
          <div>
            <div className={styles.header}>
              <div className={styles.heading_section}>
                <input
                  className={styles.heading}
                  defaultValue={
                    fileData?.documentTitle?.length > 15
                      ? fileData?.documentTitle.slice(0, 15) + "..."
                      : fileData?.documentTitle
                  }
                  onBlur={(e) => {
                    UpdateFileTitle(e.target.value);
                  }}
                />
                <button
                className={styles.summary_btn}
                style={{background:bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"#1d1d1d":bgColor,
                color:bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"#fff":"#1d1d1d",
                display: showSummary ? "none" : "block"
              }}
                  onClick={this.handleToggleSummary}
                >
                  Summary
                </button>
              </div>
               <div className={styles.edit_section}>
                <div className={styles.highlight}>
                  <img src={highlighticon} alt="Highlight Icon" />
                  
                </div>
                {/* <div className={styles.text_edit}>
                  <p className={styles.small_A} onClick={handleZoomOut}>
                    A
                  </p>
                  <p className={styles.seperator}>|</p>
                  <p className={styles.capital_A} onClick={handleZoomIn}>
                    A
                  </p>
                </div> */}
              </div> 
            </div>
            <Fade>
            <div
              className={styles.summary_section}
              style={{display: showSummary ? "block" : "none",background:bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"rgba(189, 189, 189, 0.30)":bgColor,
              color:"#1d1d1d"
            }}
              // style={{  }}
            >
              <p className={styles.summary_heading}>Summary</p>
              {summryLoading?<div> <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                visible={true}
                              /></div>: <p className={styles.summary}>
                              {summeryData}
                             </p>}
             
              <div className={styles.hide_parent}>
              <button onClick={this.handleToggleSummary}>Hide</button>
              </div>
            </div>
            </Fade>
            <div className={styles.pdf_icons}>
                <div
                  className={styles.chalkboard_icon}
                  onMouseEnter={this.handleMouseEnterTeach}
                  onMouseLeave={this.handleMouseLeaveTaech}
                  style={{background:showTeachText?bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"#1d1d1d":bgColor:"transparent",
                  color:bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"#fff":"#1d1d1d"
                }}
                  onClick={()=>{handleTechAndDiagram("teach", searchHighlight===""?highlights.length>0? highlights[0]:"no data":searchHighlight)}}
                >
              
                  <img src={showTeachText? bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?chalkboarduserwhite:chalkboarduser:chalkboarduser} alt="Chalkboard Icon" />
                  {showTeachText ? (
                    <p style={{ marginLeft: "5px" }}>Teach Me</p>
                  ) : null}
                </div>
                <div
                  className={styles.penswirl_icon}
                  onMouseEnter={this.handleMouseEnterDiagram}
                  onMouseLeave={this.handleMouseLeaveDiagram}
                  style={{background:showDiagramText?bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"#1d1d1d":bgColor:"transparent",
                  color:bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?"#fff":"#1d1d1d"
                }}
                  onClick={()=>{handleTechAndDiagram("diagram", searchHighlight===""?highlights.length>0? highlights[0]:"no data":searchHighlight)}}
                >
              
                    <img src={showDiagramText? bgColor==="#FFF" || bgColor==="var(--colors-default-bg, linear-gradient(180deg, #FDA88F 0%, rgba(255, 223, 156, 0.60) 100%))"?penswirlwhite: penswirl:penswirl} alt="Pen Swirl Icon" />
                 
                 
                  {showDiagramText ? (
                    <p style={{ marginLeft: "5px" }}>Draw For Me</p>
                  ) : null}
                </div>
                <div
                  className={styles.rectangle_icon}
                  onClick={e=>{setShowDrawer(!showDrawer)}}
                  onMouseEnter={this.handleMouseEnterTracker}
                  onMouseLeave={this.handleMouseLeaveTracker}
                  style={{minWidth:showDrawer?"297px":"20px",maxWidth:showDrawer?"297px":"20px",  justifyContent:showDrawer?"start":"center",border:showDrawer?"1px solid white":"1px solid #cecece",background:showDrawer?"#ffffff":"transparent", padding:showDrawer?"2px 6px":"10px 6px", boxShadow:showDrawer?"rgba(0, 0, 0, 0.16) 0px 1px 4px":"none"}}
                >
                  <img src={rectangle} alt="Rectangle Icon" />
                  {showDrawer ? (
                    <p className={showDrawer?styles.tracker_text:""} style={{ marginLeft: showDrawer?"30px":"5px", fontWeight:showDrawer?"600":"400"}}>Tracker</p>
                  ) : null}
                  {showDrawer?
                  <div className={styles.drawer}>
                     {trackerList.map((val, key) => (
            <div
             
            >
              <p className={styles.tracker_title} style={{paddingTop:key===0?"40px":"0"}}  key={key}
              onClick={() => this.updateHash(val,setSearchHighlight,searchHighlight)}><span style={{padding:"0px 7px"}}>{key+1} </span> {val?.content.text.length > 32
                ? val.content.text.slice(0, 32) + "..."
                : val.content.text}</p>
            
            </div>
          ))}
                
                   
                  </div>:null}
                  
                </div>
              </div>
            <div className={styles.pdf_section}>
             
              <div className="App" style={{ display: "flex", height: "100%" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${position-5}vw` ,
                    position: "relative",
                  }}
                >
                  <PdfLoader
                    // url={url}
                    url={fileData?.documentURL}
                    ref={pdfHighlighterRef}
                    key={highlighterKey}
                    //  beforeLoad={<div className={styles.loading}><img src={myGif} className={styles.story_gif}/></div>}
                  >
                    {(pdfDocument) => (
                      <PdfHighlighter
                        pdfDocument={pdfDocument}
                        enableAreaSelection={(event) => event.altKey}
                        onScrollChange={resetHash}
                        highlightBackgroundColor= "red"
                        pdfScaleValue={String(Math.pow(1.2, fontScale))}
                        scrollRef={(scrollTo) => {
                          this.scrollViewerTo = scrollTo;
                          this.scrollToHighlightFromHash();
                        }}
                        onSelectionFinished={(
                          position,
                          content,
                          hideTipAndSelection,
                          transformSelection
                        ) => {
                          this.addHighlight({ content, position, comment: "" },searchHighlight, setSearchHighlight);
                          // hideTipAndSelection();
                          transformSelection();
                        }}
                        highlightTransform={(
                          highlight,
                          index,
                          setTip,
                          hideTip,
                          viewportToScaled,
                          screenshot,
                          isScrolledTo
                        ) => {
                          const isTextHighlight = !Boolean(
                            highlight.content && highlight.content.image
                          );
                        
                          const component = isTextHighlight ? (
                            <Highlight
                              isScrolledTo={isScrolledTo}
                              position={highlight.position}
                              comment={highlight.comment}
                              style={{
                                background: 'purple', // Change the color for the latest highlight
                              }}
                            />
                          ) : (
                            <AreaHighlight
                              isScrolledTo={isScrolledTo}
                              highlight={highlight}
                              onChange={(boundingRect) => {
                                this.updateHighlight(
                                  highlight.id,
                                  {
                                    boundingRect:
                                      viewportToScaled(boundingRect),
                                  },
                                  { image: screenshot(boundingRect) }
                                );
                              }}
                            />
                          );

                          return (
                            <Popup
                              popupContent={<HighlightPopup {...highlight} />}
                              onMouseOver={(popupContent) =>
                                setTip(highlight, (highlight) => popupContent)
                              }
                              onMouseOut={hideTip}
                              key={index}
                              children={component}
                            />
                          );
                        }}
                        highlights={highlights}
                      />
                    )}
                  </PdfLoader>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PDFsection;
