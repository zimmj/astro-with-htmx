import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { supabase } from '../../../lib/supabase';
import Alert from '../../../components/ui/Alert.astro';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    const container = await AstroContainer.create();
    const errorHtml = await container.renderToString(Alert, {
      props: { type: 'error', message: 'Email and password are required' }
    });
    return new Response(errorHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data?.session) {
    const container = await AstroContainer.create();
    const errorHtml = await container.renderToString(Alert, {
      props: { type: 'error', message: error?.message ?? 'Login failed' }
    });
    return new Response(errorHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
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
