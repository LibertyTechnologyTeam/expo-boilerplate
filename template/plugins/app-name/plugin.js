const fs = require('fs');
const path = require('path');

module.exports = {
  apply: async (value, response) => {
    // Lấy tên project từ process.argv hoặc từ thư mục hiện tại
    const projectName = process.argv[2] || path.basename(process.cwd());
    
    if (projectName) {
      const configPath = path.join(process.cwd(), 'app.config.js');
      
      try {
        let content = fs.readFileSync(configPath, 'utf8');
        
        // Thay thế app name cũ bằng projectName từ CLI
        content = content.replace(
          /const name = ['"]([^'"]+)['"]/,
          `const name = '${projectName}'`
        );
        
        fs.writeFileSync(configPath, content, 'utf8');
        console.log('✅ App name updated to:', projectName);
      } catch (error) {
        console.error('❌ Failed to update app name:', error);
      }
    }
    return Promise.resolve();
  },
  name: 'appName',
  // Không cần promptsOptions vì lấy tên từ CLI
  promptsOptions: null
}; 