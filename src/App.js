import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFile from './components/uploadFile/UploadFile';
import ViewPdf from './components/pdfUploaded/PDFUploaded';
import Index from './components/LandingPage/Index';


function App() {
 
  return (
   <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Index/> } />
        <Route exact path="/uploadFile" element={<UploadFile />} />
        <Route path="/viewPdf" element={<ViewPdf/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
