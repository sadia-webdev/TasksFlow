/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 1. Matches http://googleusercontent.com
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
      // 2. Matches https://googleusercontent.com
      {
        protocol: "https",
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
      // 3. Matches http://lh3.googleusercontent.com (and lh4, lh5, etc.)
      {
        protocol: "http",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
      // 4. Matches https://lh3.googleusercontent.com
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
