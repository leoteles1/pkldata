import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        req.cookies.set(name, value);
                    });
                    response = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, (options as CookieOptions));
                    });
                },
            },
        }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = req.nextUrl.pathname.startsWith('/login');

    if (isAdminRoute && !session) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/login';
        return NextResponse.redirect(redirectUrl);
    }

    if (isLoginRoute && session) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/admin';
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    // Intercepta rotas /admin e a /login
    matcher: ['/admin/:path*', '/login'],
};
