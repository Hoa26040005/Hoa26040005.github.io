// ============================================================================
// scripts/workbench.js · 360° Orbital Ring Project Inspector & Live Simulators
// Each of the 4 GitHub projects has 6 clickable orbital nodes + Full Modal
// ============================================================================

const NODE_COORDS = {
  0:   { x: 230, y: 56 },  // 12 o'clock (r = 174 on 460x460 viewBox)
  60:  { x: 381, y: 143 }, // 2 o'clock
  120: { x: 381, y: 317 }, // 4 o'clock
  180: { x: 230, y: 404 }, // 6 o'clock
  240: { x: 79,  y: 317 }, // 8 o'clock
  300: { x: 79,  y: 143 }, // 10 o'clock
};

export const ORBITAL_PROJECTS = {
  fashion: {
    index: 0,
    repo: "Hoa26040005/Shop-Quan-Ao",
    repoUrl: "https://github.com/Hoa26040005/Shop-Quan-Ao",
    liveUrl: "https://shop-quan-ao-g89r.vercel.app/",
    name: "FashionElite · Social E-Commerce & 3D AI",
    screenshot: "assets/projects/fashion-groupbuy.png",
    metrics: [
      { value: "2 / 4 / 8", label: "Phòng Mua Chung Realtime" },
      { value: "910.812đ", label: "Phân bổ chuẩn từng đồng" },
      { value: "10 nhóm", label: "Rule-first AI Router & RAG" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "Bài toán & vòng lặp tăng trưởng",
        title: "Kết hợp Mua Chung Xã Hội, Diễn Đàn Cộng Đồng và Trợ Lý AI trong một hệ thống thống nhất",
        body: "Các sàn thương mại điện tử truyền thống tách rời việc thảo luận, tư vấn chọn size và gom đơn mua chung. FashionElite kết nối ba luồng khép kín: diễn đàn cộng đồng gắn mã theo dõi chuyển đổi, trợ lý AI tư vấn sản phẩm và phòng Mua Chung gom 2, 4 hoặc 8 người thành một đơn tổng duy nhất.",
        code: `Growth Loop Architecture:\nCommunity Forum (Post + Moderation + Attribution)\n  -> Gemini 2.5 Flash + RAG Shopping Assistant\n  -> Realtime Socket.IO Group-Buy Room (2 / 4 / 8 Members)\n  -> Single Host Order + Proportional Settlement (VNPay / COD)`,
      },
      {
        angle: 60,
        badge: "Kiến trúc Backend & khóa giỏ nguyên tử",
        title: "Kiến trúc Nguồn Sự Thật Duy Nhất với cơ chế giữ tồn kho Atomic Lock",
        body: "Toàn bộ giá bán, giữ chỗ tồn kho (InventoryReservation), phân bổ giảm giá và kết quả thanh toán đều do máy chủ quyết định. Khi các thành viên bấm Sẵn sàng và Chủ phòng khóa giỏ, hệ thống thực hiện giao dịch nguyên tử để chống trùng đơn hoặc lệch tồn kho.",
        code: `ChatBot.tsx / GroupBuyPage.tsx\n  -> Socket.IO Room Sync + REST API (/api/group-buy, /api/chatbot)\n  -> pricingService.js + stockService.js (InventoryReservation)\n  -> paymentLifecycleService.js (VNPay IPN / QueryDR / COD)\n  -> MongoDB (GroupBuySession, GroupBuySettlement, ChatLog)`,
      },
      {
        angle: 120,
        badge: "Công nghệ Frontend & không gian 3D",
        title: "React 19, TypeScript, React Three Fiber và kiểm thử Playwright E2E",
        body: "Giao diện khách hàng và cổng quản trị Admin được xây dựng trên React 19 và TypeScript, tích hợp hiển thị sản phẩm 3D qua @react-three/fiber và @react-three/drei, chuyển động Framer Motion, biểu đồ Recharts và bộ kiểm thử tự động đầu-cuối bằng Playwright.",
        code: `Frontend: React 19.2 · TypeScript · @react-three/fiber · @react-three/drei · Framer Motion · Tailwind CSS · Socket.IO Client · Playwright E2E\nBackend:  Node.js · Express · MongoDB · Lucia Auth · VNPay · @google/generative-ai`,
      },
      {
        angle: 180,
        badge: "Thuật toán chia tiền theo tỷ trọng",
        title: "Phân bổ chiết khấu nhóm, mã giảm giá và phí vận chuyển chính xác từng đồng",
        body: "Trong phòng Mua Chung, mỗi thành viên chọn sản phẩm và số lượng khác nhau. Thuật toán tính tỷ trọng giá trị hàng của từng người trên tổng giỏ để phân bổ chính xác chiết khấu bậc thang (8%, 14%, 20%), voucher và phí giao hàng, đồng thời xử lý phần dư làm tròn.",
        code: `// Verified Production Allocation Formula:\nweight_i = memberSubtotal_i / roomTotalRaw;\nnetPay_i = Math.round(memberSubtotal_i - totalDiscount * weight_i + shipping * weight_i);\n// Smoke Test: 910,812 VND = 707,813 VND (Host) + 202,999 VND (Member B)`,
      },
      {
        angle: 240,
        badge: "Kiểm chứng thực tế trên Production",
        title: "Vận hành thực tế trên Vercel và Render với bốn lớp kiểm thử tự động",
        body: "Hệ thống đã vượt qua bài kiểm thử Smoke Test trên môi trường Production: đồng bộ phòng Mua Chung thời gian thực giữa nhiều tài khoản qua Socket.IO từ tên miền Vercel thật, luồng duyệt bài diễn đàn, bảo vệ mã giảm giá và kiểm thử tải Chatbot 50 yêu cầu đồng thời.",
        code: `[PASS] Frontend Vercel <-> Render API (/api/products 200 OK)\n[PASS] Realtime Socket.IO Group-Buy 2-Member Lock & Settlement\n[PASS] VNPay Sandbox URL Generation & COD Fulfilled Settlement\n[PASS] Playwright Desktop & Mobile Responsive Verification`,
      },
      {
        angle: 300,
        badge: "Trải nghiệm bản chạy thật & mã nguồn",
        title: "Mở trực tiếp ứng dụng trên Vercel hoặc thử nghiệm bộ tính tiền Mua Chung",
        body: "Bạn có thể nhấn nút Mở Live Demo để trải nghiệm ứng dụng đang hoạt động trên Vercel, hoặc cuộn xuống khu vực Mô phỏng thuật toán ngay bên dưới để bấm thử kịch bản chia tiền phòng 2, 4 và 8 người.",
        code: `Live Production URL: https://shop-quan-ao-g89r.vercel.app/\nGitHub Repository:   https://github.com/Hoa26040005/Shop-Quan-Ao`,
      },
    ],
  },

  legal: {
    index: 1,
    repo: "Hoa26040005/legal-ai-contract-reviewer",
    repoUrl: "https://github.com/Hoa26040005/legal-ai-contract-reviewer",
    liveUrl: "#workbench",
    name: "LegalAI · Rà Soát Hợp Đồng Đa Tác Tử",
    screenshot: "assets/projects/fashion-forum.png",
    metrics: [
      { value: "25+ Luật", label: "Lao động, Thương mại, Dân sự" },
      { value: "1.8x OCR", label: "Khử nghiêng ảnh chụp hợp đồng" },
      { value: "DOCX", label: "Xuất báo cáo Track Changes" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "Bài toán rà soát rủi ro pháp lý",
        title: "Phát hiện điều khoản bất lợi hoặc vô hiệu trong hợp đồng tại Việt Nam",
        body: "Người lao động và doanh nghiệp nhỏ thường ký hợp đồng chứa các điều khoản bất lợi hoặc trái luật định (như giữ bằng đại học gốc, phạt vi phạm 25%, lãi chậm trả 54%/năm). LegalAI tự động bóc tách từng điều khoản, đối chiếu hơn 25 văn bản luật và gợi ý câu chữ sửa đổi.",
        code: `Audited Legal Domains:\n- Bộ luật Lao động 2019 (Điều 17.1, 17.2, 21.2, 25, 127, 168)\n- Luật Thương mại 2005 (Điều 294-295, 301 Trần phạt 8%, 318)\n- Bộ luật Dân sự 2015 (Điều 360, 428, 468 Trần lãi 20%/năm)\n- Nghị định 13/2023/NĐ-CP & Luật Sở hữu trí tuệ 2022`,
      },
      {
        angle: 60,
        badge: "Kiến trúc Hybrid Graph-RAG",
        title: "Kết hợp truy hồi Vector ngữ nghĩa với Đồ thị tri thức pháp lý Neo4j",
        body: "Tìm kiếm vector đơn thuần dễ bỏ sót quan hệ dẫn chiếu giữa các điều luật và nghị định hướng dẫn. LegalAI kết hợp tìm kiếm ngữ nghĩa với đồ thị tri thức Neo4j để xác định chính xác điều khoản hợp đồng vi phạm điều nào, khoản nào và mức chế tài tương ứng.",
        code: `Contract Document (PDF / Phone Photo)\n  -> Multimodal OCR Preprocessor (Grayscale + 1.8x Contrast + Deskew)\n  -> Clause Segmenter & Hybrid Retriever (Vector + Neo4j Cypher Graph)\n  -> Statutory Trap Detector & Redline Generator\n  -> Next.js 14 Split-Screen UI + .DOCX Track Changes Exporter`,
      },
      {
        angle: 120,
        badge: "Giao diện đối chiếu song song",
        title: "Chế độ Spotlight Focus cô lập điều khoản nguy hiểm trên màn hình đôi",
        body: "Giao diện Next.js 14 hiển thị văn bản hợp đồng ở cột trái và thẻ phân tích rủi ro đồng bộ vị trí cuộn ở cột phải. Chế độ Tiêu điểm làm tối vùng xung quanh để người đọc tập trung vào điều khoản có rủi ro cao cùng dải phổ màu phân bổ mức độ an toàn.",
        code: `UI Capabilities (Next.js 14 + TypeScript + Tailwind CSS):\n- Spotlight Focus Mode (Isolates active high-risk contract clause)\n- Risk Distribution Spectrum Bar (Critical / High / Medium / Safe)\n- Legal Copilot Chat with Contextual Statutory Citations`,
      },
      {
        angle: 180,
        badge: "Xử lý ảnh OCR & xuất file Word",
        title: "Khử nghiêng ảnh chụp hợp đồng điện thoại và xuất file Word gạch sửa",
        body: "Hệ thống nhận trực tiếp ảnh chụp hợp đồng từ điện thoại, tự động chuyển ảnh xám, tăng tương phản 1.8 lần, lọc nhiễu và xoay thẳng góc nghiêng. Sau khi kiểm toán, hệ thống xuất file Word (.docx) gạch bỏ câu bất lợi và chèn điều khoản đàm phán thay thế.",
        code: `// Word (.docx) Redline Output:\n[-] Điều 4.2: Bên B chịu phạt vi phạm 25% tổng giá trị hợp đồng...\n[+] Điều 4.2 (Đề xuất): Tổng mức phạt không vượt quá 8% giá trị phần nghĩa vụ bị vi phạm theo Điều 301 Luật Thương mại 2005.`,
      },
      {
        angle: 240,
        badge: "Kiểm thử tự động Pytest & CI/CD",
        title: "Bộ kiểm thử tự động cho Legal Engine, OCR Pipeline và Storage Manager",
        body: "Kho mã nguồn tích hợp GitHub Actions tự động kiểm tra chất lượng mã nguồn và chạy bộ kiểm thử Pytest cho toàn bộ các thành phần cốt lõi: động cơ đối chiếu luật, chuỗi tiền xử lý ảnh OCR và trình xuất tài liệu Word.",
        code: `Automated Test Suite (pytest tests -v):\n[PASS] backend/tests/test_legal_engine.py (Statutory rule & cap verification)\n[PASS] backend/tests/test_ocr_pipeline.py (Deskew & 1.8x contrast pipeline)\n[PASS] backend/tests/test_storage_manager.py (Document lifecycle & DOCX export)`,
      },
      {
        angle: 300,
        badge: "Mô phỏng kiểm toán điều khoản",
        title: "Chạy thử trình kiểm toán hợp đồng ngay trong khu vực Mô phỏng bên dưới",
        body: "Bạn có thể truy cập kho mã nguồn GitHub để xem cấu trúc FastAPI, Neo4j và Next.js 14, hoặc cuộn xuống khu vực Mô phỏng thuật toán ngay bên dưới để bấm chọn 3 bẫy hợp đồng phổ biến và xem kết quả gạch sửa tức thì.",
        code: `GitHub Repository: https://github.com/Hoa26040005/legal-ai-contract-reviewer\nInteractive Demo:  Available in #workbench section below`,
      },
    ],
  },

  agripos: {
    index: 2,
    repo: "Hoa26040005/pesticide-shop",
    repoUrl: "https://github.com/Hoa26040005/pesticide-shop",
    liveUrl: "#workbench",
    name: "AgriPOS · Desktop ERP & Khuôn Mặt 68 Điểm",
    screenshot: "assets/projects/fashion-chatbot.png",
    metrics: [
      { value: "68 Điểm", label: "Mốc nhận diện khuôn mặt" },
      { value: "128 chiều", label: "Vector đặc trưng sinh trắc" },
      { value: "10 phân hệ", label: "POS, Kho, Công nợ, Báo cáo" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "Bài toán quản trị đại lý vật tư",
        title: "Số hóa quản lý bán hàng, lô hạn sử dụng và công nợ mùa vụ trên Desktop",
        body: "Các đại lý vật tư nông nghiệp có đặc thù bán hàng theo mùa vụ, theo dõi công nợ nông dân dài hạn, kiểm soát hạn sử dụng theo lô và cần bảo mật doanh thu khi chủ cửa hàng vắng mặt. AgriPOS vận hành trên cả trình duyệt và bộ cài phần mềm Windows (.exe).",
        code: `Core ERP Modules (10 Functional Screens):\n- FaceID Biometric Login & Registration (LoginWithFace.jsx / FaceRegister.jsx)\n- Fast QR POS Checkout (PosScreen.jsx) & Order History (OrderList.jsx)\n- Batch & Expiry Inventory (InventoryList.jsx) & Farmer Debt Ledger (DebtList.jsx)\n- Admin Financial Reports (ReportDashboard.jsx) & Audit Logs (SystemLogs.jsx)`,
      },
      {
        angle: 60,
        badge: "Kiến trúc Electron 39 & Firestore",
        title: "Đóng gói bộ cài Windows NSIS EXE và đồng bộ dữ liệu thời gian thực",
        body: "Ứng dụng được xây dựng bằng React 19 kết hợp trình đóng gói Vite và Electron 39 (electron-builder NSIS). Dữ liệu sản phẩm, tồn kho, đơn hàng và nhật ký hệ thống được đồng bộ thời gian thực với Firebase Firestore kèm tập luật phân quyền chặt chẽ.",
        code: `Build & Packaging Pipeline:\n- Dev Mode: concurrently -k "npm run dev" "npm run electron"\n- Production Installer: vite build && electron-builder (NSIS Windows .exe)\n- Cloud Sync: Firebase 12.6 Firestore + Realtime AuthContext`,
      },
      {
        angle: 120,
        badge: "Giao diện bán hàng POS & báo cáo",
        title: "Tối ưu thao tác quét mã QR, in hóa đơn tại quầy và xuất sổ công nợ PDF/Excel",
        body: "Giao diện bán hàng được thiết kế bằng Ant Design 6 tối ưu cho phím tắt tại quầy thu ngân, hỗ trợ tạo mã QR thanh toán, in hóa đơn trực tiếp và xuất bảng kê công nợ hoặc báo cáo lãi lỗ ra tệp PDF và Excel.",
        code: `UI & Utility Stack:\n- React 19.2 · React Router 7 (HashRouter for Electron compatibility)\n- Ant Design 6.1 · react-webcam 7.2 · react-to-print\n- jspdf 3.0 + jspdf-autotable 5.0 · xlsx 0.18 · qrcode.react 4.2`,
      },
      {
        angle: 180,
        badge: "Sinh trắc học khuôn mặt 68 điểm",
        title: "Mạng nơ-ron SSD MobileNetV1 và 68 điểm mốc khuôn mặt chạy trực tiếp",
        body: "Sử dụng @vladmandic/face-api tải mô hình học sâu ngay từ thư mục cục bộ: phát hiện khuôn mặt qua Webcam bằng SSD MobileNetV1, căn chỉnh 68 điểm mốc mắt-mũi-cằm và trích xuất vector 128 chiều để tính khoảng cách Euclidean mà không gửi ảnh thô ra ngoài.",
        code: `// Biometric Pipeline in src/utils/faceDetection.js:\nawait faceapi.nets.ssdMobilenetv1.loadFromUri('/models');\nawait faceapi.nets.faceLandmark68Net.loadFromUri('/models');\nawait faceapi.nets.faceRecognitionNet.loadFromUri('/models');\nconst detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();`,
      },
      {
        angle: 240,
        badge: "Phân quyền RBAC & tự động khóa phiên",
        title: "Bảo vệ báo cáo tài chính bằng ProtectedAdminRoute và hook useAutoLogout",
        body: "Các trang chứa dữ liệu doanh thu nhạy cảm (/reports, /logs) được bảo vệ bởi lớp kiểm tra quyền Admin: nếu nhân viên thu ngân truy cập sẽ bị chặn bằng mã 403 và chuyển về màn hình bán hàng. Ngoài ra hệ thống tự động khóa phiên khi người dùng rời máy.",
        code: `// ProtectedAdminRoute in src/App.jsx:\nif (!isAdmin) {\n  return <Result status="403" title="403 - Giới hạn quyền truy cập"\n    subTitle="Khu vực này chỉ dành riêng cho Chủ cửa hàng (Admin)." />;\n}`,
      },
      {
        angle: 300,
        badge: "Mô phỏng xác thực FaceID & phân quyền",
        title: "Kiểm tra cơ chế so khớp khoảng cách Euclidean và chặn quyền truy cập",
        body: "Bạn có thể xem toàn bộ mã nguồn Electron và cấu hình mô hình nhận diện trong kho GitHub, hoặc cuộn xuống khu vực Mô phỏng thuật toán bên dưới để chuyển đổi thử giữa khuôn mặt Chủ cửa hàng và Thu ngân.",
        code: `GitHub Repository: https://github.com/Hoa26040005/pesticide-shop\nInteractive Demo:  Available in #workbench section below`,
      },
    ],
  },

  temporal: {
    index: 3,
    repo: "Hoa26040005/RAGNHANBTTHOIGIAN",
    repoUrl: "https://github.com/Hoa26040005/RAGNHANBTTHOIGIAN",
    liveUrl: "#workbench",
    name: "Temporal RAG · Hỏi Đáp Nhận Thức Thời Gian",
    screenshot: "assets/projects/temporal-rag-1.png",
    metrics: [
      { value: "92,7%", label: "Độ chính xác năm trên Eval96" },
      { value: "50.599", label: "Phân đoạn vector FAISS L2" },
      { value: "80,5%", label: "Điểm từ khóa (+60% so với cơ sở)" },
    ],
    nodes: [
      {
        angle: 0,
        badge: "Bài toán lệch mốc thời gian",
        title: "Khắc phục hiện tượng RAG truyền thống lấy nhầm văn bản cũ đã hết hiệu lực",
        body: "Trong kho tin tức tiếng Việt nhiều năm, hai bài viết cùng nói về tăng trưởng GDP nhưng thuộc năm 2022 và năm 2024 nằm rất gần nhau trong không gian vector. Khi người dùng hỏi số liệu năm 2022, RAG truyền thống thường trả lời nhầm số liệu năm 2024. Hệ thống này giải quyết triệt để hiện tượng đó.",
        code: `Problem Statement:\nQuery: "GDP Việt Nam năm 2022 tăng trưởng bao nhiêu?"\n- Traditional RAG: Returns 2024 article (62.5% Year Accuracy on Eval96)\n- Temporal RAG:    Enforces TemporalQueryPlan + Year Rerank -> 92.7% Year Accuracy`,
      },
      {
        angle: 60,
        badge: "Kiến trúc truy hồi 8 tầng",
        title: "Từ bộ phân tích ngữ nghĩa thời gian đến Hợp đồng Bằng chứng (Evidence Contract)",
        body: "Câu hỏi tiếng Việt đi qua chuỗi xử lý: chuẩn hóa hội thoại nhiều lượt, phân tích 12 vai thời gian và toán tử FIRST/LAST/CURRENT/FUTURE, tra cứu kho sự kiện lịch sử, tìm kiếm lai FAISS + BM25 hợp nhất bằng RRF, xếp hạng lại theo năm và kiểm tra hợp đồng bằng chứng trước khi sinh câu trả lời.",
        code: `User Query -> VietnameseTemporalSemanticParser (TemporalQueryPlan)\n  -> Guardrail Chain (Policy Guard vs Evidence Validator)\n  -> Hybrid Retrieval (FAISS IndexFlatIP 50,599 chunks + BM25 + RRF)\n  -> Structured Temporal & Entity Reranker\n  -> Slot-Claim-Evidence Contract (ANSWER | PARTIAL | ABSTAIN | REFUSE)`,
      },
      {
        angle: 120,
        badge: "Giao diện đối chiếu trực tuyến SSE",
        title: "Phản hồi thời gian thực qua Server-Sent Events và đặt cạnh RAG truyền thống",
        body: "Giao diện Web FastAPI cho phép đặt câu hỏi tiếng Việt, theo dõi luồng suy luận sinh ra theo thời gian thực qua giao thức SSE (/api/chat/stream) và đặt kết quả của Temporal RAG cạnh Traditional RAG để đối chiếu nguồn trích dẫn cùng độ chính xác mốc năm.",
        code: `Web & API Endpoints:\n- GET  /                 -> Interactive Comparison & Chat Web UI\n- POST /api/chat/stream  -> Real-time SSE Streaming with Provenance Citations\n- POST /api/compare      -> Side-by-side Temporal vs Traditional RAG benchmark`,
      },
      {
        angle: 180,
        badge: "Kho dữ liệu 2019-2025 & chặn ảo giác",
        title: "50.599 phân đoạn báo chí chuẩn hóa L2 và lớp chắn từ chối sự kiện tương lai",
        body: "Kho tri thức kết hợp 49.980 bài báo tiếng Việt giai đoạn 2019-2025 thuộc 12 lĩnh vực với 4.151 sự kiện lịch sử có gắn nhãn nguồn gốc. Hệ thống tự động kích hoạt trạng thái từ chối (REFUSE/ABSTAIN) khi người dùng hỏi kết quả thực tế của một năm chưa diễn ra như năm 2027.",
        code: `Corpus & Vector Index Verified Specs:\n- News Corpus (2019-2025): 49,980 articles -> 50,006 chunks\n- Wikipedia Supplement:    768 entries -> 593 chunks + 4,151 historical facts\n- Embedding Model:         paraphrase-multilingual-MiniLM-L12-v2 (384-D, L2 Norm)`,
      },
      {
        angle: 240,
        badge: "Thực nghiệm định lượng bộ chuẩn Eval96",
        title: "Đạt 92,7% độ chính xác năm, tăng 30,2 điểm phần trăm so với RAG cơ sở",
        body: "Đánh giá công bằng trên bộ kiểm thử Eval96 gồm 96 câu hỏi khó trải đều 12 lĩnh vực trên cùng mô hình ngôn ngữ Qwen3:4B: Temporal RAG đạt 92,7% độ chính xác năm (89/96 câu), 80,5% điểm từ khóa và 78,2% điểm tổng hợp, vượt xa phương pháp truyền thống.",
        code: `Canonical Eval96 Benchmark (Temporal RAG vs Traditional RAG):\n- Year Accuracy (YrOK): 92.7% (89/96) vs 62.5% (60/96)  [+30.2%]\n- Keyword Score:        80.5%         vs 20.5%          [+60.0%]\n- Combined Score:       78.2%         vs 44.2%          [+34.0%]\n- Source Relevance:     78.8%         vs 61.8%          [+17.0%]`,
      },
      {
        angle: 300,
        badge: "Trải nghiệm bộ đối chiếu thời gian",
        title: "Xem mã nguồn nghiên cứu trên GitHub hoặc thử nghiệm bộ định tuyến thời gian",
        body: "Bạn có thể mở kho mã nguồn GitHub để xem toàn bộ mã Python, tập lệnh huấn luyện và báo cáo thực nghiệm, hoặc cuộn xuống khu vực Mô phỏng thuật toán bên dưới để so sánh trực tiếp câu trả lời của hai hệ thống.",
        code: `GitHub Repository: https://github.com/Hoa26040005/RAGNHANBTTHOIGIAN\nInteractive Demo:  Available in #workbench section below`,
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
      { name: "Chủ phòng (Member A · Blazer Linen)", raw: 790000, net: 707813 },
      { name: "Thành viên B (Áo Thun Supima)", raw: 226500, net: 202999 },
    ],
    totalNet: 910812,
    note: "Kiểm chứng thực tế: 910.812 đ = 707.813 đ (77,71%) + 202.999 đ (22,29%)",
  },
  4: {
    members: 4,
    tierDiscountPct: 14,
    voucherVnd: 120000,
    shippingVnd: 30000,
    carts: [
      { name: "Chủ phòng (Member A · Trench Coat)", raw: 950000, net: 778650 },
      { name: "Thành viên B (Denim Jacket)", raw: 680000, net: 557349 },
      { name: "Thành viên C (Oxford Shirt)", raw: 450000, net: 368834 },
      { name: "Thành viên D (Cargo Pants)", raw: 520000, net: 426167 },
    ],
    totalNet: 2131000,
    note: "Phòng 4 người: chiết khấu 14% + giảm 120.000 đ + chia phí giao hàng theo tỷ trọng",
  },
  8: {
    members: 8,
    tierDiscountPct: 20,
    voucherVnd: 300000,
    shippingVnd: 0,
    carts: [
      { name: "Chủ phòng + 3 thành viên (61,5% tỷ trọng)", raw: 3200000, net: 2375385 },
      { name: "4 thành viên đồng mua (38,5% tỷ trọng)", raw: 2000000, net: 1484615 },
    ],
    totalNet: 3860000,
    note: "Phòng 8 người tối đa: chiết khấu 20% + miễn phí giao hàng + khóa đơn nguyên tử",
  },
};

const LEGAL_CLAUSES = {
  labor: {
    statute: "Bộ luật Lao động 2019 · Điều 17.1 & Điều 17.2",
    severity: "VI PHẠM ĐIỀU CẤM · VÔ HIỆU",
    removed:
      "[-] Điều khoản gốc: Bên B phải nộp bản gốc Bằng Đại học và đặt cọc 15.000.000 VNĐ tiền bảo đảm thực hiện hợp đồng.",
    inserted:
      "[+] Đề xuất sửa đổi: Bên B xuất trình bản sao công chứng văn bằng để đối chiếu; Bên A không giữ bản chính văn bằng và không yêu cầu đặt cọc tiền dưới mọi hình thức theo Điều 17 Bộ luật Lao động 2019.",
    advice:
      "Khuyến nghị đàm phán: Giữ bằng gốc và thu tiền cọc là hành vi bị cấm tuyệt đối. Yêu cầu bỏ hoàn toàn điều khoản này.",
  },
  commercial: {
    statute: "Luật Thương mại 2005 · Điều 301 (Giới hạn mức phạt 8%)",
    severity: "RỦI RO CAO · VƯỢT TRẦN LUẬT ĐỊNH",
    removed:
      "[-] Điều khoản gốc: Trường hợp chậm bàn giao phần mềm, Bên B chịu phạt vi phạm 25% tổng giá trị hợp đồng cho mỗi tuần chậm trễ.",
    inserted:
      "[+] Đề xuất sửa đổi: Trường hợp chậm bàn giao do lỗi trực tiếp của Bên B, mức phạt vi phạm được áp dụng theo thực tế nhưng tổng mức phạt không vượt quá 8% giá trị phần nghĩa vụ hợp đồng bị vi phạm (Điều 301 Luật Thương mại 2005).",
    advice:
      "Khuyến nghị đàm phán: Mức phạt trên 8% trong hợp đồng thương mại dịch vụ sẽ bị Tòa án hoặc Trọng tài tuyên vô hiệu phần vượt quá.",
  },
  civil: {
    statute: "Bộ luật Dân sự 2015 · Điều 468 (Trần lãi suất 20%/năm)",
    severity: "RỦI RO CAO · VƯỢT TRẦN LÃI SUẤT",
    removed:
      "[-] Điều khoản gốc: Khoản thanh toán quá hạn sẽ chịu lãi suất phạt chậm trả là 0,15%/ngày (tương đương 54,75%/năm).",
    inserted:
      "[+] Đề xuất sửa đổi: Khoản thanh toán quá hạn chịu lãi suất chậm trả bằng 10%/năm (không vượt quá trần 20%/năm theo khoản 1 Điều 468 Bộ luật Dân sự 2015) tính trên số tiền và số ngày thực tế chậm trả.",
    advice:
      "Khuyến nghị đàm phán: Đưa lãi chậm trả về khung 10% đến tối đa 20%/năm để đảm bảo hiệu lực thi hành.",
  },
};

const FACEID_ROLES = {
  admin: {
    role: "Chủ cửa hàng (Admin · Đã xác thực khuôn mặt 68 điểm)",
    distance: "0.264 (Ngưỡng < 0.450 · KHỚP SINH TRẮC HỌC)",
    model: "ssd_mobilenetv1 + face_landmark_68 + face_recognition_net",
    access: "CHO PHÉP TOÀN QUYỀN: /pos, /inventory, /debt, /reports, /logs",
    statusClass: "status-ok",
  },
  cashier: {
    role: "Nhân viên Thu ngân (POS Cashier · Giới hạn quyền RBAC)",
    distance: "0.312 (Ngưỡng < 0.450 · KHỚP SINH TRẮC HỌC)",
    model: "ssd_mobilenetv1 + ProtectedAdminRoute Guard",
    access: "CHO PHÉP: /pos, /orders · CHẶN 403: /reports, /logs",
    statusClass: "status-warn",
  },
};

const TEMPORAL_QUERIES = {
  gdp2022: {
    query: "GDP Việt Nam năm 2022 tăng trưởng bao nhiêu phần trăm?",
    plan: "TemporalQueryPlan(intent=POINT_YEAR, target_year=2022, metric=GDP_GROWTH)",
    traditional:
      "[RAG Truyền thống - Sai năm]: Trả lời nhầm số liệu GDP năm 2024 (7,09%) do bài báo tổng kết kinh tế có độ tương đồng ngữ nghĩa cao hơn.",
    temporal:
      "[Temporal RAG - Đúng năm]: Tăng trưởng GDP năm 2022 của Việt Nam đạt 8,02%, mức cao nhất giai đoạn 2011-2022 (Contract: ANSWER · YrOK: PASS).",
  },
  first: {
    query: "Sự kiện đối ngoại lớn đầu tiên của Việt Nam đầu năm 2020 là gì?",
    plan: "TemporalQueryPlan(operator=FIRST, year=2020, source=Hybrid+HistoricalFactStore)",
    traditional:
      "[RAG Truyền thống - Lệch thứ tự]: Trích xuất ngẫu nhiên hội nghị cuối năm 2020 hoặc năm 2023 vì không hiểu toán tử thứ tự ĐẦU TIÊN.",
    temporal:
      "[Temporal RAG - Chính xác]: Việt Nam chính thức đảm nhiệm vai trò Chủ tịch ASEAN 2020 và Ủy viên không thường trực HĐBA LHQ từ tháng 1/2020.",
  },
  future2025: {
    query: "Kết quả thực tế tốc độ tăng trưởng kinh tế cả năm 2027 là bao nhiêu?",
    plan: "TemporalQueryPlan(intent=FUTURE_FACT, target_year=2027, guardrail=POLICY_GUARD)",
    traditional:
      "[RAG Truyền thống - Ảo giác]: Bịa đặt số liệu từ các văn bản dự báo quy hoạch giai đoạn 2021-2030 thành kết quả thực tế đã xảy ra.",
    temporal:
      "[Temporal RAG - Chặn ảo giác]: Từ chối khẳng định kết quả thực tế năm 2027 vì vượt ngoài phạm vi sự kiện đã diễn ra (kho dữ liệu 2019-2025).",
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
  // 1. 360° ORBITAL RING CONTROLLERS FOR ALL 4 PROJECTS
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
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProjectDeepDiveModal(projKey);
        }
      });
    });

    selectOrbitalNode(0, false);
  });

  // Project jump buttons
  const jumpBtns = document.querySelectorAll(".project-jump-btn");
  jumpBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      jumpBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  // 2. FULL-SCREEN PROJECT DEEP-DIVE MODAL
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
          <p class="modal-node-topic">${escapeHtml(n.badge)}</p>
          <p class="modal-node-title">${escapeHtml(n.title)}</p>
          <p class="modal-node-body">${escapeHtml(n.body)}</p>
          <pre class="inspector-code-box"><code>${escapeHtml(n.code)}</code></pre>
        </article>`
      )
      .join("");

    modalContent.innerHTML = `
      <div class="modal-top-bar">
        <div>
          <p class="arena-repo-tag">Kho mã nguồn: <code>${escapeHtml(project.repo)}</code></p>
          <p class="modal-project-heading">${escapeHtml(project.name)}</p>
        </div>
        <div class="arena-actions">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">Mở Mã Nguồn GitHub</a>
          ${
            project.liveUrl.startsWith("http")
              ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-ghost">Mở Bản Chạy Thật</a>`
              : `<a href="${project.liveUrl}" class="btn-ghost" id="modal-jump-workbench">Chạy Bộ Mô Phỏng</a>`
          }
        </div>
      </div>

      <div class="inspector-metrics-row">
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

  // 3. LIVE INTERACTIVE SIMULATORS IN #workbench
  const gbOutput = document.querySelector("#gb-sandbox-output");
  const gbButtons = document.querySelectorAll("[data-gb-size]");

  function renderGroupBuy(size) {
    const data = GROUPBUY_SCENARIOS[size] || GROUPBUY_SCENARIOS[2];
    if (!gbOutput) return;
    const rowsHtml = data.carts
      .map(
        (c) =>
          `<div class="sim-row">
            <span>${escapeHtml(c.name)}</span>
            <strong class="sim-accent">${formatVND(c.net)}</strong>
          </div>`
      )
      .join("");

    gbOutput.innerHTML = `
      <div class="sim-meta-row">
        <span>Chiết khấu nhóm: <strong>-${data.tierDiscountPct}%</strong></span>
        <span>Voucher: <strong>-${formatVND(data.voucherVnd)}</strong></span>
        <span>Giao hàng: <strong>${formatVND(data.shippingVnd)}</strong></span>
      </div>
      ${rowsHtml}
      <div class="sim-total-row">
        <span>Tổng thanh toán đơn chủ phòng:</span>
        <strong class="status-ok">${formatVND(data.totalNet)}</strong>
      </div>
      <p class="sim-note">${escapeHtml(data.note)}</p>
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
      <div class="sim-meta-row">
        <strong class="sim-accent">${escapeHtml(item.statute)}</strong>
        <span class="status-danger">[${escapeHtml(item.severity)}]</span>
      </div>
      <div class="redline-del">${escapeHtml(item.removed)}</div>
      <div class="redline-ins">${escapeHtml(item.inserted)}</div>
      <p class="sim-note">${escapeHtml(item.advice)}</p>
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
      <div class="sim-row">
        <span>Đối tượng quét Webcam:</span>
        <strong class="${r.statusClass}">${escapeHtml(r.role)}</strong>
      </div>
      <div class="sim-row">
        <span>Khoảng cách Euclidean 128 chiều:</span>
        <strong class="sim-accent">${escapeHtml(r.distance)}</strong>
      </div>
      <div class="sim-row">
        <span>Chuỗi mô hình:</span>
        <code>${escapeHtml(r.model)}</code>
      </div>
      <div class="sim-total-row">
        <span>Quyền truy cập tuyến:</span>
        <strong class="${r.statusClass}">${escapeHtml(r.access)}</strong>
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
      <p class="sim-query">Truy vấn: "${escapeHtml(q.query)}"</p>
      <p class="sim-plan"><code>${escapeHtml(q.plan)}</code></p>
      <div class="redline-del">${escapeHtml(q.traditional)}</div>
      <div class="redline-ins">${escapeHtml(q.temporal)}</div>
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

  // 4. EMAIL COPY, CV DRAWER & ESCAPE KEY HANDLER
  const copyBtn = document.querySelector("#copy-email-btn");
  const copyStatus = document.querySelector("#copy-email-status");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = "huynhhoa9881@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        if (copyStatus) {
          const orig = copyStatus.textContent;
          copyStatus.textContent = "Đã sao chép email";
          setTimeout(() => {
            copyStatus.textContent = orig;
          }, 2400);
        }
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
