import React from 'react';

interface StandardIconProps {
  children: React.ReactNode;
  className: string;
  dim?: number;
}
const StandardIcon = ({ children, className, dim = 24 }: StandardIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={dim} height={dim} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather ${className}`}>
    {children}
  </svg>
)

export const Inbox = () => (
  <StandardIcon className="feather-inbox">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </StandardIcon>
);

export const ChevronDown = () => (
  <StandardIcon className="feather-chevron-down" dim={16}>
    <polyline points="6 9 12 15 18 9" />
  </StandardIcon>
);

export const Search = () => (
  <StandardIcon className="feather-search" dim={16}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </StandardIcon>
);
