import { createModuleShim } from "./createModuleShim";
import * as ts from "typescript";
import { emitFile } from "./emitFile";
import { printList } from "./printList";
import type { FileInfo } from "./types";
import { factory } from "typescript";
import path from "path";
import { createEmptyShim } from "./createModuleShim/createShim";
// ______________________________________________________
//
export function emitModulesShim(
  fileInfos: FileInfo[],
  moduleNameSpace: string,
  distDir: string
) {
  const methods = ["Get", "Post", "Put", "Delete", "Patch"];
  emitFile(
    distDir,
    path.resolve(distDir, '../index.d.ts'),
    printList([
      ...fileInfos.map((info) => 
        factory.createTypeReferenceNode(`/// <reference path=".${info.apiPath}.d.ts" />`, undefined)
      ),
      factory.createModuleDeclaration(
        // undefined,
        [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
        factory.createStringLiteral(moduleNameSpace),
        factory.createModuleBlock([
          ...methods.map((method) => createEmptyShim(method, "Query"))
        ])
      ),
    ])
  )
  fileInfos.map((info) => {
    emitFile(
      info.distDir,
      info.distPath,
      printList(
        createModuleShim({
          methods: info.methodTypes,
          apiPath: info.apiPath,
          importPath: info.importPath,
          moduleNameSpace,
        })
      )
    );
  });
}

export const createImportDeclarations = (
  importPath: string
) =>
  factory.createImportDeclaration(
    undefined,
    // undefined,
    undefined,
    factory.createStringLiteral(importPath),
    undefined
  );
