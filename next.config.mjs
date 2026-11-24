/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export to /out, served by Firebase Hosting
  output: 'export',
  // The three.js scene sets itself up once per mount, so skip the dev-only double mount
  reactStrictMode: false
}

export default nextConfig
