import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    let result = { type: 'same', key, val: value1 };
    if (!_.has(file1, key)) {
      result = { type: 'add', key, val: value2 };
    } else if (!_.has(file2, key)) {
      result = { type: 'remove', key, val: value1 };
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      result = { type: 'recursion', key, children: buildTree(value1, value2) };
    } else if (!_.isEqual(value1, value2)) {
      result = {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }
    return result;
  });
};

export default buildTree;
