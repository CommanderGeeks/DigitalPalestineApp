export const dynamic = 'force-dynamic'; // ⬅️ tell Next not to pre-render
export const runtime = 'nodejs';        // ⬅️ use Node, not Edge (Prisma needs it)

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
