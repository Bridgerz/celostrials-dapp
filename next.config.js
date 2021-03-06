/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
    }
    return config
  },
  reactStrictMode: true,
  trailingSlash: true,
}
