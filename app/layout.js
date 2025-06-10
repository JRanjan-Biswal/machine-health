
import './globals.css';
import Providers from './providers';


export const metadata = {
    title: 'Kadant',
    description: 'Kadant Application',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
