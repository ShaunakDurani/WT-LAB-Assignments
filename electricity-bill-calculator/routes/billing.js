const express = require("express");
const router = express.Router();
const db = require("../db");

// Calculate bill amount
function calculateBill(units) {
  let amount = 0;
  if (units <= 50) amount = units * 3.5;
  else if (units <= 150) amount = 50 * 3.5 + (units - 50) * 4.0;
  else if (units <= 250) amount = 50 * 3.5 + 100 * 4.0 + (units - 150) * 5.2;
  else amount = 50 * 3.5 + 100 * 4.0 + 100 * 5.2 + (units - 250) * 6.5;

  return amount;
}

// Create consumer
router.post("/consumer", (req, res) => {
  const { name, email, address } = req.body;
  const sql = "INSERT INTO Consumer (name, email, address) VALUES (?, ?, ?)";
  db.query(sql, [name, email, address], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId });
  });
});

// Generate bill
router.post("/bill", (req, res) => {
  const { consumer_id, units } = req.body;
  const amount = calculateBill(units);
  const bill_date = new Date();
  const sql =
    "INSERT INTO Billing (consumer_id, units, amount, bill_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [consumer_id, units, amount, bill_date], (err) => {
    if (err) throw err;
    res.send({ message: "Bill generated", amount });
  });
});

module.exports = router;
