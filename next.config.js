/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'purpleschool.ru',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn-bucket.hb.ru-msk.vkcs.cloud',
        pathname: '**'
      }
    ]
  }

  /*
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  }
  */
};

module.exports = nextConfig;
