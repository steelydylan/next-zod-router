import defaltConfig from "./config";
import { createProgram } from "./createProgram";
import { emitModulesShim } from "./emitModulesShim";
import { mapFileInfo } from "./mapFileInfo";
import * as rimraf from 'rimraf';
import fs from 'fs';
import type { Config } from "./types";

export function main(config?: Config) {
  const { pagesDir, baseDir, distDir, moduleNameSpace } = Object.assign({}, defaltConfig, config);
  const pkg = {
    name: ".next-typed-connect",
    version: "1.0.0",
    types: "index.d.ts"
  }
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  if (fs.existsSync(`${distDir}/index.d.ts`)) {
    rimraf.sync(`${distDir}/index.d.ts`);
  }
  fs.writeFileSync(`${distDir}/package.json`, JSON.stringify(pkg, null, 2));
  const apiDir = pagesDir + "/api";
  const program = createProgram(baseDir);
  const fileInfos = program
    .getRootFileNames()
    .filter((fileName) => fileName.match(apiDir))
    .map(mapFileInfo(apiDir, distDir + "/api", pagesDir, program));
  emitModulesShim(fileInfos, moduleNameSpace, distDir);
}
