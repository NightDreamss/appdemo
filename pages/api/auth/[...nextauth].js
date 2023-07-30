import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connect } from "@/libs/mysqlDB";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { email, password } = credentials;
        const schema = z.object({
          email: z
            .string()
            .trim()
            .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
              message: "Invalid email address, please enter a valid email",
            }),
          password: z
            .string()
            .trim()
            .regex(
              /^(?:(?=.{8,})(?=.*[~`! @#$%^&*()_|;"'<:,>.?/+={[}-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
              {
                message:
                  "Password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol",
              }
            )
            .min(1, {
              message: "A password is required",
              invalid_type_error: "A password is required",
            }),
        });
        const verify = await schema.parse({
          email,
          password,
        });

        const query = `SELECT password FROM user WHERE email = ?`;
        const values = [`${verify.email}`];

        const [results] = await connect({ query, values });
        const compare = await bcrypt.compare(verify.password, results.password);

        if (compare) {
          const query = `SELECT * FROM user WHERE email = ?`;
          const values = [`${verify.email}`];

          const [results] = await connect({ query, values });
          const user = {
            id: results?.id,
            name: results?.name,
            email: results?.email,
            image: results?.image,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
