export interface DesignItem {
  id: string;
  title: string;
  description: string;
  category: 'Saree Borders' | 'Pallu & Dupatta' | 'Blouse & Neckline' | 'All-over Jaal' | 'Lace & Patti' | 'Floral & Motifs' | 'Bridal Lehenga' | 'Kurti Front';
  machine: 'Multi-head Embroidery' | 'Schiffli' | 'Single Head' | 'Cording / Chain Stitch' | 'Flat Knitting' | 'Ari / Sequence Multi';
  machineType: 'Industrial Multi-Head' | 'Commercial Schiffli' | 'Single Needle Boutique' | 'High-Speed Flatbed';
  designTypes: string[];
  formats: ('EMB' | 'DST' | 'PES' | 'JEF' | 'EXP')[];
  price: number;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  salesCount: number;
  status: 'active' | 'draft' | 'inactive';
  stitches: number;
  needles: number;
  heightMm: number;
  widthMm: number;
  areaCm2: number;
  sequenceType: 'Standard 3mm Single' | 'Double Sequence (3mm + 5mm)' | 'None' | 'Reversible Sequin';
  images: string[];
  files: { name: string; format: string; size: string }[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  createdAt: string;
  buyerProtection: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalTotal: number;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  designCount: number;
  includedDesignIds: string[];
  coverImage: string;
  salesCount: number;
  createdAt: string;
  isFeatured?: boolean;
}

export interface CreatorItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  totalDesigns: number;
  totalCollections: number;
  totalSales: number;
  rating: number;
  joinedDate: string;
  badges: string[];
  machineSpeciality: string;
  followersCount: number;
}

export interface PurchaseRecord {
  id: string;
  orderNumber: string;
  type: 'design' | 'collection';
  itemId: string;
  itemTitle: string;
  itemImage: string;
  category: string;
  sellerName: string;
  amountPaid: number;
  date: string;
  status: 'completed' | 'processing' | 'refunded';
  downloadUrls: { format: string; filename: string; size: string }[];
}

export interface EarningRecord {
  id: string;
  designName: string;
  image: string;
  buyerPaid: number;
  commission: number;
  netEarning: number;
  status: 'pending' | 'available';
  saleDate: string;
  settlementCycle: string;
  scheduledSettlementDate: string;
  environment: 'Test Mode' | 'Live';
}

export interface SettlementCycle {
  id: string;
  cyclePeriod: string;
  startDay: string;
  endDay: string;
  settlementDate: string;
  salesCount: number;
  waitingAmount: number;
  releasedAmount: number;
  paidAmount: number;
  status: 'upcoming' | 'processing' | 'completed';
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  date: string;
  status: 'Requested' | 'Approved' | 'Processing' | 'Paid' | 'Cancelled' | 'Rejected';
  bankAccount: string;
  referenceId: string;
  canCancel: boolean;
}

export interface LedgerItem {
  id: string;
  label: 'Earning added' | 'Earning released' | 'Withdrawal reserved' | 'Withdrawal cancelled' | 'Withdrawal rejected' | 'Payout completed' | 'Balance adjustment';
  amount: number;
  type: 'credit' | 'debit';
  bucket: 'Pending' | 'Available' | 'Reserved' | 'Paid';
  dateTime: string;
  itemRef: string;
  rawCode: string;
}

// Visual asset paths generated
export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_textile_embroidery_1793879816875.jpg',
  sareeBorder: '/src/assets/images/saree_border_zari_1793879818864.jpg',
  chikankari: '/src/assets/images/chikankari_floral_1793879818315.jpg',
  navySequin: '/src/assets/images/navy_sequin_jaal_1793879819407.jpg',
};

export const CREATORS: CreatorItem[] = [
  {
    id: 'creator-1',
    name: 'Surat Embroidery Works',
    handle: '@surat_emb_studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Specialized in high-speed multi-head industrial embroidery digitizing. 18+ years producing production-grade saree borders, dori cordings, and bridal zaris.',
    location: 'Surat, Gujarat',
    totalDesigns: 142,
    totalCollections: 12,
    totalSales: 3420,
    rating: 4.95,
    joinedDate: 'Jan 2023',
    badges: ['Master Digitizer', 'Surat Verified Studio', 'Top Seller'],
    machineSpeciality: 'Industrial Multi-Head & Schiffli',
    followersCount: 1840,
  },
  {
    id: 'creator-2',
    name: 'Varanasi Zari Atelier',
    handle: '@varanasi_zari',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Crafting royal Banarasi motifs, kadwa weaves, and antique gold thread embroidery files calibrated for zero-breakage on Barudan and Tajima machines.',
    location: 'Varanasi, Uttar Pradesh',
    totalDesigns: 88,
    totalCollections: 8,
    totalSales: 1980,
    rating: 4.9,
    joinedDate: 'Apr 2023',
    badges: ['Heritage Craft Certified', 'Tajima Verified'],
    machineSpeciality: 'Barudan / Tajima 9-Needle',
    followersCount: 1290,
  },
  {
    id: 'creator-3',
    name: 'Rajputana Thread Studio',
    handle: '@rajputana_stitches',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    bio: 'Gota patti, mirror embroidery, and royal Marwar lehenga designs. Clean needle sequencing and optimized stitch jumps.',
    location: 'Jaipur, Rajasthan',
    totalDesigns: 64,
    totalCollections: 6,
    totalSales: 1450,
    rating: 4.88,
    joinedDate: 'Aug 2023',
    badges: ['Fast Support', 'Master Digitizer'],
    machineSpeciality: 'Multi-Sequence & Cording',
    followersCount: 940,
  },
  {
    id: 'creator-4',
    name: 'Lucknow Chikan digitizing',
    handle: '@chikan_heritage',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bio: 'Translating traditional Awadhi hand-embroidery stitches (Tepchi, Bakhiya, Phanda) into machine-ready multi-format files.',
    location: 'Lucknow, Uttar Pradesh',
    totalDesigns: 53,
    totalCollections: 5,
    totalSales: 1120,
    rating: 4.92,
    joinedDate: 'Nov 2023',
    badges: ['Heritage Craft Certified'],
    machineSpeciality: 'Single Head & Multi-Head Cotton',
    followersCount: 810,
  },
];

export const DESIGNS: DesignItem[] = [
  {
    id: 'des-101',
    title: 'Royal Zari Saree Border with Lotus Medallion',
    description: 'Masterwork saree border designed for multi-head embroidery machines. Features high-density gold zari thread work with micro sequins in lotus and paisley scrolls. Tested on Tajima 12-head machines with zero thread breaks.',
    category: 'Saree Borders',
    machine: 'Multi-head Embroidery',
    machineType: 'Industrial Multi-Head',
    designTypes: ['Zari Work', 'Dori Cording', 'Sequins 3mm'],
    formats: ['EMB', 'DST', 'PES', 'JEF', 'EXP'],
    price: 1499,
    sellerId: 'creator-1',
    sellerName: 'Surat Embroidery Works',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.95,
    salesCount: 312,
    status: 'active',
    stitches: 68450,
    needles: 6,
    heightMm: 95,
    widthMm: 420,
    areaCm2: 399,
    sequenceType: 'Standard 3mm Single',
    images: [
      ASSET_IMAGES.sareeBorder,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.navySequin,
    ],
    files: [
      { name: 'Royal_Lotus_Border_v2.EMB', format: 'EMB', size: '4.8 MB' },
      { name: 'Royal_Lotus_Border_v2.DST', format: 'DST', size: '2.1 MB' },
      { name: 'Royal_Lotus_Border_v2.PES', format: 'PES', size: '2.3 MB' },
      { name: 'Color_Stop_Sequence.PDF', format: 'PDF', size: '640 KB' },
    ],
    isFeatured: true,
    isTrending: true,
    isNew: false,
    createdAt: '2026-09-14',
    buyerProtection: 'Production guaranteed. If machine file yields irregular needle jumps or thread break loops, free revision within 48h.',
  },
  {
    id: 'des-102',
    title: 'Lucknowi Chikankari Rose Spray Motif',
    description: 'Delicate Awadhi style floral spray motif replicating hand-sewn Bakhiya and Phanda stitches. Calibrated for organza, silk georgette, and lawn cotton fabrics with ultra-fine cotton thread.',
    category: 'Floral & Motifs',
    machine: 'Single Head',
    machineType: 'Single Needle Boutique',
    designTypes: ['Resham Thread', 'Water Soluble'],
    formats: ['EMB', 'DST', 'PES', 'JEF'],
    price: 799,
    sellerId: 'creator-4',
    sellerName: 'Lucknow Chikan digitizing',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.92,
    salesCount: 184,
    status: 'active',
    stitches: 34200,
    needles: 3,
    heightMm: 210,
    widthMm: 160,
    areaCm2: 336,
    sequenceType: 'None',
    images: [
      ASSET_IMAGES.chikankari,
      ASSET_IMAGES.hero,
    ],
    files: [
      { name: 'Lucknow_Rose_Spray.EMB', format: 'EMB', size: '2.4 MB' },
      { name: 'Lucknow_Rose_Spray.DST', format: 'DST', size: '1.2 MB' },
      { name: 'Lucknow_Rose_Spray.PES', format: 'PES', size: '1.4 MB' },
    ],
    isFeatured: true,
    isTrending: false,
    isNew: true,
    createdAt: '2026-10-20',
    buyerProtection: 'Includes density adjustment chart for both stable lawn cotton and lightweight sheer silks.',
  },
  {
    id: 'des-103',
    title: 'Midnight Royal Bridal All-Over Sequin Jaal',
    description: 'Heavy bridal lehenga and sherwani all-over jaal pattern. Features dual sequin positioning with antique gold dori thread outline. Tested for seamless horizontal and vertical repetition across continuous yardage.',
    category: 'All-over Jaal',
    machine: 'Ari / Sequence Multi',
    machineType: 'Industrial Multi-Head',
    designTypes: ['Sequins 3mm', 'Double Sequence (3mm + 5mm)', 'Dori Cording'],
    formats: ['EMB', 'DST', 'EXP'],
    price: 2899,
    sellerId: 'creator-1',
    sellerName: 'Surat Embroidery Works',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.95,
    salesCount: 429,
    status: 'active',
    stitches: 142000,
    needles: 8,
    heightMm: 480,
    widthMm: 380,
    areaCm2: 1824,
    sequenceType: 'Double Sequence (3mm + 5mm)',
    images: [
      ASSET_IMAGES.navySequin,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.sareeBorder,
    ],
    files: [
      { name: 'Midnight_Bridal_Jaal_Full.EMB', format: 'EMB', size: '8.6 MB' },
      { name: 'Midnight_Bridal_Jaal_Full.DST', format: 'DST', size: '5.2 MB' },
      { name: 'Repetition_Alignment_Guide.PDF', format: 'PDF', size: '1.1 MB' },
    ],
    isFeatured: true,
    isTrending: true,
    isNew: false,
    createdAt: '2026-08-11',
    buyerProtection: 'Seamless repeat guaranteed. Includes CAD alignment markers for multi-frame hooping on industrial machines.',
  },
  {
    id: 'des-104',
    title: 'Emerald Mughal Court Pallu Medallion',
    description: 'Grand royal centerpiece pallu designed for Banarasi raw silk sarees. Rich jewel-tone embroidery with raised bullion stitch simulation and zari border enclosure.',
    category: 'Pallu & Dupatta',
    machine: 'Multi-head Embroidery',
    machineType: 'Industrial Multi-Head',
    designTypes: ['Zari Work', 'Resham Thread'],
    formats: ['EMB', 'DST', 'PES', 'JEF', 'EXP'],
    price: 1899,
    sellerId: 'creator-2',
    sellerName: 'Varanasi Zari Atelier',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.9,
    salesCount: 215,
    status: 'active',
    stitches: 94800,
    needles: 7,
    heightMm: 550,
    widthMm: 450,
    areaCm2: 2475,
    sequenceType: 'None',
    images: [
      ASSET_IMAGES.hero,
      ASSET_IMAGES.sareeBorder,
    ],
    files: [
      { name: 'Mughal_Pallu_Medallion.EMB', format: 'EMB', size: '6.4 MB' },
      { name: 'Mughal_Pallu_Medallion.DST', format: 'DST', size: '3.8 MB' },
      { name: 'Thread_Consumption_Sheet.XLS', format: 'XLS', size: '120 KB' },
    ],
    isFeatured: false,
    isTrending: true,
    isNew: true,
    createdAt: '2026-10-28',
    buyerProtection: 'Includes thread consumption report (meters per needle) to calculate exact manufacturing costs.',
  },
  {
    id: 'des-105',
    title: 'Rajputana Gota Patti Blouse Neckline & Sleeves',
    description: 'Complete bridal blouse set featuring front sweet-heart neck, deep back arch, and matching sleeve bands. Optimized for minimal manual trimming.',
    category: 'Blouse & Neckline',
    machine: 'Cording / Chain Stitch',
    machineType: 'Commercial Schiffli',
    designTypes: ['Dori Cording', 'Zari Work'],
    formats: ['EMB', 'DST', 'PES'],
    price: 1250,
    sellerId: 'creator-3',
    sellerName: 'Rajputana Thread Studio',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.88,
    salesCount: 167,
    status: 'active',
    stitches: 52100,
    needles: 5,
    heightMm: 340,
    widthMm: 280,
    areaCm2: 952,
    sequenceType: 'Standard 3mm Single',
    images: [
      ASSET_IMAGES.sareeBorder,
      ASSET_IMAGES.navySequin,
    ],
    files: [
      { name: 'Gota_Patti_Blouse_Set.EMB', format: 'EMB', size: '3.7 MB' },
      { name: 'Gota_Patti_Blouse_Set.DST', format: 'DST', size: '1.9 MB' },
    ],
    isFeatured: false,
    isTrending: false,
    isNew: true,
    createdAt: '2026-11-01',
    buyerProtection: 'Includes printable 1:1 scale stencil for neck cutting and stabilizer placement.',
  },
  {
    id: 'des-106',
    title: 'Surat Schiffli Lace Border with Scalloped Edge',
    description: 'High-speed Schiffli lace pattern designed for chemical water-soluble lace manufacture. Reinforced interlocking bridge stitches ensure lace integrity after dissolving backing.',
    category: 'Lace & Patti',
    machine: 'Schiffli',
    machineType: 'Commercial Schiffli',
    designTypes: ['Water Soluble', 'Resham Thread'],
    formats: ['EMB', 'DST'],
    price: 2100,
    sellerId: 'creator-1',
    sellerName: 'Surat Embroidery Works',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.95,
    salesCount: 388,
    status: 'active',
    stitches: 118000,
    needles: 4,
    heightMm: 120,
    widthMm: 600,
    areaCm2: 720,
    sequenceType: 'None',
    images: [
      ASSET_IMAGES.chikankari,
      ASSET_IMAGES.sareeBorder,
    ],
    files: [
      { name: 'Schiffli_Scallop_Lace.EMB', format: 'EMB', size: '7.1 MB' },
      { name: 'Schiffli_Scallop_Lace.DST', format: 'DST', size: '4.4 MB' },
    ],
    isFeatured: false,
    isTrending: true,
    isNew: false,
    createdAt: '2026-07-22',
    buyerProtection: 'Reinforced web-bridges tested in hot-water chemical bath wash trials.',
  },
  {
    id: 'des-107',
    title: 'Royal Peacock Buta with Real Zari Shading',
    description: 'Iconic Indian Mayur (peacock) motif with multi-layer shaded fill stitches and crown plumes. Ideal for sherwani chests, lehenga kali centers, and premium cushion covers.',
    category: 'Floral & Motifs',
    machine: 'Multi-head Embroidery',
    machineType: 'Industrial Multi-Head',
    designTypes: ['Zari Work', 'Resham Thread'],
    formats: ['EMB', 'DST', 'PES', 'JEF'],
    price: 850,
    sellerId: 'creator-2',
    sellerName: 'Varanasi Zari Atelier',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.9,
    salesCount: 270,
    status: 'active',
    stitches: 41900,
    needles: 6,
    heightMm: 240,
    widthMm: 180,
    areaCm2: 432,
    sequenceType: 'None',
    images: [
      ASSET_IMAGES.hero,
      ASSET_IMAGES.chikankari,
    ],
    files: [
      { name: 'Royal_Peacock_Buta.EMB', format: 'EMB', size: '2.9 MB' },
      { name: 'Royal_Peacock_Buta.DST', format: 'DST', size: '1.6 MB' },
    ],
    isFeatured: true,
    isTrending: false,
    isNew: false,
    createdAt: '2026-06-15',
    buyerProtection: 'Smooth needle gradient angles prevent puckering on thin georgette fabrics.',
  },
  {
    id: 'des-108',
    title: 'Bridal Kali Panel with Geometric Chevron Jari',
    description: 'Full-length 16-kali lehenga panel design with escalating chevron motifs from waistband down to a heavy 18-inch hem. Calibrated for seamless side-panel alignment.',
    category: 'Bridal Lehenga',
    machine: 'Multi-head Embroidery',
    machineType: 'High-Speed Flatbed',
    designTypes: ['Zari Work', 'Sequins 3mm', 'Dori Cording'],
    formats: ['EMB', 'DST', 'EXP'],
    price: 3499,
    sellerId: 'creator-3',
    sellerName: 'Rajputana Thread Studio',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    sellerRating: 4.88,
    salesCount: 194,
    status: 'active',
    stitches: 186000,
    needles: 9,
    heightMm: 1080,
    widthMm: 460,
    areaCm2: 4968,
    sequenceType: 'Standard 3mm Single',
    images: [
      ASSET_IMAGES.navySequin,
      ASSET_IMAGES.sareeBorder,
      ASSET_IMAGES.hero,
    ],
    files: [
      { name: 'Bridal_Kali_Chevron_Full.EMB', format: 'EMB', size: '12.4 MB' },
      { name: 'Bridal_Kali_Chevron_Full.DST', format: 'DST', size: '7.8 MB' },
      { name: 'Kali_Assembly_Diagram.PDF', format: 'PDF', size: '1.5 MB' },
    ],
    isFeatured: true,
    isTrending: true,
    isNew: true,
    createdAt: '2026-11-03',
    buyerProtection: 'Includes panel flare calculation sheet and stitch timing guide for high-speed industrial looms.',
  },
];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-1',
    title: 'Surat Heritage Bridal Saree Border Suite',
    description: 'Comprehensive bundle of 6 complementary saree borders, pallu corners, and blouse matching laces. Master digitized in Surat for Tajima and Barudan multi-head machines.',
    category: 'Saree Borders',
    price: 4999,
    originalTotal: 8490,
    sellerId: 'creator-1',
    sellerName: 'Surat Embroidery Works',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    designCount: 6,
    includedDesignIds: ['des-101', 'des-103', 'des-106'],
    coverImage: ASSET_IMAGES.sareeBorder,
    salesCount: 142,
    createdAt: '2026-09-01',
    isFeatured: true,
  },
  {
    id: 'col-2',
    title: 'Awadhi Chikankari Boutique Capsule',
    description: 'Collection of 8 delicate shadow work, tepchi, and floral spray designs. Ideal for women kurtis, dupattas, and luxury linen collections.',
    category: 'Floral & Motifs',
    price: 3499,
    originalTotal: 6200,
    sellerId: 'creator-4',
    sellerName: 'Lucknow Chikan digitizing',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    designCount: 8,
    includedDesignIds: ['des-102', 'des-107'],
    coverImage: ASSET_IMAGES.chikankari,
    salesCount: 98,
    createdAt: '2026-10-15',
    isFeatured: true,
  },
  {
    id: 'col-3',
    title: 'Imperial Banarasi Zari & Velvet Archive',
    description: 'Four monumental royal medallions, borders, and dupattas crafted with antique metallic gold thread formulas.',
    category: 'Pallu & Dupatta',
    price: 4299,
    originalTotal: 7100,
    sellerId: 'creator-2',
    sellerName: 'Varanasi Zari Atelier',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    designCount: 4,
    includedDesignIds: ['des-104', 'des-101'],
    coverImage: ASSET_IMAGES.hero,
    salesCount: 87,
    createdAt: '2026-10-25',
    isFeatured: false,
  },
  {
    id: 'col-4',
    title: 'Marwar Gota & Sequin Bridal Master Pack',
    description: 'Complete 16-kali lehenga, blouse front, back, and dupatta set for premium high-fashion bridal couture studios.',
    category: 'Bridal Lehenga',
    price: 6999,
    originalTotal: 11400,
    sellerId: 'creator-3',
    sellerName: 'Rajputana Thread Studio',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    designCount: 5,
    includedDesignIds: ['des-108', 'des-105', 'des-103'],
    coverImage: ASSET_IMAGES.navySequin,
    salesCount: 119,
    createdAt: '2026-10-30',
    isFeatured: true,
  },
];

export const INITIAL_PURCHASES: PurchaseRecord[] = [
  {
    id: 'pur-901',
    orderNumber: 'ORD-TXH-2026-8812',
    type: 'design',
    itemId: 'des-101',
    itemTitle: 'Royal Zari Saree Border with Lotus Medallion',
    itemImage: ASSET_IMAGES.sareeBorder,
    category: 'Saree Borders',
    sellerName: 'Surat Embroidery Works',
    amountPaid: 1499,
    date: '2026-11-01',
    status: 'completed',
    downloadUrls: [
      { format: 'EMB', filename: 'Royal_Lotus_Border_v2.EMB', size: '4.8 MB' },
      { format: 'DST', filename: 'Royal_Lotus_Border_v2.DST', size: '2.1 MB' },
      { format: 'PES', filename: 'Royal_Lotus_Border_v2.PES', size: '2.3 MB' },
      { format: 'PDF', filename: 'Color_Stop_Sequence.PDF', size: '640 KB' },
    ],
  },
  {
    id: 'pur-902',
    orderNumber: 'ORD-TXH-2026-8740',
    type: 'collection',
    itemId: 'col-2',
    itemTitle: 'Awadhi Chikankari Boutique Capsule',
    itemImage: ASSET_IMAGES.chikankari,
    category: 'Floral & Motifs',
    sellerName: 'Lucknow Chikan digitizing',
    amountPaid: 3499,
    date: '2026-10-24',
    status: 'completed',
    downloadUrls: [
      { format: 'ZIP', filename: 'Awadhi_Chikankari_All_Files.ZIP', size: '34.2 MB' },
      { format: 'PDF', filename: 'Collection_Documentation.PDF', size: '2.8 MB' },
    ],
  },
];

export const INITIAL_EARNINGS: EarningRecord[] = [
  {
    id: 'earn-501',
    designName: 'Royal Zari Saree Border with Lotus Medallion',
    image: ASSET_IMAGES.sareeBorder,
    buyerPaid: 1499,
    commission: 224.85,
    netEarning: 1274.15,
    status: 'available',
    saleDate: '2026-11-02 14:22',
    settlementCycle: 'Cycle #48 (Nov 1–Nov 4)',
    scheduledSettlementDate: '2026-11-06',
    environment: 'Test Mode',
  },
  {
    id: 'earn-502',
    designName: 'Midnight Royal Bridal All-Over Sequin Jaal',
    image: ASSET_IMAGES.navySequin,
    buyerPaid: 2899,
    commission: 434.85,
    netEarning: 2464.15,
    status: 'pending',
    saleDate: '2026-11-04 18:10',
    settlementCycle: 'Cycle #49 (Nov 5–Nov 10)',
    scheduledSettlementDate: '2026-11-12',
    environment: 'Test Mode',
  },
  {
    id: 'earn-503',
    designName: 'Surat Schiffli Lace Border with Scalloped Edge',
    image: ASSET_IMAGES.chikankari,
    buyerPaid: 2100,
    commission: 315.00,
    netEarning: 1785.00,
    status: 'available',
    saleDate: '2026-11-03 09:45',
    settlementCycle: 'Cycle #48 (Nov 1–Nov 4)',
    scheduledSettlementDate: '2026-11-06',
    environment: 'Test Mode',
  },
  {
    id: 'earn-504',
    designName: 'Royal Zari Saree Border with Lotus Medallion',
    image: ASSET_IMAGES.sareeBorder,
    buyerPaid: 1499,
    commission: 224.85,
    netEarning: 1274.15,
    status: 'pending',
    saleDate: '2026-11-04 22:30',
    settlementCycle: 'Cycle #49 (Nov 5–Nov 10)',
    scheduledSettlementDate: '2026-11-12',
    environment: 'Test Mode',
  },
];

export const INITIAL_SETTLEMENT_CYCLES: SettlementCycle[] = [
  {
    id: 'cycle-49',
    cyclePeriod: 'Cycle #49 (Nov 5 – Nov 10, 2026)',
    startDay: 'Nov 5, 2026',
    endDay: 'Nov 10, 2026',
    settlementDate: 'Nov 12, 2026',
    salesCount: 8,
    waitingAmount: 18450,
    releasedAmount: 0,
    paidAmount: 0,
    status: 'upcoming',
  },
  {
    id: 'cycle-48',
    cyclePeriod: 'Cycle #48 (Nov 1 – Nov 4, 2026)',
    startDay: 'Nov 1, 2026',
    endDay: 'Nov 4, 2026',
    settlementDate: 'Nov 6, 2026',
    salesCount: 14,
    waitingAmount: 0,
    releasedAmount: 32650,
    paidAmount: 0,
    status: 'processing',
  },
  {
    id: 'cycle-47',
    cyclePeriod: 'Cycle #47 (Oct 25 – Oct 31, 2026)',
    startDay: 'Oct 25, 2026',
    endDay: 'Oct 31, 2026',
    settlementDate: 'Nov 2, 2026',
    salesCount: 22,
    waitingAmount: 0,
    releasedAmount: 48900,
    paidAmount: 48900,
    status: 'completed',
  },
];

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wdr-301',
    amount: 25000,
    date: '2026-11-04 11:30',
    status: 'Processing',
    bankAccount: 'HDFC Bank ending in 4082',
    referenceId: 'NEFT-TXH-99214',
    canCancel: true,
  },
  {
    id: 'wdr-300',
    amount: 48900,
    date: '2026-11-02 16:15',
    status: 'Paid',
    bankAccount: 'HDFC Bank ending in 4082',
    referenceId: 'IMPS-TXH-88102',
    canCancel: false,
  },
  {
    id: 'wdr-299',
    amount: 32000,
    date: '2026-10-20 10:00',
    status: 'Paid',
    bankAccount: 'HDFC Bank ending in 4082',
    referenceId: 'IMPS-TXH-77401',
    canCancel: false,
  },
];

export const INITIAL_LEDGER: LedgerItem[] = [
  {
    id: 'led-1',
    label: 'Earning added',
    amount: 2464.15,
    type: 'credit',
    bucket: 'Pending',
    dateTime: 'Nov 4, 2026 · 18:10',
    itemRef: 'Order #ORD-TXH-8921 (Midnight Sequin Jaal)',
    rawCode: 'earning_pending_credit',
  },
  {
    id: 'led-2',
    label: 'Withdrawal reserved',
    amount: 25000.00,
    type: 'debit',
    bucket: 'Available',
    dateTime: 'Nov 4, 2026 · 11:30',
    itemRef: 'Withdrawal Request #wdr-301',
    rawCode: 'withdrawal_reserve_available_debit',
  },
  {
    id: 'led-3',
    label: 'Earning released',
    amount: 32650.00,
    type: 'credit',
    bucket: 'Available',
    dateTime: 'Nov 4, 2026 · 00:01',
    itemRef: 'Settlement Cycle #48 Released',
    rawCode: 'earning_release_pending_debit',
  },
  {
    id: 'led-4',
    label: 'Payout completed',
    amount: 48900.00,
    type: 'credit',
    bucket: 'Paid',
    dateTime: 'Nov 2, 2026 · 16:15',
    itemRef: 'Bank Transfer IMPS-TXH-88102',
    rawCode: 'payout_settlement_paid_credit',
  },
  {
    id: 'led-5',
    label: 'Earning added',
    amount: 1274.15,
    type: 'credit',
    bucket: 'Pending',
    dateTime: 'Nov 2, 2026 · 14:22',
    itemRef: 'Order #ORD-TXH-8812 (Lotus Saree Border)',
    rawCode: 'earning_pending_credit',
  },
  {
    id: 'led-6',
    label: 'Balance adjustment',
    amount: 500.00,
    type: 'credit',
    bucket: 'Available',
    dateTime: 'Oct 30, 2026 · 12:00',
    itemRef: 'Creator Bonus · Top Seller Milestone Surat Hub',
    rawCode: 'bonus_manual_credit',
  },
];

export const MACHINE_OPTIONS = [
  'Multi-head Embroidery',
  'Schiffli',
  'Single Head',
  'Cording / Chain Stitch',
  'Flat Knitting',
  'Ari / Sequence Multi',
];

export const MACHINE_TYPE_OPTIONS = [
  'Industrial Multi-Head',
  'Commercial Schiffli',
  'Single Needle Boutique',
  'High-Speed Flatbed',
];

export const CATEGORY_OPTIONS = [
  'Saree Borders',
  'Pallu & Dupatta',
  'Blouse & Neckline',
  'All-over Jaal',
  'Lace & Patti',
  'Floral & Motifs',
  'Bridal Lehenga',
  'Kurti Front',
];

export const DESIGN_TYPE_OPTIONS = [
  'Zari Work',
  'Dori Cording',
  'Sequins 3mm',
  'Double Sequence (3mm + 5mm)',
  'Resham Thread',
  'Water Soluble',
  'Mirror Embroidery',
  'Gota Patti',
  'Cutwork',
  'Applique',
];

export const FILE_FORMAT_OPTIONS = ['EMB', 'DST', 'PES', 'JEF', 'EXP'];
