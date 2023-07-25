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
  import chalkboarduser from "../../assets/chalkboard-user.png";
  import penswirl from "../../assets/pen-swirl.png";
  import rectangle from "../../assets/rectangle-vertical-history.png";
  import {Drawer, Menu, MenuItem, SwipeableDrawer} from '@mui/material';
  import teach from "../../assets/chalkboard-user.png";
import draw from "../../assets/pen-swirl.png";
import tracker from "../../assets/rectangle-vertical-history.png";
import character from "../../assets/ezpz.png";
  
  
  import styles from "../pdfUploaded/PDFUploaded.module.css";
  import mobilestyles from "../pdfMobile/PDFMobile.module.css";
  
  
  
  const getNextId = () => String(Math.random()).slice(2);
  
  const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);
  
  const resetHash = () => {
    document.location.hash = "";
  };
  
const HighlightPopup = ({
  comment,
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;



  
  const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
  const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";
  
  const searchParams = new URLSearchParams(document.location.search);
  
  const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;
  
  class PDFsection extends Component {
    constructor(props) {
      super(props);
  
    this.pdfHighlighterRef = createRef();
    this.state = {
      url: initialUrl,
      highlights:  [],
      showSummary:false,
      anchorEl:null,
      bottom: false,
      fontScale:0.8,
      highlighterKey:Date.now(),
      isSmallScreen: window.innerWidth <= 768,
      showTeachText: false,
      showDiagramText: false,
      showTrackerText: false,
    };
  }
  
  toggleDrawer1 = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
  handleResize() {
    this.setState({ isSmallScreen: window.innerWidth <= 768 , fontScale: 0.8149845435488103 , highlighterKey:Date.now()}); // Adjust the width threshold as needed
  }

  componentDidMount() {
    // Initial check
    this.handleResize();

    // Event listener for window resize
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    // Cleanup the event listener when the component is unmounted
    window.removeEventListener('resize', this.handleResize);
  }
    componentDidUpdate(prevProps, prevState) {
      // Log the state after a state or prop update
      console.log('Current state after update:', this.state.highlights);
    }
    updateHash = highlight => {
      document.location.hash = `highlight-${highlight.id}`;
      this.handleMenuClose()
    };
    resetHighlights = () => {
      this.setState({
        highlights: [],
      });
    };
    handleMenuOpen = (event) => {
      this.setState({
        anchorEl: event.currentTarget,
      });
    };
  
    handleMenuClose = () => {
      this.setState({
        anchorEl: null,
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
      window.addEventListener(
        "hashchange",
        this.scrollToHighlightFromHash,
        false
      );
    }
  
    getHighlightById(id) {
      const { highlights } = this.state;
  
      return highlights.find((highlight) => highlight.id === id);
    }
  
    addHighlight(highlight) {
      const { highlights } = this.state;
      
      console.log("Saving highlight", highlight);
  
      this.setState({
        highlights: [{ ...highlight, id: getNextId() }, ...highlights],
      });
    }
    handleZoomOut = () => {
      const { fontScale } = this.state;
      this.setState((prevState) => ({
        fontScale: prevState.fontScale - 0.5,
        highlighterKey:Date.now()
      }));
    };
    handleZoomIn = () => {
      const { fontScale } = this.state;
      this.setState((prevState) => ({
        fontScale: prevState.fontScale + 0.5,
        highlighterKey:Date.now()
      }));
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
      const { url, highlights,showSummary, fontScale, highlighterKey,
        pdfHighlighterRef,anchorEl,isSmallScreen,showTeachText, showDiagramText, showTrackerText } = this.state;
  
      return (
        <>
        {isSmallScreen? (<div className={mobilestyles.main_div}>
      <div className={mobilestyles.header}>
        <p className={mobilestyles.heading}>Diversity13812.</p>
        <div className={mobilestyles.summary_edit_section}>
          <button  onClick={this.handleToggleSummary}>Summary</button>
          <div className={mobilestyles.edit_section}>
            <div className={mobilestyles.highlighter}>
              <img src={highlighticon} />
            </div>
            <div className={mobilestyles.text_edit_section}>
              <p className={mobilestyles.small_A} onClick={this.handleZoomOut} >A</p>
              <p style={{ margin: 0}}>|</p>
              <p className={mobilestyles.capital_A} onClick={this.handleZoomIn} >A</p>
            </div>
          </div>
        </div>
        <div className={mobilestyles.summary_section} style={{display:showSummary?"block":"none"}}>
          <p className={mobilestyles.summary_heading}>Summary</p>
          <p>
            This document outlines the critical role of sustainable energy
            technologies in fostering a greener future. It examines the current
            energy landscape, identifies key challenges, and presents innovative
            solutions to address them.
          </p>
          <button>Hide</button>
        </div>
      </div>
        <div className={mobilestyles.bottomMenu}>
        <div className={mobilestyles.submenu}>
        <div className={mobilestyles.footer_icons}>
          <div className={mobilestyles.teach_icon} onClick={this.toggleDrawer1("bottom", true)}>
            <img src={teach} />
            <p>Teach</p>
          </div>
          <div className={mobilestyles.draw_icon}>
            <img src={draw} />
            <p>Draw</p>
          </div>
          <div className={mobilestyles.tracker_icon} onClick={this.handleMenuOpen}>
            <img src={tracker} />
            <p>Tracker</p>
          </div>
        </div>
              {/* <img className={mobilestyles.character_img} src={character} /> */}
        </div>
        </div>
        <div className={mobilestyles.distortion}></div>
      <div className={mobilestyles.footer}>
        <div
         style={{
           height: showSummary?"55vh":"80vh",
           width: "100%",
           position: "relative",
         }}
       >
      <PdfLoader url={url} ref={pdfHighlighterRef} key={highlighterKey}>
  {(pdfDocument) => (
    <PdfHighlighter
      pdfDocument={pdfDocument}
      enableAreaSelection={(event) => event.altKey}
      onScrollChange={resetHash}
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
        this.addHighlight({ content, position, comment: '' });
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
          />
        ) : (
          <AreaHighlight
            isScrolledTo={isScrolledTo}
            highlight={highlight}
            onChange={(boundingRect) => {
              this.updateHighlight(
                highlight.id,
                { boundingRect: viewportToScaled(boundingRect) },
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
    </div>)
      :
   (   <div>
      <div className={styles.header}>
        <div className={styles.heading_section}>
          <p>Diversity13812.</p>
          <button style={{marginRight:"4px", cursor:"pointer"}} onClick={this.handleToggleSummary}>Summary</button>
        </div>
        <div className={styles.edit_section}>
          <div className={styles.highlight}>
            <img src={highlighticon} alt="Highlight Icon" />
          </div>
          <div className={styles.text_edit}>
            <p className={styles.small_A} onClick={this.handleZoomOut} >
              A
            </p>
            <p className={styles.seperator}>|</p>
            <p className={styles.capital_A}  onClick={this.handleZoomIn}>
              A
            </p>
          </div>
        </div>
      </div>
      <div className={styles.summary_section} style={{display:showSummary?"block":"none"}}>
        <p className={styles.summary_heading}>Summary</p>
        <p className={styles.summary}>
          This document outlines the critical role of sustainable energy
          technologies in fostering a greener future. It examines the current
          energy landscape, identifies key challenges, and presents innovative
          solutions to address them.
        </p>
        <button onClick={this.handleToggleSummary}>Hide</button>
      </div>
      <div className={styles.pdf_section}>
        <div className={styles.pdf_icons}>
          <div className={styles.chalkboard_icon} 
           onMouseEnter={this.handleMouseEnterTeach}
           onMouseLeave={this.handleMouseLeaveTaech}
          >
            <img
              src={chalkboarduser}
              alt="Chalkboard Icon"
            />
            {showTeachText?<p style={{marginLeft:"5px"}}>Teach Me</p>:null}
          </div>
          <div className={styles.penswirl_icon}
            onMouseEnter={this.handleMouseEnterDiagram}
            onMouseLeave={this.handleMouseLeaveDiagram}
          >
            <img
             
              src={penswirl}
              alt="Pen Swirl Icon"
            />
            {showDiagramText?<p style={{marginLeft:"5px"}}>Diagram</p>:null}
          </div>
          <div className={styles.rectangle_icon} onClick={this.handleMenuOpen}
            onMouseEnter={this.handleMouseEnterTracker}
            onMouseLeave={this.handleMouseLeaveTracker}
          >
            <img
             
              src={rectangle}
              alt="Rectangle Icon"
            />
            {showTrackerText?<p style={{marginLeft:"5px"}}>Tracker</p>:null}
          </div>
        </div>
        <div className="App" style={{ display: "flex", height: "100vh" }}>
       
       <div
         style={{
           height: "100vh",
           width: "48vw",
           position: "relative",
         }}
       >
      <PdfLoader url={url} ref={pdfHighlighterRef} key={highlighterKey}>
  {(pdfDocument) => (
    <PdfHighlighter
      pdfDocument={pdfDocument}
      enableAreaSelection={(event) => event.altKey}
      onScrollChange={resetHash}
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
        this.addHighlight({ content, position, comment: '' });
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
          />
        ) : (
          <AreaHighlight
            isScrolledTo={isScrolledTo}
            highlight={highlight}
            onChange={(boundingRect) => {
              this.updateHighlight(
                highlight.id,
                { boundingRect: viewportToScaled(boundingRect) },
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
   
    </div>  )
      }
          
      <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={this.handleMenuClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className={styles.menu}
    >
      {highlights.map((val, key)=>(
       <MenuItem key={key} className={styles.menu_item_custom}  onClick={() => this.updateHash(val)} >{val.content.text.length > 15 ? val.content.text.slice(0, 15) + '...' : val.content.text}</MenuItem>
      ))}
     
      {/* Add more menu items as needed */}
    </Menu>
    <SwipeableDrawer
    sx={{height:"80vh", zIndex:9999999}}
              anchor={"bottom"}
              open={this.state["bottom"]}
              onClose={this.toggleDrawer1("bottom", false)}
              onOpen={this.toggleDrawer1("bottom", true)}
            >
              <p>Texting</p>
            </SwipeableDrawer>
      </>
      );
    }
  }
  
  
  export default PDFsection;
  