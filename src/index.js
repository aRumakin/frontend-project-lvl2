import fs from 'fs';
import path from 'path';
import { formatter, parseFile } from './formatters/index.js';
import buildTree from './buildTree.js';

const getData = (filepath) => {
  const pathToFile = fs.readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
  const format = path.extname(filepath).slice(1);
  return parseFile(pathToFile, format);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getTree = buildTree(getData(filepath1), getData(filepath2));
  try {
    formatter(getTree, formatName);
  } catch (e) {
    return e.message;
  }
  return formatter(getTree, formatName);
};

export default genDiff;
