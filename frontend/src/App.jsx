import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterBusiness from "./pages/RegisterBusiness";
import SearchBusiness from "./pages/SearchBusiness";
import ProtectedRoute from "./components/ProtectedRoute";
import './index.css';

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
            style: {
                background: '#1C1E23',
                color: '#fff',
                border: '1px solid #2D2A5F'
            },
            success: {
                iconTheme: {
                    primary: '#7FA89C',
                    secondary: '#fff',
                },
            },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={
          <ProtectedRoute>
            <RegisterBusiness />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchBusiness />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;