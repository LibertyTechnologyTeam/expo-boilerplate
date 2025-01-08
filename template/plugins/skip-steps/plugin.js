module.exports = {
  apply: async () => {
    // Override các options mặc định
    process.env.SKIP_INSTALL = 'true';
    process.env.SKIP_GIT_INIT = 'true';
    process.env.INSTALL_PODS = 'false';
    
    return Promise.resolve();
  },
  name: 'skipSteps',
  promptsOptions: null
}; 