require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const paymentRouter = require("./payment_route");

app.use(express.json());
app.use(cors());

app.use("/api/v1/payment", paymentRouter);

const port = 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}
);