/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'api.healthmonitorapp.online',
        //     },
        //     {
        //         protocol: 'https',
        //         hostname: 'kadant-api-production.up.railway.app',
        //     },
        // ],
    }
};

export default nextConfig;
