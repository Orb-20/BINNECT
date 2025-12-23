import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
      <h3 style={{ display: "inline", marginRight: "20px" }}>BINNECT</h3>

      <Link to="/home" style={{ marginRight: "15px" }}>
        Home
      </Link>

      <Link to="/search" style={{ marginRight: "15px" }}>
        Search
      </Link>

      <Link to="/register-business">
        Register Business
      </Link>
    </nav>
  );
}

export default Navbar;
