import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("sessionToken")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/reservas", req.url));
    }
    let userType = null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        userType = payload.tipo_usuario; 
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return NextResponse.redirect(new URL("/reservas", req.url));
    }
    if ((req.nextUrl.pathname.startsWith("/editarLibro") || req.nextUrl.pathname === "/agregarLibro") && userType !== "administrador") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if ((req.nextUrl.pathname.startsWith("/reservaLibro") || (req.nextUrl.pathname.startsWith("/perfil")) || req.nextUrl.pathname === "/tusReservas") && userType !== "usuario") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/perfil/:path*", "/tusReservas", "/agregarLibro", "/editarLibro/:path*", "/reservaLibro/:path*"],
};
