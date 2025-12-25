const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const configPath = path.join(process.cwd(), "data", "site.config.json");

// GET form (protected)
router.get("/config", (req, res) => {
  res.render("pages/admin-login", { error: null });
});

// POST login (check password)
router.post("/login", express.urlencoded({ extended: true }), (req, res) => {
  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).send("ADMIN_PASSWORD belum diset di .env");
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).render("pages/admin-login", { error: "Password salah." });
  }

  // simple session-less auth: set cookie
  res.cookie("admin_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 2 // 2 jam
  });

  return res.redirect("/admin/config/edit");
});

// middleware check cookie
function requireAdmin(req, res, next) {
  if (req.cookies && req.cookies.admin_auth === "1") return next();
  return res.redirect("/admin/config");
}

// GET edit page (protected)
router.get("/config/edit", requireAdmin, (req, res) => {
  const site = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  res.render("pages/admin-config", { site });
});

// POST save (protected)
router.post("/config/save", requireAdmin, express.urlencoded({ extended: true }), (req, res) => {
 const updated = {
  siteName: req.body.siteName,
  siteTitle: req.body.siteTitle,
  siteDescription: req.body.siteDescription,
  siteAuthor: req.body.siteAuthor,
  meta: {
    keywords: req.body.keywords,
    themeColor: req.body.themeColor
  },
  menu: [
    { label: "Discord", url: req.body.menu_discord || "" },
    { label: "Home", url: req.body.menu_home || "/" },
    { label: "Job List", url: req.body.menu_jobs || "/jobs" },
    { label: "Rules", url: req.body.menu_rules || "/rules" },
    { label: "Team", url: req.body.menu_team || "/team" },
    { label: "Donate", url: req.body.menu_donate || "/donate" }
  ]
};


  fs.writeFileSync(configPath, JSON.stringify(updated, null, 2));
  res.redirect("/admin/config/edit");
});

// logout
router.post("/logout", requireAdmin, (req, res) => {
  res.clearCookie("admin_auth");
  res.redirect("/admin/config");
});

module.exports = router;
