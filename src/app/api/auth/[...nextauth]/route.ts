import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import type { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import UserDB from "@/libs/mongoose/schemas/UserSchema";
import NextAuth, { User } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      await mongooseConnect();
      const requeredUser = await UserDB.findOne({ email: token.email });
      session.user = {
        ...session.user,
        isAdmin: requeredUser?.isAdmin || false,
      };
      return session;
    },
    async signIn({ profile }) {
      try {
        await mongooseConnect();
        const existingUser = await UserDB.findOne({ email: profile?.email });
        if (!existingUser) {
          const newUser = new UserDB({
            email: profile?.email,
            name: profile?.name,
            picture: profile?.image,
          });
          await newUser.save();
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
