import fs from 'fs/promises';
import path from 'path';
import { validateData } from './helpers/validateData.js';
import { checkExtention } from './helpers/checkExtention.js';

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
  const filePath = path.resolve('file', fileName);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log('File was created successfully');
  } catch (error) {
    console.log(error);
  }
}
