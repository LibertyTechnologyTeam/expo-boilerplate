module.exports = {
  // Cấu hình mặc định cho template
  templateConfig: {
    skipInstall: true,     // Tương đương với --skip-install
    skipGitInit: true,     // Tương đương với --skip-git-init
    installPods: false,    // Skip cài đặt CocoaPods
    skipDependencyInstallation: true,
  },
  // Thêm cấu hình cho iOS
  project: {
    ios: {
      automaticPodsInstallation: false // Disable auto pods installation
    }
  }
}; 