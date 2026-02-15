'use client';
import Link from 'next/link';
import clsx from 'clsx';

export default function MenuItem({ slug, display, toggle, isActive }) {
  return (
    <li>
      <Link
        href={slug}
        onClick={toggle}
        aria-current={isActive ? 'page' : undefined}
        className={clsx(
          // Base styles
          'relative block w-auto text-right text-base whitespace-nowrap',
          'pt-5 pb-0 font-normal text-blue-800 uppercase transition-colors',

          // Hover & active states
          'hover:bg-gray-50 hover:text-blue-900 active:text-blue-700',

          // Desktop styles
          'md:border-0 md:p-0 md:hover:bg-transparent',

          // Underline animation
          'before:absolute before:bottom-0.5 before:left-0 before:z-50',
          'before:block before:h-px before:w-0 before:bg-blue-800',
          "before:transition-all before:content-['']",
          'hover:before:w-full',

          // Active state
          isActive && 'before:w-full!'
        )}
      >
        {display}
      </Link>
    </li>
  );
}
