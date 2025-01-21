import { NextRequest, NextResponse } from "next/server";
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseURL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000';

// Технические страницы, доступные всем
const publicPaths = [
    "/",                // главная страница с формой логина
    "/register",        // регистрация
    "/reset-password",  // восстановление пароля
    "/verify-email",    // подтверждение email
];

// Технические пути, которые не нужно проверять
const ignoredPaths = [
    "/api",
    "/_next",
    "/favicon.ico",
    "/static",
    "/images",
];

async function attemptTokenRefresh(request: NextRequest): Promise<boolean> {
    const refreshToken = request.cookies.get('refresh');

    if (!refreshToken) {
        return false;
    }

    try {
        await mutex.waitForUnlock();

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const response = await fetch(`${baseURL}/api/auth/jwt/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `refresh=${refreshToken.value}`
                    },
                    credentials: 'include'
                });

                return response.ok;
            } catch (error) {
                return false;
            } finally {
                release();
            }
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Пропускаем технические пути
    if (ignoredPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('access');
    const refreshToken = request.cookies.get('refresh');
    let isAuthenticated = accessToken && refreshToken;

    // Если пользователь авторизован и пытается зайти на публичные страницы
    if (isAuthenticated && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Если у пользователя нет access токена, но есть refresh токен,
    // пробуем обновить токен перед редиректом
    if (!accessToken && refreshToken && !publicPaths.includes(pathname)) {
        const refreshSuccessful = await attemptTokenRefresh(request);
        if (refreshSuccessful) {
            return NextResponse.next();
        }
    }

    // Если пользователь не авторизован и пытается зайти на защищенные страницы
    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        const searchParams = new URLSearchParams({
            returnUrl: pathname,
        });
        return NextResponse.redirect(new URL(`/?${searchParams}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next|static|.*\\..*|_vercel).*)",
    ],
};