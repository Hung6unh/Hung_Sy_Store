import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure Gemini Client is initialized lazy and securely on first request
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not set. Chatbot will run in offline demo mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "DEMO_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Compact product info to fit in system instructions efficiently
const PRODUCT_CATALOG_CONTEXT = [
  {
    id: '1',
    name: 'ASUS ROG Strix G16 G614JV',
    brand: 'ASUS',
    category: 'gaming',
    price: '34,490,000 VND (Gốc: 38,990,000 VND)',
    specs: 'Intel i7-13650HX, RTX 4060 8GB, 16GB DDR5, 512GB SSD, 16" FHD+ 165Hz',
    highlights: 'Chiến game AAA cực mượt, tản nhiệt ROG Intelligent 3 quạt, LED RGB.'
  },
  {
    id: '2',
    name: 'MSI Katana 15 B13VGK',
    brand: 'MSI',
    category: 'gaming',
    price: '38,990,000 VND (Gốc: 42,990,000 VND)',
    specs: 'Intel i9-13900H, RTX 4070 8GB, 16GB DDR5, 1TB SSD, 15.6" QHD 165Hz',
    highlights: 'Nhiệt năng sắc bén như kiếm Katana, RTX 4070 siêu khỏe, ổ cứng 1TB rộng rãi.'
  },
  {
    id: '3',
    name: 'Acer Nitro V 15 ANV15-51',
    brand: 'ACER',
    category: 'gaming',
    price: '20,990,000 VND (Gốc: 24,990,000 VND)',
    specs: 'Intel i5-13420H, RTX 4050 6GB, 8GB DDR5, 512GB SSD, 15.6" FHD 144Hz',
    highlights: 'Ông vua gaming phổ thông, cực kỳ tối ưu cho Valorant, CS2.'
  },
  {
    id: '4',
    name: 'Dell XPS 15 9530 Premium',
    brand: 'DELL',
    category: 'office',
    price: '59,990,000 VND (Gốc: 65,990,000 VND)',
    specs: 'Intel i7-13700H, RTX 4050 6GB Studio, 32GB DDR5, 1TB SSD, 15.6" 3.5K OLED Touch',
    highlights: 'Màn hình OLED vô cực siêu sắc nét, hoàn hảo cho doanh nhân, creator thượng lưu.'
  },
  {
    id: '5',
    name: 'Lenovo ThinkPad E14 Gen 5',
    brand: 'LENOVO',
    category: 'student',
    price: '17,490,000 VND (Gốc: 19,990,000 VND)',
    specs: 'Intel i5-1335U, Iris Xe, 16GB RAM, 512GB SSD, 14.0" WUXGA',
    highlights: 'Bàn phím gõ êm vô địch, độ bền quân đội, hoàn hảo cho lập trình viên.'
  },
  {
    id: '6',
    name: 'HP Pavilion 15-eg3093TU',
    brand: 'HP',
    category: 'student',
    price: '15,490,000 VND (Gốc: 17,990,000 VND)',
    specs: 'Intel i5-1335U, Iris Xe, 8GB RAM, 512GB SSD, 15.6" FHD IPS',
    highlights: 'Vỏ nhôm sang trọng màu vàng Gold, mỏng nhẹ thời trang cho sinh viên.'
  },
  {
    id: '7',
    name: 'MacBook Pro 14 M3 Max Pro',
    brand: 'APPLE',
    category: 'macbook',
    price: '47,990,000 VND (Gốc: 52,990,000 VND)',
    specs: 'Apple M3 Pro (11-Core CPU, 14-Core GPU), 18GB Unified Memory, 512GB SSD, 14.2" Liquid Retina XDR 120Hz',
    highlights: 'Màn hình Liquid Retina XDR, pin khủng 18 tiếng, hiệu năng thiết kế đỉnh cao.'
  },
  {
    id: '8',
    name: 'MacBook Air 13 M3 Sleek',
    brand: 'APPLE',
    category: 'macbook',
    price: '25,490,000 VND (Gốc: 28,990,000 VND)',
    specs: 'Apple M3 (8-Core CPU, 10-Core GPU), 8GB Unified, 256GB SSD, 13.6" Liquid Retina',
    highlights: 'Siêu mỏng nhẹ di động, thời lượng pin cả ngày, hoạt động hoàn toàn im lặng.'
  },
  {
    id: '9',
    name: 'Bàn phím cơ ROG Strix Scope II RX Lube',
    brand: 'ASUS',
    category: 'accessory',
    price: '2,990,000 VND (Gốc: 3,590,000 VND)',
    specs: 'ROG RX Optical Red Switch pre-lubed, RGB Aura Sync, IP57',
    highlights: 'Gõ cực mượt, phản hồi quang học siêu tốc, chống nước bụi bẩn.'
  },
  {
    id: '10',
    name: 'Chuột Logitech G502 X Plus Lightspeed',
    brand: 'DIF',
    category: 'accessory',
    price: '3,290,000 VND (Gốc: 3,890,000 VND)',
    specs: 'HERO 25K Sensor, up to 25600 DPI, Lightforce switches, Lightspeed wireless',
    highlights: 'Chuột gaming không dây huyền thoại, phản hồi siêu nhạy, tuổi thọ pin cao.'
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for laptop chatbot consultant
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống.' });
      }

      const apiKeyExists = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
      if (!apiKeyExists) {
        // Mock Response to simulate offline expert consultation politely
        setTimeout(() => {
          const lowerMsg = message.toLowerCase();
          let answer = 'Chào bạn! Cửa hàng Laptop Hùng Sỹ rất vui được phục vụ bạn. ';
          if (lowerMsg.includes('gaming') || lowerMsg.includes('chơi game') || lowerMsg.includes('game')) {
            answer += 'Nếu bạn cần máy gaming, chúng tôi đề xuất chiến thần **ASUS ROG Strix G16** (Intel Core i7 thế hệ 13, RTX 4060) đang có Flash Sale giảm còn **34.490.000đ** hoặc siêu phẩm **MSI Katana 15** sử dụng RTX 4070 có giá **38.990.000đ**.';
          } else if (lowerMsg.includes('macbook') || lowerMsg.includes('apple') || lowerMsg.includes('mac')) {
            answer += 'Dòng MacBook chính hãng tại Hùng Sỹ đang có **MacBook Pro 14 M3** siêu mạnh mẽ cho đồ họa giá **47.990.000đ** và **MacBook Air 13 M3** mỏng nhẹ pin trâu giá **25.490.000đ**. Bạn đang nghiên cứu dòng nào ạ?';
          } else if (lowerMsg.includes('văn văn phòng') || lowerMsg.includes('học tập') || lowerMsg.includes('sinh viên')) {
            answer += 'Cho nhu cầu học tập và văn phòng, bạn có thể tham khảo **Lenovo ThinkPad E14** bàn phím gõ êm nhất thế giới giá **17.490.000đ** hoặc dòng vỏ nhôm thời thượng **HP Pavilion 15** màu vàng Gold ấm áp giá chỉ **15.490.000đ**.';
          } else if (lowerMsg.includes('khuyến mãi') || lowerMsg.includes('sale') || lowerMsg.includes('giá rẻ')) {
            answer += 'Hiện Hùng Sỹ đang có chương trình Flash Sale hoành tráng dòng **ASUS ROG G16** giảm đến 11% và **Acer Nitro V 15** chỉ còn **20.990.000đ** đó bạn!';
          } else if (lowerMsg.includes('địa chỉ') || lowerMsg.includes('liên hệ') || lowerMsg.includes('hotline') || lowerMsg.includes('cửa hàng')) {
            answer += 'Cửa hàng chính thức Hùng Sỹ đặt tại **156 Hàm Nghi, Đà Nẵng**. Bạn có thể gọi hotline **1900 6060** hoặc gửi email về **contact@hungsy.vn** nhé!';
          } else {
            answer += 'Tôi là Trợ lý Ảo AI cao cấp của hệ thống Hùng Sỹ. Bạn có thể hỏi tôi về các dòng laptop: ASUS ROG Gaming, MSI Katana, Acer Nitro, Dell XPS cao cấp, Hp Pavilion, Lenovo ThinkPad hay dòng MacBook sang xịn nhé! Chúng tôi cũng bán bàn phím ROG RX và chuột G502 X Plus Lightspeed không dây.';
          }
          return res.json({ text: answer, mode: 'demo' });
        }, 600);
        return;
      }

      // Initialize Gemini Client
      const ai = getGeminiClient();

      // Format previous chat history into structural contents for generateContent
      // Ensure we convert messages elegantly
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // System prompt configuration for absolute domain mastery
      const systemInstruction = `
Bạn là "Hùng Sỹ AI Specialist" - Chuyên gia tư vấn phần cứng và laptop đỉnh cao tại đại siêu thị số "Laptop Hùng Sỹ" với hơn 10 năm kinh nghiệm.
Mục tiêu là tư vấn mua sắm, so sánh phần cứng, phân tích hiệu suất và hướng dẫn khách hàng lựa chọn những mẫu Laptop lý tưởng nhất.

Dưới đây là bảng thông tin hàng hóa hiện có tại cửa hàng Laptop Hùng Sỹ:
${JSON.stringify(PRODUCT_CATALOG_CONTEXT, null, 2)}

Nguyên tắc phục vụ khách hàng:
1. Luôn chào hỏi thân thiện, lịch sự, xưng hô là "Hùng Sỹ" hoặc "Tôi" và gọi khách hàng là "Quý khách" hoặc "Bạn".
2. Chỉ tư vấn, gợi ý, so sánh dựa trên danh mục sản phẩm chính xác ở bảng trên. Nếu khách hàng hỏi laptop của hãng khác hoặc ngoài bảng, hãy giải thích khéo léo rằng bạn khuyên dùng sản phẩm hiện có tại cửa hàng vì bảo hành ưu việt.
3. Giải thích sâu sắc các khái niệm kỹ thuật (cho phân khúc gaming: TGP, Ray Tracing, DLSS, tần số quét màn hình; phân khúc văn phòng: OLED màu sắc, pin trâu, bàn phím êm tay; phân khúc Apple: chip M3 Pro silicon, bộ nhớ Unified Memory).
4. Khuyến khích khách hàng bấm nút "Thêm vào giỏ hàng" hoặc ghé thăm địa chỉ "156 Hàm Nghi, Đà Nẵng". Hotline đặt hàng là "1900 6060".
5. Câu trả lời của bạn phải là tiếng Việt chuẩn mực, cuốn hút, trình bày đẹp bằng Markdown (bôi đậm thông số, xuống dòng rõ ràng, bảng so sánh trực quan nếu được).
`;

      const contents = [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'Xin lỗi, tôi chưa xử lý được yêu cầu này. Quý khách vui lòng thử lại nhé!';
      res.json({ text: responseText, mode: 'live' });

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi kết nối với máy chủ AI Hùng Sỹ.' });
    }
  });

  // Serve static assets out of dist on production or proxy through Vite middleware on development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Hùng Sỹ Store Server] listening on port ${PORT}`);
  });
}

startServer();
