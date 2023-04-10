import { createModuleShim } from "./createModuleShim";
import { emitFile } from "./emitFile";
import { printList } from "./printList";
import type { FileInfo } from "./types";
// ______________________________________________________
//
export function emitModulesShim(
  fileInfos: FileInfo[],
  moduleNameSpaece: string
) {
  fileInfos.map((info) => {
    emitFile(
      info.distDir,
      info.distPath,
      printList(
        createModuleShim({
          methods: info.methodTypes,
          apiPath: info.apiPath,
          importPath: info.importPath,
          moduleNameSpaece,
        })
      )
    );
  });
}
