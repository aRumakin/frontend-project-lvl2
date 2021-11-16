import path from 'path';
import yaml from 'js-yaml';

const getFormat = (filename) => path.extname(filename);

const parseFile = (file, filepath) => {
  const format = getFormat(filepath);
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(file);
  }
  return 'File is not supported.';
};

export default parseFile;
