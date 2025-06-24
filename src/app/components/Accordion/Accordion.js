'use client';

// Importação

import { useState } from "react";



// Accordion e estilização

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-100 last:border-b-0">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
            onClick={() => toggleIndex(index)}
          >
            <span className={`font-medium text-gray-800 pr-4`}>
              {item.question}
            </span>
            <svg
              className={`w-5 h-5 text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 py-4 text-gray-600 bg-gray-50">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
