module.exports = {
  apps: [
    {
      name: 'buddyscript-api',
      cwd: './server',
      script: 'bun',
      args: './dist/index.js',
      interpreter: 'none',
      env: {
        PORT: '4000',
      },
    },
  ],
};
