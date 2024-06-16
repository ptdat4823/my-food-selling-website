import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GG_ID as string,
      clientSecret: process.env.GG_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const loginUrl = "http://localhost:8080/api/auth/authenticate";
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
            throw new Error("Internal Server Error");
          });

          if (!res.ok) {
            throw new Error("Wrong email or password");
          }
          return res.json();
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
