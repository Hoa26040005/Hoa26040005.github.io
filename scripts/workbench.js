// ============================================================================
// scripts/workbench.js · Live 4-Project Interactive Workbench & CV Drawer
// Implements the Scroll-Craft Signature Move & Live Surface Honesty Rule
// ============================================================================

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

export function initPortfolioWorkbench() {
  // 1. Group-Buy Allocation Sandbox (Shop-Quan-Ao / FashionElite)
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

  // 2. LegalAI Redline Sandbox (legal-ai-contract-reviewer)
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

  // 3. AgriPOS 68-Landmark FaceID & RBAC Sandbox (pesticide-shop)
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

  // 4. Temporal RAG vs Traditional RAG Sandbox (RAGNHANBTTHOIGIAN)
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

  // 5. Email Copy & ATS CV Modal Controls
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
}

