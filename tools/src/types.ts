export type FileInfo = {
  srcPath: string;
  filePath: string;
  methodTypes: string[];
  importPath: string;
  apiPath: string;
  variableName: string;
};

export type Config = {
  baseDir: string;
  distDir: string;
  pagesDir: string;
  moduleNameSpace: string;
};
