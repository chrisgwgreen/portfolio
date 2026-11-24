/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export to /out, served by Firebase Hosting
  output: 'export',
  // A static export has no image optimisation server, so next/image serves files as-is
  images: { unoptimized: true },
  // The three.js scene sets itself up once per mount, so skip the dev-only double mount
  reactStrictMode: false
}

export default nextConfig
