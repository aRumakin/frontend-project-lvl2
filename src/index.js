import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
// const getFormat = (filename) => path.extname(filename);
const getKeys = (filename) => Object.keys(filename);

const genDiff = (file1, file2) => {
  // const file1Format = getFormat(filepath1);
  // const file2Format = getFormat(filepath2);

  const parsedFile1 = JSON.parse(file1);
  const parsedFile2 = JSON.parse(file2);

  const keys1 = getKeys(parsedFile1);
  const keys2 = getKeys(parsedFile2);
  const arrOfKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(arrOfKeys);
  const resultValues = sortedKeys.reduce((acc, key) => {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key) && value1 !== value2) {
      acc.push(`- ${key}: ${value1}`);
      acc.push(`+ ${key}: ${value2}`);
      // acc[`- ${key}`] = value1;
      // acc[`+ ${key}`] = value2;
    } else if (_.has(parsedFile2, key) && !_.has(parsedFile1, key)) {
      acc.push(`+ ${key}: ${value2}`);
      // acc[`+ ${key}`] = value2;
    } else if (!_.has(parsedFile2, key)) {
      acc.push(`- ${key}: ${value1}`);
      // acc[`- ${key}`] = value1;
    } else if (_.has(parsedFile1, key) && _.has(parsedFile2, key) && _.isEqual(value1, value2)) {
      acc.push(`  ${key}: ${value1}`);
      // acc[`  ${key}`] = value1;
    }
    return acc;
  }, []);
  //  }, {});
  const result = resultValues.join('\n  ');
  return `{\n  ${result}\n}`;
};

export { genDiff, getFile };
