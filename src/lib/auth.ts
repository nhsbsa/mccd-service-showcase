import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { password } = credentials as { password: string };
        if (password !== process.env.SECRET_PASSWORD) {
          throw new Error('Invalid password');
        }
        return { id: '1234', name: 'John Doe', email: 'john@gmail.com' };
      },
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  session: { strategy: 'jwt' },
};
export default authOptions;
