const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const targetDir = path.join(root, "hosting");

const filesToCopy = ["server.js"];

const packageJson = {
  name: "santexnika",
  version: "1.0.0",
  private: true,
  scripts: {
    start: "node server.js",
  },
  engines: {
    node: ">=18",
  },
  dependencies: {
    express: "^4.21.2",
  },
};

if (!fs.existsSync(outDir)) {
  console.error("Папка out/ не найдена. Сначала выполни: npm run build");
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

copyDir(outDir, path.join(targetDir, "out"));

for (const file of filesToCopy) {
  fs.copyFileSync(path.join(root, file), path.join(targetDir, file));
}

fs.writeFileSync(
  path.join(targetDir, "package.json"),
  `${JSON.stringify(packageJson, null, 2)}\n`,
);

console.log("Готово: папка hosting/ — заливай её содержимое в Node.js Project");

function copyDir(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDir(from, to);
      continue;
    }

    fs.copyFileSync(from, to);
  }
}
