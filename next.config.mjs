/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: "127.0.0.1" }, { hostname: "mvxrvbeqngehwcbpzrud.supabase.co" }],
  },
};

export default nextConfig;
