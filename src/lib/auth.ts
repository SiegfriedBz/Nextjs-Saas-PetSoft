import getDataUser from '@/server-getData/getDataUser'
import type { TUser } from '@/types/user.types'
import { loginZodSchema } from '@/zod/auth.zod'
import bcrypt from 'bcryptjs'
import NextAuth, {
  DefaultSession,
  NextAuthConfig,
  Session,
  User
} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'

type JWT = { [key: string]: any }

declare module 'next-auth' {
  interface User {
    hasAccess: TUser['hasAccess']
  }
  // Extend session to hold the userId
  interface Session extends DefaultSession {
    user: User & { userId: TUser['id']; userHasAccess: TUser['hasAccess'] }
  }
}

export const config = {
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      /** runs ON LOGIN */
      async authorize(credentials) {
        // validate credentials
        const parsedCredentials = loginZodSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          // get user from db
          const user = await getDataUser({ email })
          if (!user) return null

          // compare password
          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          )

          if (passwordsMatch) {
            return user // available in jwt callback
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    /** add userId to JWT
     *  runs AFTER authorize.
     *  => userId + userHasAccess available SERVER-side.
     *  JWT is forwarded to session callback.
     */
    async jwt({
      token,
      user,
      trigger
    }: {
      token: JWT
      user: User
      trigger?: 'signIn' | 'signUp' | 'update'
    }) {
      if (user) {
        // on login
        // default token holds id + email + name + image
        token.userId = user.id
        token.userHasAccess = user.hasAccess
      }

      if (trigger === 'update') {
        // on update (from payment page - success)
        const userEmail = token.email // unique
        const user = await getDataUser({ email: userEmail })
        if (!user) return token

        const hasAccess = user.hasAccess
        token.userHasAccess = hasAccess
      }

      return token
    },
    /** add userId + userHasAccess to session.user
     *  runs AFTER jwt callback.
     *  => userId + userHasAccess available CLIENT-side .
     */
    async session({ token, session }: { token: JWT; session: Session }) {
      // get userId + userHasAccess from token
      const userId = token?.userId
      const userHasAccess = token?.userHasAccess
      // add userId + userHasAccess to session
      session.user.userId = userId
      session.user.userHasAccess = userHasAccess
      return session
    },
    /** protect routes - runs on every request matching next-middleware */
    authorized({ auth, request }) {
      // auth = session
      const isLoggedIn = !!auth?.user
      const hasAccessToApp = !!auth?.user?.userHasAccess

      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app')
      const isTryingToAccessLogin = request.nextUrl.pathname.includes('/login')
      const isTryingToAccessSignup =
        request.nextUrl.pathname.includes('/signup')

      if (!isLoggedIn && isTryingToAccessApp) {
        return false
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        if (
          !hasAccessToApp &&
          (isTryingToAccessLogin || isTryingToAccessSignup)
        ) {
          /** !!! USE NEXTRESPONSE and NOT RESPONSE TO REDIRECT !!! */
          return NextResponse.redirect(new URL('/payment', request.nextUrl))
        } else {
          return true
        }
      }

      if (isLoggedIn && !hasAccessToApp && isTryingToAccessApp) {
        /** !!! USE NEXTRESPONSE and NOT RESPONSE TO REDIRECT !!! */
        return NextResponse.redirect(new URL('/payment', request.nextUrl))
      }

      if (isLoggedIn && hasAccessToApp && !isTryingToAccessApp) {
        return NextResponse.redirect(new URL('/app/dashboard', request.nextUrl))
      }

      if (isLoggedIn && hasAccessToApp && isTryingToAccessApp) {
        return true
      }

      return false
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
