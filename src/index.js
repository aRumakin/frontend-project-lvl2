import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parsers.js';

const getFile = (filepath) => {
  const pathToFile = fs.readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
  return parseFile(pathToFile, filepath);
};

const getKeys = (filename) => Object.keys(filename);

const genDiff = (file1, file2) => {
  console.log(file1, file2);
  const keys1 = getKeys(file1);
  const keys2 = getKeys(file2);
  const arrOfKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(arrOfKeys);
  const resultValues = sortedKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (_.has(file1, key) && _.has(file2, key) && value1 !== value2) {
      acc.push(`- ${key}: ${value1}`);
      acc.push(`+ ${key}: ${value2}`);
    } else if (_.has(file2, key) && !_.has(file1, key)) {
      acc.push(`+ ${key}: ${value2}`);
    } else if (!_.has(file2, key)) {
      acc.push(`- ${key}: ${value1}`);
    } else if (_.has(file1, key) && _.has(file2, key) && _.isEqual(value1, value2)) {
      acc.push(`  ${key}: ${value1}`);
    }
    return acc;
  }, []);
  const result = resultValues.join('\n  ');
  return `{\n  ${result}\n}`;
};

export { genDiff, getFile };
