const getIndentation = (depth, space = 4) => ' '.repeat(depth + space);

const stringify = (someEntity, spaceCount) => {
  const iter = (current, depth) => {
    if (typeof current !== 'object') {
      return `${current}`;
    }
    if (current === '') { return ''; }
    if (current === null) { return null; }
    const lines = Object
      .entries(current)
      .map(([key, value]) => `${getIndentation(depth + 4)}${key}: ${iter(value, depth + 4)}`);
    return [
      '{',
      ...lines,
      `${getIndentation(depth)}}`,
    ].join('\n');
  };

  return iter(someEntity, spaceCount);
};

function stylish(data) {
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.type) {
      case 'add':
        return `${getIndentation(depth - 2)}+ ${node.key}: ${stringify(node.val, depth)}\n`;
      case 'remove':
        return `${getIndentation(depth - 2)}- ${node.key}: ${stringify(node.val, depth)}\n`;
      case 'same':
        return `${getIndentation(depth - 2)}  ${node.key}: ${stringify(node.val, depth)}\n`;
      case 'updated':
        return `${getIndentation(depth - 2)}- ${node.key}: ${stringify(node.val1, depth)}\n${getIndentation(depth - 2)}+ ${node.key}: ${stringify(node.val2, depth)}\n`;
      case 'recursion':
        return `${getIndentation(depth)}${node.key}: {\n${iter(node.children, depth + 4).join('')}${getIndentation(depth)}}\n`;
      default:
        throw new Error(`These type is not exists: ${node.type}`);
    }
  });
  return `{\n${iter(data, 0).join('')}}`;
}

export default stylish;
