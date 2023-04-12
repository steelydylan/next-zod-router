import * as ts from "typescript";
import { emitFile } from "./emitFile";
import { printList } from "./printList";
import type { FileInfo } from "./types";
import { factory } from "typescript";
import path from "path";
import { createEmptyShim, createShim } from "./createModuleShim/createShim";
import { createImportDeclarations } from "./createModuleShim/createImportDeclarations";

export function emitModulesShim(
  fileInfos: FileInfo[],
  moduleNameSpace: string,
  distDir: string
) {
  const methods = ["Get", "Post", "Put", "Delete", "Patch"];
  emitFile(
    distDir,
    path.resolve(distDir, 'index.d.ts'),
    printList([
      ...fileInfos.map((info) => {
        return createImportDeclarations(
          info.methodTypes,
          info.importPath,
          info.variableName,
        )
      }),
      factory.createModuleDeclaration(
        [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
        factory.createStringLiteral(moduleNameSpace),
        factory.createModuleBlock([
          ...methods.map((method) => createEmptyShim(method, "Query"))
        ])
      ),
      ...fileInfos.map((info) => {
        return factory.createModuleDeclaration(
          [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
          factory.createStringLiteral(moduleNameSpace),
          factory.createModuleBlock([
            ...info.methodTypes.map((method) => createShim(method, info.apiPath, "Query", info.variableName))
          ])
        )
      }),
    ])
  )
}