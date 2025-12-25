const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});
router.get('/job', (req, res) => {
  res.render('pages/job', { title: 'Job List' });
});
router.get('/rules', (req, res) => {
  res.render('pages/rules', { title: 'Rules' });
});
router.get('/team', (req, res) => {
  res.redirect("/#GAADATEAM")
});
router.get('/donate', (req, res) => {
  res.redirect('https://tiptap.gg/zenmoza24')
});

module.exports = router;
