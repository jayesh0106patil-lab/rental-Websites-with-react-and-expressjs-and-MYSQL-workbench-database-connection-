import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    type: ""
  });

  const [rentals, setRentals] = useState([]);

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setRentals(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", form);

      fetchData(); // refresh data

      setForm({
        name: "",
        location: "",
        price: "",
        type: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark navbar-glass fixed-top">
        <div className="container">
          <span className="navbar-brand fw-bold">RentalX</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">
            Find Your Dream Room 🏠
          </h1>
          <p className="mb-4">Book Rooms & Flats Easily</p>

          {/* BOOKING FORM */}
          <form
            className="glass p-4 mx-auto"
            style={{ maxWidth: "500px" }}
            onSubmit={handleSubmit}
          >
            <input
              className="form-control mb-3"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />

            <select
              className="form-control mb-3"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              required
            >
              <option value="">Select Type</option>
              <option>Room</option>
              <option>Flat</option>
            </select>

            <button className="neon-btn w-100">
              Book Now 🚀
            </button>
          </form>
        </div>
      </div>

      {/* BOOKINGS DISPLAY */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Your Bookings</h2>

        <div className="row">
          {rentals.length === 0 ? (
            <p className="text-center">No bookings yet</p>
          ) : (
            rentals.map((r) => (
              <div className="col-md-4" key={r.id}>
                <div className="glass p-3 rental-card mb-4">
                  <h5>{r.name}</h5>
                  <p>📍 {r.location}</p>
                  <p>💰 ₹{r.price}</p>
                  <p>🏢 {r.type}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>

        <div className="accordion" id="faq">

          <div className="accordion-item mb-2">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target="#q1"
              >
                How do I book a room?
              </button>
            </h2>
            <div id="q1" className="accordion-collapse collapse show">
              <div className="accordion-body">
                Fill the booking form and click "Book Now". It will be saved in the database.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-2">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#q2"
              >
                Can I book multiple rooms?
              </button>
            </h2>
            <div id="q2" className="accordion-collapse collapse">
              <div className="accordion-body">
                Yes, you can submit the form multiple times.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-2">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#q3"
              >
                Is this connected to database?
              </button>
            </h2>
            <div id="q3" className="accordion-collapse collapse">
              <div className="accordion-body">
                Yes, all bookings are stored in MySQL database.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer text-center p-4 mt-5">
        <p>© 2026 RentalX | All Rights Reserved</p>
      </footer>
    </>
  );
}

export default App;