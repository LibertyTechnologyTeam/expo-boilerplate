module.exports = {
  apply: async (value, response) => {
    if (value) {
      process.env.BUNDLE_ID = value;
    }
    return Promise.resolve();
  },
  name: 'bundleId',
  promptsOptions: {
    type: 'text',
    name: 'bundleId',
    message: 'What is your bundle identifier?',
    initial: 'com.liberty.expo',
    validate: (value) => {
      if (!value) return 'Bundle ID is required';
      if (!/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i.test(value)) {
        return 'Invalid bundle ID format (e.g: com.company.appname)';
      }
      return true;
    }
  }
}; 