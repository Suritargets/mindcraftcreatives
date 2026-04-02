import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123";
const COOKIE_NAME = "admin_session";
const AUTH_SECRET = process.env.AUTH_SECRET || "mindcraft-dev-secret-key-change-in-production";

function createSessionToken(): string {
  const payload = JSON.stringify({
    email: ADMIN_EMAIL,
    iat: Date.now(),
  });
  const hmac = crypto.createHmac("sha256", AUTH_SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  const token = Buffer.from(payload).toString("base64") + "." + signature;
  return token;
}

function verifySessionToken(token: string): boolean {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;
    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const hmac = crypto.createHmac("sha256", AUTH_SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export async function login(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return false;
  }

  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return true;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
