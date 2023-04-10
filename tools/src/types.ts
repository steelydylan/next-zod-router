export type FileInfo = {
  srcPath: string;
  distPath: string;
  distFileName: string;
  distDir: string;
  filePath: string;
  methodTypes: string[];
  importPath: string;
  apiPath: string;
};

export type Config = {
  baseDir: string;
  distDir: string;
  pagesDir: string;
  moduleNameSpaece: string;
};
