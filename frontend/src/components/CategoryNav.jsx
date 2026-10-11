import React from 'react';
import {
  Bike,
  Disc,
  Wrench,
  CircleDot,
  Truck,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const MAIN_CATEGORIES = [
  { id: 'All', label: 'All Products', labelHi: 'सभी सामान', icon: Layers },
  { id: 'Cycle', label: 'Cycle', labelHi: 'साइकिल', icon: Bike },
  { id: 'Cycle tubes', label: 'Cycle Tubes', labelHi: 'साइकिल ट्यूब', icon: CircleDot },
  { id: 'Cycle parts', label: 'Cycle Parts', labelHi: 'साइकिल पार्ट्स', icon: Wrench },
  {
    id: 'Tubes for bikes and other vehicles',
    label: 'Tubes for Bikes & Vehicles',
    labelHi: 'बाइक व वाहन ट्यूब',
    icon: Disc,
  },
  {
    id: 'Tyres for bikes and other vehicles',
    label: 'Tyres for Bikes & Vehicles',
    labelHi: 'बाइक व वाहन टायर',
    icon: Truck,
  },
];

export const CYCLE_SUBCATEGORIES = [
  { id: 'All-Cycle', label: 'All Cycles', labelHi: 'सभी साइकिल' },
  { id: 'Ranger cycle', label: 'Ranger Cycle (MTB / Sports)', labelHi: 'रेंजर साइकिल' },
  { id: 'Cycle', label: 'Standard Cycle (Roadster)', labelHi: 'साधारण साइकिल' },
  { id: 'Kids cycle', label: 'Kids Cycle (Junior)', labelHi: 'बच्चों की साइकिल' },
  { id: 'Ladies cycle', label: 'Ladies Cycle (City)', labelHi: 'लेडीज साइकिल' },
];

export default function CategoryNav({
  activeCategory,
  onSelectCategory,
  activeCycleSubCategory,
  onSelectCycleSubCategory,
  productCounts = {},
}) {
  const isCycleSelected =
    activeCategory === 'Cycle' ||
    ['Ranger cycle', 'Kids cycle', 'Ladies cycle'].includes(activeCycleSubCategory);

  return (
    <nav aria-label="Product categories" className="category-nav-wrapper">
      {/* Primary Category Bar */}
      <div className="category-nav-scroll">
        {MAIN_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = productCounts[cat.id];

          return (
            <button
              key={cat.id}
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <Icon size={18} />
              <span>{cat.label}</span>
              {typeof count === 'number' && (
                <span className="nav-tab-badge">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-sections for Cycle: Ranger cycle, cycle, kids cycle, ladies cycle */}
      {isCycleSelected && (
        <div className="subcategory-bar">
          <div className="subcategory-inner">
            <span className="subnav-label">
              <ChevronRight size={16} /> Cycle Types:
            </span>
            {CYCLE_SUBCATEGORIES.map((sub) => {
              const isActive = activeCycleSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  className={`subnav-pill ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCycleSubCategory(sub.id)}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
