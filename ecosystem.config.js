module.exports = {
  apps: [
    {
      name: "backend",
      script: "./index.js",
      env_production: {
        NODE_ENV: "production",
        FILE_PATH: "/files"
      }
    }
  ]
};
