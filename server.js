const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let paymentStatus = false;

// Home page with automatic QR
app.get("/", (req, res) => {
    res.send(`
        <h1>☕ Automatic Coffee Machine</h1>
        <h2>Price: ₹20</h2>
        <p>Scan QR to Pay</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://${req.hostname}:3000/pay" />
        <br><br>
        <p>Waiting for Payment...</p>
    `);
});

// When QR is scanned
app.get("/pay", (req, res) => {
    paymentStatus = true;
    res.send("<h1>✅ Payment Successful! Coffee Dispensing...</h1>");
});

// ESP32 checks this route
app.get("/payment-status", (req, res) => {
    if (paymentStatus) {
        res.send("PAID");
    } else {
        res.send("NOT_PAID");
    }
});

// Reset after coffee given
app.get("/reset", (req, res) => {
    paymentStatus = false;
    res.send("RESET_DONE");
});

app.listen(3000, () => {
    console.log("☕ Coffee Server running on http://localhost:3000");
});
