import React from 'react';
import { X, CheckCircle, AlertCircle, MessageSquare, Phone, MapPin, Tag } from 'lucide-react';

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  const {
    name,
    price,
    originalPrice,
    description,
    imageUrl,
    inStock,
    stockQuantity,
    brand,
    categories = [],
  } = product;

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const inquiryMessage = encodeURIComponent(
    `नमस्ते Haji Cycle Store! मुझे इस प्रोडक्ट के बारे में पूछताछ करनी है:\n- नाम: ${name}\n- ब्रांड: ${brand || 'N/A'}\n- कीमत: ₹${price.toLocaleString('en-IN')}\nकृपया स्टॉक और डिलीवरी/पिकअप की जानकारी दें।`
  );
  const whatsappUrl = `https://wa.me/919838000000?text=${inquiryMessage}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Product Details</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '320px', marginBottom: '20px' }}>
            <img
              src={imageUrl || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            {brand && <span className="brand-badge">{brand}</span>}
            <span className={`stock-badge-pill ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? (
                <>
                  <CheckCircle size={14} /> In Stock ({stockQuantity} available)
                </>
              ) : (
                <>
                  <AlertCircle size={14} /> Out of Stock
                </>
              )}
            </span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
            {name}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {categories.map((c, i) => (
              <span key={i} className="card-category-tag" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                <Tag size={12} style={{ display: 'inline', marginRight: 4 }} />
                {c}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
              ₹{Number(price).toLocaleString('en-IN')}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{Number(originalPrice).toLocaleString('en-IN')}
                </span>
                <span className="discount-tag" style={{ fontSize: '0.85rem' }}>
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Description & Specifications:
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
              {description}
            </p>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
            fontSize: '0.86rem',
            color: '#475569'
          }}>
            <MapPin size={18} color="#d32f2f" style={{ flexShrink: 0 }} />
            <span>
              Available for immediate pickup and fitment at <strong>Haji Cycle Store</strong>, Kolhui Bazar, Sonauli Road, Maharajganj, UP.
            </span>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp-hero"
              style={{ padding: '12px 18px', textAlign: 'center' }}
            >
              <MessageSquare size={18} />
              <span>Inquire / Book on WhatsApp</span>
            </a>

            <a
              href="tel:+919838000000"
              className="btn-call-hero"
              style={{ border: '1.5px solid #cbd5e1', padding: '12px 18px', textAlign: 'center' }}
            >
              <Phone size={18} />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
