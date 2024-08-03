/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        removeConsole: process.env.NODE_ENV === "production"
    },
    generateBuildId: async () => {
        // This could be anything, using the latest git hash
        return process.env.GIT_HASH
      },
};

export default nextConfig;
