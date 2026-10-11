import React from 'react';
import { MapPin, Phone, Clock, MessageSquare } from 'lucide-react';

export default function TopBar() {
  return (
    <aside aria-label="Store contact and location" className="top-announcement-bar">
      <div className="top-bar-inner">
        <div className="top-bar-address">
          <MapPin size={15} className="loc-icon" />
          <span>कोल्हुई बाजार, सोनौली रोड, महराजगंज, उत्तर प्रदेश</span>
        </div>

        <div className="top-bar-actions">
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9ca3af' }}>
            <Clock size={14} /> 8:00 AM - 8:30 PM (प्रतिदिन)
          </span>

          <a href="tel:+919838000000" className="top-bar-link">
            <Phone size={14} color="#f87171" />
            <span>+91 98380 00000</span>
          </a>

          <a
            href="https://wa.me/919838000000?text=Hello%20Haji%20Cycle%20Store%2C%20I%20have%20an%20inquiry%20about%20cycles%20and%20tyres"
            target="_blank"
            rel="noreferrer"
            className="top-bar-link"
            style={{ color: '#4ade80' }}
          >
            <MessageSquare size={14} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
