# Node.js + Express + EJS (dari template ZIP lo)

## Cara jalanin
1. Install dependency:
   ```bash
   npm install
   ```
2. Run dev (auto-reload):
   ```bash
   npm run dev
   ```
   atau run biasa:
   ```bash
   npm start
   ```

Buka: http://localhost:3000

## Struktur
- `app.js` : entry server Express
- `routes/index.js` : route utama
- `views/layouts/main.ejs` : layout utama (head + body wrapper)
- `views/pages/home.ejs` : isi halaman (hasil convert dari index.html)
- `public/` : semua asset (css/js/img/fonts/webfonts/sass) biar path lama tetep jalan

## Nambah halaman baru
- Tambah file `views/pages/about.ejs`
- Tambah route baru di `routes/index.js`, contoh:
  ```js
  router.get('/about', (req, res) => res.render('pages/about'));
  ```
