"use client";
import Link from "next/link";

export default function MenuItem({ slug, display, toggle, isActive }) {
  return (
    <li className="list-none">
      <Link
        className={`${
          isActive ? 'before:w-full' : ''
        } hover:before:w-full before:content-[''] before:absolute before:z-50 before:block before:left-0 before:bottom-0.5 before:w-0 before:h-px before:transition-all before:bg-blue-800 relative block w-auto whitespace-nowrap pb-0 pt-5 text-right text-base font-[400] text-[#17388a] hover:bg-gray-50 active:text-blue-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-900`}
        href={slug}
        onClick={() => toggle()}
      >
        {display.toUpperCase()}
      </Link>
    </li>
  );
}
