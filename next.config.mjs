/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'm.media-amazon.com',
                pathname: '/**',
            }
        ]
    },
    sassOptions: {
        includePaths: ['./src/styles'],
    },
};

export default nextConfig;
