/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //Add remote origins for image
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "raw.githubusercontent.com"
    }]
  }
};

export default nextConfig;
