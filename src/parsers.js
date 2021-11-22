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
  return `Format ${format} is not supported.`;
};

export default parseFile;
