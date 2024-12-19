import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { userId, password } = credentials || {};

        // 데이터베이스에서 사용자 조회
        const user = await prisma.user.findUnique({
          where: { userId },
        });

        if (!user) {
          throw new Error("No user found with this ID");
        }

        // 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, userId: user.userId, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "../signin", // 커스텀 로그인 페이지
    error: "/auth/error", // 오류 페이지
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          userId: token.userId,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
