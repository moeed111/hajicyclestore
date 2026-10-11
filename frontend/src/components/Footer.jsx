import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Heart } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  const storePhone = '+919838000000';
  const whatsappUrl = `https://wa.me/919838000000?text=${encodeURIComponent(
    'नमस्ते Haji Cycle Store! मुझे आपके उत्पादों के संबंध में पूछताछ करनी है।'
  )}`;
  const mapUrl = 'https://www.google.com/maps/search/Kolhui+Bazar+Sonauli+Road+Maharajganj';

  return (
    <footer className="footer-main">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <img
              src="/logo.jpg"
              alt="Haji Cycle Store Logo"
              style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #d32f2f' }}
            />
            <div>
              <h4>HAJI CYCLE STORE</h4>
              <span style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 700 }}>
                हाजी साइकिल स्टोर
              </span>
            </div>
          </div>
          <p>
            मजबूत सवारी • शानदार अंदाज़ • हर सफर में साथ।
            <br />
            कोल्हुई बाजार का प्रतिष्ठित प्रतिष्ठान — सभी प्रकार की रेंजर, साधारण, बच्चों एवं महिलाओं की साइकिलें तथा बाइक, स्कूटर, ई-रिक्शा के ओरिजिनल टायर और ट्यूब।
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-hero" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              <MessageSquare size={16} /> WhatsApp
            </a>
            <a href={`tel:${storePhone}`} className="btn-call-hero" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h5>Categories</h5>
          <ul className="footer-links-list">
            <li>
              <a href="#cycles" onClick={() => onSelectCategory('Cycle')}>
                Cycles & Ranger Bikes
              </a>
            </li>
            <li>
              <a href="#tubes" onClick={() => onSelectCategory('Cycle tubes')}>
                Cycle Tubes
              </a>
            </li>
            <li>
              <a href="#parts" onClick={() => onSelectCategory('Cycle parts')}>
                Bicycle Spare Parts
              </a>
            </li>
            <li>
              <a href="#biketyres" onClick={() => onSelectCategory('Tyres for bikes and other vehicles')}>
                Bike & Vehicle Tyres
              </a>
            </li>
            <li>
              <a href="#biketubes" onClick={() => onSelectCategory('Tubes for bikes and other vehicles')}>
                Bike & Vehicle Tubes
              </a>
            </li>
          </ul>
        </div>

        {/* Timings & Service */}
        <div className="footer-col">
          <h5>Store Timings</h5>
          <ul className="footer-links-list" style={{ color: '#d1d5db' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={16} color="#d32f2f" />
              <span>Monday - Sunday: 8:00 AM - 8:30 PM</span>
            </li>
            <li>Open All 7 Days (सातों दिन खुला है)</li>
            <li>Instant Mechanical Fitting & Repairs</li>
            <li>Authorized Dealer Brands</li>
          </ul>
        </div>

        {/* Address & Location */}
        <div className="footer-col">
          <h5>Visit Our Store</h5>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#d1d5db', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 14 }}>
            <MapPin size={22} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>कोल्हुई बाजार (Kolhui Bazar)</strong>
              <div>सोनौली रोड, महराजगंज, उत्तर प्रदेश - 273102</div>
            </div>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700 }}
          >
            Google Maps Direction →
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Haji Cycle Store (हाजी साइकिल स्टोर). All rights reserved.
        </div>
        <div>
          Designed & Built with <Heart size={13} color="#ef4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> for Haji Cycle Store, Kolhui Bazar
        </div>
      </div>
    </footer>
  );
}
