/** @type {import('next').NextConfig} */

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: apiUrl + '/api/:path*',
      },
    ];
  }
};

export default nextConfig;
