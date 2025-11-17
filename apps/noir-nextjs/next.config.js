/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      require('path').resolve(__dirname, '../../libs/jxion-design/src/styles'),
      require('path').resolve(__dirname, '../../libs/jxion-design/src'),
    ],
  },
  transpilePackages: ['@jxion/ui', '@jxion/core', '@jxion/design'],
  webpack: (config) => {
    // Allow importing from libs directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@jxion/design': require('path').resolve(__dirname, '../../libs/jxion-design/src'),
    };
    return config;
  },
};

module.exports = nextConfig;
