import React from 'react';
import { Search, X, ShieldAlert, Lock, LogOut, UserCheck } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  isAdminOpen,
  setIsAdminOpen,
  onResetToHome,
  loggedInAdmin,
  onOpenLogin,
  onLogout,
}) {
  return (
    <header className="header-main">
      <div className="header-container">
        {/* Brand Logo & Name */}
        <div
          className="brand-section"
          onClick={onResetToHome}
          title="Click to go to Home / All Products"
        >
          <div className="logo-badge-wrapper">
            <img
              src="/logo.jpg"
              alt="हाजी CYCLE STORE Logo"
              className="brand-logo-img"
            />
          </div>
          <div className="brand-titles">
            <div className="brand-name-en">
              HAJI <span className="highlight">CYCLE STORE</span>
            </div>
            <div className="brand-name-hi">
              हाजी साइकिल स्टोर
            </div>
            <div className="brand-tagline">
              मजबूत सवारी • शानदार अंदाज़ • हर सफर में साथ
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="header-center-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input-box"
            placeholder="Search cycle, ranger, tyres, tubes, parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Admin Authentication & Action Buttons */}
        <div className="header-right-actions">
          {loggedInAdmin ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Logged-in Admin Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#f1f5f9',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#16a34a',
                  }}
                />
                <span>{loggedInAdmin.displayName || loggedInAdmin.username}</span>
              </div>

              {/* Toggle Admin Stock Panel */}
              <button
                className={`btn-admin-portal ${isAdminOpen ? 'btn-admin-active' : ''}`}
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                title="Toggle Admin Inventory Panel"
              >
                <ShieldAlert size={16} />
                <span>{isAdminOpen ? 'Close Stock' : 'Stock Panel'}</span>
              </button>

              {/* Secure Logout */}
              <button
                className="btn-details-view"
                style={{
                  padding: '8px 12px',
                  borderRadius: '9999px',
                  color: '#dc2626',
                  background: '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
                onClick={onLogout}
                title="Logout from Admin"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Visitor View: Needs Login to Access Admin */
            <button
              className="btn-admin-portal"
              onClick={onOpenLogin}
              title="Restricted: Admin Login Required"
            >
              <Lock size={15} />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
