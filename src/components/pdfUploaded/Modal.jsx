import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MermaidDiagram from "./MermaidModalView";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius:"10px",
  p: 4,
};
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 300,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius:"10px",
  p: 4,
};

export default function BasicModal({open, handleClose, handleOpen,mermaidCode}) {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{zIndex:"999999999999999999999"}}
      >
        <Box sx={isSmallScreen?style2:style}>
<MermaidDiagram width={isSmallScreen?'300px':"600px"} height={isSmallScreen?'300px':"600px"}  diagramDefinition={mermaidCode}/>
        </Box>
      </Modal>
    </div>
  );
}
