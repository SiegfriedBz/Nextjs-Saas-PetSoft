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
  // Extend session to hold the userId
  interface Session extends DefaultSession {
    user: User & { userId: TUser['id'] }
  }
}

export const config = {
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      /** runs on login */
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
            return user
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    /** protect routes - runs on every request matching next-middleware */
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app')

      if (!isLoggedIn && isTryingToAccessApp) {
        return false
      }
      if (!isLoggedIn && !isTryingToAccessApp) {
        return true
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        /** !!! USE NEXTRESPONSE and NOT RESPONSE TO REDIRECT !!! */
        return NextResponse.redirect(new URL('/app/dashboard', request.nextUrl))
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true
      }

      return false
    },
    /** add userId to JWT
     *  => userId available SERVER-side.
     *  JWT is forwarded to session callback.
     */
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        // on login
        token.userId = user.id
      }

      return token
    },
    /** add userId to session.user
     *  runs after jwt callback.
     *  => userId available CLIENT-side .
     */
    async session({ token, session }: { token: JWT; session: Session }) {
      // get userId from token
      const userId = token?.userId
      // add userId to session
      session.user.userId = userId
      return session
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
