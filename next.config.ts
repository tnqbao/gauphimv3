const nextConfig = {
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
};

export default nextConfig;
