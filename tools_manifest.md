# 🛠️ DirectRoute AI: Architectural Tech Stack & Tools Manifest

Dokumen ini menyajikan panduan komprehensif mengenai seluruh ekosistem teknologi (*tech stack*), model kecerdasan buatan, antarmuka pemrograman (API), pangkalan data (*database*), serta infrastruktur pendukung yang digunakan untuk membangun platform **DirectRoute AI**.

Sistem ini dirancang dengan standar industri modern kelas premium—menggabungkan kecepatan *runtime* tinggi, keamanan data tingkat basis data, serta antarmuka dinamis untuk menghadirkan solusi rantai pasok cerdas (*agentic supply chain*) bagi UMKM Indonesia.

---

## 📊 Ringkasan Ekosistem Teknologi (*Tech Stack*)

Berikut adalah matriks ringkas dari seluruh komponen teknologi yang diintegrasikan dalam pembuatan solusi **DirectRoute AI**:

| Nama Tool | Kategori Tool | Kegunaan Utama dalam Proyek |
| :--- | :--- | :--- |
| **Google Gemini 2.0 Flash** | AI Model | Otomatisasi pemetaan cerdas (*AI Smart Match*) kebutuhan logistik. |
| **Vite + React (TypeScript)** | Frontend Framework | Pondasi aplikasi web interaktif berkinerja tinggi. |
| **Tailwind CSS** | Styling Tool / Utility | Desain antarmuka premium, responsif, dan animasi transisi halus. |
| **Supabase (PostgreSQL)** | Database & Authentication | Manajemen data terenkripsi, hak akses RLS, dan sistem otentikasi. |
| **Google Maps API** | API / Geolocation | Proses *geocoding* alamat dan pencarian titik koordinat akurat. |
| **Leaflet.js & OpenStreetMap** | Map Visualizer / Workflow Tool | Visualisasi peta interaktif fisik, rute jalan raya, dan node logistik. |
| **Netlify** | Deployment Tool | Server hosting modern berbasis cloud dengan otomatisasi CI/CD terintegrasi. |
| **GitHub** | Version Control & Collaboration | Manajemen repositori kode, pelacakan versi, dan pemicu build Netlify. |
| **Lucide React** | Supporting Tool / Icons | Kumpulan aset ikon modern premium bergaya minimalis. |

---

## 🚀 Detail Teknis Setiap Komponen

---

### 1. Google Gemini 2.0 Flash
* **Kategori Tool**: `AI Model`
* **Fungsi Utama**: Memproses masukan teks berbahasa alami (*Natural Language Processing*) dari pengguna untuk diterjemahkan menjadi pencarian logistik yang terstruktur dalam bentuk JSON.
* **Alasan Digunakan**: Memiliki *latency* (kecepatan respons) yang sangat rendah dengan efisiensi tinggi, sangat memahami konteks bahasa lokal (Bahasa Indonesia non-formal/sehari-hari), serta memiliki performa superior untuk menghasilkan output berformat data JSON terstruktur secara stabil.
* **Contoh Penggunaan**: Digunakan pada fitur **AI Smart Match** di Buyer Marketplace. Ketika buyer mengetik *"Butuh cabai 50kg di Bandung"*, model AI menganalisis kebutuhan kuantitas, jenis komoditas, dan lokasi, lalu menyaring produk yang paling sesuai dari ribuan daftar di database.
* **Kelebihan Utama**:
  * Pemrosesan teks berkecepatan tinggi (*near-instant response*).
  * Akurasi tinggi dalam memformat data mentah menjadi bentuk JSON terstruktur.
  * Dukungan pemahaman multibahasa yang sangat peka terhadap dialek lokal Indonesia.
* **Kapan Sebaiknya Digunakan**: Digunakan saat aplikasi membutuhkan fitur analitik cerdas, pencarian berbasis percakapan alami, ekstraksi data dari teks tidak terstruktur, atau agen otomatis yang memerlukan keputusan cepat.

---

### 2. Vite + React (TypeScript)
* **Kategori Tool**: `Frontend Framework`
* **Fungsi Utama**: Menyediakan struktur dasar pengembangan komponen web interaktif satu halaman (*Single Page Application*) dengan performa *rendering* secepat kilat menggunakan *compiler* modern.
* **Alasan Digunakan**: Vite menawarkan proses *Hot Module Replacement* (HMR) instan selama pengembangan, sementara React memfasilitasi pembuatan UI berbasis komponen yang modular dan *reusable*. Integrasi TypeScript memberikan keamanan tipe data (*type safety*) untuk menghindari eror di tingkat kode selama kompilasi.
* **Contoh Penggunaan**: Mengatur alur logika dinamis seperti pemuatan data produk dari Supabase, manajemen *state* keranjang belanja (*cart*), perutean halaman (*routing*), dan navigasi antar dasbor (Seller, Buyer, Admin).
* **Kelebihan Utama**:
  * Waktu *build* dan pemuatan awal aplikasi yang sangat cepat dibandingkan bundler tradisional.
  * Komponen modular yang mudah dikelola, dikembangkan, dan diuji.
  * Menghindari *bug* runtime sejak awal penulisan kode berkat proteksi TypeScript.
* **Kapan Sebaiknya Digunakan**: Ideal untuk pembuatan aplikasi web berskala menengah hingga besar dengan interaksi data real-time, dasbor analitik yang kompleks, dan kebutuhan performa pemuatan yang tinggi.

---

### 3. Tailwind CSS
* **Kategori Tool**: `Styling Tool / Utility`
* **Fungsi Utama**: Mempercepat proses penulisan kode gaya tampilan halaman (*styling*) secara langsung di dalam markup HTML menggunakan utilitas kelas (*utility-first classes*).
* **Alasan Digunakan**: Menghindari penulisan berkas CSS kustom yang membengkak dan sulit dikelola. Menjamin konsistensi palet warna (*emerald, slate, forest*), sistem grid logistik yang rapi, sudut tumpul premium (*rounded-3xl*), serta efek bayangan kaca (*glassmorphism*) estetika tinggi secara seragam.
* **Contoh Penggunaan**: Memoles kartu produk di halaman Marketplace agar memiliki efek transisi halus (*transition-all hover:scale-105 duration-300*), membuat animasi kilatan radar pemindaian pada gambar utama (*animate-[shimmer_3s_infinite_linear]*), serta merancang menu navigasi responsif yang adaptif dari layar HP hingga monitor desktop.
* **Kelebihan Utama**:
  * Kecepatan tinggi dalam mendesain halaman tanpa berpindah berkas CSS.
  * Ukuran berkas produksi sangat kecil karena utility CSS yang tidak terpakai otomatis dipangkas (*purged*).
  * Responsivitas bawaan (*responsive design*) yang sangat mudah diimplementasikan (misalnya: `grid-cols-1 md:grid-cols-3`).
* **Kapan Sebaiknya Digunakan**: Sangat disarankan untuk mendesain antarmuka aplikasi modern dengan konsistensi sistem desain tingkat tinggi, animasi interaktif, serta adaptabilitas multi-perangkat yang mulus.

---

### 4. Supabase (PostgreSQL)
* **Kategori Tool**: `Database & Authentication (BaaS)`
* **Fungsi Utama**: Berperan sebagai sistem pangkalan data relasional berbasis awan (*cloud database*), sistem pengelolaan akun pengguna (*authentication*), sekaligus media penyimpanan berkas digital (*storage*).
* **Alasan Digunakan**: Menghadirkan performa PostgreSQL yang tangguh tanpa repot melakukan konfigurasi server. Mendukung sistem keamanan data mutakhir di tingkat baris tabel database menggunakan fitur **Row Level Security (RLS)** untuk menjamin bahwa data transaksi sensitif hanya bisa diakses oleh pihak yang berwenang.
* **Contoh Penggunaan**: 
  * Menyimpan profil pengguna, riwayat pengiriman rute logistik, dan tabel produk dagangan.
  * Mengamankan tabel `items` menggunakan kebijakan RLS sehingga Seller hanya bisa mengubah produk miliknya sendiri, sedangkan Buyer bisa membaca semua produk aktif yang telah disetujui (*approved*).
* **Kelebihan Utama**:
  * Sinkronisasi data real-time bawaan (*Postgres replication*) untuk fitur obrolan (*chat*) dan status pesanan.
  * Keamanan super ketat langsung di tingkat mesin database (RLS).
  * Kemudahan integrasi sistem otentikasi login sosial maupun email sandi.
* **Kapan Sebaiknya Digunakan**: Ketika aplikasi membutuhkan manajemen data relasional yang sangat aman, cepat diimplementasikan, memiliki kebutuhan data real-time, serta membutuhkan kontrol otentikasi terpusat.

---

### 5. Google Maps API
* **Kategori Tool**: `API / Geolocation`
* **Fungsi Utama**: Menyediakan layanan pencarian titik koordinat geografis (*geocoding*) dari alamat fisik/nama daerah, serta menghitung jarak dan estimasi waktu rute perjalanan antar koordinat secara akurat.
* **Alasan Digunakan**: Merupakan standar emas global untuk data peta jalan raya dan akurasi titik koordinat di Indonesia. Hal ini sangat krusial bagi startup logistik untuk memberikan kalkulasi biaya pengiriman yang kredibel bagi pelaku UMKM.
* **Contoh Penggunaan**: Digunakan saat Seller menginput alamat bisnisnya di Bandung atau pembeli menginput koordinat lokasi pengiriman di Jakarta. Sistem memanggil Google Maps API untuk mengonversi nama tempat tersebut menjadi format numerik latitude/longitude (misalnya: `-6.9175, 107.6191`) demi kebutuhan visualisasi peta fisik.
* **Kelebihan Utama**:
  * Keakuratan pencarian alamat lokal Indonesia yang sangat tinggi (hingga tingkat nomor jalan).
  * Data rute lalu lintas nyata (*real-time traffic*) yang mutakhir.
  * Skalabilitas tinggi dengan dokumentasi teknis yang matang.
* **Kapan Sebaiknya Digunakan**: Wajib digunakan saat aplikasi membutuhkan penentuan lokasi presisi, fitur pencarian radius terdekat (*nearest seller*), estimasi biaya ekspedisi berdasarkan jarak fisik, serta pelacakan rute kurir.

---

### 6. Leaflet.js & OpenStreetMap
* **Kategori Tool**: `Map Visualizer / Workflow Tool`
* **Fungsi Utama**: Membaca koordinat geografis lalu menggambar serta menampilkan visualisasi peta interaktif fisik secara langsung di browser pengguna tanpa membebani memori perangkat.
* **Alasan Digunakan**: Leaflet merupakan pustaka peta open-source berukuran sangat ringan (~40KB gzip) dengan performa memukau pada perangkat seluler. Memadukannya dengan tile OpenStreetMap (OSM) menghemat biaya operasional secara drastis dibandingkan merender peta interaktif Google Maps secara penuh.
* **Contoh Penggunaan**: Menampilkan rute pengiriman logistik pada halaman dasbor Seller. Peta Leaflet merender titik koordinat gudang asal, titik-titik lokasi pengiriman para buyer (*waypoints*), serta menarik garis jalan yang dioptimalkan oleh sistem logistik AI.
* **Kelebihan Utama**:
  * Sangat ringan dan tidak memperlambat waktu muat halaman aplikasi web.
  * Bebas biaya lisensi karena memanfaatkan data peta kolaboratif dunia (OpenStreetMap).
  * Kompatibilitas tinggi dengan berbagai macam plugin kustom (seperti penanda rute jalan raya).
* **Kapan Sebaiknya Digunakan**: Sangat tepat untuk proyek aplikasi yang membutuhkan peta fisik interaktif untuk menaruh penanda khusus (*custom markers*), menggambarkan poligon wilayah rute, atau menghemat anggaran dari tagihan visualisasi API pihak ketiga.

---

### 7. Netlify
* **Kategori Tool**: `Deployment Tool`
* **Fungsi Utama**: Menyediakan infrastruktur server hosting modern berteknologi CDN global untuk mendistribusikan aplikasi web secara aman, cepat, dan otomatis.
* **Alasan Digunakan**: Menyediakan fitur integrasi git berkelanjutan (*continuous integration & deployment* / CI-CD). Setiap kali ada pembaruan kode di GitHub, Netlify langsung melakukan proses kompilasi otomatis dan memperbarui situs web langsung ke server produksi dalam hitungan detik secara mulus tanpa *downtime*.
* **Contoh Penggunaan**: Hosting aplikasi front-end DirectRoute AI secara publik. Setiap perubahan tampilan atau perbaikan bug yang berhasil diuji di lokal langsung ter-deploy otomatis begitu kode di-push ke cabang `main` di GitHub.
* **Kelebihan Utama**:
  * Otomatisasi proses rilis (*automated builds*) dari git.
  * Penyediaan sertifikat keamanan SSL gratis secara instan demi proteksi enkripsi HTTPS.
  * Kecepatan muat halaman yang tinggi karena server CDN disebar di berbagai belahan dunia terdekat pengguna.
* **Kapan Sebaiknya Digunakan**: Sangat ideal untuk menaruh aplikasi web berbasis front-end (Vite, React, Next.js, dsb) secara online dengan sistem CI/CD instan, andal, dan minim pengelolaan server manual.

---

### 8. GitHub
* **Kategori Tool**: `Version Control & Collaboration`
* **Fungsi Utama**: Platform cloud untuk mengelola repositori kode, mencatat setiap riwayat perubahan baris kode, serta memfasilitasi kolaborasi penulisan program secara terorganisir.
* **Alasan Digunakan**: Memungkinkan pencatatan sejarah modifikasi kode secara presisi (*git commit*), pengembalian kondisi kode ke versi sebelumnya jika terjadi kerusakan (*rollback*), serta bertindak sebagai gerbang otomatisasi (*webhook*) untuk memicu proses build di server hosting Netlify.
* **Contoh Penggunaan**: Menyimpan riwayat revisi desain visual premium DirectRoute AI dan perbaikan fungsi moderasi produk. Riwayat perbaikan terdokumentasi rapi di repositori [umkmctf](https://github.com/gemparnugroho725/umkmctf).
* **Kelebihan Utama**:
  * Pelacakan riwayat perubahan kode yang sangat mendalam dan aman.
  * Mempermudah kolaborasi antar tim pengembang perangkat lunak tanpa konflik kode.
  * Ekosistem integrasi yang kaya dengan berbagai platform cloud lainnya (CI/CD, monitoring, dsb).
* **Kapan Sebaiknya Digunakan**: Wajib digunakan dalam setiap proses siklus pengembangan perangkat lunak modern untuk menjaga keutuhan kode sumber (*source code*).

---

### 9. Lucide React
* **Kategori Tool**: `Supporting Tool / Icons`
* **Fungsi Utama**: Menyediakan koleksi ikon vektor minimalis modern yang dikemas dalam bentuk komponen React siap pakai.
* **Alasan Digunakan**: Desain antarmuka premium membutuhkan elemen mikro-visual yang konsisten. Lucide React menyediakan ribuan pilihan ikon berbobot tipis, elegan, dan tajam di segala resolusi layar yang mempertegas fungsi tombol interaktif.
* **Contoh Penggunaan**: Pemasangan ikon `ShoppingCart` untuk tombol keranjang belanja, ikon `MapPin` untuk koordinat lokasi, ikon `Activity` untuk indikator node AI yang menyala, serta ikon `Sparkles` untuk penanda kecerdasan buatan (*AI Smart Match*).
* **Kelebihan Utama**:
  * Sangat mudah disesuaikan warnanya, ketebalan garis (*stroke*), maupun ukurannya menggunakan kelas Tailwind CSS.
  * Mendukung teknik *tree-shaking*—hanya ikon yang dipakai yang akan dimasukkan ke berkas final, menghemat memori.
  * Desain modern bergaris konsisten yang serasi dengan estetika premium dasbor.
* **Kapan Sebaiknya Digunakan**: Digunakan di setiap aplikasi web modern untuk menghemat waktu pembuatan ikon manual dan memastikan harmoni grafis di semua bagian dasbor.

---

> [!NOTE]
> Perpaduan dinamis dari **Google Gemini 2.0** sebagai otak pengolah kebutuhan logistik, **Supabase** sebagai benteng keamanan database RLS, serta kecepatan interaksi visual dari **React (TypeScript)** & **Leaflet.js** adalah kunci utama mengapa platform **DirectRoute AI** terasa sangat gegas, interaktif, dan siap dipresentasikan di hadapan investor kelas atas (*investor-ready*).
