const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let paymentStatus = false;

/* ===============================
   HOME PAGE
=================================*/
app.get("/", (req, res) => {
    const baseUrl = `https://${req.headers.host}`;

    res.send(`
        <html>
        <head>
            <title>Automatic Coffee Machine</title>
        </head>
        <body style="text-align:center;font-family:Arial;">
            <h1>☕ Automatic Coffee Machine</h1>
            <h2>Price: ₹20</h2>
            <p>Scan QR to Pay</p>

            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${baseUrl}/pay" />

            <br><br>
            <p>Waiting for Payment...</p>
        </body>
        </html>
    `);
});

/* ===============================
   PAYMENT ROUTE (SIMULATION)
=================================*/
app.get("/pay", (req, res) => {
    paymentStatus = true;

    res.send(`
        <h1 style="text-align:center;">✅ Payment Successful!</h1>
        <h2 style="text-align:center;">☕ Coffee Dispensing...</h2>
    `);
});

/* ===============================
   ESP32 CHECK ROUTE
=================================*/
app.get("/payment-status", (req, res) => {
    if (paymentStatus) {
        res.send("PAID");
    } else {
        res.send("NOT_PAID");
    }
});

/* ===============================
   RESET ROUTE
=================================*/
app.get("/reset", (req, res) => {
    paymentStatus = false;
    res.send("RESET_DONE");
});

/* ===============================
   RENDER PORT FIX
=================================*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("☕ Coffee Server running on port " + PORT);
});
