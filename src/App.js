import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFile from './components/uploadFile/UploadFile';
import ViewPdf from './components/pdfUploaded/PDFUploaded';
import LetsStart from './components/pdfMobile/LetsStart';
import Index from './components/LandingPage/Index';
import Login from './components/LandingPage/Login';


function App() {
 
  return (
   <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Index/> } />
        <Route exact path="/uploadFile" element={<UploadFile />} />
        <Route path="/viewPdf" element={<ViewPdf/>} />
        <Route path="/letstart" element={<LetsStart/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
