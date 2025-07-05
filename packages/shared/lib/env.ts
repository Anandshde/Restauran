/* eslint-disable import/no-import-module-exports */
/**
 * Universal environment helper – works in Node (server) and in the browser bundle.
 * It reads the mode only once so tree–shaking can remove dead code paths.
 */

export type AppMode = "demo" | "production";

// Prefer the public variable for Next.js/browser, fall back to Node var
const mode: AppMode | string | undefined =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_APP_MODE || process.env.APP_MODE
    : undefined;

export const APP_MODE: AppMode = (mode as AppMode) || "production";
export const isDemo = APP_MODE === "demo";
export const isProd = APP_MODE === "production";

/**
 * Safe accessor – throws if env is missing (unless fallback provided).
 * Works both server & client. Use for required secrets.
 */
export function getEnv<T = string>(key: string, fallback?: T): T | string {
  if (typeof process === "undefined") return fallback ?? "";
  const val = process.env[key] ?? fallback;
  if (val === undefined)
    throw new Error(`Environment variable ${key} is required but not set`);
  return val;
}
