import {
  HasAccessToken,
  LoginWithGoogle,
  RegisterWithGoogle,
} from "@/src/actions/auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GG_ID as string,
      clientSecret: process.env.GG_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const backend_url = process.env.BACKEND_HOST;
        const loginUrl = `${backend_url}/api/auth/authenticate`;
        const email = credentials?.email;
        const password = credentials?.password;
        try {
          const res = await fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((error) => {
            throw new Error("Internal Server Error with host: " + backend_url);
          });

          if (!res.ok) {
            throw new Error("Wrong email or password");
          }
          const user = await res.json();

          const jwt = res.headers
            .getSetCookie()[0]
            .split("; ")[0]
            .split("=")[1];
          cookies().set("access-token", jwt, { httpOnly: true });
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      if (!user.name) return false;

      const hasAccessToken = await HasAccessToken();
      if (hasAccessToken) return true;

      const email = user.email;
      const name = user.name;
      await RegisterWithGoogle(name, email);
      await LoginWithGoogle(email);
      return true;
    },
  },
};
