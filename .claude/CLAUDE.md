# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro SSR application with HTMX for interactive forms, Supabase for authentication, and Tailwind CSS for styling. The project uses server-side rendering (`output: 'server'`) with the Netlify adapter for deployment.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Build production site to ./dist/
pnpm preview          # Preview production build locally

# Code Quality
pnpm type-check       # Run Astro type checking
pnpm lint             # Run ESLint on .js, .ts, .astro files
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without writing
```

## Architecture

### SSR Mode with Netlify
- Configured for server-side rendering (`output: 'server'`)
- Uses Netlify adapter with `edgeMiddleware: false`
- All API routes and pages render on the server by default
- Use `export const prerender = false` explicitly in API routes to ensure SSR

### HTMX Integration Pattern
The app uses HTMX for form submissions and partial page updates:
- HTMX is loaded via CDN in [BaseLayout.astro](src/layouts/BaseLayout.astro)
- Forms use `hx-post`, `hx-target`, and `hx-swap` attributes for AJAX submissions
- API endpoints return HTML fragments (using AstroContainer) or HTTP headers for redirects
- Example pattern in [signin.astro](src/pages/signin.astro) and [api/auth/signin.ts](src/pages/api/auth/signin.ts)

### Authentication Flow
Uses Supabase for authentication with cookie-based sessions:
1. Auth endpoints in `src/pages/api/auth/` handle signin, register, and signout
2. Supabase client configured in [src/lib/supabase.ts](src/lib/supabase.ts) with env vars
3. Session tokens stored in cookies: `sb-access-token` and `sb-refresh-token`
4. Protected pages check for cookies and redirect if missing
5. **Important**: Use `experimental_AstroContainer` to render Astro components (like Alert) in API routes

### API Response Patterns for HTMX
When building API endpoints that work with HTMX:
- **Error responses**: Return HTML fragment (rendered Alert component) with 200 status
- **Success with redirect**: Return empty response with `HX-Redirect` header
- **Success with content**: Return HTML fragment to swap into target element
- Always set `Content-Type: text/html` for HTML responses

### Environment Variables
Required in `.env`:
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```
Defined in [src/env.d.ts](src/env.d.ts) for type safety.

### Project Structure
- `src/pages/` - File-based routing (`.astro` files for pages)
- `src/pages/api/` - API endpoints (`.ts` or `.astro` files)
- `src/components/` - Reusable Astro components
- `src/components/ui/` - UI component library (Button, Input, Link, Alert)
- `src/layouts/` - Layout components (BaseLayout with meta tags, HTMX)
- `src/lib/` - Shared utilities and clients (Supabase, todo logic)
- `src/types/` - TypeScript type definitions

### Styling
Uses Tailwind CSS with dark mode support (`dark:` variants available). The BaseLayout includes color scheme meta tag for system preference detection.
