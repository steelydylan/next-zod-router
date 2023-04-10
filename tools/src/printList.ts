import * as ts from "typescript";
// ______________________________________________________
//
const printer = ts.createPrinter();

export const printList = (elements?: readonly ts.Node[]) =>
  printer.printList(
    ts.ListFormat.MultiLine,
    ts.factory.createNodeArray(elements),
    ts.createSourceFile("", "", ts.ScriptTarget.ES2015)
  );
