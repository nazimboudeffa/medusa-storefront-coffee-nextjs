/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
    },
    images: {
    remotePatterns: [
            {
            protocol: 'https',
            hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
            port: '',
            },
        ],
    },
}

module.exports = nextConfig
