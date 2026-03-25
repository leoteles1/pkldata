'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 flex justify-center bg-black items-center transition-all duration-300 ${isScrolled ? 'py-3 shadow-2xl' : 'py-8'
          }`}
      >
        <Link href="/">
          <Image
            src="/logo-pkldata.png"
            alt="PKDATA Logo"
            width={350}
            height={80}
            priority
            className={`cursor-pointer transition-all duration-300 object-contain ${isScrolled ? 'h-[40px] w-auto' : 'h-[80px] w-auto'
              }`}
          />
        </Link>
      </header>
      {/* Spacer para não quebrar o layout abaixo do header fixed */}
      <div className="h-[144px] shrink-0 w-full" aria-hidden="true" />
    </>
  );
}
