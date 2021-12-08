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

export default formatter;
