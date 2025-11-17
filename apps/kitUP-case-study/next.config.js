/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Allow importing from libs directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@jxion/ui': require('path').resolve(
        __dirname,
        '../../libs/jxion-ui/src'
      ),
      '@jxion/core': require('path').resolve(
        __dirname,
        '../../libs/jxion-core/src'
      ),
      '@jxion/design': require('path').resolve(
        __dirname,
        '../../libs/jxion-design/src'
      ),
      '@jxion/i18n': require('path').resolve(
        __dirname,
        '../../libs/jxion-i18n/src'
      ),
    };
    return config;
  },
  transpilePackages: [
    '@jxion/ui',
    '@jxion/core',
    '@jxion/design',
    '@jxion/i18n',
  ],
};

module.exports = nextConfig;
