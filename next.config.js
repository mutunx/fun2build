/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/discuss',
                permanent: true,
            },
        ]
    },
}

export default nextConfig