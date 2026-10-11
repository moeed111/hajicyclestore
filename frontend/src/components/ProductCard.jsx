import React from 'react';
import {
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Eye,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export default function ProductCard({
  product,
  isAdminMode,
  onSelectProduct,
  onToggleStock,
  onDeleteProduct,
}) {
  const {
    id,
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

  // Calculate discount percentage if original price exists
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // WhatsApp inquiry URL with pre-filled message
  const inquiryMessage = encodeURIComponent(
    `नमस्ते Haji Cycle Store! मुझे इस प्रोडक्ट के बारे में जानना है:\n- नाम: ${name}\n- कीमत: ₹${price.toLocaleString('en-IN')}\nक्या यह अभी कोल्हुई बाजार स्टोर में उपलब्ध है?`
  );
  const whatsappUrl = `https://wa.me/919838000000?text=${inquiryMessage}`;

  const imageSrc = imageUrl || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="product-card animate-fadeInUp">
      {/* Top Image & Floating Badges */}
      <div className="card-image-container" onClick={() => onSelectProduct(product)}>
        <img
          src={imageSrc}
          alt={name}
          className="card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <div className="card-badges-top">
          {brand && <span className="brand-badge">{brand}</span>}

          <span
            className={`stock-badge-pill ${
              inStock ? 'in-stock' : 'out-of-stock'
            }`}
          >
            {inStock ? (
              <>
                <CheckCircle size={12} /> In Stock ({stockQuantity || 1})
              </>
            ) : (
              <>
                <AlertCircle size={12} /> Out of Stock
              </>
            )}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        {/* Categories Tags */}
        <div className="card-categories-row">
          {categories.map((cat, idx) => (
            <span key={idx} className="card-category-tag">
              {cat}
            </span>
          ))}
        </div>

        <h3 className="card-title" onClick={() => onSelectProduct(product)}>
          {name}
        </h3>

        <p className="card-description">{description || 'High quality original cycle component.'}</p>

        {/* Pricing */}
        <div className="card-price-row">
          <span className="price-current">₹{Number(price).toLocaleString('en-IN')}</span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="price-mrp">₹{Number(originalPrice).toLocaleString('en-IN')}</span>
              <span className="discount-tag">{discountPercent}% OFF</span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card-action-btns">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp-inquire"
            title="Inquire or Book on WhatsApp"
          >
            <MessageCircle size={16} />
            <span>Order / WhatsApp</span>
          </a>

          <button
            className="btn-details-view"
            onClick={() => onSelectProduct(product)}
            title="View Product Details"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Admin Quick Action Controls */}
      {isAdminMode && (
        <div className="admin-card-overlay">
          <button
            type="button"
            onClick={() => onToggleStock(id, !inStock, stockQuantity)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              color: inStock ? '#16a34a' : '#dc2626',
            }}
          >
            {inStock ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            <span>{inStock ? 'Mark Out of Stock' : 'Mark In Stock'}</span>
          </button>

          <button
            type="button"
            className="admin-card-btn-delete"
            onClick={() => onDeleteProduct(id, name)}
            title="Delete this product"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
