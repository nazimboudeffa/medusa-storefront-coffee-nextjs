/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BACKEND_URL: "http://192.168.0.15:9000",
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
