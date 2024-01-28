/** @tag {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: {
      bodySizeLimit: '100mb',
    },
    serverMinification: false
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'storage.googleapis.com', 'tailwindui.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  }
}

module.exports = nextConfig
