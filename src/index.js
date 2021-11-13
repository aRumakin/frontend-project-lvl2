import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');
// const getFormat = (filename) => path.extname(filename).slice(1);
const getKeys = (filename) => Object.keys(filename);

const genDiff = (filepath1, filepath2) => {
  // const file1Format = getFormat(filepath1);
  // const file2Format = getFormat(filepath2);
  const file1 = JSON.parse(getFile(filepath1));
  const file2 = JSON.parse(getFile(filepath2));

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
      // acc[`- ${key}`] = value1;
      // acc[`+ ${key}`] = value2;
      return acc;
    }
    if (_.has(file2, key) && !_.has(file1, key)) {
      acc.push(`+ ${key}: ${value2}`);
      // acc[`+ ${key}`] = value2;
      return acc;
    }
    if (!_.has(file2, key)) {
      acc.push(`- ${key}: ${value1}`);
      // acc[`- ${key}`] = value1;
      return acc;
    }
    if (_.has(file1, key) && _.has(file2, key) && _.isEqual(value1, value2)) {
      acc.push(`  ${key}: ${value1}`);
      // acc[`  ${key}`] = value1;
      return acc;
    }
    return acc;
  }, []);
  //  }, {});
  const result = resultValues.join('\n  ');
  return `{\n  ${result}\n}`;
};

export { genDiff };
