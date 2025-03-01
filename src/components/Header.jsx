import React from 'react';
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src="/images/Globe.png" alt="Globe icon" className="header-logo" />
      <span className="header-title">my travel journal.</span>
    </header>
  );
}