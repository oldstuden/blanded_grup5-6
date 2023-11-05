export function checkExtention(fileName) {
  const EXTENTIONS = ['txt', 'js', 'html', 'css'];
  const result = fileName.split('.');
  const extention = result[result.length - 1];
  return { extention, result: EXTENTIONS.includes(extention) };
}
