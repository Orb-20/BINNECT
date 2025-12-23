import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
      <h3 style={{ display: "inline", marginRight: "20px" }}>BINNECT</h3>

      <Link to="/home" style={{ marginRight: "15px" }}>
        Home
      </Link>
      <Link to="/RegisterBusiness" style={{ marginRight: "15px" }}>
  Register Business
</Link>
<Link to="/search" style={{ marginRight: "15px" }}>
  Search Business
</Link>



      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
