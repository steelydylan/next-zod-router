import * as ts from "typescript";
import { createConfigFileHost } from "./createConfigFileHost";

export const createProgram = (
  searchPath: string,
  configName = "tsconfig.json"
): ts.Program => {
  const configPath = ts.findConfigFile(
    searchPath,
    ts.sys.fileExists,
    configName
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }
  const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(
    configPath,
    {},
    createConfigFileHost()
  );
  if (!parsedCommandLine) {
    throw new Error("invalid parsedCommandLine.");
  }
  if (parsedCommandLine.errors.length) {
    throw new Error("parsedCommandLine has errors.");
  }
  return ts.createProgram({
    rootNames: parsedCommandLine.fileNames,
    options: parsedCommandLine.options,
  });
};
