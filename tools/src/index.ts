import config from "./config";
import { createProgram } from "./createProgram";
import { emitModulesShim } from "./emitModulesShim";
import { mapFileInfo } from "./mapFileInfo";
import type { Config } from "./types";
// ______________________________________________________
//
function main({ baseDir, pagesDir, distDir, moduleNameSpace }: Config) {
  const apiDir = pagesDir + "/api";
  const program = createProgram(baseDir);
  const fileInfos = program
    .getRootFileNames()
    .filter((fileName) => fileName.match(apiDir))
    .map(mapFileInfo(apiDir, distDir, pagesDir, program));
  emitModulesShim(fileInfos, moduleNameSpace);
}
main(config);
