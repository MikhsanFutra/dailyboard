# DailyBoard

DailyBoard adalah aplikasi dashboard produktivitas harian yang dibuat menggunakan HTML, CSS, dan JavaScript murni (Vanilla JavaScript).
Aplikasi ini dibuat sebagai project pembelajaran JavaScript selama satu semester. Fokusnya adalah membuat aplikasi sederhana yang bisa digunakan untuk mengatur tugas, membuat catatan, melihat informasi cuaca, dan menampilkan kutipan.

## Fitur
- Menambahkan tugas
- Menghapus tugas
- Mengedit tugas
- Menandai tugas sebagai selesai
- Filter tugas berdasarkan status
- Menyimpan tugas menggunakan LocalStorage
- Menambahkan dan mengedit catatan
- Menyimpan catatan di browser
- Pencarian tugas secara langsung
- Mengubah urutan tugas dengan drag and drop
- Mode terang dan mode gelap
- Menampilkan kutipan dari API
- Menampilkan informasi cuaca berdasarkan kota
- Loading dan error handling pada data dari API
- Tampilan yang menyesuaikan ukuran layar

## Teknologi
Project ini menggunakan:
- HTML
- CSS
- JavaScript
- LocalStorage
- Fetch API
- Async/Await
- ES Modules
Tidak menggunakan framework seperti React atau Vue.

## Cara Menjalankan
1. Download atau clone repository.
2. Buka folder project di Visual Studio Code.
3. Jalankan `index.html` menggunakan browser atau Live Server.
4. Pastikan koneksi internet tersedia jika ingin menggunakan fitur cuaca dan kutipan.

## Struktur Project
File utama project terdiri dari HTML, CSS, dan JavaScript. Pada tahap pengembangan, kode JavaScript juga dipisahkan menjadi beberapa file berdasarkan fungsinya, seperti pengelolaan tugas, catatan, penyimpanan data, dan API.

## Penyimpanan Data
Data tugas, catatan, dan pilihan tema disimpan menggunakan LocalStorage. Dengan begitu, data tetap tersedia ketika halaman dimuat kembali pada browser yang sama.

## API
DailyBoard menggunakan API eksternal untuk mengambil data kutipan dan informasi cuaca. Fitur cuaca membutuhkan API key agar dapat mengambil data dari layanan cuaca.

## Responsive
Tampilan DailyBoard dibuat agar dapat digunakan pada layar desktop maupun perangkat dengan ukuran layar yang lebih kecil.
## Pengembangan
DailyBoard dikembangkan secara bertahap. Pada awalnya project hanya berisi struktur dasar dan manipulasi DOM. Setelah itu ditambahkan fitur tugas, penyimpanan data, catatan, API, drag and drop, dark mode, pencarian, modularisasi, testing, dan optimasi.

## Project
Nama: DailyBoard  
Jenis: Dashboard Produktivitas Harian  
Bahasa: HTML, CSS, JavaScript  

## Struktur file
dailyboardfadli/
│

├── minify/
│
├── pisah/
│   ├── api.js
│   ├── catatan.js
│   └── storage.js
│
├── index.html
├── script.js
└── style.css
