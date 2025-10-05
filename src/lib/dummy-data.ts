// Dummy data for PETHOFAR Admin Panel
// These arrays simulate database responses for UI development

export interface Plant {
  id: number;
  nama: string;
  nama_latin: string;
  image: string;
  kategori: string;
  fakta_singkat: {
    air?: string;
    cahaya?: string;
    iklim?: string;
    panen?: string;
  };
  deskripsi: string;
  manfaat: string[];
  referensi: string[];
  created_at: string;
}

export interface Budidaya {
  id: number;
  title: string;
  image: string;
  kategori: string;
  nama_tanaman: string;
  type: string;
  waktu_tanam: string;
  kutipan: string;
  cara_tanam: string;
  perawatan: string;
  pupuk: string;
  penyiraman: string;
  hama: string;
  created_at: string;
}

export interface Artikel {
  id: number;
  judul: string;
  image: string;
  author: string;
  tanggal: string;
  waktu_baca: string;
  kategori: string;
  tags: string[];
  konten: string;
}

export interface Kontak {
  id: number;
  nama_lengkap: string;
  email: string;
  subjek: string;
  pesan: string;
  consent: boolean;
  tanggal: string;
  is_read?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  last_login: string;
}

export const PLANTS: Plant[] = [
  {
    id: 1,
    nama: "Lidah Buaya",
    nama_latin: "Aloe vera",
    image: "/placeholder.svg",
    kategori: "Sukulen",
    fakta_singkat: {
      air: "Jarang, setiap 2-3 minggu",
      cahaya: "Cahaya terang tidak langsung",
      iklim: "Tropis dan subtropis",
      panen: "Sepanjang tahun"
    },
    deskripsi: "Lidah buaya adalah tanaman sukulen yang dikenal dengan khasiat penyembuhannya. Tanaman ini mudah tumbuh dan memerlukan perawatan minimal.",
    manfaat: [
      "Melembabkan kulit secara alami",
      "Membantu penyembuhan luka bakar",
      "Mengatasi jerawat dan iritasi kulit",
      "Memperkuat sistem imun"
    ],
    referensi: ["NCBI", "WHO Herbal Medicine"],
    created_at: "2025-01-15T10:30:00Z"
  },
  {
    id: 2,
    nama: "Jahe Merah",
    nama_latin: "Zingiber officinale var. rubrum",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    fakta_singkat: {
      air: "Teratur, tanah lembab",
      cahaya: "Teduh parsial",
      iklim: "Tropis lembab",
      panen: "8-10 bulan setelah tanam"
    },
    deskripsi: "Jahe merah memiliki kandungan minyak atsiri yang lebih tinggi dibanding jahe biasa, memberikan rasa pedas yang khas.",
    manfaat: [
      "Anti-inflamasi kuat",
      "Meningkatkan metabolisme",
      "Mengatasi mual dan masuk angin",
      "Meningkatkan stamina"
    ],
    referensi: ["Journal of Ethnopharmacology", "Indonesian Herbal Database"],
    created_at: "2025-01-14T09:15:00Z"
  },
  {
    id: 3,
    nama: "Kunyit",
    nama_latin: "Curcuma longa",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    fakta_singkat: {
      air: "Sedang, drainase baik",
      cahaya: "Cahaya penuh hingga teduh parsial",
      iklim: "Tropis hangat",
      panen: "7-9 bulan"
    },
    deskripsi: "Kunyit adalah rempah kuno yang mengandung kurkumin, senyawa dengan sifat anti-inflamasi dan antioksidan yang kuat.",
    manfaat: [
      "Antioksidan kuat",
      "Anti-inflamasi alami",
      "Meningkatkan kesehatan pencernaan",
      "Mendukung fungsi hati"
    ],
    referensi: ["Phytotherapy Research", "BPOM RI"],
    created_at: "2025-01-13T14:20:00Z"
  },
  {
    id: 4,
    nama: "Daun Mint",
    nama_latin: "Mentha",
    image: "/placeholder.svg",
    kategori: "Herba",
    fakta_singkat: {
      air: "Sering, tanah lembab",
      cahaya: "Cahaya terang tidak langsung",
      iklim: "Sedang hingga sejuk",
      panen: "Sepanjang tahun"
    },
    deskripsi: "Mint adalah tanaman aromatik yang tumbuh cepat dan mudah dibudidayakan. Daunnya memberikan kesegaran alami.",
    manfaat: [
      "Menyegarkan napas",
      "Membantu pencernaan",
      "Mengurangi sakit kepala",
      "Efek menenangkan"
    ],
    referensi: ["Herbal Medicine Journal"],
    created_at: "2025-01-12T11:45:00Z"
  },
  {
    id: 5,
    nama: "Sirih Merah",
    nama_latin: "Piper crocatum",
    image: "/placeholder.svg",
    kategori: "Tanaman Merambat",
    fakta_singkat: {
      air: "Sedang, jangan terlalu basah",
      cahaya: "Teduh parsial",
      iklim: "Tropis lembab",
      panen: "Daun siap panen setelah 6 bulan"
    },
    deskripsi: "Sirih merah memiliki daun berwarna merah keunguan dengan khasiat obat yang luar biasa.",
    manfaat: [
      "Antiseptik alami",
      "Mengatasi keputihan",
      "Menurunkan kadar gula darah",
      "Mencegah kanker"
    ],
    referensi: ["Traditional Medicine Research", "Herbalpedia Indonesia"],
    created_at: "2025-01-11T08:30:00Z"
  },
  {
    id: 6,
    nama: "Temulawak",
    nama_latin: "Curcuma xanthorrhiza",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    fakta_singkat: {
      air: "Teratur, drainase baik",
      cahaya: "Teduh parsial hingga cahaya penuh",
      iklim: "Tropis",
      panen: "8-12 bulan"
    },
    deskripsi: "Temulawak adalah tanaman obat asli Indonesia yang dikenal sebagai pelindung hati alami.",
    manfaat: [
      "Melindungi fungsi hati",
      "Meningkatkan nafsu makan",
      "Anti-inflamasi",
      "Menurunkan kolesterol"
    ],
    referensi: ["Indonesian Materia Medica", "BPOM RI"],
    created_at: "2025-01-10T13:10:00Z"
  },
  {
    id: 7,
    nama: "Kencur",
    nama_latin: "Kaempferia galanga",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    fakta_singkat: {
      air: "Sedang, hindari genangan",
      cahaya: "Teduh hingga cahaya tidak langsung",
      iklim: "Tropis hangat",
      panen: "4-6 bulan"
    },
    deskripsi: "Kencur adalah rimpang dengan aroma khas yang sering digunakan dalam jamu tradisional Indonesia.",
    manfaat: [
      "Mengatasi batuk",
      "Meningkatkan stamina",
      "Melancarkan pencernaan",
      "Pereda nyeri alami"
    ],
    referensi: ["Jamu Science Journal"],
    created_at: "2025-01-09T16:25:00Z"
  },
  {
    id: 8,
    nama: "Lengkuas",
    nama_latin: "Alpinia galanga",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    fakta_singkat: {
      air: "Teratur, tanah lembab",
      cahaya: "Teduh parsial",
      iklim: "Tropis",
      panen: "7-10 bulan"
    },
    deskripsi: "Lengkuas adalah bumbu dapur yang juga memiliki khasiat obat, terutama untuk sistem pencernaan.",
    manfaat: [
      "Antibakteri",
      "Mengatasi masalah pencernaan",
      "Anti-jamur alami",
      "Meningkatkan sirkulasi darah"
    ],
    referensi: ["Asian Spice Research"],
    created_at: "2025-01-08T10:50:00Z"
  }
];

export const BUDIDAYA: Budidaya[] = [
  {
    id: 1,
    title: "Cara Menanam Jahe Merah di Pot",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    nama_tanaman: "Jahe Merah",
    type: "Pot/Kontainer",
    waktu_tanam: "Awal musim hujan",
    kutipan: "Jahe merah dapat tumbuh optimal di pot dengan perawatan yang tepat dan menghasilkan panen berkualitas tinggi.",
    cara_tanam: "1. Pilih rimpang berkualitas dengan tunas sehat\n2. Siapkan pot berdiameter minimal 35cm dengan lubang drainase\n3. Gunakan media tanam: tanah, kompos, sekam padi (2:1:1)\n4. Tanam rimpang sedalam 5-7cm dengan tunas menghadap atas\n5. Siram secukupnya hingga media lembab",
    perawatan: "Letakkan di tempat teduh parsial, siram teratur 2-3 hari sekali, beri pupuk organik setiap 2 minggu, dan jaga kelembaban tanah.",
    pupuk: "Pupuk kompos atau pupuk kandang matang setiap 2 minggu sekali. Dapat ditambah pupuk NPK dengan perbandingan rendah nitrogen.",
    penyiraman: "Setiap 2-3 hari sekali atau saat tanah mulai mengering. Hindari genangan air.",
    hama: "Ulat penggerek rimpang, kutu putih. Pencegahan: jaga kebersihan area tanam, gunakan pestisida organik jika diperlukan.",
    created_at: "2025-01-15T09:00:00Z"
  },
  {
    id: 2,
    title: "Budidaya Kunyit Organik Skala Rumah",
    image: "/placeholder.svg",
    kategori: "Rimpang",
    nama_tanaman: "Kunyit",
    type: "Lahan/Kebun",
    waktu_tanam: "September-Oktober",
    kutipan: "Kunyit organik memberikan hasil yang lebih sehat dan bernilai jual tinggi dengan metode budidaya yang ramah lingkungan.",
    cara_tanam: "Pilih lahan dengan drainase baik, gemburkan tanah, buat bedengan lebar 1m, tanam rimpang 5cm dalam tanah dengan jarak 30x30cm.",
    perawatan: "Penyiangan rutin, mulsa jerami untuk menjaga kelembaban, pemupukan berkala dengan pupuk organik.",
    pupuk: "Pupuk kandang 10 ton/ha saat pengolahan tanah. Pupuk organik cair setiap 3 minggu.",
    penyiraman: "Tergantung curah hujan. Di musim kemarau siram 2x seminggu.",
    hama: "Penggerek batang, bercak daun. Gunakan pestisida nabati dari daun nimba.",
    created_at: "2025-01-14T11:30:00Z"
  },
  {
    id: 3,
    title: "Menanam Lidah Buaya untuk Pemula",
    image: "/placeholder.svg",
    kategori: "Sukulen",
    nama_tanaman: "Lidah Buaya",
    type: "Pot/Indoor",
    waktu_tanam: "Sepanjang tahun",
    kutipan: "Lidah buaya adalah tanaman yang sangat mudah dirawat, cocok untuk pemula yang ingin memulai berkebun.",
    cara_tanam: "Gunakan pot dengan drainase baik, media tanam pasir + tanah + kompos (1:2:1), tanam dengan leher tanaman sedikit di atas permukaan tanah.",
    perawatan: "Letakkan di tempat terang tidak terkena sinar langsung, rotasi pot setiap minggu agar tumbuh merata.",
    pupuk: "Pupuk sukulen setiap 2 bulan sekali saat musim tumbuh.",
    penyiraman: "Setiap 2-3 minggu sekali. Biarkan tanah benar-benar kering di antara penyiraman.",
    hama: "Kutu putih, busuk akar. Pencegahan: jangan overwatering, pastikan drainase baik.",
    created_at: "2025-01-13T14:15:00Z"
  },
  {
    id: 4,
    title: "Teknik Hidroponik Mint di Rumah",
    image: "/placeholder.svg",
    kategori: "Herba",
    nama_tanaman: "Daun Mint",
    type: "Hidroponik",
    waktu_tanam: "Sepanjang tahun",
    kutipan: "Mint sangat cocok untuk sistem hidroponik, tumbuh cepat dan dapat dipanen berulang kali.",
    cara_tanam: "Siapkan sistem NFT atau DWC, pH air 6.0-7.0, stek mint 10cm dari tanaman induk, masukkan ke net pot dengan rockwool.",
    perawatan: "Pantau pH dan EC larutan nutrisi, ganti larutan setiap 2 minggu, pastikan aerasi cukup.",
    pupuk: "Nutrisi hidroponik AB mix dengan EC 1.2-1.8 mS/cm.",
    penyiraman: "Sistem sirkulasi otomatis 24 jam (NFT) atau aerator terus menerus (DWC).",
    hama: "Kutu daun, tungau. Gunakan insektisida organik atau semprotan air sabun.",
    created_at: "2025-01-12T10:20:00Z"
  },
  {
    id: 5,
    title: "Budidaya Sirih Merah Vertikal",
    image: "/placeholder.svg",
    kategori: "Tanaman Merambat",
    nama_tanaman: "Sirih Merah",
    type: "Vertikal/Trellis",
    waktu_tanam: "Sepanjang tahun",
    kutipan: "Sistem vertikal menghemat lahan dan membuat sirih merah tumbuh lebih sehat dengan sirkulasi udara yang baik.",
    cara_tanam: "Buat rangka vertikal dari bambu/pipa, gunakan pot gantung atau polybag, tanam stek sirih merah 2-3 buku, pasang di rangka.",
    perawatan: "Ikat sulur baru ke rangka, pangkas daun tua, semprot dengan air setiap pagi untuk menjaga kelembaban.",
    pupuk: "Pupuk organik cair setiap 2 minggu, pupuk daun seminggu sekali.",
    penyiraman: "Setiap hari di pagi hari, lebih sering jika cuaca panas.",
    hama: "Tungau merah, ulat daun. Semprot dengan pestisida organik berbahan bawang putih.",
    created_at: "2025-01-11T16:40:00Z"
  }
];

export const ARTICLES: Artikel[] = [
  {
    id: 1,
    judul: "10 Tanaman Herbal yang Wajib Ada di Rumah Anda",
    image: "/placeholder.svg",
    author: "Dr. Siti Rahayu",
    tanggal: "2025-01-15",
    waktu_baca: "8 menit",
    kategori: "Panduan",
    tags: ["herbal", "kesehatan", "rumah", "pemula"],
    konten: "<h2>Pengantar</h2><p>Memiliki tanaman herbal di rumah bukan hanya membuat lingkungan lebih hijau, tetapi juga memberikan akses langsung ke obat-obatan alami.</p><h2>1. Lidah Buaya</h2><p>Tanaman serbaguna untuk perawatan kulit dan luka bakar ringan.</p><h2>2. Jahe Merah</h2><p>Rimpang dengan khasiat anti-inflamasi yang kuat...</p>"
  },
  {
    id: 2,
    judul: "Manfaat Kunyit untuk Kesehatan Hati",
    image: "/placeholder.svg",
    author: "dr. Ahmad Fauzi, Sp.PD",
    tanggal: "2025-01-14",
    waktu_baca: "6 menit",
    kategori: "Kesehatan",
    tags: ["kunyit", "hati", "detoksifikasi", "kurkumin"],
    konten: "<h2>Kurkumin: Senyawa Ajaib dalam Kunyit</h2><p>Kurkumin adalah zat aktif dalam kunyit yang memberikan warna kuning dan memiliki sifat hepatoprotektif...</p>"
  },
  {
    id: 3,
    judul: "Cara Membuat Jamu Tradisional yang Efektif",
    image: "/placeholder.svg",
    author: "Ibu Wulan Sari",
    tanggal: "2025-01-13",
    waktu_baca: "10 menit",
    kategori: "Resep",
    tags: ["jamu", "tradisional", "resep", "indonesia"],
    konten: "<h2>Jamu untuk Stamina</h2><p>Bahan: Jahe merah 50g, kunyit 30g, temulawak 30g, madu 2 sdm...</p><h3>Cara Pembuatan</h3><ol><li>Cuci bersih semua rimpang</li><li>Parut atau blender dengan air secukupnya...</li></ol>"
  },
  {
    id: 4,
    judul: "Mint: Si Penyegar dengan Segudang Manfaat",
    image: "/placeholder.svg",
    author: "Prof. Dr. Bambang Herawan",
    tanggal: "2025-01-12",
    waktu_baca: "7 menit",
    kategori: "Profil Tanaman",
    tags: ["mint", "herba", "aromatik", "pencernaan"],
    konten: "<h2>Sejarah Mint</h2><p>Mint telah digunakan sejak zaman Mesir kuno sebagai tanaman aromatik dan obat...</p><h2>Kandungan Kimia</h2><p>Minyak esensial menthol memberikan efek menyegarkan dan analgesik ringan...</p>"
  },
  {
    id: 5,
    judul: "Panduan Lengkap Budidaya Jahe Organik",
    image: "/placeholder.svg",
    author: "Ir. Suryanto, M.Agr",
    tanggal: "2025-01-11",
    waktu_baca: "12 menit",
    kategori: "Budidaya",
    tags: ["jahe", "organik", "pertanian", "tutorial"],
    konten: "<h2>Persiapan Lahan</h2><p>Lahan ideal untuk jahe adalah tanah gembur dengan pH 6-7...</p><h2>Pemilihan Bibit</h2><p>Pilih rimpang dari tanaman berusia 10-12 bulan yang sehat...</p>"
  },
  {
    id: 6,
    judul: "Sirih Merah: Tanaman Ajaib untuk Kesehatan Wanita",
    image: "/placeholder.svg",
    author: "dr. Fitri Handayani, Sp.OG",
    tanggal: "2025-01-10",
    waktu_baca: "9 menit",
    kategori: "Kesehatan",
    tags: ["sirih merah", "wanita", "ginekologi", "antiseptik"],
    konten: "<h2>Khasiat untuk Kesehatan Reproduksi</h2><p>Sirih merah memiliki sifat antiseptik dan anti-inflamasi yang bermanfaat untuk kesehatan organ kewanitaan...</p>"
  }
];

export const CONTACTS: Kontak[] = [
  {
    id: 1,
    nama_lengkap: "Budi Santoso",
    email: "budi.santoso@email.com",
    subjek: "Pertanyaan tentang khasiat temulawak",
    pesan: "Selamat pagi, saya ingin bertanya mengenai cara pengolahan temulawak yang tepat untuk menjaga khasiatnya. Apakah lebih baik direbus atau diparut? Terima kasih.",
    consent: true,
    tanggal: "2025-01-15T14:30:00Z",
    is_read: false
  },
  {
    id: 2,
    nama_lengkap: "Siti Nurhaliza",
    email: "siti.nur@gmail.com",
    subjek: "Kerja sama distribusi produk herbal",
    pesan: "Kepada Yth. Tim PETHOFAR, Kami dari CV Herbal Nusantara tertarik untuk menjalin kerja sama dalam distribusi produk herbal. Mohon informasi lebih lanjut.",
    consent: true,
    tanggal: "2025-01-15T10:15:00Z",
    is_read: false
  },
  {
    id: 3,
    nama_lengkap: "Ahmad Fauzi",
    email: "ahmad.fauzi88@yahoo.com",
    subjek: "Request artikel tentang kencur",
    pesan: "Halo admin, saya sangat senang dengan konten-konten di website ini. Apakah bisa request artikel khusus tentang budidaya kencur?",
    consent: true,
    tanggal: "2025-01-14T16:45:00Z",
    is_read: true
  },
  {
    id: 4,
    nama_lengkap: "Dewi Lestari",
    email: "dewi.lestari@outlook.com",
    subjek: "Konsultasi tanaman herbal untuk diabetes",
    pesan: "Saya penderita diabetes tipe 2. Tanaman herbal apa yang paling efektif dan aman untuk membantu mengontrol gula darah? Mohon sarannya.",
    consent: true,
    tanggal: "2025-01-14T09:20:00Z",
    is_read: true
  },
  {
    id: 5,
    nama_lengkap: "Eko Prasetyo",
    email: "eko.prasetyo@perusahaan.co.id",
    subjek: "Pelatihan budidaya herbal untuk karyawan",
    pesan: "Kami perusahaan yang ingin mengadakan program CSR berupa pelatihan budidaya tanaman herbal. Apakah PETHOFAR menyediakan jasa pelatihan?",
    consent: true,
    tanggal: "2025-01-13T11:00:00Z",
    is_read: true
  },
  {
    id: 6,
    nama_lengkap: "Rina Kurniawati",
    email: "rina.k@email.com",
    subjek: "Laporan error pada halaman artikel",
    pesan: "Halo, saya menemukan error 404 ketika membuka artikel 'Panduan Menanam Lengkuas'. Mohon untuk dicek. Terima kasih!",
    consent: true,
    tanggal: "2025-01-13T08:30:00Z",
    is_read: true
  },
  {
    id: 7,
    nama_lengkap: "Joko Widodo",
    email: "joko.widodo@mail.com",
    subjek: "Saran penambahan fitur marketplace",
    pesan: "Website nya bagus! Saran saya, bagaimana kalau ditambahkan fitur marketplace untuk jual beli bibit dan produk herbal? Pasti menarik!",
    consent: true,
    tanggal: "2025-01-12T15:10:00Z",
    is_read: true
  },
  {
    id: 8,
    nama_lengkap: "Maya Sari",
    email: "mayasari123@gmail.com",
    subjek: "Pertanyaan dosis konsumsi jahe merah",
    pesan: "Apakah ada batasan dosis untuk mengkonsumsi jahe merah setiap hari? Saya konsumsi 2 gelas sehari, apakah aman? Mohon penjelasannya.",
    consent: true,
    tanggal: "2025-01-12T13:25:00Z",
    is_read: true
  },
  {
    id: 9,
    nama_lengkap: "Bambang Suryanto",
    email: "bambang.s@email.id",
    subjek: "Ucapan terima kasih",
    pesan: "Terima kasih banyak untuk artikel tentang budidaya kunyit! Sangat membantu saya yang baru mulai berkebun. Sukses terus PETHOFAR!",
    consent: true,
    tanggal: "2025-01-11T17:50:00Z",
    is_read: true
  },
  {
    id: 10,
    nama_lengkap: "Lilis Suryani",
    email: "lilis.suryani@yahoo.co.id",
    subjek: "Request video tutorial",
    pesan: "Apakah ada rencana untuk membuat video tutorial budidaya tanaman herbal? Saya lebih mudah belajar lewat video. Terima kasih!",
    consent: true,
    tanggal: "2025-01-11T10:05:00Z",
    is_read: true
  }
];

export const USERS: User[] = [
  {
    id: 1,
    name: "Admin Utama",
    email: "admin@pethofar.com",
    role: "admin",
    last_login: "2025-01-15T14:30:00Z"
  },
  {
    id: 2,
    name: "Dr. Siti Rahayu",
    email: "siti.rahayu@pethofar.com",
    role: "editor",
    last_login: "2025-01-15T09:15:00Z"
  },
  {
    id: 3,
    name: "Ir. Suryanto",
    email: "suryanto@pethofar.com",
    role: "editor",
    last_login: "2025-01-14T16:45:00Z"
  }
];

export const STATS = {
  totalPlants: PLANTS.length,
  totalArticles: ARTICLES.length,
  totalBudidaya: BUDIDAYA.length,
  totalMessages: CONTACTS.length,
  unreadMessages: CONTACTS.filter(c => !c.is_read).length,
  totalUsers: USERS.length
};
