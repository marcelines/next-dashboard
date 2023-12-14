import NextAuth from 'next-auth'

import { authConfig } from './auth.config'

import type { NextAuthConfig } from 'next-auth'

const nextAuth: NextAuthConfig = NextAuth(authConfig).auth

export default nextAuth

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
