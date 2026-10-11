import React, { useState } from 'react';
import { Lock, X, Eye, EyeOff, ShieldAlert, Check, UserCheck } from 'lucide-react';
import { productApi } from '../api/productApi';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await productApi.login(username.trim(), password.trim());
      if (data.success) {
        onLoginSuccess(data);
        onClose();
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError(err.message || 'Access Denied: Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickCredentials = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content-box"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626',
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Admin Portal Login</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Restricted access for Haji Cycle Store management
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: '20px 24px' }}>
            {error && (
              <div
                style={{
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Admin Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter username (e.g. admin1 or admin2)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: 40 }}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Helper for the 2 authorized admins */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: '12px',
                marginTop: 16,
                fontSize: '0.78rem',
              }}
            >
              <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                Authorized Store Admins:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => fillQuickCredentials('admin1', 'haji@123')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    fontSize: '0.76rem',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <strong>Admin 1 (Owner):</strong> <code>admin1</code>
                  </div>
                  <span style={{ color: '#d32f2f', fontWeight: 600 }}>Fill Login →</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillQuickCredentials('admin2', 'cycle@123')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    fontSize: '0.76rem',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <strong>Admin 2 (Manager):</strong> <code>admin2</code>
                  </div>
                  <span style={{ color: '#d32f2f', fontWeight: 600 }}>Fill Login →</span>
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-details-view" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-add-product-admin"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <UserCheck size={16} />
              <span>{loading ? 'Authenticating...' : 'Sign In as Admin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
