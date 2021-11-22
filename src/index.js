import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import buildTree from './buildTree.js';

const getFile = (filepath) => {
  const pathToFile = fs.readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
  return parseFile(pathToFile, filepath);
};

const formatter = (tree, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return `Format ${formatterName} is not supported.`;
  }
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const getTree = buildTree(file1, file2);
  return formatter(getTree, formatName);
};

export { genDiff, getFile };
