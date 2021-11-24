const getIndentation = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) { return null; }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${getIndentation(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${getIndentation(depth)}  }`,
  ].join('\n');
};

function stylish(data) {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${getIndentation(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'add':
        return getValue(node.val, '+');
      case 'remove':
        return getValue(node.val, '-');
      case 'same':
        return getValue(node.val, ' ');
      case 'updated':
        return `${getValue(node.val1, '-')}${getValue(node.val2, '+')}`;
      case 'recursion':
        return `${getIndentation(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${getIndentation(depth)}  }\n`;
      default:
        throw new Error(`These type is not exists: ${node.type}`);
    }
  });
  return `{\n${iter(data, 1).join('')}}`;
}

export default stylish;
