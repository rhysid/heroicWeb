require('dotenv').config();
const path = require('path');
const fs = require("fs");
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");


const app = express();
app.use(cookieParser());
// --- App config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// --- Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Static assets (CSS/JS/images/fonts)
app.use(express.static(path.join(__dirname, 'public')));

function loadSiteConfig() {
  const p = path.join(__dirname, "data", "site.config.json");
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch (err) {
    return {
      siteName: "Website",
      siteTitle: "Website",
      siteDescription: "",
      siteAuthor: "",
      meta: { keywords: "", themeColor: "#000000" }
    };
  }
}

app.use((req, res, next) => {
  res.locals.site = loadSiteConfig();
  res.locals.pageTitle = ""; // biar gak error
  next();
});

// --- Routes
app.use('/', require('./routes'));

app.use("/admin", require("./routes/admin"));


// --- 404
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// --- Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
