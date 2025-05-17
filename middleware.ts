import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value || ''
    const userDataStr = request.cookies.get('user')?.value || '{}'
    let userData;

    try {
        userData = JSON.parse(userDataStr)
    } catch {
        userData = {}
    }

    // Public paths that don't require authentication
    const publicPaths = ['/signin', '/signup']
    if (publicPaths.includes(request.nextUrl.pathname)) {
        if (token) {
            // If user is already logged in, redirect based on role
            return NextResponse.redirect(new URL(
                userData.role === 'admin' ? '/admin/dashboard' : '/user/dashboard',
                request.url
            ))
        }
        return NextResponse.next()
    }

    // Check authentication for protected routes
    if (!token) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // Admin routes protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (userData.role !== 'admin') {
            return NextResponse.redirect(new URL('/user/dashboard', request.url))
        }
    }

    // User routes protection
    if (request.nextUrl.pathname.startsWith('/user')) {
        if (!token) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }

    return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/admin/:path*',
        '/user/:path*',
        '/signin',
        '/signup',
    ],
} 