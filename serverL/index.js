const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");

const database = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);


app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    })
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});