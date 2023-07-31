import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typist from 'react-typist';
import { Reveal } from 'react-reveal';
import styles from '../pdfMobile/PDFMobile.module.css'
import MermaidDiagram from '../pdfUploaded/Mermaid';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {CiMenuKebab} from 'react-icons/ci'

export default function TemporaryDrawer({toggleDrawer1,bottom}) {
    const mobileparagraphRef = useRef();
    const mobileContainerRef = useRef();
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
    const [zoomOutLevel, setZoomOutLevel] = useState(0);
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
        mobileparagraphRef.current.style.opacity = 1;
      }
    }, [currentLineIndex, lines.length]);
  
    const scrollToBottom2 = () => {
      setTimeout(()=>{
        if (mobileContainerRef.current) { 
          console.log("calls")
          // Check if mobileContainerRef is not null
          const { scrollHeight, clientHeight } = mobileContainerRef.current;
          setZoomOutLevel(mobileContainerRef.current.scrollTop);
          mobileContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
      },1000)
      
      };
    
      useEffect(() => {
        
        scrollToBottom2();
      }, [showDropDown,bottom]);

 
  const [scrollScale, setScrollScale] = useState(1);
  const [opacityScale, setOpacityScale] = useState(1);
  const [textAlign, setTextAlign] = useState("start");
  
    useEffect(() => {
      // Function to check if the child is in the center of the parent
      const checkCentered = () => {
        // ... (same as the previous example)
      };
  
      // Attach the event listener to check for centering when the window is resized
      window.addEventListener('resize', checkCentered);
  
      // Initial check on mount
      checkCentered();
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', checkCentered);
      };
    }, []);
  
  
    useEffect(() => {
      if (currentLineIndex === lines.length - 1) {
        mobileparagraphRef.current.style.opacity = 1;
      }
    }, [currentLineIndex, lines.length]);
   
    // const scrollTargetRef = useRef(null);
    var fullHeight=0
    setTimeout(()=>{
    fullHeight = mobileContainerRef.current.scrollTop - 150 ; // Check if mobileContainerRef is not null
    },1000)
    const handleScroll = () => {
      setTimeout(()=>{
        if (mobileContainerRef.current) {
          console.log(mobileContainerRef.current.scrollTop);
          const newScale = mobileContainerRef.current.scrollTop < fullHeight ? 0.8 : 1;
          const opacity = mobileContainerRef.current.scrollTop < fullHeight ? 0.6 : 1;
          const alignItem = mobileContainerRef.current.scrollTop < fullHeight ? "end" : "start";
    
          // Update the scroll scale state
          setScrollScale(newScale);
          setOpacityScale(opacity);
          setTextAlign(alignItem);
        }
      }, 1000)
    
  };

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
  }, []);
    useEffect(()=>{

      console.log(bottom)
    },[bottom])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  return (
    <div>
        <React.Fragment >
          <Drawer
            anchor={"bottom"}
            open={bottom}
            onClose={toggleDrawer1("bottom", false)}
    
          >
            <div className={styles.second_section_text}>

            <div className={styles.menuIcon} >
             < CiMenuKebab  onClick={handleClick} />
             </div> 
<div ref={mobileContainerRef}  className={styles.scrollView}  style={{ transform: `scale(${scrollScale})`, transition: 'transform 0.5s',opacity: opacityScale, transition: 'transform 0.2s, opacity 0.2s' }}>
{Thread.map((data, index)=>(
  <div className={styles.childDiv} key={index}>
    <div>
  <p style={{textAlign:`${textAlign}`}}>{index+1}: <b>{data?.title}</b></p>
  {data?.diagram?<div className={styles.mermaidData}><MermaidDiagram diagramDefinition={data.diagram} /></div>:null}
  <p>{data?.aires}</p>
  </div>
 </div>
))}
 

<div className={styles.childDiv}>
<div className={styles.fade_in_paragraph} ref={mobileparagraphRef}>
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
          </Drawer>
        </React.Fragment>
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

      >
          <MenuItem key={"option"}   onClick={toggleDrawer1("bottom", false)}>
          Learn More
          </MenuItem>
      </Menu>
    </div>
  );
}
