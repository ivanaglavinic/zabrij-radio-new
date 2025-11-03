/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "./Header.css";
import { Radio } from "../radio/Radio";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu if window resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/">
          <img
            src="/images/bird.png"
            alt="Zabrij Radio Logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <Radio />
      <button
        className="menu-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav className={`header-right ${isOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>
          HOME
        </Link>
        <Link href="/archive.html" onClick={() => setIsOpen(false)}>
          ARCHIVE
        </Link>
        <Link href="/about.html" onClick={() => setIsOpen(false)}>
          ABOUT
        </Link>
        <Link href="/contact.html" onClick={() => setIsOpen(false)}>
          CONTACT
        </Link>
      </nav>
    </header>
  );
}
