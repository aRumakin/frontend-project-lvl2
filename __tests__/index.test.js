import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect } from '@jest/globals';
import { genDiff, getFile } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Checking type of result', () => {
  const result1 = JSON.parse(readFile('file1.json'));
  const result2 = JSON.parse(readFile('file2.json'));
  expect(typeof result1).toEqual('object');
  expect(typeof result2).toEqual('object');
});

test('Checking getFile', () => {
  expect(typeof getFile(getFixturePath('file1.json'))).toEqual(typeof readFile('file1.json'));
  expect(typeof getFile(getFixturePath('file1.json'))).toEqual(typeof readFile('file2.json'));
});

test('Checking the result', () => {
  const expectDiff = genDiff(readFile('file1.json'), readFile('file2.json'));
  expect(expectDiff).toEqual(readFile('file1-2diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});
