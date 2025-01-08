module.exports = {
  apply: async () => {
    // Override các options mặc định
    process.env.SKIP_INSTALL = 'true';
    process.env.SKIP_GIT_INIT = 'true';
    process.env.INSTALL_PODS = 'false';
    process.env.SKIP_DEPENDENCY_INSTALLATION = 'true';
    
    // Override các prompts
    if (process.env.npm_config_user_agent) {
      process.env.npm_config_yes = 'true'; // Auto yes cho tất cả prompts
    }
    
    return Promise.resolve();
  },
  name: 'skipSteps',
  // Override các prompts options
  promptsOptions: {
    type: 'text',
    name: 'skip',
    message: '',
    initial: 'yes'
  }
};