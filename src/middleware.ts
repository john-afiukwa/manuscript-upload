import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@src/app/api/auth'

const protectedRoutes = ['/manuscripts', '/dashboard', '/manuscripts/upload']
const publicRoutes = ['/auth/signup', '/auth/signin', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const userSessionData = await verifySession()

  if (isProtectedRoute && !userSessionData?.userId) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl))
  }

  if (isPublicRoute && userSessionData?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}