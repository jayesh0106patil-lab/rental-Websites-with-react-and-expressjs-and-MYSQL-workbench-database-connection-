const express = require("express");
const cors = require("cors");
const db = require("./db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ============================
   POST: SAVE BOOKING
============================ */
app.post("/api/bookings", (req, res) => {
  const { name, location, price, type } = req.body;

  const sql =
    "INSERT INTO bookings (name, location, price, type) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, location, price, type], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving booking");
    }

    res.json({ message: "Booking saved successfully" });
  });
});

/* ============================
   GET: FETCH BOOKINGS
============================ */
app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM bookings ORDER BY id DESC", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data");
    }

    res.json(result);
  });
});

/* ============================
   START SERVER
============================ */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});