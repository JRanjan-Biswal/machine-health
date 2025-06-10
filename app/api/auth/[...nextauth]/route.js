import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const url = process.env.NEXTAUTH_URL ;
                    const response = await fetch(`${url}/user/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        }),
                    });

                    if (!response.ok) {
                        return null;
                    }

                    const result = await response.json();
                    console.log(result, credentials);

                    return {
                        id: result.user?.id || result.user?._id || result.userId || result.id || credentials.email,
                        email: credentials.email,
                        name: result.user?.name || credentials.email,
                        token: result.token,
                        ...result.user
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.token = token.token;
            }
            return session;
        },
        // Add redirect callback to handle post-login redirects
        async redirect({ url, baseUrl }) {
            // If url is relative, make it absolute
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }
            // If url is on the same origin, allow it
            else if (new URL(url).origin === baseUrl) {
                return url;
            }
            // Otherwise redirect to base URL
            return baseUrl;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    // Add debug for development
    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };