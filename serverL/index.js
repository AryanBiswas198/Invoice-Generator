const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");

const puppeteer = require('puppeteer');
const fs = require('fs');
const fss = require("fs-extra");
const path = require('path');
const Handlebars = require('handlebars');

const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");

const database = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const {auth} = require("./middlewares/auth");

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



app.post('/api/v1/generate-pdf', auth, async (req, res) => {
    const { user, products, token } = req.body;

    let totalRate = 0;
    const processedProducts = products.map(product => {
        const total = product.quantity * product.price;
        totalRate += total;
        return {
            ...product,
            total: total
        };
    });

    // Calculate total GST and grand total
    const totalGST = totalRate * 0.18; // Assuming GST rate is 18%
    const grandTotal = totalRate + totalGST;

    // Load HTML template
    const templatePath = path.join(__dirname, 'invoiceTemplate.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');

    // Compile template with Handlebars
    const template = Handlebars.compile(templateHtml);
    const html = template({
        userName: user.name,
        userEmail: user.email,
        products: processedProducts,
        totalRate: totalRate,
        totalGST: totalGST,
        grandTotal: grandTotal
    });
    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ 
        path: 'mypdf.pdf',
        format: 'A4',
        printBackground: true,
    });
    await browser.close();

    // Send PDF as response
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);
});



app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    })
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});