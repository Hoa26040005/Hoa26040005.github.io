// ============================================================================
// scripts/workbench.js · 360° Orbital Ring Project Inspector & Live Simulators
// Each of the 4 GitHub projects has 6 clickable orbital nodes + Full Modal
// ============================================================================

const NODE_COORDS = {
  0:   { x: 200, y: 28 },  // 12 o'clock
  60:  { x: 349, y: 114 }, // 2 o'clock
  120: { x: 349, y: 286 }, // 4 o'clock
  180: { x: 200, y: 372 }, // 6 o'clock
  240: { x: 51,  y: 286 }, // 8 o'clock
  300: { x: 51,  y: 114 }, // 10 o'clock
};

export const ORBITAL_PROJECTS = {
  fashion: {
    index: 0,
    repo: "Hoa26040005/Shop-Quan-Ao",
    repoUrl: "https://github.com/Hoa26040005/Shop-Quan-Ao",
    liveUrl: "https://shop-quan-ao-g89r.vercel.app/",
    name: "FashionElite · Social E-Commerce & 3D AI Platform",
    screenshot: "assets/projects/fashion-groupbuy.png",
    metrics: [
      { value: "2 / 4 / 8", label: "Cơ chế phòng Mua Chung Realtime" },
      { value: "910.812đ", label: "Đơn tổng phân bổ chuẩn từng đồng" },
      { value: "10 Intents", label: "Rule-first AI Router + RAG" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "NODE 01 · TỔNG QUAN & BÀI TOÁN",
        title: "Kết hợp Mua Chung Xã Hội, Diễn Đàn Cộng Đồng và Trợ Lý AI trong 1 vòng lặp tăng trưởng",
        body: "Các sàn TMĐT truyền thống tách rời việc thảo luận, hỏi đáp tư vấn và gom đơn mua chung. FashionElite giải quyết bài toán này bằng cách kết nối 3 luồng khép kín: Diễn đàn tạo nội dung có gắn mã theo dõi chuyển đổi (Attribution), Chatbot AI tư vấn phối đồ/size giảm thời gian chọn hàng, và phòng Mua Chung gom 2/4/8 người thành 1 đơn tổng duy nhất giao về địa chỉ chủ phòng.",
        code: `Growth Loop Architecture:\n1. Community Forum (Post + Moderation + Attribution) ->\n2. Gemini 2.5 Flash + RAG Shopping Assistant ->\n3. Realtime Socket.IO Group-Buy Room (2 / 4 / 8 Members) ->\n4. Single Host Order + Proportional Settlement (VNPay / COD)`,
      },
      {
        angle: 60,
        badge: "NODE 02 · KIẾN TRÚC HỆ THỐNG",
        title: "Kiến trúc Nguồn Sự Thật Duy Nhất (Backend-Driven Pricing & Atomic Lock)",
        body: "Toàn bộ giá bán, giữ chỗ tồn kho (InventoryReservation), phân bổ giảm giá và kết quả thanh toán đều do Server quyết định. Khi thành viên cuối cùng bấm Ready và Chủ phòng khóa giỏ (Lock), hệ thống thực hiện giao dịch nguyên tử (Atomic/Idempotent) để tránh trùng đơn hoặc lệch tồn kho.",
        code: `ChatBot.tsx / GroupBuyPage.tsx\n  -> Socket.IO Room Sync + REST API (/api/group-buy, /api/chatbot)\n  -> pricingService.js + stockService.js (InventoryReservation)\n  -> paymentLifecycleService.js (VNPay IPN / QueryDR / COD)\n  -> MongoDB (GroupBuySession, GroupBuySettlement, ChatLog)`,
      },
      {
        angle: 120,
        badge: "NODE 03 · CÔNG NGHỆ & 3D UI",
        title: "React 19, TypeScript, React Three Fiber (3D) & Framer Motion",
        body: "Giao diện khách hàng và cổng quản trị Admin được xây dựng bằng React 19 và TypeScript, tích hợp không gian 3D qua @react-three/fiber và @react-three/drei, chuyển động mượt bằng Framer Motion 12, biểu đồ phân tích Recharts 3.8 và bộ kiểm thử tự động đầu-cuối bằng Playwright E2E.",
        code: `Frontend Stack: React 19.2 · TypeScript · @react-three/fiber 9.4 · @react-three/drei 10.7 · Framer Motion 12 · Tailwind CSS 4 · Socket.IO Client · Playwright E2E\nBackend Stack: Node.js · Express · MongoDB · Lucia Auth · VNPay · @google/generative-ai`,
      },
      {
        angle: 180,
        badge: "NODE 04 · THUẬT TOÁN PHÂN BỔ & AI ROUTER",
        title: "Thuật toán chia tiền theo tỷ trọng giỏ hàng & Rule-First Intent Router",
        body: "Trong phòng Mua Chung, mỗi thành viên chọn sản phẩm và số lượng khác nhau. Thuật toán tính tỷ trọng giá trị hàng của từng người trên tổng giỏ để phân bổ chính xác chiết khấu nhóm (8%/14%/20%), voucher, thuế và phí vận chuyển, đồng thời xử lý phần dư làm tròn từng đồng cho chủ phòng.",
        code: `// Verified Production Allocation Formula:\nweight_i = memberSubtotal_i / roomTotalRaw;\nnetPay_i = round(memberSubtotal_i - totalDiscount * weight_i + shipping * weight_i);\n// Smoke Test Result: 910,812 VND = 707,813 VND (Host) + 202,999 VND (Member B)`,
      },
      {
        angle: 240,
        badge: "NODE 05 · KẾT QUẢ KIỂM CHỨNG PRODUCTION",
        title: "Triển khai thực tế trên Vercel & Render với kiểm thử 4 lớp bằng chứng",
        body: "Đã vượt qua toàn bộ bài kiểm thử Smoke Test trên môi trường Production: đồng bộ phòng Mua Chung thời gian thực giữa nhiều tài khoản qua Socket.IO từ domain Vercel thật, luồng duyệt bài diễn đàn, chặn preview voucher khi snapshot chưa duyệt và kiểm thử tải Chatbot 50 requests đồng thời.",
        code: `✓ Frontend Vercel <-> Render API (/api/products 200 OK)\n✓ Realtime Socket.IO Group-Buy 2-Member Lock & Settlement: PASS\n✓ VNPay Sandbox URL Generation & COD Fulfilled Settlement: PASS\n✓ Playwright Desktop & Mobile Responsive (Zero Horizontal Overflow): PASS`,
      },
      {
        angle: 300,
        badge: "NODE 06 · TRẢI NGHIỆM & LIVE DEMO",
        title: "Trải nghiệm trực tiếp trên Production hoặc chạy thử Máy Tính Mua Chung",
        body: "Bạn có thể bấm nút 'Mở Live Demo (Vercel)' bên dưới để truy cập trực tiếp ứng dụng đang chạy thực tế, hoặc cuộn xuống khu vực Interactive Workbench (Chương 3) ngay trên trang này để bấm thử bộ chia tiền Mua Chung 2/4/8 người.",
        code: `Live Production URL: https://shop-quan-ao-g89r.vercel.app/\nGitHub Repository:   https://github.com/Hoa26040005/Shop-Quan-Ao`,
      },
    ],
  },

  legal: {
    index: 1,
    repo: "Hoa26040005/legal-ai-contract-reviewer",
    repoUrl: "https://github.com/Hoa26040005/legal-ai-contract-reviewer",
    liveUrl: "#workbench",
    name: "LegalAI · Split-Screen Luxury LegalTech & Graph-RAG",
    screenshot: "assets/projects/fashion-forum.png",
    metrics: [
      { value: "25+ Luật", label: "Lao động, Thương mại, Dân sự, NĐ 13" },
      { value: "1.8x OCR", label: "Khử nghiêng Deskew ảnh chụp mờ" },
      { value: "1-Click", label: "Xuất Word (.docx) Track Changes" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "NODE 01 · TỔNG QUAN & BÀI TOÁN",
        title: "Phát hiện bẫy pháp lý tinh vi trong hợp đồng tại Việt Nam",
        body: "Người lao động và doanh nghiệp SME thường ký hợp đồng chứa các điều khoản bất lợi hoặc vô hiệu theo luật Việt Nam (như giữ bằng đại học gốc, phạt vi phạm 25%, lãi chậm trả 54%/năm). LegalAI tự động rà soát từng điều khoản, đối chiếu hơn 25 quy định pháp luật và sinh điều khoản sửa đổi chuẩn đàm phán.",
        code: `Audited Legal Domains:\n• Bộ luật Lao động 2019 (Điều 17.1, 17.2, 21.2, 25, 127, 168)\n• Luật Thương mại 2005 (Điều 294-295, 301 Trần phạt 8%, 318)\n• Bộ luật Dân sự 2015 (Điều 360, 428, 468 Trần lãi 20%/năm)\n• Nghị định 13/2023/NĐ-CP & Luật Sở hữu trí tuệ 2022`,
      },
      {
        angle: 60,
        badge: "NODE 02 · KIẾN TRÚC HYBRID GRAPH-RAG",
        title: "Kết hợp Vector Search với Đồ thị Tri thức Pháp lý Neo4j",
        body: "Tìm kiếm vector đơn thuần dễ bỏ sót mối quan hệ dẫn chiếu giữa các điều luật và nghị định hướng dẫn. LegalAI kết hợp Dense Vector Retrieval với Neo4j Knowledge Graph để truy vết chính xác điều khoản hợp đồng vi phạm điều nào, khoản nào và chế tài ra sao.",
        code: `Contract Document (PDF / Phone Photo)\n  -> Multimodal OCR Preprocessor (Grayscale + 1.8x Contrast + Deskew)\n  -> Clause Segmenter & Hybrid Retriever (Vector + Neo4j Cypher Graph)\n  -> Statutory Trap Detector & Redline Generator\n  -> Next.js 14 Split-Screen UI + 1-Click .DOCX Track Changes Exporter`,
      },
      {
        angle: 120,
        badge: "NODE 03 · GIAO DIỆN LUXURY LEGALTECH",
        title: "Split-Screen Spotlight Focus Mode & Bản đồ Phổ màu Rủi ro",
        body: "Giao diện Next.js 14 được thiết kế theo chuẩn Split-Screen Luxury LegalTech: cột trái hiển thị văn bản hợp đồng đóng dấu watermark 'AI AUDITED - LEGAL STANDARD', cột phải là thẻ phân tích rủi ro đồng bộ vị trí cuộn, kèm chế độ Tiêu Điểm (Spotlight Focus Mode) làm tối vùng xung quanh để soi kỹ điều khoản nguy hiểm.",
        code: `UI Capabilities (Next.js 14 + TypeScript + Tailwind CSS):\n• Spotlight Focus Mode (Isolates active high-risk contract clause)\n• Risk Distribution Spectrum Bar (Critical / High / Medium / Safe)\n• 1-Click Legal Copilot Chat with Contextual Prompt Chips`,
      },
      {
        angle: 180,
        badge: "NODE 04 · MULTIMODAL OCR & DOCX REDLINE",
        title: "Xử lý ảnh chụp hợp đồng nghiêng mờ & Xuất Word Track Changes",
        body: "Hệ thống nhận trực tiếp ảnh chụp hợp đồng bằng điện thoại (.jpg, .png, .webp), tự động chuyển ảnh xám, nâng tương phản 1.8 lần, lọc nhiễu và xoay thẳng góc nghiêng (Deskew). Sau khi kiểm toán, xuất ngay file Word (.docx) có quốc hiệu, gạch đỏ [-] câu sai và gạch chân xanh [+] câu sửa.",
        code: `// Word (.docx) Redline Output Format:\n[-] Điều 4.2: Bên B chịu phạt vi phạm 25% tổng giá trị hợp đồng... (Red Strikethrough)\n[+] Điều 4.2 (Đề xuất): Tổng mức phạt không vượt quá 8% giá trị phần nghĩa vụ bị vi phạm theo Điều 301 Luật Thương mại 2005. (Green Bold Underline)`,
      },
      {
        angle: 240,
        badge: "NODE 05 · KIỂM THỬ TỰ ĐỘNG & CI/CD",
        title: "Bộ Pytest toàn diện cho Legal Engine, OCR và Storage Manager",
        body: "Kho mã nguồn được tích hợp quy trình GitHub Actions CI/CD tự động kiểm tra chất lượng code và chạy bộ unit/integration test Pytest cho toàn bộ các module cốt lõi: test_legal_engine.py, test_ocr_pipeline.py và test_storage_manager.py.",
        code: `Automated Test Suite (pytest tests -v):\n✓ backend/tests/test_legal_engine.py (Statutory rule & cap verification)\n✓ backend/tests/test_ocr_pipeline.py (Deskew & 1.8x contrast image pipeline)\n✓ backend/tests/test_storage_manager.py (Document lifecycle & DOCX export)`,
      },
      {
        angle: 300,
        badge: "NODE 06 · TRẢI NGHIỆM & REDLINE SANDBOX",
        title: "Kiểm thử trực tiếp Máy Kiểm Toán Hợp Đồng ngay trên Portfolio",
        body: "Bạn có thể mở kho mã nguồn trên GitHub để xem chi tiết cấu trúc Docker + FastAPI + Next.js 14, hoặc bấm nút chuyển xuống Interactive Workbench bên dưới để tự tay chọn 3 bẫy hợp đồng phổ biến và xem AI sinh Redline tức thì.",
        code: `GitHub Repository: https://github.com/Hoa26040005/legal-ai-contract-reviewer\nInteractive Demo:  Available in Act III (#workbench) below`,
      },
    ],
  },

  agripos: {
    index: 2,
    repo: "Hoa26040005/pesticide-shop",
    repoUrl: "https://github.com/Hoa26040005/pesticide-shop",
    liveUrl: "#workbench",
    name: "AgriPOS · Electron 39 Desktop & 68-Point FaceID ERP",
    screenshot: "assets/projects/fashion-chatbot.png",
    metrics: [
      { value: "68 Điểm", label: "Mốc nhận diện khuôn mặt Webcam" },
      { value: "128-D", label: "Vector đặc trưng sinh trắc học" },
      { value: "10 Modules", label: "POS, Kho, Công Nợ, Báo Cáo, Nhật Ký" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "NODE 01 · TỔNG QUAN & BÀI TOÁN",
        title: "Số hóa quản lý cửa hàng thuốc BVTV với bảo mật sinh trắc học",
        body: "Các đại lý vật tư nông nghiệp và thuốc bảo vệ thực vật có đặc thù bán hàng theo mùa vụ, quản lý công nợ nông dân phức tạp, kiểm soát hạn sử dụng theo lô và cần bảo mật chặt chẽ doanh thu khi chủ cửa hàng vắng mặt. AgriPOS giải quyết trọn vẹn trên cả Web và phần mềm Desktop Windows (.EXE).",
        code: `Core ERP Modules (10 Functional Screens):\n• FaceID Biometric Login & Registration (LoginWithFace.jsx / FaceRegister.jsx)\n• Fast QR POS Checkout (PosScreen.jsx) & Order History (OrderList.jsx)\n• Batch & Expiry Inventory (InventoryList.jsx) & Farmer Debt Ledger (DebtList.jsx)\n• Admin Financial Reports (ReportDashboard.jsx) & Audit Logs (SystemLogs.jsx)`,
      },
      {
        angle: 60,
        badge: "NODE 02 · KIẾN TRÚC ELECTRON + FIREBASE",
        title: "Đóng gói bộ cài Windows NSIS EXE & Đồng bộ thời gian thực",
        body: "Ứng dụng được phát triển trên React 19 kết hợp trình đóng gói siêu tốc Rolldown-Vite và Electron 39 (electron-builder NSIS). Dữ liệu sản phẩm, tồn kho, đơn hàng và nhật ký hoạt động được đồng bộ tức thời với Firebase Firestore kèm tập luật bảo mật firestore.rules.",
        code: `Build & Packaging Pipeline:\n• Dev Mode: concurrently -k "npm run dev" "npm run electron"\n• Production Installer: vite build && electron-builder (NSIS Windows .exe)\n• Cloud Sync: Firebase 12.6 Firestore + Realtime AuthContext`,
      },
      {
        angle: 120,
        badge: "NODE 03 · CÔNG NGHỆ & GIAO DIỆN POS",
        title: "React 19, Ant Design 6, QR Code Generator & PDF/Excel Export",
        body: "Giao diện bán hàng tại quầy được tối ưu hóa thao tác phím và chuột bằng Ant Design 6, hỗ trợ tạo và quét mã QR (qrcode.react), in hóa đơn trực tiếp tại quầy (react-to-print) và xuất sổ công nợ/báo cáo doanh thu ra file PDF chuẩn bảng biểu (jspdf-autotable) hoặc Excel (xlsx).",
        code: `UI & Utility Stack:\n• React 19.2 · React Router 7 (HashRouter for Electron compatibility)\n• Ant Design 6.1 & @ant-design/icons · react-webcam 7.2\n• jspdf 3.0 + jspdf-autotable 5.0 · xlsx 0.18 · qrcode.react 4.2`,
      },
      {
        angle: 180,
        badge: "NODE 04 · AI NHẬN DIỆN KHUÔN MẶT 68 ĐIỂM",
        title: "Mạng nơ-ron SSD MobileNetV1 + 68-Point Landmark ngay trên trình duyệt",
        body: "Sử dụng @vladmandic/face-api chạy trực tiếp mô hình học sâu từ thư mục public/models: phát hiện khuôn mặt qua Webcam bằng SSD MobileNetV1, căn chỉnh 68 điểm mốc (mắt, mũi, cằm) và trích xuất vector 128 chiều để so khớp khoảng cách Euclidean mà không cần gửi ảnh thô lên máy chủ bên thứ ba.",
        code: `// Biometric Pipeline in src/utils/faceDetection.js:\nawait faceapi.nets.ssdMobilenetv1.loadFromUri('/models');\nawait faceapi.nets.faceLandmark68Net.loadFromUri('/models');\nawait faceapi.nets.faceRecognitionNet.loadFromUri('/models');\nconst detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();`,
      },
      {
        angle: 240,
        badge: "NODE 05 · PHÂN QUYỀN RBAC & AUTO-LOGOUT",
        title: "Cơ chế ProtectedAdminRoute & Tự động khóa phiên khi rời máy",
        body: "Các tuyến chứa dữ liệu tài chính nhạy cảm (/reports, /logs) được bọc trong ProtectedAdminRoute: nếu nhân viên bán hàng truy cập sẽ lập tức nhận màn hình chặn 403 và điều hướng về màn hình POS (/pos). Ngoài ra, hook useAutoLogout tự động đăng xuất khi phát hiện người dùng rời máy quá thời gian quy định.",
        code: `// ProtectedAdminRoute in src/App.jsx:\nif (!isAdmin) {\n  return <Result status="403" title="403 - Giới hạn quyền truy cập"\n    subTitle="Khu vực này chỉ dành riêng cho Chủ cửa hàng (Admin)." />;\n}`,
      },
      {
        angle: 300,
        badge: "NODE 06 · TRẢI NGHIỆM & MÔ PHỎNG FACEID",
        title: "Xem mã nguồn trên GitHub hoặc thử ngay trình mô phỏng RBAC FaceID",
        body: "Bạn có thể kiểm tra toàn bộ cấu trúc model AI nhận diện khuôn mặt và mã nguồn Electron trong kho lưu trữ GitHub, hoặc cuộn xuống Interactive Workbench bên dưới để thử chuyển đổi giữa khuôn mặt Chủ cửa hàng và Thu ngân POS.",
        code: `GitHub Repository: https://github.com/Hoa26040005/pesticide-shop\nInteractive Demo:  Available in Act III (#workbench) below`,
      },
    ],
  },

  temporal: {
    index: 3,
    repo: "Hoa26040005/RAGNHANBTTHOIGIAN",
    repoUrl: "https://github.com/Hoa26040005/RAGNHANBTTHOIGIAN",
    liveUrl: "#workbench",
    name: "Temporal RAG · Hệ Thống Hỏi Đáp Nhận Thức Thời Gian",
    screenshot: "assets/projects/temporal-rag-1.png",
    metrics: [
      { value: "92,7%", label: "Year Accuracy (+30,2% vs Baseline)" },
      { value: "50.599", label: "FAISS L2 Chunks (2019 đến 2025)" },
      { value: "80,5%", label: "Keyword Score (+60,0% vs Baseline)" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "NODE 01 · TỔNG QUAN & KHÓA LUẬN",
        title: "Giải quyết triệt để hiện tượng Lệch Mốc Thời Gian (Temporal Drift)",
        body: "Trong RAG truyền thống, hai tài liệu cùng nói về GDP Việt Nam nhưng thuộc năm 2022 và năm 2024 nằm rất gần nhau trong không gian vector embedding. Khi người dùng hỏi số liệu năm 2022, RAG truyền thống thường lấy nhầm bài năm 2024. Đề tài khóa luận này xây dựng tầng nhận thức thời gian chuyên biệt cho tiếng Việt để giải quyết triệt để vấn đề đó.",
        code: `Problem Statement:\nQuery: "GDP Việt Nam năm 2022 tăng trưởng bao nhiêu?"\n• Traditional RAG: Returns 2024 article (62.5% Year Accuracy on Eval96)\n• Temporal RAG:    Enforces TemporalQueryPlan + Year Rerank -> 92.7% Year Accuracy`,
      },
      {
        angle: 60,
        badge: "NODE 02 · KIẾN TRÚC PIPELINE 8 TẦNG",
        title: "Từ phân tích ngữ nghĩa thời gian đến Hợp đồng Bằng chứng (Evidence Contract)",
        body: "Câu hỏi tiếng Việt đi qua chuỗi xử lý chặt chẽ: chuẩn hóa hội thoại nhiều lượt (ConversationManager) -> phân tích 12 vai thời gian & toán tử FIRST/LAST/CURRENT/FUTURE -> tra cứu kho Fact lịch sử Wikipedia -> Hybrid Search (FAISS Dense + BM25 hợp nhất bằng RRF) -> Xếp hạng lại theo năm/thực thể/metric -> Kiểm tra hợp đồng Slot-Claim-Evidence trước khi Qwen3:4B diễn đạt.",
        code: `User Query -> VietnameseTemporalSemanticParser (TemporalQueryPlan)\n  -> Guardrail Chain (Policy Guard vs Evidence Validator)\n  -> Hybrid Retrieval (FAISS IndexFlatIP 50,599 chunks + BM25 + RRF)\n  -> Structured Temporal & Entity Reranker\n  -> Slot-Claim-Evidence Contract (ANSWER | PARTIAL | ABSTAIN | REFUSE)\n  -> Qwen3:4B via Ollama + SSE Streaming Web UI`,
      },
      {
        angle: 120,
        badge: "NODE 03 · GIAO DIỆN WEB DEMO & STREAMING API",
        title: "FastAPI Server-Sent Events (SSE) & Giao diện Đối chiếu Song song",
        body: "Hệ thống cung cấp giao diện Web trực quan cho phép người dùng và hội đồng chấm khóa luận đặt câu hỏi, theo dõi luồng câu trả lời sinh ra theo thời gian thực qua Server-Sent Events (/api/chat/stream) và đặt chế độ Temporal RAG cạnh Traditional RAG để so sánh nguồn trích dẫn, độ trễ và độ chính xác năm.",
        code: `Web & API Endpoints:\n• GET  /                 -> Interactive Comparison & Chat Web UI\n• POST /api/chat/stream  -> Real-time SSE Streaming with Provenance Citations\n• POST /api/compare      -> Side-by-side Temporal vs Traditional RAG benchmark`,
      },
      {
        angle: 180,
        badge: "NODE 04 · THUẬT TOÁN HỢP NHẤT RRF & TOÁN TỬ THỜI GIAN",
        title: "50.599 Chunks chuẩn hóa L2, 4.151 Fact lịch sử & Chặn ảo giác tương lai",
        body: "Cơ sở dữ liệu kết hợp 49.980 bài báo tiếng Việt (2019-2025) thuộc 12 lĩnh vực với 4.151 fact lịch sử Wikipedia có gắn nhãn nguồn gốc (provenance). Đặc biệt, hệ thống phân biệt rõ sự kiện đã xảy ra với kế hoạch/dự báo tương lai, tự động kích hoạt trạng thái REFUSE/ABSTAIN khi người dùng hỏi kết quả thực tế của năm chưa diễn ra.",
        code: `Corpus & Vector Index Verified Specs:\n• News Corpus (2019-2025): 49,980 articles -> 50,006 chunks\n• Wikipedia Supplement:    768 entries -> 593 chunks + 4,151 historical facts\n• Embedding Model:         paraphrase-multilingual-MiniLM-L12-v2 (384-D, L2 Norm)`,
      },
      {
        angle: 240,
        badge: "NODE 05 · KẾT QUẢ THỰC NGHIỆM EVAL96",
        title: "Tăng +30,2 điểm % Year Accuracy và +60,0 điểm % Keyword Score",
        body: "Đánh giá định lượng công bằng trên bộ chuẩn Eval96 (96 câu hỏi khó trải đều 12 lĩnh vực, chạy trên cùng model Qwen3:4B, cùng corpus và cùng evaluator): Temporal RAG đạt 92,7% Year Accuracy (89/96 câu), 80,5% Keyword Score và 78,2% Combined Score, vượt xa Traditional RAG ở mọi chỉ số chất lượng.",
        code: `Canonical Eval96 Benchmark (Temporal RAG vs Traditional RAG):\n• Year Accuracy (YrOK): 92.7% (89/96) vs 62.5% (60/96)  [+30.2%]\n• Keyword Score:        80.5%         vs 20.5%          [+60.0%]\n• Combined Score:       78.2%         vs 44.2%          [+34.0%]\n• Source Relevance:     78.8%         vs 61.8%          [+17.0%]`,
      },
      {
        angle: 300,
        badge: "NODE 06 · TRẢI NGHIỆM & SO SÁNH TRỰC TIẾP",
        title: "Khám phá báo cáo khóa luận đầy đủ hoặc chạy thử bộ đối chiếu RAG",
        body: "Bạn có thể truy cập kho mã nguồn GitHub để xem toàn bộ code Python, notebook huấn luyện trên RunPod (train_qwen_temporal_rag.ipynb) và báo cáo 5 chương, hoặc thử nghiệm ngay bảng so sánh Temporal vs Traditional RAG ở khu vực Interactive Workbench bên dưới.",
        code: `GitHub Repository: https://github.com/Hoa26040005/RAGNHANBTTHOIGIAN\nInteractive Demo:  Available in Act III (#workbench) below`,
      },
    ],
  },
};

const GROUPBUY_SCENARIOS = {
  2: {
    members: 2,
    tierDiscountPct: 8,
    voucherVnd: 50000,
    shippingVnd: 30000,
    carts: [
      { name: "Host (Member A · Blazer Linen)", raw: 790000, net: 707813 },
      { name: "Member B (Áo Thun Supima)", raw: 226500, net: 202999 },
    ],
    totalNet: 910812,
    note: "Verified Production Run: 910,812 VND = 707,813 VND (77.71%) + 202,999 VND (22.29%)",
  },
  4: {
    members: 4,
    tierDiscountPct: 14,
    voucherVnd: 120000,
    shippingVnd: 30000,
    carts: [
      { name: "Host (Member A · Trench Coat)", raw: 950000, net: 778650 },
      { name: "Member B (Denim Jacket)", raw: 680000, net: 557349 },
      { name: "Member C (Oxford Shirt)", raw: 450000, net: 368834 },
      { name: "Member D (Cargo Pants)", raw: 520000, net: 426167 },
    ],
    totalNet: 2131000,
    note: "4-Member Room: 14% tier discount + 120k voucher + single 30k shipment split by weight",
  },
  8: {
    members: 8,
    tierDiscountPct: 20,
    voucherVnd: 300000,
    shippingVnd: 0,
    carts: [
      { name: "Host + 3 Core Buyers (61.5% cart share)", raw: 3200000, net: 2375385 },
      { name: "4 Co-Buyers (38.5% cart share)", raw: 2000000, net: 1484615 },
    ],
    totalNet: 3860000,
    note: "8-Member Max Room: 20% tier discount + Free Host Shipping + Atomic VNPay/COD lock",
  },
};

const LEGAL_CLAUSES = {
  labor: {
    statute: "Bộ luật Lao động 2019 · Điều 17.1 & Điều 17.2",
    severity: "CRITICAL TRAP · VOID BY STATUTE",
    removed:
      "[-] Bên B phải nộp bản gốc Bằng Đại học và đặt cọc 15.000.000 VNĐ tiền bảo đảm thực hiện hợp đồng.",
    inserted:
      "[+] Bên B xuất trình bản sao công chứng văn bằng để đối chiếu; Bên A không giữ bản chính văn bằng và không yêu cầu đặt cọc tiền dưới mọi hình thức theo Điều 17 Bộ luật Lao động 2019.",
    advice:
      "Negotiation Tip: Giữ bằng gốc và thu tiền cọc là hành vi bị cấm tuyệt đối. Yêu cầu gạch bỏ toàn bộ trước khi ký.",
  },
  commercial: {
    statute: "Luật Thương mại 2005 · Điều 301 (Giới hạn mức phạt 8%)",
    severity: "HIGH RISK · EXCEEDS STATUTORY CAP",
    removed:
      "[-] Trường hợp chậm bàn giao phần mềm, Bên B chịu phạt vi phạm 25% tổng giá trị hợp đồng cho mỗi tuần chậm trễ.",
    inserted:
      "[+] Trường hợp chậm bàn giao do lỗi trực tiếp của Bên B, mức phạt vi phạm được áp dụng theo thực tế nhưng tổng mức phạt không vượt quá 8% giá trị phần nghĩa vụ hợp đồng bị vi phạm (Điều 301 Luật Thương mại 2005).",
    advice:
      "Negotiation Tip: Mức phạt trên 8% trong hợp đồng thương mại dịch vụ sẽ bị Tòa án/Trọng tài tuyên vô hiệu phần vượt quá.",
  },
  civil: {
    statute: "Bộ luật Dân sự 2015 · Điều 468 (Trần lãi suất 20%/năm)",
    severity: "HIGH RISK · USURY INTEREST TRAP",
    removed:
      "[-] Khoản thanh toán quá hạn sẽ chịu lãi suất phạt chậm trả là 0,15%/ngày (tương đương 54,75%/năm).",
    inserted:
      "[+] Khoản thanh toán quá hạn chịu lãi suất chậm trả bằng 10%/năm (không vượt quá trần 20%/năm theo khoản 1 Điều 468 Bộ luật Dân sự 2015) tính trên số tiền và số ngày thực tế chậm trả.",
    advice:
      "Negotiation Tip: Đưa lãi chậm trả về khung 10% đến tối đa 20%/năm để đảm bảo hiệu lực thi hành.",
  },
};

const FACEID_ROLES = {
  admin: {
    role: "Chủ cửa hàng (Admin · Verified via 68-Point FaceID)",
    distance: "0.264 (Threshold < 0.450 · MATCH)",
    model: "ssd_mobilenetv1 + face_landmark_68 + face_recognition_net",
    access: "UNLOCKED: /pos, /inventory, /debt, /reports, /logs",
    statusColor: "#2ee59d",
  },
  cashier: {
    role: "Nhân viên Bán hàng (POS Cashier · Restricted RBAC)",
    distance: "0.312 (Threshold < 0.450 · MATCH)",
    model: "ssd_mobilenetv1 + ProtectedAdminRoute Guard",
    access: "ALLOWED: /pos, /orders, /customers · BLOCKED (403): /reports, /logs",
    statusColor: "#f5a623",
  },
};

const TEMPORAL_QUERIES = {
  gdp2022: {
    query: "GDP Việt Nam năm 2022 tăng trưởng bao nhiêu phần trăm?",
    plan: "TemporalQueryPlan(intent=POINT_YEAR, target_year=2022, metric=GDP_GROWTH)",
    traditional:
      "❌ Traditional RAG (Cosine Only): Trả lời nhầm số liệu GDP năm 2024 (7,09%) do bài báo tổng kết kinh tế có độ tương đồng ngữ nghĩa cao hơn.",
    temporal:
      "✓ Temporal RAG (RRF + Year Rerank): Tăng trưởng GDP năm 2022 của Việt Nam đạt 8,02%, mức cao nhất trong giai đoạn 2011-2022 (Contract: ANSWER · YrOK: PASS).",
  },
  first: {
    query: "Sự kiện đối ngoại lớn đầu tiên của Việt Nam đầu năm 2020 là gì?",
    plan: "TemporalQueryPlan(operator=FIRST, year=2020, source=Hybrid+HistoricalFactStore)",
    traditional:
      "❌ Traditional RAG: Trích xuất ngẫu nhiên hội nghị cuối năm 2020 hoặc năm 2023 vì không hiểu toán tử thứ tự thời gian ĐẦU TIÊN.",
    temporal:
      "✓ Temporal RAG: Việt Nam chính thức đảm nhiệm vai trò Chủ tịch ASEAN 2020 và Ủy viên không thường trực HĐBA LHQ từ tháng 1/2020 (Contract: ANSWER · Provenance Verified).",
  },
  future2025: {
    query: "Kết quả thực tế tốc độ tăng trưởng kinh tế cả năm 2027 là bao nhiêu?",
    plan: "TemporalQueryPlan(intent=FUTURE_FACT, target_year=2027, guardrail=POLICY_GUARD)",
    traditional:
      "❌ Traditional RAG: Bịa đặt số liệu (Hallucination) từ các văn bản dự báo quy hoạch giai đoạn 2021-2030 thành kết quả đã xảy ra.",
    temporal:
      "✓ Temporal RAG (Guardrail REFUSE/ABSTAIN): Từ chối khẳng định kết quả thực tế năm 2027 vì vượt ngoài phạm vi sự kiện đã xảy ra (corpus 2019-2025); chỉ cung cấp chỉ tiêu kế hoạch nếu được yêu cầu.",
  },
};

function formatVND(num) {
  return num.toLocaleString("vi-VN") + " đ";
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function initPortfolioWorkbench() {
  // =========================================================================
  // 1. 360° ORBITAL RING CONTROLLERS FOR ALL 4 PROJECTS
  // =========================================================================
  Object.keys(ORBITAL_PROJECTS).forEach((projKey) => {
    const project = ORBITAL_PROJECTS[projKey];
    const arena = document.querySelector(`[data-orbital-project="${projKey}"]`);
    if (!arena) return;

    const nodes = Array.from(arena.querySelectorAll(".orbital-node"));
    const stepDots = Array.from(arena.querySelectorAll(".inspector-step-dot"));
    const beamLine = arena.querySelector(".orbit-active-beam");
    const badgeEl = arena.querySelector(".js-inspector-badge");
    const titleEl = arena.querySelector(".js-inspector-title");
    const bodyEl = arena.querySelector(".js-inspector-body");
    const codeEl = arena.querySelector(".js-inspector-code");
    const prevBtn = arena.querySelector(".js-node-prev");
    const nextBtn = arena.querySelector(".js-node-next");
    const openModalBtns = arena.querySelectorAll("[data-open-project-modal]");

    let activeNodeIndex = 0;

    function selectOrbitalNode(idx, triggerWebGL = true) {
      activeNodeIndex = (idx + project.nodes.length) % project.nodes.length;
      const nodeData = project.nodes[activeNodeIndex];

      nodes.forEach((btn, i) => {
        btn.classList.toggle("is-active", i === activeNodeIndex);
      });
      stepDots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeNodeIndex);
      });

      // Point SVG laser vector beam from center (200,200) to the selected orbital node
      if (beamLine && NODE_COORDS[nodeData.angle]) {
        const target = NODE_COORDS[nodeData.angle];
        beamLine.setAttribute("x2", String(target.x));
        beamLine.setAttribute("y2", String(target.y));
      }

      if (badgeEl) badgeEl.textContent = nodeData.badge;
      if (titleEl) titleEl.textContent = nodeData.title;
      if (bodyEl) bodyEl.textContent = nodeData.body;
      if (codeEl) codeEl.textContent = nodeData.code;

      if (triggerWebGL && window.PortfolioWebGL) {
        window.PortfolioWebGL.setMorphState(project.index);
        window.PortfolioWebGL.triggerOrbitalPulse(1.15);
      }
    }

    nodes.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        selectOrbitalNode(idx, true);
      });
    });

    stepDots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        selectOrbitalNode(idx, true);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        selectOrbitalNode(activeNodeIndex - 1, true);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        selectOrbitalNode(activeNodeIndex + 1, true);
      });
    }

    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        openProjectDeepDiveModal(projKey);
      });
    });

    // Initialize at Node 0 without triggering pulse
    selectOrbitalNode(0, false);
  });

  // =========================================================================
  // 2. FULL-SCREEN PROJECT DEEP-DIVE MODAL (Shows all 6 Orbital Dimensions)
  // =========================================================================
  const modalBackdrop = document.querySelector("#project-detail-modal");
  const modalContent = document.querySelector("#project-modal-body");
  const modalCloseBtn = document.querySelector("#close-project-modal-btn");

  function openProjectDeepDiveModal(projKey) {
    const project = ORBITAL_PROJECTS[projKey];
    if (!project || !modalBackdrop || !modalContent) return;

    if (window.PortfolioWebGL) {
      window.PortfolioWebGL.setMorphState(project.index);
      window.PortfolioWebGL.triggerOrbitalPulse(1.35);
    }

    const metricsHtml = project.metrics
      .map(
        (m) => `
        <div class="inspector-metric-card">
          <strong>${escapeHtml(m.value)}</strong>
          <span>${escapeHtml(m.label)}</span>
        </div>`
      )
      .join("");

    const nodesHtml = project.nodes
      .map(
        (n) => `
        <article class="modal-node-card">
          <h4>${escapeHtml(n.badge)}</h4>
          <h5 style="font-family:var(--sc-font-display);font-size:1.1rem;margin:0 0 0.5rem;color:var(--sc-ink);">
            ${escapeHtml(n.title)}
          </h5>
          <p style="font-size:0.88rem;line-height:1.6;color:var(--sc-ink-soft);margin:0 0 0.75rem;">
            ${escapeHtml(n.body)}
          </p>
          <pre class="inspector-code-box" style="margin:0;white-space:pre-wrap;">${escapeHtml(n.code)}</pre>
        </article>`
      )
      .join("");

    modalContent.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.25rem;">
        <div>
          <span class="arena-repo-tag">GITHUB REPOSITORY · ${escapeHtml(project.repo)}</span>
          <h3 class="sc-display sc-display--md" style="margin:0.25rem 0 0;">${escapeHtml(project.name)}</h3>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">Mở Mã Nguồn GitHub ↗</a>
          ${
            project.liveUrl.startsWith("http")
              ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-ghost">Mở Live Production ↗</a>`
              : `<a href="${project.liveUrl}" class="btn-ghost" id="modal-jump-workbench">Chạy Simulator Tương Tác ↓</a>`
          }
        </div>
      </div>

      <div class="inspector-metrics-row" style="margin-bottom:1.25rem;">
        ${metricsHtml}
      </div>

      <div class="modal-grid-6">
        ${nodesHtml}
      </div>
    `;

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");

    const jumpBtn = modalContent.querySelector("#modal-jump-workbench");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => {
        modalBackdrop.classList.remove("is-open");
        modalBackdrop.setAttribute("aria-hidden", "true");
      });
    }
  }

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener("click", () => {
      modalBackdrop.classList.remove("is-open");
      modalBackdrop.setAttribute("aria-hidden", "true");
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove("is-open");
        modalBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }

  // =========================================================================
  // 3. LIVE INTERACTIVE SIMULATORS IN ACT III (#workbench)
  // =========================================================================
  const gbOutput = document.querySelector("#gb-sandbox-output");
  const gbButtons = document.querySelectorAll("[data-gb-size]");

  function renderGroupBuy(size) {
    const data = GROUPBUY_SCENARIOS[size] || GROUPBUY_SCENARIOS[2];
    if (!gbOutput) return;
    const rowsHtml = data.carts
      .map(
        (c) =>
          `<div style="display:flex;justify-content:space-between;border-bottom:1px dashed rgba(243,239,230,0.12);padding:0.28rem 0;">
            <span>${c.name}</span>
            <strong style="color:var(--sc-accent)">${formatVND(c.net)}</strong>
          </div>`
      )
      .join("");

    gbOutput.innerHTML = `
      <div style="display:flex;justify-content:space-between;color:var(--sc-ink-soft);margin-bottom:0.4rem;">
        <span>Tier Discount: <strong style="color:var(--sc-ink)">-${data.tierDiscountPct}%</strong></span>
        <span>Voucher: <strong style="color:var(--sc-ink)">-${formatVND(data.voucherVnd)}</strong></span>
        <span>Ship: <strong style="color:var(--sc-ink)">${formatVND(data.shippingVnd)}</strong></span>
      </div>
      ${rowsHtml}
      <div style="display:flex;justify-content:space-between;margin-top:0.55rem;padding-top:0.4rem;border-top:1px solid rgba(243,239,230,0.2);">
        <span>Total Host Settlement (1 Order):</span>
        <strong style="color:var(--ok-green);font-size:0.95rem;">${formatVND(data.totalNet)}</strong>
      </div>
      <div style="margin-top:0.4rem;color:var(--sc-ink-soft);font-size:0.72rem;">${data.note}</div>
    `;
  }

  gbButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      gbButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGroupBuy(Number(btn.getAttribute("data-gb-size")));
    });
  });
  renderGroupBuy(2);

  // LegalAI Redline Sandbox
  const legalOutput = document.querySelector("#legal-sandbox-output");
  const legalButtons = document.querySelectorAll("[data-legal-clause]");

  function renderLegalClause(key) {
    const item = LEGAL_CLAUSES[key] || LEGAL_CLAUSES.labor;
    if (!legalOutput) return;
    legalOutput.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.45rem;">
        <span style="color:var(--sc-accent);font-weight:600;">${item.statute}</span>
        <span style="color:var(--danger-rose);font-size:0.7rem;">[${item.severity}]</span>
      </div>
      <div class="redline-del" style="margin-bottom:0.45rem;border-radius:4px;">${item.removed}</div>
      <div class="redline-ins" style="margin-bottom:0.45rem;border-radius:4px;">${item.inserted}</div>
      <div style="color:var(--sc-ink-soft);font-size:0.72rem;">${item.advice}</div>
    `;
  }

  legalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      legalButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderLegalClause(btn.getAttribute("data-legal-clause"));
    });
  });
  renderLegalClause("labor");

  // AgriPOS 68-Landmark FaceID & RBAC Sandbox
  const posOutput = document.querySelector("#pos-sandbox-output");
  const posButtons = document.querySelectorAll("[data-pos-role]");

  function renderPosRole(roleKey) {
    const r = FACEID_ROLES[roleKey] || FACEID_ROLES.admin;
    if (!posOutput) return;
    posOutput.innerHTML = `
      <div style="margin-bottom:0.35rem;">
        <span style="color:var(--sc-ink-soft);">Subject:</span>
        <strong style="color:${r.statusColor};margin-left:0.35rem;">${r.role}</strong>
      </div>
      <div style="margin-bottom:0.35rem;">
        <span style="color:var(--sc-ink-soft);">Euclidean Distance:</span>
        <strong style="color:var(--sc-accent);margin-left:0.35rem;">${r.distance}</strong>
      </div>
      <div style="margin-bottom:0.35rem;color:var(--sc-ink-soft);">
        Pipeline: <code style="color:var(--sc-ink)">${r.model}</code>
      </div>
      <div style="padding-top:0.35rem;border-top:1px dashed rgba(243,239,230,0.14);color:var(--sc-ink);">
        Route Guard: <span style="color:${r.statusColor}">${r.access}</span>
      </div>
    `;
  }

  posButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      posButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderPosRole(btn.getAttribute("data-pos-role"));
    });
  });
  renderPosRole("admin");

  // Temporal RAG vs Traditional RAG Sandbox
  const ragOutput = document.querySelector("#rag-sandbox-output");
  const ragButtons = document.querySelectorAll("[data-rag-query]");

  function renderRagComparison(qKey) {
    const q = TEMPORAL_QUERIES[qKey] || TEMPORAL_QUERIES.gdp2022;
    if (!ragOutput) return;
    ragOutput.innerHTML = `
      <div style="color:var(--sc-accent);margin-bottom:0.35rem;font-weight:600;">Q: "${q.query}"</div>
      <div style="color:var(--sc-ink-soft);font-size:0.7rem;margin-bottom:0.45rem;">${q.plan}</div>
      <div style="color:var(--danger-rose);margin-bottom:0.4rem;">${q.traditional}</div>
      <div style="color:var(--ok-green);font-weight:500;">${q.temporal}</div>
    `;
  }

  ragButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      ragButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderRagComparison(btn.getAttribute("data-rag-query"));
    });
  });
  renderRagComparison("gdp2022");

  // =========================================================================
  // 4. EMAIL COPY, ATS CV DRAWER & ESCAPE KEY HANDLER
  // =========================================================================
  const copyBtn = document.querySelector("#copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = "huynhhoa9881@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        const orig = copyBtn.textContent;
        copyBtn.textContent = "COPIED: huynhhoa9881@gmail.com ✓";
        setTimeout(() => {
          copyBtn.textContent = orig;
        }, 2400);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  const cvDrawer = document.querySelector("#cv-drawer");
  const openCvBtns = document.querySelectorAll("[data-open-cv]");
  const closeCvBtn = document.querySelector("#close-cv-btn");
  const printCvBtn = document.querySelector("#print-cv-btn");

  openCvBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (cvDrawer) {
        cvDrawer.classList.add("is-open");
        cvDrawer.setAttribute("aria-hidden", "false");
      }
    });
  });

  if (closeCvBtn && cvDrawer) {
    closeCvBtn.addEventListener("click", () => {
      cvDrawer.classList.remove("is-open");
      cvDrawer.setAttribute("aria-hidden", "true");
    });
  }

  if (cvDrawer) {
    cvDrawer.addEventListener("click", (e) => {
      if (e.target === cvDrawer) {
        cvDrawer.classList.remove("is-open");
        cvDrawer.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener("click", () => {
      window.print();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalBackdrop && modalBackdrop.classList.contains("is-open")) {
        modalBackdrop.classList.remove("is-open");
        modalBackdrop.setAttribute("aria-hidden", "true");
      }
      if (cvDrawer && cvDrawer.classList.contains("is-open")) {
        cvDrawer.classList.remove("is-open");
        cvDrawer.setAttribute("aria-hidden", "true");
      }
    }
  });
}
