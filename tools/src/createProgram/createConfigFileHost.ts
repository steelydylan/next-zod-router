import * as ts from "typescript";
// ______________________________________________________
//
export const createConfigFileHost = (): ts.ParseConfigFileHost => ({
  useCaseSensitiveFileNames: false,
  readDirectory: ts.sys.readDirectory,
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  onUnRecoverableConfigFileDiagnostic(diagnostic: ts.Diagnostic) {
    throw new Error(
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
    );
  },
});
