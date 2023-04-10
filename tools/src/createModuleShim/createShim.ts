import { factory } from "typescript";
// ______________________________________________________
//
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
