// import React, { useEffect, useState } from "react";
// import styles from "../pdfUploaded/PDFUploaded.module.css";
// import highlighticon from "../../assets/highlight_icon.png";
// import chalkboarduser from "../../assets/chalkboard-user.png";
// import penswirl from "../../assets/pen-swirl.png";
// import rectangle from "../../assets/rectangle-vertical-history.png";
// import {
//   PdfLoader,
//   PdfHighlighter,
//   Tip,
//   Highlight,
//   Popup,
//   AreaHighlight,
//   getPDFRawText,
// } from "react-pdf-highlighter";
// import { usePDF } from "@react-pdf/renderer";

// const testHighlights = [
//   {
//     id: "1",
//     position: {
//       boundingRect: { top: 100, left: 100, width: 200, height: 50 },
//     },
//     content: { text: "Highlighted text", image: null },
//     comment: { text: "This is a highlight", emoji: "✨" },
//   },
//   // Add more highlight objects as needed
// ];

// const getNextId = () => String(Math.random()).slice(2);

// const parseIdFromHash = () =>
//   document.location.hash.slice("#highlight-".length);

// const resetHash = () => {
//   document.location.hash = "";
// };

// const HighlightPopup = ({ comment }) =>
//   comment.text ? (
//     <div className="Highlight__popup">
//       {comment.emoji} {comment.text}
//     </div>
//   ) : null;

// const PDFsection = ({ selectedPdf }) => {
//   const [url, setUrl] = useState("https://arxiv.org/pdf/1708.08021.pdf");
//   const [highlights, setHighlights] = useState([]);
//   const [pdfScaleValue, setPdfScaleValue] = useState("1");

//   const resetHighlights = () => {
//     setHighlights([]);
//   };
//   const [zoom, setZoom] = useState(0.76);

//   const handleZoomIn = () => {
//     setZoom((prevZoom) => prevZoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom((prevZoom) => {
//       if (prevZoom > 0.2) {
//         return prevZoom - 0.1;
//       }
//       return prevZoom;
//     });
//   };

//   const scrollViewerTo = (highlight) => {};

//   const scrollToHighlightFromHash = () => {
//     const highlight = getHighlightById(parseIdFromHash());

//     if (highlight) {
//       scrollViewerTo(highlight);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("hashchange", scrollToHighlightFromHash, false);
//     return () => {
//       window.removeEventListener("hashchange", scrollToHighlightFromHash, false);
//     };
//   }, []);

//   const getHighlightById = (id) => {
//     return highlights.find((highlight) => highlight.id === id);
//   };

//   const handleSelectionFinished = (position, content, hideTipAndSelection) => {
//     const highlight = {
//       position,
//       content,
//       comment: { text: "", emoji: "" },
//     };
//     addHighlight(highlight);
//     hideTipAndSelection();
//   };

//   const addHighlight = (highlight) => {
//     setHighlights((prevHighlights) => [
//       { ...highlight, id: getNextId() },
//       ...prevHighlights,
//     ]);
//   };

//   const updateHighlight = (highlightId, position, content) => {
//     setHighlights((prevHighlights) =>
//       prevHighlights.map((h) => {
//         if (h.id === highlightId) {
//           return {
//             ...h,
//             position: { ...h.position, ...position },
//             content: { ...h.content, ...content },
//           };
//         }
//         return h;
//       })
//     );
//   };

//   const CustomPdfHighlighter = ({ pdfDocument, ...otherProps }) => {
//     const [pages, setPages] = useState(1);
//     const { pdf } = usePDF({ file: pdfDocument });

//     useEffect(() => {
//       if (pdf) {
//         setPages(pdf.numPages);
//       }
//     }, [pdf]);

//     if (!pages) {
//       return <div>Highlights Loading...</div>;
//     }

//     return (
//       <PdfHighlighter
//         pdfDocument={pdfDocument}
//         numPages={pages}
//         {...otherProps}
//       />
//     );
//   };

//   return (
//     <div>
//       <div className={styles.header}>
//         <div className={styles.heading_section}>
//           <p>Diversity13812.</p>
//           <button>Summary</button>
//         </div>
//         <div className={styles.edit_section}>
//           <div className={styles.highlight}>
//             <img src={highlighticon} alt="Highlight Icon" />
//           </div>
//           <div className={styles.text_edit}>
//             <p className={styles.small_A} onClick={handleZoomIn}>
//               A
//             </p>
//             <p className={styles.seperator}>|</p>
//             <p className={styles.capital_A} onClick={handleZoomOut}>
//               A
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className={styles.summary_section}>
//         <p className={styles.summary_heading}>Summary</p>
//         <p className={styles.summary}>
//           This document outlines the critical role of sustainable energy
//           technologies in fostering a greener future. It examines the current
//           energy landscape, identifies key challenges, and presents innovative
//           solutions to address them.
//         </p>
//         <button>Hide</button>
//       </div>
//       <div className={styles.pdf_section}>
//         <div className={styles.pdf_icons}>
//           <div className={styles.chalkboard_icon}>
//             <img
//               width="100%"
//               height="100%"
//               src={chalkboarduser}
//               alt="Chalkboard Icon"
//             />
//           </div>
//           <div className={styles.penswirl_icon}>
//             <img
//               width="100%"
//               height="100%"
//               src={penswirl}
//               alt="Pen Swirl Icon"
//             />
//           </div>
//           <div className={styles.rectangle_icon}>
//             <img
//               width="100%"
//               height="100%"
//               src={rectangle}
//               alt="Rectangle Icon"
//             />
//           </div>
//         </div>
//         <div style={{ display: "flex", height: "100vh" }}>
//           <div
//             style={{
//               height: "100vh",
//               width: "48vw",
//               position: "relative",
//               overflow: "scroll",
//             }}
//           >
//             <PdfLoader url={url} beforeLoad={<div>Loading...</div>}>
//               {(pdfDocument) => (
//                 <CustomPdfHighlighter
//                   pdfDocument={pdfDocument}
//                   pdfScaleValue={`${zoom}`}
//                   enableAreaSelection={(event) => event.altKey}
//                   onScrollChange={resetHash}
//                   scrollRef={(scrollTo) => {
//                     scrollViewerTo = scrollTo;
//                     scrollToHighlightFromHash();
//                   }}
//                   onSelectionFinished={handleSelectionFinished}
//                   highlightTransform={(
//                     highlight,
//                     index,
//                     setTip,
//                     hideTip,
//                     viewportToScaled,
//                     screenshot,
//                     isScrolledTo
//                   ) => {
//                     const isTextHighlight = !Boolean(
//                       highlight.content && highlight.content.image
//                     );

//                     const component = isTextHighlight ? (
//                       <Highlight
//                         isScrolledTo={isScrolledTo}
//                         position={highlight.position}
//                         comment={highlight.comment}
//                       />
//                     ) : (
//                       <AreaHighlight
//                         isScrolledTo={isScrolledTo}
//                         highlight={highlight}
//                         onChange={(boundingRect) => {
//                           updateHighlight(
//                             highlight.id,
//                             { boundingRect: viewportToScaled(boundingRect) },
//                             { image: screenshot(boundingRect) }
//                           );
//                         }}
//                       />
//                     );

//                     return (
//                       <Popup
//                         popupContent={<HighlightPopup {...highlight} />}
//                         onMouseOver={(popupContent) =>
//                           setTip(highlight, (highlight) => popupContent)
//                         }
//                         onMouseOut={hideTip}
//                         key={index}
//                       >
//                         {component}
//                       </Popup>
//                     );
//                   }}
//                   highlights={highlights}
//                 />
//               )}
//             </PdfLoader>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { Component } from "react";

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


import styles from "../pdfUploaded/PDFUploaded.module.css";



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
  state = {
    url: initialUrl,
    highlights:  [],
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
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
    const { url, highlights } = this.state;

    return (
      <div>
      <div className={styles.header}>
        <div className={styles.heading_section}>
          <p>Diversity13812.</p>
          <button>Summary</button>
        </div>
        <div className={styles.edit_section}>
          <div className={styles.highlight}>
            <img src={highlighticon} alt="Highlight Icon" />
          </div>
          <div className={styles.text_edit}>
            <p className={styles.small_A} >
              A
            </p>
            <p className={styles.seperator}>|</p>
            <p className={styles.capital_A} >
              A
            </p>
          </div>
        </div>
      </div>
      <div className={styles.summary_section}>
        <p className={styles.summary_heading}>Summary</p>
        <p className={styles.summary}>
          This document outlines the critical role of sustainable energy
          technologies in fostering a greener future. It examines the current
          energy landscape, identifies key challenges, and presents innovative
          solutions to address them.
        </p>
        <button>Hide</button>
      </div>
      <div className={styles.pdf_section}>
        <div className={styles.pdf_icons}>
          <div className={styles.chalkboard_icon}>
            <img
              width="100%"
              height="100%"
              src={chalkboarduser}
              alt="Chalkboard Icon"
            />
          </div>
          <div className={styles.penswirl_icon}>
            <img
              width="100%"
              height="100%"
              src={penswirl}
              alt="Pen Swirl Icon"
            />
          </div>
          <div className={styles.rectangle_icon}>
            <img
              width="100%"
              height="100%"
              src={rectangle}
              alt="Rectangle Icon"
            />
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
         <PdfLoader url={url} >
           {(pdfDocument) => (
             <PdfHighlighter
               pdfDocument={pdfDocument}
               enableAreaSelection={(event) => event.altKey}
               onScrollChange={resetHash}
               // pdfScaleValue="page-width"
               scrollRef={(scrollTo) => {
                 this.scrollViewerTo = scrollTo;

                 this.scrollToHighlightFromHash();
               }}
               onSelectionFinished={(
                 position,
                 content,
                 hideTipAndSelection,
                 transformSelection
               ) => (
                 <Tip
                   onOpen={transformSelection}
                   onConfirm={(comment) => {
                     this.addHighlight({ content, position, comment });

                     hideTipAndSelection();
                   }}
                 />
               )}
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
    </div>
    
    );
  }
}


export default PDFsection;
