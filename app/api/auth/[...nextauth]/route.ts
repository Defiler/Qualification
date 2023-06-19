
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../../../../prisma/client'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  pages: {
    signIn: '/signin'
  },

  callbacks: {
    // @ts-ignore
    async signIn({ account, profile }) {

      try {
        let user = await db.user.findUnique({
          where: {
            email: profile.email
          }
        })

        if (!user) {
          user = await db.user.create({
            data: {
              email: profile.email,
              userName: profile.name,
            },
          })
        }

        return true;
      } catch (e) {
        console.log(e)
      }

    }
  }
}
// @ts-ignore
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
