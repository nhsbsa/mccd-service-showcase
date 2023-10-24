const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles'), path.join(__dirname, 'public/theme')],
  },
};

module.exports = nextConfig;
