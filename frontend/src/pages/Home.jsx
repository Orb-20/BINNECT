import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2>Welcome to BINNECT</h2>
        <p>B2B Discovery Platform</p>

        <ul>
          <li>Recommended Businesses</li>
          <li>Search for Services</li>
          <li>Register Your Business</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
