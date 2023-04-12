import * as ts from "typescript";
import path from "path";
import type { FileInfo } from "./types";

const targetAliases = [
  "GetHandler",
  "PostHandler",
  "PutHandler",
  "PatchHandler",
  "DeleteHandler",
];

function getMethodTypes(sourceFile?: ts.SourceFile) {
  const buf: string[] = [];
  if (sourceFile) {
    sourceFile.forEachChild((node) => {
      if (ts.isTypeAliasDeclaration(node)) {
        const name = node.name.escapedText.toString();
        if (targetAliases.includes(name)) {
          buf.push(name.replace("Handler", ""));
        }
      }
    });
  }
  return buf;
}

function convertToValidVariableName(input: string): string {
  // 不適切な文字を削除するための正規表現パターン
  const invalidCharacters = /[^a-zA-Z0-9_]/g;

  // input文字列から不適切な文字を削除
  let validVariableName = input.replace(invalidCharacters, '_');

  // 先頭文字が数字の場合、アンダースコアを追加
  if (validVariableName.match(/^[0-9]/)) {
    validVariableName = '_' + validVariableName;
  }

  // アンダースコアを削除し、その次の文字を大文字にする
  validVariableName = validVariableName.replace(/_([a-zA-Z0-9])/g, (match, p1) => {
    return p1.toUpperCase();
  });

  // 最初の文字を大文字に
  validVariableName = validVariableName.charAt(0).toUpperCase() + validVariableName.slice(1);

  return validVariableName;
}

export function mapFileInfo(
  dist: string,
  pagesDir: string,
  program: ts.Program
) {
  return (filePath: string): FileInfo => {
    const srcPath = filePath;
    const sourceFile = program.getSourceFile(srcPath);
    const importPath = path.relative(dist, filePath)
      .replace(".ts", "")
      .replace(".tsx", "");
    const apiPath = filePath
      .replace(pagesDir, "")
      .replace("/index", "")
      .slice(0, -3);

    const methodTypes = getMethodTypes(sourceFile);
    const variableName = convertToValidVariableName(apiPath);

    return {
      srcPath,
      filePath,
      methodTypes,
      importPath,
      apiPath,
      variableName,
    };
  };
}
