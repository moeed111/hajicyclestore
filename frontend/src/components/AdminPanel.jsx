import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Check,
  X,
  Package,
  Layers,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

const AVAILABLE_CATEGORIES = [
  'Cycle',
  'Ranger cycle',
  'Kids cycle',
  'Ladies cycle',
  'Cycle tubes',
  'Cycle parts',
  'Tubes for bikes and other vehicles',
  'Tyres for bikes and other vehicles',
];

export default function AdminPanel({
  products,
  stats,
  onRefresh,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleStock,
  onUploadImage,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('All');

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState(10);
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Cycle']);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('');
    setPrice('');
    setOriginalPrice('');
    setStockQuantity(10);
    setInStock(true);
    setDescription('');
    setImageUrl('');
    setSelectedCategories(['Cycle']);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setName(prod.name || '');
    setBrand(prod.brand || '');
    setPrice(prod.price || '');
    setOriginalPrice(prod.originalPrice || '');
    setStockQuantity(prod.stockQuantity || 0);
    setInStock(prod.inStock !== false);
    setDescription(prod.description || '');
    setImageUrl(prod.imageUrl || '');
    setSelectedCategories(prod.categories && prod.categories.length > 0 ? prod.categories : ['Cycle']);
    setFormError('');
    setIsModalOpen(true);
  };

  const toggleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length === 1) {
        setFormError('Product must belong to at least one category.');
        return;
      }
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setFormError('');
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const uploadedUrl = await onUploadImage(file);
      setImageUrl(uploadedUrl);
    } catch (err) {
      setFormError('Image upload failed. You can paste an image URL directly.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setFormError('Please enter a valid price.');
      return;
    }
    if (selectedCategories.length === 0) {
      setFormError('Please select at least one category.');
      return;
    }

    const payload = {
      name: name.trim(),
      brand: brand.trim(),
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      stockQuantity: parseInt(stockQuantity, 10) || 0,
      inStock: Boolean(inStock),
      description: description.trim(),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      categories: selectedCategories,
    };

    try {
      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, payload);
      } else {
        await onAddProduct(payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      setFormError('Failed to save product: ' + err.message);
    }
  };

  // Filter products in admin table
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      adminSearch.trim() === '' ||
      p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(adminSearch.toLowerCase()));

    const matchesCategory =
      adminCategoryFilter === 'All' ||
      (p.categories && p.categories.includes(adminCategoryFilter));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-panel-container animate-scaleIn">
      {/* Header and Add Button */}
      <div className="admin-header-row">
        <div className="admin-title-badge">
          <Package size={26} color="#d32f2f" />
          <div>
            <h2>Haji Cycle Store Admin & Stock Manager</h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Owner Inventory Dashboard • Add, update stock quantities, categories, and items
            </p>
          </div>
          <span className="admin-badge-indicator">Live Admin Mode</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn-details-view"
            onClick={onRefresh}
            title="Refresh inventory from database"
          >
            <RefreshCw size={16} />
            <span>Reload</span>
          </button>

          <button className="btn-add-product-admin" onClick={openAddModal}>
            <Plus size={18} />
            <span>Add New Item / नया स्टॉक जोड़ें</span>
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <span className="stat-card-title">Total Products in Store</span>
          <span className="stat-card-value">{products.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card-title">In-Stock Available</span>
          <span className="stat-card-value" style={{ color: '#16a34a' }}>
            {products.filter((p) => p.inStock).length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card-title">Out of Stock Alerts</span>
          <span className="stat-card-value" style={{ color: '#dc2626' }}>
            {products.filter((p) => !p.inStock).length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card-title">Cycles (All Types)</span>
          <span className="stat-card-value">
            {products.filter((p) => p.categories?.includes('Cycle')).length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card-title">Tyres & Tubes Stock</span>
          <span className="stat-card-value">
            {products.filter(
              (p) =>
                p.categories?.some((c) => c.toLowerCase().includes('tyre') || c.toLowerCase().includes('tube'))
            ).length}
          </span>
        </div>
      </div>

      {/* Admin Filter Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search items by name or brand in stock table..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
          />
        </div>

        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '200px' }}
          value={adminCategoryFilter}
          onChange={(e) => setAdminCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories ({products.length})</option>
          {AVAILABLE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Admin Stock Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Item & Photo</th>
              <th>Categories (Multiple)</th>
              <th>Price (₹)</th>
              <th>Stock Status</th>
              <th>Quantity</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  No products found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-product-info">
                      <img
                        src={p.imageUrl || '/logo.jpg'}
                        alt={p.name}
                        className="table-product-thumb"
                        onError={(e) => {
                          e.target.src = '/logo.jpg';
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Brand: {p.brand || 'Local/Standard'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.categories?.map((c, i) => (
                        <span key={i} className="card-category-tag">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>
                      ₹{Number(p.price).toLocaleString('en-IN')}
                    </div>
                    {p.originalPrice && (
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                        ₹{Number(p.originalPrice).toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => onToggleStock(p.id, !p.inStock, p.stockQuantity)}
                      className={`stock-badge-pill ${p.inStock ? 'in-stock' : 'out-of-stock'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="Click to toggle stock status"
                    >
                      {p.inStock ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        style={{
                          width: 24,
                          height: 24,
                          background: '#f1f5f9',
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                        onClick={() => {
                          const newQty = Math.max(0, (p.stockQuantity || 0) - 1);
                          onToggleStock(p.id, newQty > 0, newQty);
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
                        {p.stockQuantity || 0}
                      </span>
                      <button
                        type="button"
                        style={{
                          width: 24,
                          height: 24,
                          background: '#f1f5f9',
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                        onClick={() => {
                          const newQty = (p.stockQuantity || 0) + 1;
                          onToggleStock(p.id, true, newQty);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button
                        className="btn-details-view"
                        style={{ padding: '6px 10px' }}
                        onClick={() => openEditModal(p)}
                        title="Edit product"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        className="admin-card-btn-delete"
                        style={{ padding: '6px 10px', background: '#fee2e2' }}
                        onClick={() => onDeleteProduct(p.id, p.name)}
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product / प्रोडक्ट बदलें' : 'Add New Item / नया आइटम जोड़ें'}</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm}>
              <div className="modal-body">
                {formError && (
                  <div
                    style={{
                      background: '#fee2e2',
                      color: '#b91c1c',
                      padding: '10px 14px',
                      borderRadius: 8,
                      marginBottom: 16,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {formError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Product Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Hero Sprint Pro Ranger MTB 29T, CEAT 90/90-17 Tyre..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Brand / Make</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Hero, MRF, CEAT, Leader, Shimano..."
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Selling Price (₹) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="form-input"
                      placeholder="e.g. 7499"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">MRP / Original Price (₹) (Optional)</label>
                    <input
                      type="number"
                      step="any"
                      className="form-input"
                      placeholder="e.g. 8999"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock Quantity Available</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="10"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      style={{ accentColor: '#d32f2f', width: 18, height: 18 }}
                    />
                    <span>Available In Stock (उपलब्ध है)</span>
                  </label>
                </div>

                {/* Categories Checkboxes (Multiple selection allowed!) */}
                <div className="form-group">
                  <label className="form-label">
                    Category (Select one or multiple) <span className="required">*</span>
                  </label>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 8 }}>
                    You can select multiple (e.g. choose both "Cycle" and "Ranger cycle"):
                  </p>
                  <div className="checkbox-categories-grid">
                    {AVAILABLE_CATEGORIES.map((cat) => (
                      <label key={cat} className="category-checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategorySelection(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Image Upload and Image URL */}
                <div className="form-group">
                  <label className="form-label">Product Image</label>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter Image URL directly or upload below..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <label
                      className="btn-details-view"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        cursor: 'pointer',
                        padding: '8px 14px',
                      }}
                    >
                      <Upload size={16} />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image from Computer'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                      />
                    </label>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      PNG, JPG, WebP supported
                    </span>
                  </div>

                  {imageUrl && (
                    <div className="image-preview-box">
                      <img src={imageUrl} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Key Specifications</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    placeholder="Enter details like frame size, speed, material, tyre measurements, warranty..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-details-view"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-add-product-admin">
                  <Check size={18} />
                  <span>{editingProduct ? 'Save Changes' : 'Add to Stock'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
