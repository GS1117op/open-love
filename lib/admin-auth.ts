import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "openlove_admin_session";

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getAdminPasswordHash() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (!password) {
    return null;
  }

  return hashValue(password);
}

export function verifyAdminPassword(password: string) {
  const expectedHash = getAdminPasswordHash();

  if (!expectedHash) {
    return false;
  }

  const actualHash = hashValue(password);

  return timingSafeEqual(Buffer.from(actualHash), Buffer.from(expectedHash));
}

export async function isAdminAuthenticated() {
  const expectedHash = getAdminPasswordHash();

  if (!expectedHash) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return false;
  }

  return timingSafeEqual(Buffer.from(sessionCookie), Buffer.from(expectedHash));
}
