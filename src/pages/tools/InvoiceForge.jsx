import { useState } from "react";

const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "INR", "CAD", "AUD", "SGD"];
const emptyItem = () => ({ id: Date.now() + Math.random(), desc: "", qty: 1, price: "" });

export default function InvoiceForge() {
  const [sender, setSender] = useState({ name: "", email: "", address: "", phone: "" });
  const [client, setClient] = useState({ name: "", email: "", address: "", phone: "" });
  const [meta, setMeta] = useState({
    number: "INV-001",
    date: new Date().toISOString().split("T")[0],
    due: "",
    currency: "USD",
    notes: "",
  });
  const [items, setItems] = useState([emptyItem()]);
  const [tax, setTax] = useState("");
  const [discount, setDiscount] = useState("");
  const [view, setView] = useState("edit");

  const subtotal = items.reduce((s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.price) || 0), 0);
  const discAmt = (subtotal * (parseFloat(discount) || 0)) / 100;
  const taxAmt = ((subtotal - discAmt) * (parseFloat(tax) || 0)) / 100;
  const total = subtotal - discAmt + taxAmt;
  const fmt = (n) => `${meta.currency} ${Number(n).toFixed(2)}`;

  const addItem = () => setItems([...items, emptyItem()]);
  const removeItem = (id) => items.length > 1 && setItems(items.filter((i) => i.id !== id));
  const updateItem = (id, field, val) => setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));

  const saveDraft = () => {
    localStorage.setItem("nxs_invoice", JSON.stringify({ sender, client, meta, items, tax, discount }));
    alert("Draft saved!");
  };
  const loadDraft = () => {
    const d = localStorage.getItem("nxs_invoice");
    if (!d) return alert("No draft found.");
    const p = JSON.parse(d);
    setSender(p.sender); setClient(p.client); setMeta(p.meta);
    setItems(p.items); setTax(p.tax); setDiscount(p.discount);
  };

  const S = {
    page: { fontFamily: "'Outfit',sans-serif", minHeight: "100vh", background: "#f4f5f7", color: "#1a1a2e" },
    nav: {
      background: "#fff", borderBottom: "1.5px solid #ebebf3",
      padding: "13px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 99,
    },
    logoBox: {
      width: 34, height: 34, borderRadius: 9,
      background: "linear-gradient(135deg,#5b5bd6,#8484f0)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
    },
    logoText: { fontFamily: "'Fraunces',serif", fontSize: 17, color: "#1a1a2e", lineHeight: 1 },
    logoSub: { fontSize: 10, color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 },
    btnPrimary: {
      padding: "9px 18px", borderRadius: 9, border: "none", cursor: "pointer",
      fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff",
      background: "#5b5bd6", boxShadow: "0 2px 10px rgba(91,91,214,0.25)",
      transition: "all 0.15s", display: "inline-flex", alignItems: "center", gap: 5,
    },
    btnOutline: {
      padding: "9px 18px", borderRadius: 9, border: "1.5px solid #e0e0ea", cursor: "pointer",
      fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600, color: "#555",
      background: "#fff", transition: "all 0.15s",
    },
    card: {
      background: "#fff", borderRadius: 16, border: "1.5px solid #ebebf3",
      padding: "22px 26px", marginBottom: 14,
    },
    sectionTitle: {
      fontFamily: "'Fraunces',serif", fontSize: 16, color: "#1a1a2e",
      marginBottom: 18, paddingBottom: 12, borderBottom: "1.5px solid #f2f2f8",
    },
    label: {
      fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
      textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 5,
    },
    input: {
      width: "100%", background: "#fafafa", border: "1.5px solid #e8e9ee",
      borderRadius: 9, padding: "9px 13px", fontFamily: "'Outfit',sans-serif",
      fontSize: 13.5, color: "#1a1a2e", outline: "none",
    },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
    grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
  };

  const Input = ({ label, value, onChange, type = "text", placeholder = "" }) => (
    <div style={{ marginBottom: 12 }}>
      <label style={S.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={S.input}
        onFocus={e => { e.target.style.borderColor = "#5b5bd6"; e.target.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "#e8e9ee"; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
        @media (max-width: 640px) {
          .grid2 { grid-template-columns: 1fr !important; }
          .grid3 { grid-template-columns: 1fr !important; }
          .item-grid { grid-template-columns: 1fr 60px 90px 34px !important; }
        }
        select { appearance: none; cursor: pointer; }
        textarea { resize: vertical; }
      `}</style>

      {/* NAV */}
      <div style={S.nav} className="no-print">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={S.logoBox}>📄</div>
          <div>
            <div style={S.logoSub}>NX Studio</div>
            <div style={S.logoText}>InvoiceForge</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={S.btnOutline} onClick={loadDraft}>Load</button>
          <button style={S.btnOutline} onClick={saveDraft}>💾 Save</button>
          <button style={S.btnOutline} onClick={() => setView(view === "edit" ? "preview" : "edit")}>
            {view === "edit" ? "👁 Preview" : "✏️ Edit"}
          </button>
          <button style={S.btnPrimary} onClick={() => window.print()}>🖨️ PDF</button>
        </div>
      </div>

      {/* ── EDIT ── */}
      {view === "edit" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px 60px" }}>

          {/* Invoice Info */}
          <div style={S.card}>
            <div style={S.sectionTitle}>🧾 Invoice Details</div>
            <div className="grid3" style={S.grid3}>
              <Input label="Invoice No." value={meta.number} onChange={e => setMeta({ ...meta, number: e.target.value })} />
              <Input label="Issue Date" type="date" value={meta.date} onChange={e => setMeta({ ...meta, date: e.target.value })} />
              <Input label="Due Date" type="date" value={meta.due} onChange={e => setMeta({ ...meta, due: e.target.value })} />
            </div>
            <div style={{ maxWidth: 170 }}>
              <label style={S.label}>Currency</label>
              <select
                value={meta.currency}
                onChange={e => setMeta({ ...meta, currency: e.target.value })}
                style={{ ...S.input, cursor: "pointer" }}
              >
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* From / To */}
          <div className="grid2" style={S.grid2}>
            {[
              { title: "🏢 From (You)", data: sender, set: setSender },
              { title: "👤 Bill To", data: client, set: setClient },
            ].map(({ title, data, set }) => (
              <div style={S.card} key={title}>
                <div style={S.sectionTitle}>{title}</div>
                {["name", "email", "phone", "address"].map(f => (
                  <Input key={f} label={f} value={data[f]}
                    placeholder={`Enter ${f}`}
                    onChange={e => set({ ...data, [f]: e.target.value })} />
                ))}
              </div>
            ))}
          </div>

          {/* Line Items */}
          <div style={S.card}>
            <div style={S.sectionTitle}>📦 Line Items</div>
            <div className="item-grid" style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 36px", gap: 10, marginBottom: 10 }}>
              {["Description", "Qty", "Price", ""].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#bbb" }}>{h}</div>
              ))}
            </div>
            {items.map(item => (
              <div key={item.id} className="item-grid" style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 36px", gap: 10, marginBottom: 8 }}>
                <input style={S.input} value={item.desc} placeholder="Item description" onChange={e => updateItem(item.id, "desc", e.target.value)} />
                <input style={{ ...S.input, textAlign: "center" }} type="number" min="1" value={item.qty} onChange={e => updateItem(item.id, "qty", e.target.value)} />
                <input style={{ ...S.input, textAlign: "right" }} type="number" min="0" step="0.01" value={item.price} placeholder="0.00" onChange={e => updateItem(item.id, "price", e.target.value)} />
                <button
                  onClick={() => removeItem(item.id)}
                  style={{ background: "#fff1f1", border: "1.5px solid #ffd5d5", color: "#e03e3e", borderRadius: 8, cursor: "pointer", fontSize: 16, fontWeight: 700 }}
                >×</button>
              </div>
            ))}
            <button style={{ ...S.btnOutline, marginTop: 8 }} onClick={addItem}>+ Add Item</button>
          </div>

          {/* Summary */}
          <div style={S.card}>
            <div style={S.sectionTitle}>💰 Summary</div>
            <div className="grid2" style={{ ...S.grid2, marginBottom: 20 }}>
              <Input label="Discount (%)" type="number" value={discount} placeholder="0" onChange={e => setDiscount(e.target.value)} />
              <Input label="Tax (%)" type="number" value={tax} placeholder="0" onChange={e => setTax(e.target.value)} />
            </div>
            <div style={{ maxWidth: 290, marginLeft: "auto" }}>
              {[
                { label: "Subtotal", val: fmt(subtotal), color: "#333" },
                parseFloat(discount) > 0 ? { label: `Discount (${discount}%)`, val: `− ${fmt(discAmt)}`, color: "#e03e3e" } : null,
                parseFloat(tax) > 0 ? { label: `Tax (${tax}%)`, val: fmt(taxAmt), color: "#333" } : null,
              ].filter(Boolean).map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #f0f0f8", fontSize: 14 }}>
                  <span style={{ color: "#888" }}>{row.label}</span>
                  <span style={{ fontWeight: 600, color: row.color }}>{row.val}</span>
                </div>
              ))}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 18px", marginTop: 12,
                background: "linear-gradient(135deg,#5b5bd6,#8484f0)",
                borderRadius: 12, color: "#fff",
              }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Total Due</span>
                <span style={{ fontWeight: 700, fontSize: 21 }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={S.card}>
            <div style={S.sectionTitle}>📝 Notes</div>
            <textarea
              style={{ ...S.input, minHeight: 80 }}
              rows={3}
              value={meta.notes}
              placeholder="Payment terms, bank details, thank you message..."
              onChange={e => setMeta({ ...meta, notes: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* ── PREVIEW ── */}
      {view === "preview" && (
        <div style={{ padding: "28px 16px 60px" }}>
          <div style={{
            maxWidth: 720, margin: "0 auto", background: "#fff",
            borderRadius: 18, padding: "50px 56px",
            boxShadow: "0 8px 50px rgba(0,0,0,0.09)", border: "1.5px solid #ebebf3",
          }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 44, fontWeight: 700, color: "#1a1a2e", lineHeight: 1 }}>INVOICE</div>
                <div style={{ marginTop: 6, color: "#bbb", fontSize: 13, fontWeight: 500 }}>{meta.number}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e" }}>{sender.name || "Your Name"}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{sender.email}</div>
                <div style={{ fontSize: 13, color: "#888" }}>{sender.phone}</div>
                <div style={{ fontSize: 13, color: "#888" }}>{sender.address}</div>
              </div>
            </div>

            <div style={{ height: 3, background: "linear-gradient(90deg,#5b5bd6,#a5a5ff,transparent)", borderRadius: 3, marginBottom: 36 }} />

            {/* Bill To + Dates */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", marginBottom: 7 }}>Bill To</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{client.name || "Client"}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{client.email}</div>
                <div style={{ fontSize: 13, color: "#888" }}>{client.phone}</div>
                <div style={{ fontSize: 13, color: "#888" }}>{client.address}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 3 }}>Issue Date</div>
                  <div style={{ fontWeight: 600, color: "#1a1a2e", fontSize: 14 }}>{meta.date}</div>
                </div>
                {meta.due && <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 3 }}>Due Date</div>
                  <div style={{ fontWeight: 600, color: "#e03e3e", fontSize: 14 }}>{meta.due}</div>
                </div>}
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28 }}>
              <thead>
                <tr style={{ background: "#f4f4fd" }}>
                  {[["Description", "left"], ["Qty", "right"], ["Price", "right"], ["Total", "right"]].map(([h, align]) => (
                    <th key={h} style={{ padding: "10px 14px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5b5bd6", textAlign: align }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f2f2f8" }}>
                    <td style={{ padding: "12px 14px", fontSize: 13.5, color: "#333" }}>{item.desc || "—"}</td>
                    <td style={{ padding: "12px 14px", fontSize: 13.5, color: "#666", textAlign: "right" }}>{item.qty}</td>
                    <td style={{ padding: "12px 14px", fontSize: 13.5, color: "#666", textAlign: "right" }}>{fmt(parseFloat(item.price) || 0)}</td>
                    <td style={{ padding: "12px 14px", fontSize: 13.5, fontWeight: 600, color: "#1a1a2e", textAlign: "right" }}>{fmt((parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ minWidth: 260 }}>
                {[
                  { label: "Subtotal", val: fmt(subtotal) },
                  parseFloat(discount) > 0 ? { label: `Discount (${discount}%)`, val: `− ${fmt(discAmt)}`, red: true } : null,
                  parseFloat(tax) > 0 ? { label: `Tax (${tax}%)`, val: fmt(taxAmt) } : null,
                ].filter(Boolean).map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13.5, borderBottom: "1px dashed #f0f0f8" }}>
                    <span style={{ color: "#888" }}>{row.label}</span>
                    <span style={{ fontWeight: 500, color: row.red ? "#e03e3e" : "#1a1a2e" }}>{row.val}</span>
                  </div>
                ))}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "13px 18px", marginTop: 10,
                  background: "linear-gradient(135deg,#5b5bd6,#8484f0)",
                  borderRadius: 12, color: "#fff",
                }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Total Due</span>
                  <span style={{ fontWeight: 700, fontSize: 21 }}>{fmt(total)}</span>
                </div>
              </div>
            </div>

            {meta.notes && (
              <div style={{ marginTop: 36, padding: "16px 20px", background: "#f8f8fd", borderLeft: "3px solid #5b5bd6", borderRadius: "0 10px 10px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>Notes</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}>{meta.notes}</div>
              </div>
            )}

            <div style={{ marginTop: 44, paddingTop: 20, borderTop: "1px solid #f0f0f8", textAlign: "center", fontSize: 11, color: "#ddd" }}>
              Generated with InvoiceForge · NX Studio
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
