const fs = require('fs');
const path = require('path');

module.exports = {
  apply: async (value, response) => {
    if (value) {
      // Đường dẫn tới file app.config.js
      const configPath = path.join(process.cwd(), 'app.config.js');
      
      try {
        // Đọc nội dung file
        let content = fs.readFileSync(configPath, 'utf8');
        
        // Thay thế bundle ID cũ bằng giá trị mới
        content = content.replace(
          /const bundleId = ['"]([^'"]+)['"]/,
          `const bundleId = '${value}'`
        );
        
        // Ghi lại file
        fs.writeFileSync(configPath, content, 'utf8');
        
        console.log('✅ Bundle identifier updated successfully');
      } catch (error) {
        console.error('❌ Failed to update bundle identifier:', error);
      }
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