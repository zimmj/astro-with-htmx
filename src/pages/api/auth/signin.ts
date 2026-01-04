import type { APIRoute, AstroCookies } from 'astro';
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
                'HX-Redirect': `/api/error?message=${encodeURIComponent('Email and password are required')}`
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
                'HX-Redirect': `/api/error?message=${encodeURIComponent(error.message)}`
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