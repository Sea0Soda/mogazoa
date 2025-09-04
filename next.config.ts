import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 기존에 있던 images 설정은 그대로 둡니다.
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },

  // SVG를 처리하기 위한 webpack 설정
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
