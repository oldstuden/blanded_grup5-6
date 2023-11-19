import fs from "fs/promises";
import path from "path";
import { validateData } from "./helpers/validateData.js";
import { checkExtention } from "./helpers/checkExtention.js";

export async function createFile(req, res, next) {
  const { body } = req;
  const resultValidate = validateData(body);
  if (resultValidate.error) {
    res.status(400).json({
      message: `please specify ${resultValidate.error.details[0].path[0]} parametr `,
    });
    return;
  }
  const { extention, result } = checkExtention(body.fileName);
  if (!result) {
    res.status(400).json({
      message: `This app doesn't support file with ${extention} extention`,
    });
    return;
  }
  const filePath = path.resolve("files", body.fileName);
  try {
    await fs.writeFile(filePath, body.content, "utf-8");
    res.status(201).json({ message: "File was created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getFiles = async (req, res, next) => {
  const folderPath = path.resolve("files");
  const resultReader = await fs.readdir(folderPath);

  if (!resultReader.length) {
    res
      .status(404)
      .json({ message: "Sorry, there are no files in this folder" });
    return;
  }
  res.json(resultReader);
};

export const getFileInfo = async (req, res, next) => {
  const { fileName } = req.params;
  const dirPath = path.resolve("files");
  const files = await fs.readdir(dirPath);

  if (!files.includes(fileName)) {
    res.status(404).json({ message: "There are no file with such name" });
    return;
  }
  const filePath = path.resolve("files", fileName);
  const content = await fs.readFile(filePath, "utf-8");

  const { birthtime } = await fs.stat(filePath);

  const ext = path.extname(filePath);

  const nameFile = path.basename(filePath, ext);
  res.json({
    content,
    createdAdd: birthtime,
    extention: ext,
    name: nameFile,
  });
};
