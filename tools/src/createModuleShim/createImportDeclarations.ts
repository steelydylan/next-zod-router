import { factory } from "typescript";

// OUTPUT:
// import type { ${method[0]}Handler, ${method[1]}Handler } from "${importPath}";
//
export const createImportDeclarations = (
  methods: string[],
  importPath: string,
  variableName: string,
) =>
  factory.createImportDeclaration(
    undefined,
    // undefined,
    factory.createImportClause(
      true,
      undefined,
      factory.createNamedImports(
        methods.map((method) =>
          factory.createImportSpecifier(
            false,
            factory.createIdentifier(method + "Handler"),
            factory.createIdentifier(variableName + method + "Handler")
          )
        )
      )
    ),
    factory.createStringLiteral(importPath),
    undefined
  );
