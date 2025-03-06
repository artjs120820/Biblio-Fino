import { NextResponse } from "next/server";

export function middleware(req) {
    const authToken = req.cookies.get("auth_token")?.value; 
    console.log(authToken)
    if (!authToken) {
        return NextResponse.redirect(new URL("/reservas", req.url)); 
    }
    

    return NextResponse.next(); 
}

export const config = {
    matcher: ["/perfil/:path*", "/tusReservas", "/agregarLibro"], 
};


// FALTA: ruta segura AgregarLibro admins de users -- backend