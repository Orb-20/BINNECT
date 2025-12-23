import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h2>Login Page</h2>} />
        <Route path="/home" element={<h2>Home Page</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
