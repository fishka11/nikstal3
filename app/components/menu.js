'use client';
import React, { useState, useEffect } from 'react';
import Brand from './brand';
import MenuItem from './menuItem';
import { usePathname } from 'next/navigation';

export default function Menu({ pages }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Blokada scrollu body gdy menu otwarte na mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Zamykanie menu po kliknięciu Escape
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') closeMenu();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Zamykanie menu przy zmianie rozmiaru okna na desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Zabezpieczenie przed brakiem danych
  if (!pages || pages.length === 0) {
    return (
      <nav
        className="w-screen border-gray-200 bg-blue-200/70 py-2.5 transition-all"
        aria-label="Menu główne"
      >
        <div className="container flex max-w-7xl flex-col flex-nowrap items-center">
          <Brand />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="w-screen border-gray-200 bg-blue-200/70 py-2.5 transition-all"
      aria-label="Menu główne"
    >
      <div className="container flex max-w-7xl flex-col flex-nowrap items-center md:flex-row">
        <div className="flex w-full grow flex-row justify-between">
          <Brand />

          {/* Przycisk Hamburger */}
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={toggle}
          >
            <span className="sr-only">
              {isOpen ? 'Zamknij' : 'Otwórz'} menu główne
            </span>

            {/* Animowana ikona hamburgera */}
            {isOpen ? (
              // Ikona X
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Ikona hamburgera
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Elementy menu */}
        <div
          className={`${
            isOpen ? '' : 'max-md:hidden'
          } w-full transition-all md:w-auto`}
          id="navbar-default"
        >
          <ul className="mt-4 mr-0 mb-0 flex list-none flex-col items-end md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            {pages?.map(menuItem => {
              const slug = menuItem.menuLink?.slug
                ? `/${menuItem.menuLink.slug}`
                : '/';
              const isActive = pathname === slug;

              return (
                menuItem?.menuLink?.visibleInMenu && (
                  <MenuItem
                    key={menuItem.id}
                    slug={slug}
                    display={menuItem?.menuLink?.display}
                    toggle={closeMenu}
                    isActive={isActive}
                  />
                )
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
