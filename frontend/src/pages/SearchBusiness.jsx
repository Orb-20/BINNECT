import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import Navbar from "../components/Navbar";

function SearchBusiness() {
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!service || !city) {
      alert("Please enter service and city");
      return;
    }

    try {
      setLoading(true);
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        `http://localhost:5000/api/business/search?service=${service}&city=${city}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data.businesses);
      } else {
        alert(data.message || "Search failed");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Search Businesses</h2>

        <form onSubmit={handleSearch}>
          <input
            placeholder="Service (e.g. Sugarcane Supplier)"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="City (e.g. Pune)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br /><br />

          <button type="submit">Search</button>
        </form>

        <br />

        {loading && <p>Searching...</p>}

        {results.length > 0 && (
          <div>
            <h3>Results</h3>
            {results.map((biz) => (
              <div
                key={biz._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "10px",
                }}
              >
                <h4>{biz.businessName}</h4>
                <p><strong>Industry:</strong> {biz.industry}</p>
                <p>
                  <strong>Location:</strong>{" "}
                  {biz.location.city}, {biz.location.state}
                </p>
                <p>
                  <strong>Services Offered:</strong>{" "}
                  {biz.servicesOffered.join(", ")}
                </p>
                <p>
                  <strong>Pricing:</strong> {biz.pricingRange || "Not specified"}
                </p>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !loading && (
          <p>No businesses found.</p>
        )}
      </div>
    </>
  );
}

export default SearchBusiness;
