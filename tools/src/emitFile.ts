import * as fs from "fs-extra";

export const emitFile = (
  distDir: string,
  fileName: string,
  fileBody: string
) => {
  if (!fs.existsSync(distDir)) {
    fs.mkdirsSync(distDir);
  }
  fs.writeFileSync(fileName, fileBody);
};
