import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, adminCookieName } from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  const configuredPassword = process.env.VEILLE_ADMIN_PASSWORD;
  if (!configuredPassword || !process.env.VEILLE_ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Administration non configurée côté serveur." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  if (password.length > 512 || password !== configuredPassword) {
    return NextResponse.json({ error: "Mot de passe invalide." }, { status: 401 });
  }

  const session = createAdminSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
