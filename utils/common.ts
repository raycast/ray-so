export const BASE_URL = {
  development: "http://localhost:3000",
  preview: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  production: "https://www.tech-stacker.com",
}[process.env.NEXT_PUBLIC_VERCEL_ENV || "development"] as string;
