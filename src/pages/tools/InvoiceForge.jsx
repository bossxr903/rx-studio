import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Download, RefreshCcw, FileText, Settings, Building2, User } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Default empty state
const initialState = {
  invoiceNumber: 'INV-0001',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  currency: '$',
  senderName: 'NX STUDIO',
  senderEmail: 'hello@nxstudio.com',
  senderAddress: '123 Tech Valley, San Francisco, CA',
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  items: [
    { id: 1, name: 'Web Design Services', qty: 1, price: 1500 }
  ],
  taxRate: 5, // Percentage
  discount: 0 // Fixed amount
};

export default function App() {
  const [data, setData] = useState(initialState);
  const [isClient, setIsClient] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsClient(true);
    const savedDraft = localStorage.getItem('invoiceForgeDraft');
    if (savedDraft) {
      try {
        setData(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('invoiceForgeDraft', JSON.stringify(data));
    }
  }, [data, isClient]);

  // Handlers
  const handleUpdate = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemUpdate = (id, field, value) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: field === 'name' ? value : parseFloat(value) || 0 } : item
      )
    }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      qty: 1,
      price: 0
    };
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id) => {
    setData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));
  };

  const clearDraft = () => {
    if(confirm('Are you sure you want to clear the draft? This cannot be undone.')) {
      setData(initialState);
      localStorage.removeItem('invoiceForgeDraft');
    }
  };

  // Calculations
  const subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = (subtotal * (data.taxRate / 100));
  const total = subtotal + taxAmount - data.discount;

  // PDF Export Function
  const exportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${data.invoiceNumber || 'Draft'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">InvoiceForge</h1>
            <p className="text-sm text-slate-500 font-medium">by NX STUDIO</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={clearDraft}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCcw size={16} />
            Reset Draft
          </button>
          <button 
            onClick={exportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            {isExporting ? 'Generating PDF...' : 'Export PDF'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: EDITOR */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* Invoice Details Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-indigo-600">
              <Settings size={18} />
              <h2 className="font-semibold text-slate-800">Invoice Settings</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Invoice No.</label>
                <input 
                  type="text" 
                  value={data.invoiceNumber} 
                  onChange={(e) => handleUpdate('invoiceNumber', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Currency Symbol</label>
                <input 
                  type="text" 
                  value={data.currency} 
                  onChange={(e) => handleUpdate('currency', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
                <input 
                  type="date" 
                  value={data.date} 
                  onChange={(e) => handleUpdate('date', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={data.dueDate} 
                  onChange={(e) => handleUpdate('dueDate', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sender & Client Details Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sender */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 mb-2">
                    <Building2 size={18} />
                    <h2 className="font-semibold text-slate-800">From (Sender)</h2>
                  </div>
                  <input placeholder="Your Company Name" value={data.senderName} onChange={(e) => handleUpdate('senderName', e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  <input placeholder="Email Address" value={data.senderEmail} onChange={(e) => handleUpdate('senderEmail', e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  <textarea placeholder="Address" value={data.senderAddress} onChange={(e) => handleUpdate('senderAddress', e.target.value)} rows="2" className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none" />
                </div>
                
                {/* Client */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 mb-2">
                    <User size={18} />
                    <h2 className="font-semibold text-slate-800">To (Client)</h2>
                  </div>
                  <input placeholder="Client Name" value={data.clientName} onChange={(e) => handleUpdate('clientName', e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  <input placeholder="Client Email" value={data.clientEmail} onChange={(e) => handleUpdate('clientEmail', e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  <textarea placeholder="Client Address" value={data.clientAddress} onChange={(e) => handleUpdate('clientAddress', e.target.value)} rows="2" className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none" />
                </div>
             </div>
          </div>

          {/* Items Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="font-semibold text-slate-800 mb-4">Line Items</h2>
            
            <div className="space-y-3 mb-4">
              {data.items.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <div className="flex-grow space-y-2">
                    <input 
                      placeholder="Item Description" 
                      value={item.name} 
                      onChange={(e) => handleItemUpdate(item.id, 'name', e.target.value)} 
                      className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500" 
                    />
                    <div className="flex gap-2">
                      <div className="w-1/3">
                        <input 
                          type="number" 
                          min="1" 
                          placeholder="Qty" 
                          value={item.qty || ''} 
                          onChange={(e) => handleItemUpdate(item.id, 'qty', e.target.value)} 
                          className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500" 
                        />
                      </div>
                      <div className="w-2/3">
                        <input 
                          type="number" 
                          min="0" 
                          placeholder="Price" 
                          value={item.price || ''} 
                          onChange={(e) => handleItemUpdate(item.id, 'price', e.target.value)} 
                          className="w-full p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500" 
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors mt-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={addItem}
              className="w-full py-2 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus size={16} /> Add Item
            </button>
          </div>

          {/* Tax & Discount */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tax Rate (%)</label>
              <input 
                type="number" 
                min="0" 
                value={data.taxRate || ''} 
                onChange={(e) => handleUpdate('taxRate', parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Discount Amount</label>
              <input 
                type="number" 
                min="0" 
                value={data.discount || ''} 
                onChange={(e) => handleUpdate('discount', parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

        </section>

        {/* RIGHT PANEL: LIVE PREVIEW */}
        <section className="lg:col-span-7">
          <div className="sticky top-8">
            <div className="mb-4 flex justify-between items-center px-2">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Live Preview</h2>
            </div>
            
            {/* INVOICE PAPER (This section is exported to PDF) */}
            <div 
              ref={previewRef}
              className="bg-white p-8 sm:p-12 rounded-lg shadow-lg border border-slate-200 min-h-[800px] flex flex-col"
              style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
            >
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">INVOICE</h1>
                  <p className="text-slate-500 font-medium">#{data.invoiceNumber || 'INV-0000'}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold text-slate-800">{data.senderName || 'Your Company'}</h2>
                  <p className="text-slate-500 whitespace-pre-line text-sm mt-1">{data.senderAddress}</p>
                  <p className="text-slate-500 text-sm mt-1">{data.senderEmail}</p>
                </div>
              </div>

              {/* Invoice Meta */}
              <div className="flex justify-between mb-12">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bill To</p>
                  <h3 className="text-lg font-bold text-slate-800">{data.clientName || 'Client Name'}</h3>
                  <p className="text-slate-600 whitespace-pre-line text-sm mt-1">{data.clientAddress || 'Client Address'}</p>
                  <p className="text-slate-600 text-sm mt-1">{data.clientEmail || 'Client Email'}</p>
                </div>
                <div className="text-right flex flex-col gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Invoice Date</p>
                    <p className="text-slate-800 font-medium text-sm">{data.date || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</p>
                    <p className="text-slate-800 font-medium text-sm">{data.dueDate || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-800">
                      <th className="py-3 text-sm font-bold text-slate-800 uppercase tracking-wide">Description</th>
                      <th className="py-3 text-sm font-bold text-slate-800 uppercase tracking-wide text-center">Qty</th>
                      <th className="py-3 text-sm font-bold text-slate-800 uppercase tracking-wide text-right">Price</th>
                      <th className="py-3 text-sm font-bold text-slate-800 uppercase tracking-wide text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-slate-400 text-sm">No items added yet.</td>
                      </tr>
                    )}
                    {data.items.map((item, index) => (
                      <tr key={index} className="border-b border-slate-100 last:border-0">
                        <td className="py-4 text-sm text-slate-800">{item.name || 'Untitled Item'}</td>
                        <td className="py-4 text-sm text-slate-600 text-center">{item.qty}</td>
                        <td className="py-4 text-sm text-slate-600 text-right">{data.currency}{Number(item.price).toFixed(2)}</td>
                        <td className="py-4 text-sm text-slate-800 font-medium text-right">
                          {data.currency}{(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
                <div className="w-full sm:w-1/2 md:w-1/3 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-slate-800">{data.currency}{subtotal.toFixed(2)}</span>
                  </div>
                  {data.taxRate > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Tax ({data.taxRate}%)</span>
                      <span className="text-slate-800">{data.currency}{taxAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {data.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Discount</span>
                      <span className="text-red-500">-{data.currency}{data.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-slate-800 pt-3 mt-3">
                    <span className="text-slate-900">Total</span>
                    <span className="text-indigo-600">{data.currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 text-center text-slate-400 text-xs border-t border-slate-100 pt-8 pb-4">
                Thank you for your business. Generated by NX STUDIO InvoiceForge.
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

