declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      wallet?: string
    }
  }

  interface User {
    id: string
    name: string
    email?: string
    wallet?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    wallet?: string
  }
}
