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
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// app.use((req, res, next) => {
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "*"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);
  
//     next();
//   });
  

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);



app.post('/api/v1/generate-pdf', auth, async (req, res) => {
    const { user, products} = req.body;

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
        userName: user?.name,
        userEmail: user?.email,
        products: processedProducts,
        totalRate: totalRate,
        totalGST: totalGST,
        grandTotal: grandTotal
    });
    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
        headless: true,
        devtools: true,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            '--disable-features=BlockInsecurePrivateNetworkRequests'
        ]
    });
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
        'Content-Length': pdfBuffer.length,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.set('Access-Control-Allow-Origin', req.get('Origin'));
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