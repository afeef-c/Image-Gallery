import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import './App.css'
import Register from './components/Register'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import ImageGallery from './components/ImageGallery';
import ImageReorder from './components/sample';
import ResetPassword from './components/ResetPassword';
import ImageUpload from './components/ImageUpload';


function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} >
            <Route path="/image-gallery" element={<ImageGallery />} />
            <Route path="/image-reorder" element={<ImageReorder />} />
            <Route path="/add-image" element={<ImageUpload />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
              

        </Routes>
      </Router>
      <ToastContainer />
    </>
    
  )
}

export default App
