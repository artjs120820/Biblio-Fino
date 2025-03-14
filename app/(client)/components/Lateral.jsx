"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useToken } from "../../context/tokenContext";

export default function Lateral() {
  const pathname = usePathname();
  const { tokenData } = useToken();
  return (
    <aside className="bg-gray-300 h-full w-64 py-6 pr-6 pl-12 flex flex-col justify-between">
      <nav className="flex flex-col space-y-6 relative">
        <LinkItem href="/" pathname={pathname}>Biblioteca</LinkItem>
        <LinkItem href="/reservas" pathname={pathname}>Reservas</LinkItem>
        {tokenData?.tipo_usuario === "usuario" && <LinkItem href="/perfil" pathname={pathname}>Perfil</LinkItem>}
      </nav>

      <footer className="text-gray-800 font-bold text-sm">
        Biblio v1.0.1-Alpha
      </footer>
    </aside>
  );
}
function LinkItem({ href, pathname, children }) {
  const isActive =
    href === "/"
      ? !pathname.includes("/reservas") && !pathname.includes("/perfil") && !pathname.includes("/tusReservas")
      : href === "/reservas"
        ? pathname.startsWith("/reservas") || pathname.startsWith("/tusReservas")
        : pathname.startsWith(href);

  return (
    <div className="relative flex items-center">
      {isActive && (
        <ChevronRight className="absolute left-[-2.2rem] text-black w-10 h-8" />
      )}
      <Link
        href={href}
        className="font-bold hover:text-gray-700 transition-all duration-300"
      >
        {children}
      </Link>
    </div>
  );
}



