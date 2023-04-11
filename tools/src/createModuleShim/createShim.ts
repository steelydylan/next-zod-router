import { factory } from "typescript";

// OUTPUT:
// interface ${method}${shimName} {
//   "${apiPath}": ${method}Handler;
// }
//
export const createShim = (method: string, apiPath: string, shimName: string) =>
  factory.createInterfaceDeclaration(
    undefined,
    // undefined,
    factory.createIdentifier(method + shimName),
    undefined,
    undefined,
    [
      factory.createPropertySignature(
        undefined,
        factory.createStringLiteral(apiPath),
        undefined,
        factory.createTypeReferenceNode(
          factory.createIdentifier(method + "Handler"),
          undefined
        ),
      ),
    ]
  );

export const createEmptyShim = (method: string, shimName: string) =>
  factory.createInterfaceDeclaration(
    undefined,
    // undefined,
    factory.createIdentifier(method + shimName),
    undefined,
    undefined,
    []
  );
