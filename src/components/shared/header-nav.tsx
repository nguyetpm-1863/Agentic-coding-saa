"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderNavProps {
  links: Array<{ label: string; href: string }>;
}

export function HeaderNav({ links }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {links.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`font-[family-name:var(--font-montserrat)] text-base font-bold leading-6 tracking-[0.15px] p-4 transition-all duration-150 ease-in-out ${
              isActive
                ? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
                : "text-white hover:text-[#FFEA9E] hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
