import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BusinessRegistration from "./pages/RegisterBusiness";
// ✅ FIX: Import from the correct file name 'SearchBusiness'
import Search from "./pages/SearchBusiness";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();
  
  // Detect if there is a background location defined in the route state.
  // If yes, it means we are showing a modal over that content.
  const background = location.state?.backgroundLocation;

  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { background: '#23204A', color: '#fff' } }} />
      
      {/* Navbar stays on top of everything */}
      <Navbar />

      {/* MAIN ROUTES:
         If 'background' exists, we use THAT location for this Routes block.
         This ensures Home (or wherever we were) stays rendered.
         If no 'background', it behaves normally.
      */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><BusinessRegistration /></ProtectedRoute>} />
        
        {/* These routes handle direct access (e.g., typing /login in browser url bar) where there is no background */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
      </Routes>

      {/* MODAL ROUTES:
         Only render this block if 'background' state exists. 
         These render ON TOP of the main routes above.
      */}
      {background && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      )}

    </AuthProvider>
  );
}

export default App;