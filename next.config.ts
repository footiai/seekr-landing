import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Manually read and parse the .env file
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envFileContent = fs.readFileSync(envPath, 'utf8');
  const envConfig = Object.fromEntries(
    envFileContent.split('\n').map(line => {
      const [key, ...value] = line.split('=');
      return [key.trim(), value.join('=').trim()];
    })
  );
  for (const key in envConfig) {
    if (!process.env[key]) {
      process.env[key] = envConfig[key];
    }
  }
}


const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  async rewrites() {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      // This should not happen now, but as a safeguard
      throw new Error('Manual .env parsing failed. API_URL is still not defined.');
    }
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
};

export default nextConfig;
