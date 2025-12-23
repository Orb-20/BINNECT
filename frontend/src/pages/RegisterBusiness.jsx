import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import Navbar from "../components/Navbar";

function RegisterBusiness() {
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    city: "",
    state: "",
    servicesOffered: "",
    servicesRequired: "",
    pricingRange: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/business/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            businessName: formData.businessName,
            industry: formData.industry,
            location: {
              city: formData.city,
              state: formData.state,
            },
            servicesOffered: formData.servicesOffered
              .split(",")
              .map((s) => s.trim()),
            servicesRequired: formData.servicesRequired
              .split(",")
              .map((s) => s.trim()),
            pricingRange: formData.pricingRange,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Business registered successfully!");
        setFormData({
          businessName: "",
          industry: "",
          city: "",
          state: "",
          servicesOffered: "",
          servicesRequired: "",
          pricingRange: "",
        });
      } else {
        alert(data.message || "Failed to register business");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Register Your Business</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <br /><br />

          <input
            name="servicesOffered"
            placeholder="Services Offered (comma separated)"
            value={formData.servicesOffered}
            onChange={handleChange}
          />
          <br /><br />

          <input
            name="servicesRequired"
            placeholder="Services Required (comma separated)"
            value={formData.servicesRequired}
            onChange={handleChange}
          />
          <br /><br />

          <input
            name="pricingRange"
            placeholder="Pricing Range"
            value={formData.pricingRange}
            onChange={handleChange}
          />
          <br /><br />

          <button type="submit">Register Business</button>
        </form>
      </div>
    </>
  );
}

export default RegisterBusiness;
