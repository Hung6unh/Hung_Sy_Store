import { Product, Brand, Category, ReviewComment } from './types';

const HANDCRAFTED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ASUS ROG Strix G16 G614JV',
    brand: 'ASUS',
    category: 'gaming',
    originalPrice: 38990000,
    discountPrice: 34490000,
    discountPercentage: 11,
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80'
    ],
    bestSeller: true,
    flashSale: true,
    specs: {
      cpu: 'Intel Core i7-13650HX (14 Cores, 20 Threads, up to 4.9GHz)',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP 140W)',
      ram: '16GB DDR5 4800MHz (Upgradable to 32GB)',
      ssd: '512GB PCIe 4.0 NVMe M.2 SSD',
      screen: '16-inch FHD+ (1920 x 1200) IPS, 165Hz, 100% sRGB, G-Sync',
      battery: '4-cell Li-ion, 90Whr',
      weight: '2.50 kg'
    },
    description: 'ASUS ROG Strix G16 G614JV là quái thú gaming đích thực của năm 2026. Sở hữu sức mạnh vượt trội từ CPU Intel thế hệ 13 dòng HX hiệu năng cao kết hợp cùng card đồ họa RTX 4060, máy cân mượt mà mọi tựa game AAA ở thiết lập đồ họa cao nhất. Hệ thống tản nhiệt ROG Intelligent Cooling 3 quạt siêu mát đảm bảo máy luôn hoạt động ổn định trong các trận đấu kéo dài hàng giờ.',
    comments: [
      { id: 'c1', author: 'Nguyễn Văn Nam', rating: 5, date: '2026-05-10', content: 'Máy cực kỳ mạnh mẽ, chiến Cyberpunk 2077 mượt mà 80fps ở thiết lập Ultra. Nhiệt độ rất mát chỉ tầm 75 độ C. Nhân viên Hùng Sỹ tư vấn nhiệt tình.' },
      { id: 'c2', author: 'Trần Minh Hoàng', rating: 4, date: '2026-05-18', content: 'Thiết kế đậm chất gaming, đèn LED RGB xung quanh thân máy rất đẹp mắt. Màn hình 165Hz siêu mượt, tuy nhiên máy hơi nặng một chút khi mang đi học.' }
    ]
  },
  {
    id: '2',
    name: 'MSI Katana 15 B13VGK',
    brand: 'MSI',
    category: 'gaming',
    originalPrice: 42990000,
    discountPrice: 38990000,
    discountPercentage: 9,
    rating: 4.7,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    flashSale: true,
    specs: {
      cpu: 'Intel Core i9-13900H (14 Cores, 20 Threads, up to 5.4GHz)',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      ram: '16GB DDR5 5200MHz Dual Channel',
      ssd: '1TB PCIe Gen4 NVMe M.2 SSD',
      screen: '15.6-inch QHD (2560 x 1440) IPS, 165Hz, 100% DCI-P3',
      battery: '3-cell, 53.5Whr',
      weight: '2.25 kg'
    },
    description: 'Giống như thanh bảo kiếm Katana sắc bén, MSI Katana 15 đem lại sức mạnh hủy diệt mọi tựa game khó nhằn. CPU Core i9 đỉnh cao kết hợp RTX 4070 mang lại hiệu năng đỉnh phong cho cả game thủ chuyên nghiệp lẫn những nhà sáng tạo nội dung 3D nâng cao.',
    comments: [
      { id: 'c3', author: 'Phạm Đức Duy', rating: 5, date: '2026-04-12', content: 'Card RTX 4070 trên con này quá bá đạo. Mình chạy render video 4K nhanh kinh khủng. Hàng chuẩn Hùng Sỹ mua bảo hành 2 năm cực an tâm!' }
    ]
  },
  {
    id: '3',
    name: 'Acer Nitro V 15 ANV15-51',
    brand: 'ACER',
    category: 'gaming',
    originalPrice: 24990000,
    discountPrice: 20990000,
    discountPercentage: 16,
    rating: 4.6,
    reviewsCount: 152,
    image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i5-13420H (8 Cores, 12 Threads, up to 4.6GHz)',
      gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      ram: '8GB DDR5 5200MHz',
      ssd: '512GB NVMe PCIe Gen4 M.2 SSD',
      screen: '15.6-inch FHD (1920 x 1080) IPS, 144Hz, SlimBezel',
      battery: '4-cell Li-ion, 57Whr',
      weight: '2.10 kg'
    },
    description: 'Acer Nitro V 15 định nghĩa lại giá trị của laptop gaming phân khúc tầm trung. Với thiết kế hiện đại phá cách, cấu hình tối ưu với RTX 4050 mang lại tốc độ xử lý tuyệt vời cho các tựa game esports thịnh hành như Valorant, League of Legends, CS2.',
    comments: [
      { id: 'c4', author: 'Lê Hoàng Dương', rating: 4, date: '2026-05-01', content: 'Giá tốt nhất phân khúc RTX 4050. Màn hình 144Hz mượt mà, chơi CS2 FPS cực kỳ ổn định. Sẽ giới thiệu bạn bè mua ở Hùng Sỹ.' }
    ]
  },
  {
    id: '4',
    name: 'Dell XPS 15 9530 Premium',
    brand: 'DELL',
    category: 'office',
    originalPrice: 65990000,
    discountPrice: 59990000,
    discountPercentage: 9,
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ],
    bestSeller: true,
    specs: {
      cpu: 'Intel Core i7-13700H (14 Cores, 20 Threads, up to 5.0GHz)',
      gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6 Studio Edition',
      ram: '32GB DDR5 Dual Channel',
      ssd: '1TB PCIe 4.0 NVMe M.2 SSD',
      screen: '15.6-inch 3.5K (3456 x 2160) OLED Touch, 100% DCI-P3, 400 nits',
      battery: '6-cell, 86Whr',
      weight: '1.92 kg'
    },
    description: 'Dell XPS 15 9530 là sự hòa quyện hoàn hảo giữa nghệ thuật chế tác kim loại nguyên khối CNC tinh xảo và sức mạnh công nghệ tối tân. Màn hình OLED vô cực 3.5K siêu nét cùng dải màu DCI-P3 100% biến mỗi khung hình trở thành tác phẩm nghệ thuật, là lựa chọn số 1 của giới doanh nhân và nhà thiết kế thượng lưu.',
    comments: [
      { id: 'c5', author: 'Doanh nhân Nguyễn Lâm', rating: 5, date: '2026-03-24', content: 'Thiết kế thời thượng đẳng cấp, màn hình OLED thực sự xuất sắc. Phù hợp cho công việc duyệt số liệu và xử lý đồ họa cao cấp của tôi.' }
    ]
  },
  {
    id: '5',
    name: 'Lenovo ThinkPad E14 Gen 5',
    brand: 'LENOVO',
    category: 'student',
    originalPrice: 19990000,
    discountPrice: 17490000,
    discountPercentage: 12,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i5-1335U (10 Cores, 12 Threads, up to 4.6GHz)',
      gpu: 'Intel Iris Xe Graphics',
      ram: '16GB DDR4 3200MHz',
      ssd: '512GB SSD M.2 NVMe PCIe',
      screen: '14.0-inch WUXGA (1920 x 1200) IPS, Anti-glare, 100% sRGB',
      battery: '3-cell, 47Whr',
      weight: '1.43 kg'
    },
    description: 'Bền bỉ, tinh tế và đáng tin cậy. Lenovo ThinkPad E14 Gen 5 thừa hưởng bàn phím ThinkPad huyền thoại gõ siêu êm tay, cấu hình mượt ổn định cho mọi công việc văn phòng, lập trình hay học tập cường độ cao của học sinh - sinh viên công nghệ.',
    comments: [
      { id: 'c6', author: 'Vũ Quốc Khánh (IT Student)', rating: 5, date: '2026-04-20', content: 'Bàn phím ThinkPad gõ code cực đỉnh. Máy chạy mượt mà, thời lượng pin rất tốt cho một buổi học dài ở trường.' }
    ]
  },
  {
    id: '6',
    name: 'HP Pavilion 15-eg3093TU',
    brand: 'HP',
    category: 'student',
    originalPrice: 17990000,
    discountPrice: 15490000,
    discountPercentage: 13,
    rating: 4.5,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i5-1335U (10 Cores, 12 Threads, up to 4.6GHz)',
      gpu: 'Intel Iris Xe Graphics',
      ram: '8GB DDR4 3200MHz (Dual channel)',
      ssd: '512GB PCIe NVMe M.2 SSD',
      screen: '15.6-inch FHD (1920 x 1080) IPS, Micro-edge anti-glare',
      battery: '3-cell, 41Whr',
      weight: '1.74 kg'
    },
    description: 'Vẻ ngoài thanh lịch tinh tế của HP Pavilion 15 làm siêu lòng người dùng ngay từ cái nhìn đầu tiên. Thân máy chế tạo mỏng nhẹ từ hợp kim nhôm, màu sắc sang trọng, hiệu năng văn phòng vượt trội trong tầm giá phổ thông.',
    comments: [
      { id: 'c7', author: 'Nguyễn Thị Ngọc', rating: 4, date: '2026-05-15', content: 'Thiết kế đẹp màu vàng gold cực kỳ sang trọng. Mình học ngành kinh tế dùng máy này làm slide Powerpoint và Excel mượt mà lắm.' }
    ]
  },
  {
    id: '7',
    name: 'MacBook Pro 14 M3 Max Pro',
    brand: 'APPLE',
    category: 'macbook',
    originalPrice: 52990000,
    discountPrice: 47990000,
    discountPercentage: 9,
    rating: 4.9,
    reviewsCount: 68,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    bestSeller: true,
    specs: {
      cpu: 'Apple M3 Pro (11-Core CPU, 14-Core GPU)',
      gpu: '14-Core Apple GPU (Hardware accelerated ray tracing)',
      ram: '18GB Unified Memory',
      ssd: '512GB Superfast SSD',
      screen: '14.2-inch Liquid Retina XDR, ProMotion 120Hz, 1600 nits Extreme Dynamic Range',
      battery: 'Up to 18 hours Apple TV app movie playback',
      weight: '1.61 kg'
    },
    description: 'Sự tối tân mang nhãn hiệu Apple. MacBook Pro 14 M3 Pro mang lại một thời lượng pin siêu khủng lên tới 18 giờ liên tục, màn hình Liquid Retina XDR với tần số quét 120Hz hiển thị tuyệt hảo. Đây là chuẩn mực tối thượng cho các lập trình viên, designer, và giới sáng tạo chuyên nghiệp.',
    comments: [
      { id: 'c8', author: 'Lê Minh Hùng', rating: 5, date: '2026-05-02', content: 'Lần đầu tiên chuyển sang dùng macbook m3 pro mua tại Hùng Sỹ, quá ngỡ ngàng vì hiệu năng chạy giả lập mobile cực kỳ êm mát và pin trâu khủng khiếp!' }
    ]
  },
  {
    id: '8',
    name: 'MacBook Air 13 M3 Sleek',
    brand: 'APPLE',
    category: 'macbook',
    originalPrice: 28990000,
    discountPrice: 25490000,
    discountPercentage: 12,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Apple M3 (8-Core CPU, 10-Core GPU)',
      gpu: '10-Core Apple GPU',
      ram: '8GB Unified Memory',
      ssd: '256GB Superfast SSD',
      screen: '13.6-inch Liquid Retina display, True Tone technology, 500 nits',
      battery: 'Up to 18 hours of usage',
      weight: '1.24 kg'
    },
    description: 'Siêu mỏng nhẹ, siêu di động. MacBook Air 13 M3 thiết lập chuẩn mực bền bỉ cho học sinh sinh viên năng động. Thiết kế không quạt hoàn toàn im lặng tuyệt đối, lớp vỏ nhôm tái chế bền vững vô địch.',
    comments: [
      { id: 'c9', author: 'Thu Hà', rating: 5, date: '2026-04-28', content: 'Mỏng nhẹ không tưởng, bỏ vào balo đi học siêu nhẹ. Pin mình dùng cả ngày lên giảng đường tối về vẫn còn 30%.' }
    ]
  },
  {
    id: '9',
    name: 'Bàn phím cơ ROG Strix Scope II RX Lube',
    brand: 'ASUS',
    category: 'accessory',
    originalPrice: 3590000,
    discountPrice: 2990000,
    discountPercentage: 16,
    rating: 4.8,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'ROG RX Optical Mechanical Switches',
      gpu: 'IP57 Waterproof and Dustproof',
      ram: 'Integrated Sound-Dampening Foam',
      ssd: 'Detachable USB-C',
      screen: 'RGB Aura Sync fully customizable'
    },
    description: 'Bàn phím cơ gaming ROG Strix Scope II trang bị switch quang học độc quyền ROG RX được bôi trơn sẵn (pre-lubed), đem lại phím nhấn cực kỳ mượt mà, độ trễ tiệm cận 0 và dải đèn LED Aura Sync rực rỡ.',
    comments: [
      { id: 'c10', author: 'Minh Tuấn', rating: 5, date: '2026-05-19', content: 'Bàn phím gõ êm vô địch, tiếng switch RX Red hay cực kỳ tai. Giao hàng Hùng Sỹ hỏa tốc 2 giờ siêu tốc!' }
    ]
  },
  {
    id: '10',
    name: 'Chuột Logitech G502 X Plus Lightspeed',
    brand: 'DIF',
    category: 'accessory',
    originalPrice: 3890000,
    discountPrice: 3290000,
    discountPercentage: 15,
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'HERO 25K Sensor ultra gaming logic',
      gpu: 'Up to 25600 DPI, zero smoothing',
      ram: 'LIGHTFORCE Hybrid Optical-Mechanical Switches',
      ssd: 'LIGHTSPEED Wireless connection standard',
      screen: 'Up to 120 hours battery life (37 hours RGB enabled)'
    },
    description: 'Huyền thoại chuột gaming tái sinh mạnh mẽ hơn. G502 X Plus sở hữu nút bấm hybrid cơ-quang học đột phá, mắt đọc HERO 25K chuẩn xác nhất thế giới cùng công nghệ không dây Lightspeed siêu nhạy.',
    comments: [
      { id: 'c11', author: 'Đăng Khoa', rating: 5, date: '2026-05-20', content: 'Thiết kế ôm tay, nút bấm quang học phản hồi nhạy bén và tốn pin siêu lâu. Giá tốt nhất thị trường chỉ có tại Hùng Sỹ.' }
    ]
  }
];

function generateMoreProducts(): Product[] {
  const categories: Category[] = ['gaming', 'student', 'office', 'macbook', 'accessory'];
  const generated: Product[] = [];
  
  let idCounter = 11;

  const dataMap = {
    gaming: {
      brands: ['ASUS', 'MSI', 'ACER', 'DELL', 'LENOVO', 'HP'] as Brand[],
      models: [
        'ROG Strix Scar 18', 'Legion Pro 7i', 'Predator Helios 16',
        'Katana 17 B13V', 'TUF Gaming A15', 'Victus 16 Pro',
        'LOQ 15IRH', 'Nitro 16 Special', 'G15 Gaming Master',
        'Cyborg 15 A12V', 'Blade 16 Dual', 'Omen Transcend 14'
      ],
      cpus: [
        'Intel Core i9-14900HX (24 Cores, 32 Threads)',
        'Intel Core i7-14700HX (20 Cores, 28 Threads)',
        'AMD Ryzen 9 7945HX3D (16 Cores, 32 Threads)',
        'AMD Ryzen 7 7840HS (8 Cores, 16 Threads)',
        'Intel Core i5-13450HX (10 Cores, 16 Threads)'
      ],
      gpus: [
        'NVIDIA GeForce RTX 4090 16GB GDDR6',
        'NVIDIA GeForce RTX 4080 12GB GDDR6',
        'NVIDIA GeForce RTX 4070 8GB GDDR6',
        'NVIDIA GeForce RTX 4060 8GB GDDR6',
        'NVIDIA GeForce RTX 4050 6GB GDDR6'
      ],
      rams: ['16GB DDR5 5600MHz Dual Channel', '32GB DDR5 5600MHz Dual Channel', '64GB DDR5 4800MHz Ultra Speed'],
      ssds: ['512GB NVMe PCIe Gen4 M.2 SSD', '1TB PCIe 4.0 NVMe M.2 SSD', '2TB PCIe 4.0 NVMe M.2 SSD'],
      screens: [
        '16.0-inch QHD+ (2560 x 1600) IPS, 240Hz, 100% DCI-P3',
        '15.6-inch FHD (1920 x 1080) IPS, 144Hz, sRGB 100%',
        '17.3-inch QHD (2560 x 1440) IPS, 165Hz, 100% sRGB',
        '16.0-inch UHD+ (3840 x 2400) ROG Nebula OLED, 120Hz'
      ],
      descriptions: [
        'Cỗ máy chiến game tối thượng sở hữu phong cách thiết kế hầm hố cùng khối tản nhiệt buồng hơi tinh xảo.',
        'Laptop Gaming đỉnh cao được thiết kế nhằm mang lại trải nghiệm chiến đấu esports mượt mà nhất có thể.',
        'Thiết kế sắc sảo lấy cảm hứng từ những chú rồng đỏ MSI, mang hiệu năng cực khủng chinh phục game thủ.'
      ],
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80'
      ]
    },
    student: {
      brands: ['ASUS', 'ACER', 'LENOVO', 'HP', 'DELL'] as Brand[],
      models: [
        'Vivobook 16X', 'Pavilion Aero 13', 'IdeaPad Slim 5',
        'Inspiron 3530', 'Aspire Lite 15', 'Yoga Slim 6',
        'Vostro 14 Essential', 'ZBook Firefly 14', 'Swift Go 14',
        'Vivobook S 14 OLED'
      ],
      cpus: [
        'Intel Core i5-1335U (10 Cores, 12 Threads)',
        'AMD Ryzen 5 7530U (6 Cores, 12 Threads)',
        'Intel Core i3-1315U (6 Cores, 8 Threads)',
        'AMD Ryzen 7 7730U (8 Cores, 16 Threads)',
        'Intel Core i5-1240P (12 Cores, 16 Threads)'
      ],
      gpus: [
        'Intel Iris Xe Graphics',
        'AMD Radeon Graphics',
        'Intel UHD Graphics'
      ],
      rams: ['8GB DDR4 3200MHz', '16GB DDR4 3200MHz', '16GB LPDDR5 4800MHz Onboard'],
      ssds: ['256GB PCIe NVMe M.2 SSD', '512GB NVMe PCIe Gen4 M.2 SSD', '1TB NVMe Gen4 SSD'],
      screens: [
        '14.0-inch FHD+ (1920 x 1200) IPS, Anti-glare, 300 nits',
        '15.6-inch FHD (1920 x 1080) LED backlit, sRGB 45%',
        '16.0-inch WUXGA IPS borderless screen'
      ],
      descriptions: [
        'Hoàn hảo cho nhu cầu viết code, làm thuyết trình và học tập trực tuyến bền bỉ suốt cả ngày dài.',
        'Mẫu laptop mỏng nhẹ giá hạt dẻ lý tưởng đồng hành cùng các bạn học sinh viên trên con đường học tập.',
        'Hiệu năng ổn định thời lượng pin bền bỉ giúp bạn dễ dàng cân mọi môn học khó nhằn nhất ở trường.'
      ],
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=800&q=80'
      ]
    },
    office: {
      brands: ['DELL', 'ASUS', 'HP', 'LENOVO'] as Brand[],
      models: [
        'XPS 13 Plus 9320', 'Zenbook 14 OLED', 'EliteBook 1040 G10',
        'ThinkPad X1 Carbon Gen 11', 'Latitude 7440', 'Spectre x360',
        'Zenbook Duo Dual-Screen', 'ThinkBook 14 G6', 'Inspiron 16 Plus'
      ],
      cpus: [
        'Intel Core Ultra 7 155H (16 Cores, 22 Threads, Arc GPU)',
        'Intel Core i7-1360P (12 Cores, 16 Threads)',
        'Intel Core Ultra 5 125H (14 Cores, 18 Threads)',
        'AMD Ryzen 7 7840U (8 Cores, 16 Threads)'
      ],
      gpus: [
        'Intel Arc Graphics (7 Cores / 8 Cores)',
        'Intel Iris Xe Graphics Professional',
        'AMD Radeon 780M High Performance'
      ],
      rams: ['16GB LPDDR5x 6400MHz Dual Channel', '32GB LPDDR5x 7400MHz Dual Channel', '64GB LPDDR5x Onboard'],
      ssds: ['512GB PCIe NVMe Gen4 SSD', '1TB Superfast PCIe 4.0 NVMe SSD', '2TB NVMe PCIe Gen4 x4 SSD'],
      screens: [
        '14.0-inch 2.8K (2880 x 1800) OLED, 120Hz, 100% DCI-P3, HDR',
        '13.4-inch FHD+ InfinityEdge IPS Anti-Reflective',
        '14.0-inch WQXGA IPS Professional display'
      ],
      descriptions: [
        'Chuẩn mực laptop doanh nhân cao cấp với thiết chế tinh mỹ bằng Carbon dệt cùng bộ bảo mật vân tay tối tân.',
        'Sự kết hợp hoàn hào giữa phong cách tối giản thanh lịch và công nghệ vi xử lý AI Intel Ultra đỉnh cao.',
        'Màn hình OLED 2.8K siêu sặc sỡ giúp nâng tầm hiệu quả công việc văn phòng và giải trí của giới tinh hoa.'
      ],
      images: [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
      ]
    },
    macbook: {
      brands: ['APPLE'] as Brand[],
      models: [
        'MacBook Air 15 M3 Slim', 'MacBook Pro 14 M3 Pro',
        'MacBook Pro 16 M3 Max Ultra', 'MacBook Air 13 M2 SpaceGray',
        'MacBook Pro 16 M2 Pro Studio', 'MacBook Pro 14 M3 Base'
      ],
      cpus: [
        'Apple M3 (8-Core CPU, 10-Core GPU)',
        'Apple M3 Pro (12-Core CPU, 18-Core GPU)',
        'Apple M3 Max (14-Core CPU, 30-Core GPU)',
        'Apple M3 Max Beast (16-Core CPU, 40-Core GPU)'
      ],
      gpus: [
        'Apple 10-Core GPU Engine',
        'Apple 18-Core Metal GPU',
        'Apple 40-Core Ultra-Max GPU'
      ],
      rams: ['8GB Unified Memory Space', '16GB Unified Memory Space', '18GB Unified Memory Space', '36GB Unified Memory Space', '48GB Unified Memory Star', '96GB Super Unified Memory'],
      ssds: ['256GB Apple Fast SSD', '512GB Apple Fast SSD', '1TB Apple Superfast SSD', '2TB Apple Superfast SSD'],
      screens: [
        '13.6-inch Liquid Retina display with True Tone',
        '14.2-inch Liquid Retina XDR screen 120Hz ProMotion',
        '15.3-inch Liquid Retina screen with sRGB color gamut',
        '16.2-inch Liquid Retina XDR screen 120Hz ProMotion 1600 nits'
      ],
      descriptions: [
        'Sản phẩm định hình phân khúc đồ họa sang xịn mịn với chip Apple silicon tối ưu hóa năng lượng tuyêt hảo.',
        'Bệ phóng hoàn hảo cho các nhà làm phim 4K nâng cao, nhạc sỹ chuyên nghiệp và giới lập trình viên cao cấp.',
        'MacBook mang dải vỏ màu Midnight đẳng cấp thu hút mọi ánh nhìn cùng dải tản nhiệt không tiếng ồn.'
      ],
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
      ]
    },
    accessory: {
      brands: ['ASUS', 'MSI', 'DIF'] as Brand[],
      models: [
        'Bàn phím cơ không dây ROG Azoth Pro', 'Chuột Silent Pebble M350',
        'Tai nghe chụp tai ROG Delta S Wireless', 'Đế tản nhiệt làm mát CoolerMaster V90',
        'Cáp sạc đa năng HyperDrive 100W', 'Bàn di chuột LED Razer Firefly V2',
        'Chuột Pro Gaming Razer DeathAdder V3', 'Webcam ASUS ROG Eye S Full HD',
        'Loa vi tính SoundBar MSI MAG Max'
      ],
      cpus: [
        'Premium Mechanical Dynamic Engine',
        'Super high-speed optical connection sensor',
        'Dual-layer heat exchange ventilation chassis',
        'Multi-device simultaneous fast switching technology'
      ],
      gpus: [
        'Professional gaming responsive control latency < 1ms',
        'High compliance safety certificate standards',
        'Noise cancelling microphone integrated dual chip'
      ],
      rams: ['Sound-damping dampener layers design', 'Dynamic customizable RGB software support', 'Premium magnetic docking accessories'],
      ssds: ['USB Type-C detachable woven wire', 'Extra long duration lithium battery build', 'Ergonomic shape lightweight posture comfort'],
      screens: [
        'High durability rating: 100M clicks life',
        'OLED smart custom display screen details indicator',
        'Compatibility standard support: Windows / macOS / iPadOS'
      ],
      descriptions: [
        'Phụ kiện cao cấp được thiết kế tinh xảo giúp tối ưu hóa không gian làm việc và trải nghiệm giải trí tối đa.',
        'Lựa chọn hoàn hảo để bổ sung cho bộ PC hoặc laptop của bạn, mang lại hiệu suất tối đa trong các phiên làm việc.',
        'Được thiết kế đột phá, mang cấu hình tiên tiến cùng mức giá vô cùng phải chăng và tuổi đời siêu bền bỉ.'
      ],
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527866990279-2d64bfb022cc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      ]
    }
  };

  const commentAuthors = [
    'Nguyễn Gia Bảo', 'Phạm Quỳnh Anh', 'Lê Tấn Phát', 'Trần Khánh Vy',
    'Phạm Quốc Huy', 'Hoàng Thu Trang', 'Đỗ Việt Hoàng', 'Vũ Thùy Linh',
    'Trịnh Thanh Sơn', 'Nguyễn Mai Chi', 'Tạ Đình Phong', 'Bùi Xuân Huấn'
  ];

  const commentContents = [
    'Sản phẩm tuyệt vời trong tầm giá, nhân viên Hùng Sỹ hỗ trợ cài win sướng cực kì!',
    'Không gian đóng gói cẩn thận, shipper giao hỏa tốc 2 tiếng đúng giờ. Cho 5 sao.',
    'Dùng mượt ngon, tản nhiệt rất mát không bị bí bách. Đáng đồng tiền bát gạo.',
    'Sản phẩm đúng như mô tả, mẫu mã thiết kế sang trọng lịch thiệp. Chúc shop mua may bán đắt!',
    'Máy chạy rất mượt mà. Tuy nhiên dính tí bụi ở viền nhưng lau là sạch ngay, phục vụ chu đáo.'
  ];

  for (const cat of categories) {
    const data = dataMap[cat];
    const alreadyExistsCount = cat === 'gaming' ? 3 : cat === 'office' ? 1 : cat === 'student' ? 2 : cat === 'macbook' ? 2 : 2;
    const itemsToGenerate = 100 - alreadyExistsCount;

    for (let i = 0; i < itemsToGenerate; i++) {
      const brand = data.brands[i % data.brands.length];
      const modelName = data.models[i % data.models.length];
      
      let name = '';
      if (cat === 'macbook') {
        name = `${brand} ${modelName} M3 v${i + 1}`;
      } else if (cat === 'accessory') {
        name = `${modelName} ${brand} H${i + 1}`;
      } else {
        name = `Laptop ${brand} ${modelName} v${i + 1}`;
      }

      let minOrig = 15000000;
      let maxOrig = 30000000;
      if (cat === 'gaming') { minOrig = 22000000; maxOrig = 75000000; }
      if (cat === 'office') { minOrig = 25000000; maxOrig = 60000000; }
      if (cat === 'macbook') { minOrig = 24000000; maxOrig = 95000000; }
      if (cat === 'accessory') { minOrig = 500000; maxOrig = 5000000; }

      const factor = (i % 10) / 10;
      const originalPrice = Math.floor((minOrig + (maxOrig - minOrig) * factor) / 10000) * 10000;
      const discountPercentage = 5 + (i % 15);
      const discountPrice = Math.floor((originalPrice * (100 - discountPercentage)) / 100000) * 1000;
      
      const rating = Number((4.2 + (i % 9) * 0.1).toFixed(1));
      const reviewsCount = 10 + (i % 120);

      const image = data.images[i % data.images.length];
      const bestSeller = (i % 12 === 0);
      const flashSale = (i % 18 === 0);

      // Make 12.5% of the programmatic products OUT OF STOCK (every 8th item)
      const inStock = !(i % 8 === 0);

      const gallery = [
        image,
        data.images[(i + 1) % data.images.length],
        data.images[(i + 2) % data.images.length]
      ];

      const specs = {
        cpu: data.cpus[i % data.cpus.length],
        gpu: data.gpus[i % data.gpus.length],
        ram: data.rams[i % data.rams.length],
        ssd: data.ssds[i % data.ssds.length],
        screen: data.screens[i % data.screens.length],
        battery: cat !== 'accessory' ? `${3 + (i % 3)}-cell, ${45 + (i % 5) * 10}Whr` : undefined,
        weight: cat !== 'accessory' ? `${(1.2 + (i % 6) * 0.3).toFixed(2)} kg` : undefined
      };

      const description = `${name} - ${data.descriptions[i % data.descriptions.length]} Sở hữu thông số cực kỳ tối tân với vi xử lý thế hệ mới, thiết kế chất liệu hợp kim bền vững và hệ tản nhiệt siêu êm. Được bảo hành chính hãng và phân phối trọn đời từ Laptop Hùng Sỹ.`;

      const commentsCount = 1 + (i % 3);
      const comments: ReviewComment[] = [];
      for (let j = 0; j < commentsCount; j++) {
        const commentAuthor = commentAuthors[(i + j) % commentAuthors.length];
        const commentContent = commentContents[(i * j + 2) % commentContents.length];
        const commentDate = `2026-05-${String(10 + (i + j) % 12).padStart(2, '0')}`;
        comments.push({
          id: `gen-c-${idCounter}-${j}`,
          author: commentAuthor,
          rating: Math.floor(rating),
          date: commentDate,
          content: commentContent
        });
      }

      generated.push({
        id: idCounter.toString(),
        name,
        brand,
        category: cat,
        originalPrice,
        discountPrice,
        discountPercentage,
        rating,
        reviewsCount,
        image,
        gallery,
        bestSeller,
        flashSale,
        inStock,
        specs,
        description,
        comments
      });

      idCounter++;
    }
  }

  return generated;
}

export const MOCK_PRODUCTS: Product[] = [
  ...HANDCRAFTED_PRODUCTS.map(p => ({ ...p, inStock: p.inStock ?? true })),
  ...generateMoreProducts()
];

export const MOCK_FLASHSALES = MOCK_PRODUCTS.filter(p => p.flashSale && p.inStock);
