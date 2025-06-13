import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { ethers } from "ethers"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "Wallet",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
        address: { label: "Address", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.message || !credentials?.signature || !credentials?.address) {
          return null
        }

        try {
          // Verify the signature
          const signerAddress = ethers.verifyMessage(credentials.message, credentials.signature)

          if (signerAddress.toLowerCase() !== credentials.address.toLowerCase()) {
            return null
          }

          // Find or create user
          let user = await prisma.user.findUnique({
            where: { wallet: credentials.address.toLowerCase() },
          })

          if (!user) {
            user = await prisma.user.create({
              data: {
                wallet: credentials.address.toLowerCase(),
                name: `User-${credentials.address.substring(0, 8)}`,
                isPalestinian: false, // Default value, user can update later
                passportType: "PERSONAL", // Default value
              },
            })
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            wallet: user.wallet,
          }
        } catch (error) {
          console.error("Error verifying wallet signature:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.wallet = token.wallet as string | undefined
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.wallet = user.wallet
      }
      return token
    },
  },
}
