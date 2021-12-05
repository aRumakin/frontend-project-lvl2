import yaml from 'js-yaml';
import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (tree, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Format ${formatterName} is not supported.`);
  }
};

const parseFile = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(file);
  }
  return `Format ${format} is not supported.`;
};

export { formatter, parseFile };
