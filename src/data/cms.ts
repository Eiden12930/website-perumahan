export const projectData = {
  name: "Perumahan",
  developer: "Duta Griya Idaman",
  tagline: "Temukan Rumah Impian untuk Masa Depan Anda",
  description: "Kawasan hunian eksklusif dengan desain modern tropis, menghadirkan kenyamanan dan keasrian untuk keluarga Anda. Dilengkapi dengan berbagai fasilitas premium.",
  aboutTitle: "Keseimbangan Sempurna antara Alam dan Modernitas",
  aboutDescription: "Hunian modern yang dirancang untuk kenyamanan keluarga, dengan ruang terang, sirkulasi udara yang baik, dan lingkungan yang asri.",
  location: "Jakarta Selatan",
  address: "Alamat lokasi dapat diatur melalui Admin Konten",
  landArea: "12 hektare",
  unitCount: "240+ unit",
  constructionStatus: "Tahap pembangunan",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Jakarta+Selatan",
  mapEmbedUrl: "https://maps.google.com/maps?q=Jakarta%20Selatan&t=&z=13&ie=UTF8&iwloc=&output=embed",
  email: "",
  phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
};

export const propertyTypes = [
  {
    id: "type-36",
    name: "Type 36",
    slug: "type-36",
    price: "Rp 600.000.000",
    landArea: 72,
    buildingArea: 36,
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    carport: 1,
    description: "Desain compact yang efisien dan nyaman, sangat cocok untuk keluarga muda. Memiliki sirkulasi udara yang baik dan pencahayaan alami yang optimal.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    ],
    floorPlan: "/floor-plan.svg",
    status: "Available",
    specifications: ["Pondasi beton bertulang", "Dinding bata ringan", "Lantai homogeneous tile", "Listrik 2.200 VA", "Air bersih kawasan"]
  },
  {
    id: "type-45",
    name: "Type 45",
    slug: "type-45",
    price: "Rp 850.000.000",
    landArea: 90,
    buildingArea: 45,
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    carport: 1,
    description: "Hunian ideal dengan ruang keluarga yang lebih luas. Terdapat taman belakang yang bisa dikembangkan.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    ],
    floorPlan: "/floor-plan.svg",
    status: "Available",
    specifications: ["Pondasi beton bertulang", "Dinding bata ringan", "Lantai homogeneous tile", "Listrik 2.200 VA", "Air bersih kawasan"]
  },
  {
    id: "type-60",
    name: "Type 60",
    slug: "type-60",
    price: "Rp 1.200.000.000",
    landArea: 105,
    buildingArea: 60,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    carport: 2,
    description: "Rumah 2 lantai dengan desain mewah dan modern. Sangat pas untuk keluarga yang membutuhkan lebih banyak ruang privasi.",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop"
    ],
    floorPlan: "/floor-plan.svg",
    status: "Available",
    specifications: ["Pondasi beton bertulang", "Dinding bata ringan", "Lantai homogeneous tile", "Listrik 3.500 VA", "Air bersih kawasan"]
  },
  {
    id: "type-72",
    name: "Type 72",
    slug: "type-72",
    price: "Rp 1.500.000.000",
    landArea: 120,
    buildingArea: 72,
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    carport: 2,
    description: "Tipe premium dengan tata ruang elegan, area balkon luas, dan sirkulasi udara yang nyaman untuk keluarga.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
    ],
    floorPlan: "/floor-plan.svg",
    status: "Limited",
    specifications: ["Pondasi beton bertulang", "Dinding bata ringan", "Lantai homogeneous tile", "Listrik 3.500 VA", "Air bersih kawasan"]
  }
];

export const facilities = [
  { id: 1, name: "One Gate System", icon: "Gate", image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Security 24 Jam & CCTV", icon: "Shield", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2065&auto=format&fit=crop" },
  { id: 3, name: "Club House", icon: "Home", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, name: "Swimming Pool", icon: "Waves", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, name: "Playground", icon: "Smile", image: "https://images.unsplash.com/photo-1595787142842-7404bc60470d?q=80&w=2070&auto=format&fit=crop" },
  { id: 6, name: "Jogging Track", icon: "Activity", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop" },
];

export const articles = [
  {
    id: 1,
    title: "Tips Memilih Rumah Pertama untuk Keluarga Muda",
    slug: "tips-memilih-rumah-pertama",
    excerpt: "Memilih rumah pertama bisa menjadi hal yang membingungkan. Berikut beberapa tips untuk Anda.",
    content: "Membeli rumah pertama adalah keputusan finansial yang besar. Beberapa hal yang perlu diperhatikan: 1) Tentukan budget realistis, 2) Pertimbangkan lokasi dengan tempat kerja, 3) Cek fasilitas perumahan. Hubungi tim Duta Griya Idaman untuk mengetahui pilihan unit dan skema pembayaran yang tersedia.",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    category: "Tips & Trik",
    author: "Tim Duta Griya Idaman",
    publishedAt: "2024-05-15",
    seoTitle: "Tips Memilih Rumah Pertama untuk Keluarga Muda",
    seoDescription: "Panduan praktis memilih rumah pertama yang sesuai kebutuhan keluarga dan anggaran.",
  },
  {
    id: 2,
    title: "Mengapa Lokasi Sangat Penting dalam Investasi Properti?",
    slug: "mengapa-lokasi-sangat-penting",
    excerpt: "Lokasi adalah faktor utama dalam menentukan nilai jual kembali sebuah properti.",
    content: "Sering mendengar istilah 'Location, location, location'? Aksesibilitas, rencana tata kota, dan infrastruktur sekitar merupakan hal penting yang perlu dipertimbangkan saat memilih properti.",
    coverImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop",
    category: "Investasi",
    author: "Property Expert",
    publishedAt: "2024-05-20",
    seoTitle: "Pentingnya Lokasi dalam Investasi Properti",
    seoDescription: "Kenali faktor akses dan infrastruktur yang memengaruhi nilai investasi properti.",
  },
];

export const gallery = [
  { id: 1, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", category: "Exterior", caption: "Fasad Modern Tropis" },
  { id: 2, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop", category: "Interior", caption: "Ruang Keluarga Terbuka" },
  { id: 3, image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop", category: "Interior", caption: "Kamar Tidur Utama" },
  { id: 4, image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2070&auto=format&fit=crop", category: "Exterior", caption: "Taman Belakang" },
  { id: 5, image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop", category: "Fasilitas", caption: "Kolam Renang" },
  { id: 6, image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop", category: "Fasilitas", caption: "Club House" },
  { id: 7, image: "/floor-plan.svg", category: "Siteplan", caption: "Ilustrasi Tata Ruang Hunian" },
  { id: 8, image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop", category: "Lingkungan", caption: "Ruang Hijau di Sekitar Kawasan" },
  { id: 9, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", category: "Construction Progress", caption: "Contoh Visual Progres Pembangunan" },
];

export const contactPersons = [
  {
    id: 1,
    name: "Ahmad Kasim",
    position: "Senior Property Consultant",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    whatsapp: "6281234567891",
    email: "ahmad@grandarunika.com"
  },
  {
    id: 2,
    name: "Diana Putri",
    position: "Sales Manager",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    whatsapp: "6281234567892",
    email: "diana@grandarunika.com"
  }
];
