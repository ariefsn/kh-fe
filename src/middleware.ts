import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = cookies().get('token')?.value

  if (!token && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url), 302)
  } else if (token && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/todos', req.url), 302)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}