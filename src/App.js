import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UploadFile from './components/uploadFile/UploadFile';
import ViewPdf from './components/pdfUploaded/PDFUploaded';
import { useRef, useState } from 'react';
import Index from './components/LandingPage/Index';


function App() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    fileInputRef.current.click();
  };
  const convertToPdf = async (file) => {
    const inputFilePath = file.path || file.buffer;
    const outputFilePath = `path/to/output.pdf`;

    try {
      // await officeToPdf(inputFilePath, outputFilePath);
      console.log("File converted to PDF successfully.");

      // Read the converted PDF file as a Blob
      // const response = await fetch(outputFilePath);
      // const pdfBlob = await response.blob();

      // return pdfBlob;
    } catch (error) {
      console.error("Error converting file to PDF:", error);
      return null;
    }
  };


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file)
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const supportedFormats = ["doc", "docx", "pptx", "ppt", "pdf"];
    if (!supportedFormats.includes(fileExtension)) {
      alert(
        "Unsupported file format. Please upload a doc, docx, ppt, pptx, or pdf file."
      );
      return;
    }

    let convertedPdfBlob;
    if (fileExtension !== "pdf") {
      convertedPdfBlob = await convertToPdf(file);
      if (convertedPdfBlob === null) {
        alert("Error converting file to PDF.");
        return;
      }
    } else {
      // File is already in PDF format
      convertedPdfBlob = file;
    }

    setSelectedPdf(convertedPdfBlob);
    setHighlights([]);
  };

  return (
   <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Index/> } />
        <Route exact path="/uploadFile" element={<UploadFile handleFileUpload={handleFileUpload} handleUpload={handleUpload} fileInputRef={fileInputRef} selectedPdf={selectedPdf}/>} />
        <Route path="/viewPdf" element={<ViewPdf selectedPdf={selectedPdf}/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
