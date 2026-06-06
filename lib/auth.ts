import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

type LoginRole = "staff" | "student";
type AuthRole = "ADMIN" | "TEACHER" | "STUDENT";

function toAuthRole(role: string): AuthRole {
  return role === "ADMIN" || role === "TEACHER" ? role : "STUDENT";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/portal/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");
        const role = String(credentials?.role ?? "student") as LoginRole;

        if (role === "staff") {
          const staff = await db.staff.findUnique({ where: { email } });
          if (!staff) return null;
          const valid = await bcrypt.compare(password, staff.passwordHash);
          if (!valid) return null;
          return { id: staff.id, name: staff.fullName, email: staff.email, role: toAuthRole(staff.role) };
        }

        if (role === "student") {
          const student = await db.student.findUnique({
            where: { studentCode: email },
          });
          if (!student) return null;
          const valid = student.passwordHash
            ? await bcrypt.compare(password, student.passwordHash)
            : password === student.studentCode;
          if (!valid) return null;
          return { id: student.id, name: student.fullName, email: `${student.studentCode}@student.local`, role: "STUDENT" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = toAuthRole(String(token.role));
      }
      return session;
    },
  },
});
