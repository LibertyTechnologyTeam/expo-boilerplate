const { execSync } = require("child_process");

const projectName = process.argv[2] || "MyApp";

execSync(
  `npx @react-native-community/cli@latest init ${projectName} \
  --template react-native-template-typescript \
  --skip-install \
  --skip-git \
  --skip-pod-install `,
  { stdio: "inherit" }
);
