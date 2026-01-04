# HTMX Error Handling Implementation Plan

## Overview
Transform API error responses to HTML fragments using a dedicated error endpoint. This keeps auth logic clean and separates concerns properly.

**Pattern**: Auth endpoints return errors as headers → HTMX intercepts errors → Calls error endpoint to render HTML.

## Current State

### Current API Behavior
Both `/api/auth/signin.ts` and `/api/auth/register.ts` currently return plain text errors:
```typescript
if (error) {
  return new Response(error.message, { status: 500 });
}
```

### Current Form Setup
Forms use standard POST without HTMX attributes for error handling:
```astro
<form action="/api/auth/signin" method="post" class="...">
  <!-- inputs -->
</form>
```

## Recommended Architecture

### Option 1: HTMX Error Response Swap (Cleanest)

Keep auth endpoints as `.ts` files that handle business logic. On error, return a custom header that tells HTMX to fetch the error HTML from a separate endpoint.

#### File: `src/pages/api/auth/signin.ts`
```typescript
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return new Response(null, {
      status: 400,
      headers: {
        'HX-Trigger': JSON.stringify({
          showError: { message: 'Email and password are required' }
        })
      }
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(null, {
      status: 401,
      headers: {
        'HX-Trigger': JSON.stringify({
          showError: { message: error.message }
        })
      }
    });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set('sb-access-token', access_token, { path: '/' });
  cookies.set('sb-refresh-token', refresh_token, { path: '/' });

  return new Response(null, {
    status: 200,
    headers: { 'HX-Redirect': '/dashboard' }
  });
};
```

#### File: `src/pages/api/auth/register.ts`
```typescript
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return new Response(null, {
      status: 400,
      headers: {
        'HX-Trigger': JSON.stringify({
          showError: { message: 'Email and password are required' }
        })
      }
    });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(null, {
      status: 400,
      headers: {
        'HX-Trigger': JSON.stringify({
          showError: { message: error.message }
        })
      }
    });
  }

  return new Response(null, {
    status: 200,
    headers: { 'HX-Redirect': '/signin' }
  });
};
```

#### File: `src/components/ui/Alert.astro`
```astro
---
interface Props {
  type?: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

const { type = 'error', message } = Astro.props;

const typeClasses = {
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};
---

<div
  id="form-alert"
  class={`rounded-lg border p-4 ${typeClasses[type]}`}
  role="alert"
>
  <p class="text-sm font-medium">{message}</p>
</div>
```

#### Update Forms with HTMX + Alpine.js

**File: `src/pages/signin.astro`**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Input from '../components/ui/Input.astro';
import Button from '../components/ui/Button.astro';
import Link from '../components/ui/Link.astro';

const { cookies, redirect } = Astro;

const accessToken = cookies.get('sb-access-token');
const refreshToken = cookies.get('sb-refresh-token');

if (accessToken && refreshToken) {
  return redirect('/dashboard');
}
---

<BaseLayout
  title="Sign In"
  description="Sign in to your Virtual Visual account"
  keywords="sign in, login, account"
>
  <main class="container mx-auto px-4 py-8" x-data="{ errorMessage: '' }">
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-3xl font-bold">Sign In</h1>
      <p class="text-gray-600">
        Don't have an account?
        <Link href="/register">Register</Link>
      </p>
    </div>

    <div class="mx-auto max-w-md">
      <!-- Error container -->
      <div
        id="form-alert-container"
        class="mb-4"
        x-show="errorMessage"
        x-html="errorMessage"
        @show-error.window="errorMessage = $event.detail.html"
      ></div>

      <form
        action="/api/auth/signin"
        method="post"
        hx-post="/api/auth/signin"
        hx-target="#form-alert-container"
        hx-swap="innerHTML"
        class="space-y-6 rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
        @htmx:before-request="errorMessage = ''"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          required
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          required
          placeholder="••••••••"
        />

        <Button type="submit" fullWidth>Sign In</Button>
      </form>
    </div>
  </main>

  <script>
    import Alert from '../components/ui/Alert.astro';

    document.body.addEventListener('htmx:trigger', (event) => {
      const detail = event.detail;
      if (detail.showError) {
        const alertHtml = `
          <div class="rounded-lg border p-4 bg-red-50 border-red-200 text-red-800" role="alert">
            <p class="text-sm font-medium">${detail.showError.message}</p>
          </div>
        `;

        window.dispatchEvent(new CustomEvent('show-error', {
          detail: { html: alertHtml }
        }));
      }
    });
  </script>
</BaseLayout>
```

### Option 2: Dedicated Error Endpoint (Alternative)

Create a dedicated endpoint that renders error HTML, keeping complete separation.

#### File: `src/pages/api/error.astro`
```astro
---
import Alert from '../../components/ui/Alert.astro';

export const prerender = false;

const url = new URL(Astro.request.url);
const message = url.searchParams.get('message') || 'An error occurred';
const type = (url.searchParams.get('type') as 'error' | 'success' | 'warning' | 'info') || 'error';
---

<Alert type={type} message={message} />
```

#### File: `src/pages/api/auth/signin.ts`
```typescript
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return new Response(null, {
      status: 400,
      headers: {
        'HX-Retarget': '#form-alert-container',
        'HX-Reswap': 'innerHTML',
        'HX-Trigger': 'loadError'
      }
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(null, {
      status: 401,
      headers: {
        'HX-Retarget': '#form-alert-container',
        'HX-Reswap': 'innerHTML',
        'HX-Trigger': `loadError:${encodeURIComponent(error.message)}`
      }
    });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set('sb-access-token', access_token, { path: '/' });
  cookies.set('sb-refresh-token', refresh_token, { path: '/' });

  return new Response(null, {
    status: 200,
    headers: { 'HX-Redirect': '/dashboard' }
  });
};
```

#### Update Form with Error Listener
```astro
<form
  action="/api/auth/signin"
  method="post"
  hx-post="/api/auth/signin"
  class="space-y-6 rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
  hx-on::after-request="
    if (event.detail.failed) {
      const msg = event.detail.xhr.getResponseHeader('HX-Trigger').split(':')[1];
      htmx.ajax('GET', `/api/error?message=${msg}`, {target: '#form-alert-container'});
    }
  "
>
```

### Option 3: Simple Inline Approach (Simplest)

Keep everything inline - auth endpoint returns HTML directly on error.

#### File: `src/pages/api/auth/signin.astro`
```astro
---
import { supabase } from '../../../lib/supabase';
import Alert from '../../../components/ui/Alert.astro';

export const prerender = false;

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    ---
    <Alert type="error" message="Email and password are required" />
    ---
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    ---
    <Alert type="error" message={error.message} />
    ---
  }

  const { access_token, refresh_token } = data.session;
  Astro.cookies.set('sb-access-token', access_token, { path: '/' });
  Astro.cookies.set('sb-refresh-token', refresh_token, { path: '/' });

  return new Response(null, {
    status: 200,
    headers: { 'HX-Redirect': '/dashboard' }
  });
}
---
```

#### Update Form
```astro
<div class="mx-auto max-w-md">
  <div id="form-alert-container" class="mb-4"></div>

  <form
    action="/api/auth/signin"
    method="post"
    hx-post="/api/auth/signin"
    hx-target="#form-alert-container"
    hx-swap="innerHTML"
    class="space-y-6 rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
  >
    <!-- form fields -->
  </form>
</div>
```

## Recommendation

**Use Option 3 (Simple Inline)** because:
- No complex event handling or Alpine.js required
- Clear, linear code flow
- Follows the pattern from your `src/pages/api/todos/index.astro`
- Easy to understand and maintain
- Works perfectly with HTMX's default behavior

**Use Option 1** if you want to:
- Keep strict separation between business logic (.ts) and presentation (.astro)
- Avoid Astro component syntax in API routes
- Have more control over error rendering

**Avoid Option 2** because:
- More complex with no real benefit
- Extra HTTP request for error rendering
- Harder to maintain

## Summary of Changes (Option 3)

### Files to Create:
1. `src/components/ui/Alert.astro` - Reusable alert component
2. `src/pages/api/auth/signin.astro` - Auth endpoint that returns HTML
3. `src/pages/api/auth/register.astro` - Registration endpoint that returns HTML

### Files to Delete:
1. `src/pages/api/auth/signin.ts` - Replace with `.astro` version
2. `src/pages/api/auth/register.ts` - Replace with `.astro` version

### Files to Modify:
1. `src/pages/signin.astro` - Add HTMX attributes and error container
2. `src/pages/register.astro` - Add HTMX attributes and error container

### Key Concepts:
- Auth endpoints return HTML components on error
- Success returns `HX-Redirect` header
- HTMX swaps error HTML into container
- No nested functions or complex conditionals needed

## Testing Checklist

- [ ] Submit form with empty fields → See validation error
- [ ] Submit form with wrong credentials → See auth error
- [ ] Submit form with correct credentials → Redirect to dashboard/signin
- [ ] Error appears in correct location
- [ ] Error is properly styled
- [ ] Form submission shows loading state (optional)
