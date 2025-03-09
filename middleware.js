import { NextResponse } from "next/server";

export function middleware(req) {
    const authToken = req.cookies.get("auth_token")?.value;

    if (!authToken) {
        return NextResponse.redirect(new URL("/reservas", req.url));
    }

    let userType = null;

    try {
        const decodedString = atob(authToken);
        const decodedToken = JSON.parse(decodedString);
        userType = decodedToken.usuario.tipo; 
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return NextResponse.redirect(new URL("/reservas", req.url));
    }
    if ((req.nextUrl.pathname.startsWith("/editarLibro") || req.nextUrl.pathname === "/agregarLibro") && userType !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/perfil/:path*", "/tusReservas", "/agregarLibro", "/editarLibro/:path*"],
};
