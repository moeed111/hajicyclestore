import React, { useEffect, useState } from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function OpeningAnimation({ onComplete }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Automatically close intro after 3.2 seconds if user does not click
    const timer = setTimeout(() => {
      handleClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div
      className="opening-screen-overlay"
      style={{
        opacity: closing ? 0 : 1,
        transform: closing ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      <div className="opening-logo-container">
        <img
          src="/logo.jpg"
          alt="हाजी साइकिल स्टोर Logo"
          className="opening-logo-img"
        />
      </div>

      <h1 className="opening-title">
        HAJI <span>CYCLE STORE</span>
      </h1>
      <p className="opening-tagline">
        मजबूत सवारी • शानदार अंदाज़ • हर सफर में साथ
      </p>

      <div className="opening-address-badge">
        <MapPin size={18} color="#ef4444" />
        <span>कोल्हुई बाजार, सोनौली रोड, महराजगंज, उत्तर प्रदेश</span>
      </div>

      <button className="opening-enter-btn" onClick={handleClose}>
        <span>Explore Store / दुकान देखें</span>
        <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8 }} />
      </button>
    </div>
  );
}
