import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";
const AUTH_SECRET = process.env.AUTH_SECRET || "mindcraft-dev-secret-key-change-in-production";

async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(AUTH_SECRET);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    // Decode the base64 payload back to original string
    const payload = atob(payloadB64);
    const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expectedHex = Array.from(new Uint8Array(signatureBytes))
      .map((b: number) => b.toString(16).padStart(2, "0"))
      .join("");

    return expectedHex === signature;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the login page through
  if (pathname === "/admin/login") {
    // If already authenticated, redirect away from login to admin dashboard
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token && (await verifySessionToken(token))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Check authentication for all other /admin routes
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
