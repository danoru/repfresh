"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-6 py-5 flex justify-between items-center bg-cream/80 backdrop-blur-sm sticky top-0 z-10">
      <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-ink">
        <span className="inline-block w-7 h-7 rounded-full bg-mint shadow-soft" />
        repfresh
      </Link>
      <nav className="flex items-center gap-2 text-sm">
        <NavLink href="/" label="Home" active={pathname === "/"} />
        <NavLink href="/new" label="New workout" active={pathname === "/new"} />
      </nav>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-pill transition-colors",
        active
          ? "bg-ink text-cream"
          : "text-ink-soft hover:text-ink hover:bg-cream-deep",
      )}
    >
      {label}
    </Link>
  );
}
