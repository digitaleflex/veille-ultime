import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "veille_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function signature(value: string) {
  const secret = process.env.VEILLE_ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("VEILLE_ADMIN_SESSION_SECRET is not configured");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const value = String(expiresAt);
  return { value: value + "." + signature(value), maxAge: SESSION_TTL_SECONDS };
}

export async function isAdminSessionValid() {
  const secret = process.env.VEILLE_ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [expiresAt, suppliedSignature, extra] = token.split(".");
  if (!expiresAt || !suppliedSignature || extra || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;
  const expected = signature(expiresAt);
  const supplied = Buffer.from(suppliedSignature);
  const actual = Buffer.from(expected);
  return supplied.length === actual.length && timingSafeEqual(supplied, actual);
}

export const adminCookieName = COOKIE_NAME;
