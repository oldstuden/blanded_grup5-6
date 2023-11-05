import fs from "fs/promises";
import path from "path";
import { validateData } from "./helpers/validateData.js";
import { checkExtention } from "./helpers/checkExtention.js";

export async function createFile(fileName, content) {
  const file = {
    fileName,
    content,
  };
  const res = validateData(file);
  if (res.error) {
    console.log(`please specify ${result.error.details[0].path[0]} parametr `);
    return;
  }
  const { extention, result } = checkExtention(fileName);
  if (!result) {
    console.log(`This app doesn't support file with ${extention} extention`);
    return;
  }
  const filePath = path.resolve("file", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("File was created successfully");
  } catch (error) {
    console.log(error);
  }
}

export const getFiles = async () => {
  const folderPath = path.resolve("files");
  const res = await fs.readdir(folderPath);

  if (!res.length) {
    console.log("Sorry, there are no files in this folder");
    return;
  }
  res.forEach((el) => console.log(el));
};

export const getFileInfo = async (fileName) => {
  const dirPath = path.resolve("files");
  const files = await fs.readdir(dirPath);

  if (!files.includes(fileName)) {
    console.log("There are no file with such name");
    return;
  }
  const filePath = path.resolve("files", fileName);
  const content = await fs.readFile(filePath, "utf-8");

  const { birthtime } = await fs.stat(filePath);

  const ext = path.extname(filePath);

  const nameFile = path.basename(filePath, ext);
  console.log({
    content,
    createdAdd: birthtime,
    extention: ext,
    name: nameFile,
  });
};
