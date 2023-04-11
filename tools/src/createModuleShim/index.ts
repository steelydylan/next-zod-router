import * as ts from "typescript";
import { factory } from "typescript";
import { createImportDeclarations } from "./createImportDeclarations";
import { createShim } from "./createShim";

export const createModuleShim = ({
  methods,
  apiPath,
  importPath,
  moduleNameSpace,
}: {
  methods: string[];
  apiPath: string;
  importPath: string;
  moduleNameSpace: string;
}) => [
  createImportDeclarations(methods, importPath),
  factory.createModuleDeclaration(
    // undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createStringLiteral(moduleNameSpace),
    factory.createModuleBlock([
      ...methods.map((method) => createShim(method, apiPath, "Query"))
    ])
  ),
];
