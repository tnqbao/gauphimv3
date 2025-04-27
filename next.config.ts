import withPWA from 'next-pwa';

const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ophim.live',
        port: '',
        pathname: '/uploads/movies/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'congthanh.vn',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ["img.ophim.live"],
    minimumCacheTTL: 60,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  }
});

export default nextConfig;
