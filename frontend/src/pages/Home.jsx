import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Welcome to BINNECT</h2>
        <p>
          Discover better B2B services, register your business, and connect
          directly with other businesses.
        </p>

        <ul>
          <li>✔ Register your business</li>
          <li>✔ Find service providers</li>
          <li>✔ No middlemen</li>
          <li>✔ Transparent & trusted</li>
        </ul>
      </div>
    </>
  );
}

export default Home;
