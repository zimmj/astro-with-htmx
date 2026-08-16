/// <reference types="astro/client" />

declare module '*.css';

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  /**
   * Session cookie value for the Polarsteps account (unofficial API auth).
   * Server-only secret — never prefix with PUBLIC_. Optional: live Journey
   * data falls back to the manual config in src/lib/journey.ts when unset.
   */
  readonly POLARSTEPS_REMEMBER_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
