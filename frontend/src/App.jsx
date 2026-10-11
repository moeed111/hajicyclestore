import React, { useState, useEffect, useMemo } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import AdminPanel from './components/AdminPanel';
import AdminLoginModal from './components/AdminLoginModal';
import Footer from './components/Footer';
import OpeningAnimation from './components/OpeningAnimation';
import { productApi } from './api/productApi';
import { PackageX, RefreshCw } from 'lucide-react';

export default function App() {
  const [showOpeningIntro, setShowOpeningIntro] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin Authentication State
  const [loggedInAdmin, setLoggedInAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('haji_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Navigation Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCycleSubCategory, setActiveCycleSubCategory] = useState('All-Cycle');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stats, setStats] = useState(null);

  // Load products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getProducts();
      setProducts(data);
      try {
        const statsData = await productApi.getStats();
        setStats(statsData);
      } catch (e) {
        // Stats error non-critical
      }
    } catch (err) {
      console.warn('Backend not yet reachable', err);
      setError('Connecting to database...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Admin Login & Logout handlers
  const handleLoginSuccess = (adminData) => {
    setLoggedInAdmin(adminData);
    localStorage.setItem('haji_admin_user', JSON.stringify(adminData));
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    setLoggedInAdmin(null);
    localStorage.removeItem('haji_admin_user');
    setIsAdminOpen(false);
  };

  // Category selection handler
  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    if (catId === 'Cycle') {
      setActiveCycleSubCategory('All-Cycle');
    }
    const target = document.getElementById('products-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCycleSubCategory = (subId) => {
    setActiveCycleSubCategory(subId);
    setActiveCategory('Cycle');
  };

  const handleResetToHome = () => {
    setActiveCategory('All');
    setActiveCycleSubCategory('All-Cycle');
    setSearchTerm('');
    setOnlyInStock(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Category Counts Calculation
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach((p) => {
      p.categories?.forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });
    });
    return counts;
  }, [products]);

  // Filter and Sort Products
  const displayedProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = p.name?.toLowerCase().includes(query);
          const matchBrand = p.brand?.toLowerCase().includes(query);
          const matchDesc = p.description?.toLowerCase().includes(query);
          const matchCat = p.categories?.some((c) => c.toLowerCase().includes(query));
          if (!matchName && !matchBrand && !matchDesc && !matchCat) {
            return false;
          }
        }

        if (onlyInStock && !p.inStock) {
          return false;
        }

        if (activeCategory === 'All') {
          return true;
        }

        if (activeCategory === 'Cycle') {
          if (activeCycleSubCategory === 'All-Cycle') {
            return p.categories?.includes('Cycle');
          }
          if (activeCycleSubCategory === 'Cycle') {
            return (
              p.categories?.includes('Cycle') &&
              !p.categories?.includes('Ranger cycle') &&
              !p.categories?.includes('Kids cycle') &&
              !p.categories?.includes('Ladies cycle')
            );
          }
          return p.categories?.includes(activeCycleSubCategory);
        }

        return p.categories?.includes(activeCategory);
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === 'price-high') {
          return (b.price || 0) - (a.price || 0);
        }
        if (a.inStock !== b.inStock) {
          return a.inStock ? -1 : 1;
        }
        return b.id - a.id;
      });
  }, [products, searchTerm, activeCategory, activeCycleSubCategory, onlyInStock, sortBy]);

  // Admin CRUD Actions
  const handleAddProduct = async (newProduct) => {
    if (!loggedInAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    const created = await productApi.createProduct(newProduct);
    setProducts((prev) => [created, ...prev]);
    alert('Product added successfully!');
  };

  const handleUpdateProduct = async (id, updatedData) => {
    if (!loggedInAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    const updated = await productApi.updateProduct(id, updatedData);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    alert('Product updated successfully!');
  };

  const handleDeleteProduct = async (id, name) => {
    if (!loggedInAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!window.confirm(`Are you sure you want to delete "${name}" from stock?`)) {
      return;
    }
    await productApi.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleStock = async (id, inStock, qty) => {
    if (!loggedInAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    const updated = await productApi.updateStock(id, inStock, qty);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const handleUploadImage = async (file) => {
    return await productApi.uploadImage(file);
  };

  return (
    <div className="app-wrapper">
      {/* Opening Intro Animation */}
      {showOpeningIntro && (
        <OpeningAnimation onComplete={() => setShowOpeningIntro(false)} />
      )}

      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Header & Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
        onResetToHome={handleResetToHome}
        loggedInAdmin={loggedInAdmin}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Category Navigation Bar & Sub-Nav */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        activeCycleSubCategory={activeCycleSubCategory}
        onSelectCycleSubCategory={handleSelectCycleSubCategory}
        productCounts={categoryCounts}
      />

      <main className="main-content">
        {/* Admin Stock Management Panel - Only accessible if Logged in! */}
        {loggedInAdmin && isAdminOpen && (
          <AdminPanel
            products={products}
            stats={stats}
            onRefresh={fetchProducts}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onToggleStock={handleToggleStock}
            onUploadImage={handleUploadImage}
          />
        )}

        {/* Hero Showcase Banner */}
        <HeroBanner />

        {/* Section Heading & Filter Controls */}
        <div id="products-section" className="controls-bar">
          <div className="section-headline">
            <h2 className="section-title">
              {activeCategory === 'All'
                ? 'All Products'
                : activeCategory === 'Cycle'
                ? activeCycleSubCategory === 'All-Cycle'
                  ? 'All Cycles'
                  : activeCycleSubCategory
                : activeCategory}
            </h2>
            <span className="section-count">
              ({displayedProducts.length} items found)
            </span>
          </div>

          <div className="filters-group">
            <button
              className={`stock-toggle-btn ${onlyInStock ? 'active' : ''}`}
              onClick={() => setOnlyInStock(!onlyInStock)}
            >
              <span>In-Stock Only</span>
            </button>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured / Stock First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading States */}
        {loading && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <RefreshCw size={28} style={{ animation: 'spinWheel 1s linear infinite' }} />
            <p style={{ marginTop: 12, fontWeight: 600 }}>Loading inventory from Haji Cycle Store database...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayedProducts.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              margin: '20px 0',
            }}
          >
            <PackageX size={44} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: 6 }}>
              No products found in this category
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 16 }}>
              Try clearing your search query or switching to another category.
            </p>
            <button
              className="btn-admin-portal"
              style={{ display: 'inline-flex', margin: '0 auto' }}
              onClick={handleResetToHome}
            >
              View All Products
            </button>
          </div>
        )}

        {/* Dynamic Animated Products Grid */}
        <div
          key={`${activeCategory}-${activeCycleSubCategory}-${searchTerm}`}
          className="product-grid"
        >
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdminMode={Boolean(loggedInAdmin && isAdminOpen)}
              onSelectProduct={setSelectedProduct}
              onToggleStock={handleToggleStock}
              onDeleteProduct={handleDeleteProduct}
            />
          ))}
        </div>
      </main>

      {/* Admin Login Modal (Restricted access dialog) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />
    </div>
  );
}
