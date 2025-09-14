import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Manually read and parse the .env file
const envPath = path.resolve(process.cwd(), '.env');
console.log('Looking for .env at:', envPath);
console.log('.env exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const envFileContent = fs.readFileSync(envPath, 'utf8');
  console.log('.env file content:', JSON.stringify(envFileContent));
  
  const envConfig = Object.fromEntries(
    envFileContent.split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => {
        const [key, ...value] = line.split('=');
        return [key.trim(), value.join('=').trim()];
      })
  );
  
  console.log('Parsed env config:', envConfig);
  
  for (const key in envConfig) {
    if (!process.env[key]) {
      process.env[key] = envConfig[key];
    }
  }
  
  console.log('API_URL after parsing:', process.env.API_URL);
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
