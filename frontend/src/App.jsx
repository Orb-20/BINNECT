import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterBusiness from "./pages/RegisterBusiness";
import SearchBusiness from "./pages/SearchBusiness";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Home */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected Register Business */}
        <Route
          path="/RegisterBusiness"
          element={
            <ProtectedRoute>
              <RegisterBusiness />
            </ProtectedRoute>
          }
        />
        <Route
  path="/search"
  element={
    <ProtectedRoute>
      <SearchBusiness />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
