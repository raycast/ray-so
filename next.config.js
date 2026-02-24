const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["highlight.js"],
  experimental: {
    optimizePackageImports: ["shiki"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "files.raycast.com",
        protocol: "https",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg?url": {
        loaders: ["url-loader"],
        as: "*.js",
      },
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
      "*.inline.png": {
        loaders: ["url-loader"],
        as: "*.js",
      },
      "*.inline.jpg": {
        loaders: ["url-loader"],
        as: "*.js",
      },
      "*.inline.gif": {
        loaders: ["url-loader"],
        as: "*.js",
      },
    },
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "https://go.ray.so/:path*",
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "icon.ray.so",
          },
        ],
        destination: "https://ray.so/icon/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "icons.ray.so",
          },
        ],
        destination: "https://ray.so/icon/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "prompts.ray.so",
          },
        ],
        destination: "https://ray.so/prompts/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "presets.ray.so",
          },
        ],
        destination: "https://ray.so/presets/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "snippets.ray.so",
          },
        ],
        destination: "https://ray.so/snippets/:path*",
        permanent: true,
      },
      {
        source: "/((?!_next|api)):path(.*)",
        has: [
          {
            type: "host",
            value: "themes.ray.so",
          },
        ],
        destination: "https://ray.so/themes/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "prompts.ray.so",
          },
        ],
        destination: "https://ray.so/api/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "presets.ray.so",
          },
        ],
        destination: "https://ray.so/api/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "snippets.ray.so",
          },
        ],
        destination: "https://ray.so/api/:path*",
        permanent: true,
      },
      {
        source: "/api/:path*",
        has: [
          {
            type: "host",
            value: "themes.ray.so",
          },
        ],
        destination: "https://ray.so/api/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/shorten-url",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
