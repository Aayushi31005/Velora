const { execFileSync } = require("node:child_process");
const path = require("node:path");

const cwd = path.resolve(__dirname, "..");

execFileSync(
  process.execPath,
  [
    "./node_modules/typescript/bin/tsc",
    "-p",
    "prisma/tsconfig.seed.json",
  ],
  {
    cwd,
    stdio: "inherit",
  }
);

execFileSync(process.execPath, ["prisma/.seed/seed.js"], {
  cwd,
  stdio: "inherit",
});
