import React, { useEffect, useRef, useState } from "react";
import styles from "./PDFUploaded.module.css";
import character from "../../assets/1-a.png";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineFormatPainter } from "react-icons/ai";
import PDFsection from "../pdfSection/PDFsection";
import Typist from "react-typist";
import EyesCom from "./EyesAnimation";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import MermaidDiagram from './Mermaid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const PDFUploaded = () => {
  const paragraphRef = useRef(null);
  const [lines, setLines] = useState(
    "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun!"
  );
  const [Thread, setThread] = useState([{
    title: "Lorem Ipsum is simply dummy text of the?",
    aires:
      "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun!",
    diagram:"",
      createDate:new Date("2022-07-20")
    },{
    title: "Lorem Ipsum is simply dummy text of the 12?",
    aires:
      "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun! 122",
      diagram:"",
      createDate:new Date("2022-07-21")
    },{
    title: "Lorem Ipsum is simply dummy text of the 12?",
    aires:
      "Consider each highlight a secret handshake between us - a sign from me to step in and lend a hand. But remember, there's no rush, we're here to enjoy the journey as much as the destination.  So take a deepbreath and when you're ready, let's jump in and make learning fun! 122",
      diagram:"",
      createDate:new Date("2022-07-22")
    },{
      title: "Lorem Ipsum is simply dummy text of the 12?",
      aires:
        "",
        diagram:`
        graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
        `,
        createDate:new Date("2022-07-22")
      }]);
    // const sortedThreads = Thread.sort((a, b) => b.createDate - a.createDate);
    
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [bgColor, setBgColor] = useState("var(--aibg-1, rgba(196, 248, 183, 0.30))");
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

  useEffect(() => {
    if (currentLineIndex === lines.length - 1) {
      paragraphRef.current.style.opacity = 1;
    }
  }, [currentLineIndex, lines.length]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
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
  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      const { scrollHeight, clientHeight } = messageContainerRef.current;
      messageContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };
useEffect(()=>{
  scrollToBottom()
},[showDropDown])

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
const [scrollDirection, setScrollDirection] = useState("");

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > scrollYRef.current) {
    console.log("down")
    setScrollDirection("Scroll Down");
  } else {
    setScrollDirection("Scroll Up");
    console.log("up")
  }

  scrollYRef.current = currentScrollY;
};

const scrollYRef = React.useRef(0);

useEffect(() => {
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className={styles.main_div}>
      <div
        className={
          isSmallScreen ? styles.first_section_small : styles.first_section
        }
      >
        <PDFsection />
      </div>
      {isSmallScreen ? null : (
        <>
        <div className={styles.second_section} style={{background:bgColor}}>
          <div className={styles.filters_box}>
            {/* <BsRecordCircle size={15} /> */}
            <AiOutlineFormatPainter size={18} onClick={handleClick}/>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={e=>{setBgColor("var(--aibg-1, rgba(196, 248, 183, 0.30))"); handleClose()}}><div className={styles.dot} style={{backgroundColor:"var(--aibg-1, rgba(196, 248, 183, 0.30))"}}></div></MenuItem>
        <MenuItem onClick={e=>{setBgColor("var(--aibg-4, #ECFAFF)"); handleClose()}}><div className={styles.dot} style={{backgroundColor:"var(--aibg-4, #ECFAFF)"}}></div></MenuItem>
        <MenuItem onClick={e=>{setBgColor("var(--aibg-5, #F3F1FA)"); handleClose()}}><div className={styles.dot} style={{backgroundColor:"var(--aibg-5, #F3F1FA)"}}></div></MenuItem>
      </Menu>
          </div>
          <div className={styles.second_section_text}>
            <div ref={messageContainerRef} className={styles.scrollView}>
            {Thread.map((data, index)=>(
              <div className={styles.childDiv} key={index}>
                <div>
              <p>Q {index+1}: <b>{data?.title}</b></p>
              {data?.diagram?<div className={styles.mermaidData}><MermaidDiagram diagramDefinition={data.diagram} /></div>:null}
              <p>{data?.aires}</p>
              </div>
             </div>
            ))}
             <div>
            </div>
            <div className={styles.childDiv}>
            <div className={styles.fade_in_paragraph} ref={paragraphRef}>
              <span className={styles.fade_in_line}>
                <Typist
                  avgTypingDelay={50}
                  cursor={{ hideWhenDone: true }}
                  onTypingDone={handleTypingDone}
                >
                  {lines}
                </Typist>
                <br />
              </span>
            </div>
            <input
              placeholder="Type here to ask"
              type="text"
              className={styles.inputAi}
              style={{background:bgColor}}
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
                  <MdArrowDropUp style={{ fontSize: "20px", margin: 0 }} />
                ) : (
                  <MdArrowDropDown style={{ fontSize: "20px", margin: 0 }} />
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
            </div>
           
          </div>
        </div>
          <div className={styles.character_img}>
            <EyesCom />
          </div></>
      )}
    </div>
  );
};

export default PDFUploaded;
