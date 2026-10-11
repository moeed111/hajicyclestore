import React from 'react';
import { MapPin, Phone, MessageSquare, ShieldCheck, CheckCircle2, Wrench, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  const storePhone = '+919838000000';
  const whatsappUrl = `https://wa.me/919838000000?text=${encodeURIComponent(
    'नमस्ते हाजी साइकिल स्टोर! मुझे आपके पास उपलब्ध साइकिल, टायर और ट्यूब के बारे में जानकारी चाहिए।'
  )}`;
  const mapUrl = 'https://www.google.com/maps/search/Kolhui+Bazar+Sonauli+Road+Maharajganj';

  return (
    <div className="hero-banner animate-fadeInUp">
      <div className="hero-grid">
        <div>
          <div className="hero-badge-pill">
            <Sparkles size={14} />
            <span>विश्वास और गुणवत्ता का नाम • कोल्हुई बाजार</span>
          </div>

          <h2 className="hero-title">
            Your Trusted Hub for <span>Cycles, Tyres & Spare Parts</span>
          </h2>

          <p className="hero-subtitle">
            विशाल संग्रह: रेंजर साइकिल, साधारण साइकिल, बच्चों व महिलाओं की साइकिल,
            तथा बाइक, स्कूटर, ई-रिक्शा और अन्य वाहनों के ओरिजिनल टायर व ट्यूब।
          </p>

          <div className="hero-highlights">
            <div className="highlight-chip">
              <ShieldCheck size={16} color="#4ade80" />
              <span>100% Authentic Brands</span>
            </div>
            <div className="highlight-chip">
              <CheckCircle2 size={16} color="#60a5fa" />
              <span>Live Stocks Ready</span>
            </div>
            <div className="highlight-chip">
              <Wrench size={16} color="#fbbf24" />
              <span>Instant Fitting Available</span>
            </div>
          </div>
        </div>

        {/* Address & Quick Inquiry Card */}
        <div className="hero-contact-card">
          <div className="contact-card-header">
            Store Location & Contact / पता और संपर्क
          </div>

          <div className="contact-card-address">
            <MapPin size={22} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>Haji Cycle Store (हाजी साइकिल स्टोर)</strong>
              <div style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: 2 }}>
                कोल्हुई बाजार, सोनौली रोड, महराजगंज, उत्तर प्रदेश
              </div>
            </div>
          </div>

          <div className="contact-card-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp-hero"
            >
              <MessageSquare size={17} />
              <span>WhatsApp Chat</span>
            </a>

            <a href={`tel:${storePhone}`} className="btn-call-hero">
              <Phone size={17} />
              <span>Call Store</span>
            </a>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.78rem',
              color: '#9ca3af',
              textDecoration: 'underline',
              textAlign: 'center',
              display: 'block',
              marginTop: 2,
            }}
          >
            Google Maps पर लोकेशन देखें →
          </a>
        </div>
      </div>
    </div>
  );
}
