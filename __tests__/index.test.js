import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import formatter from '../src/formatters/index.js';

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

test('Checking the result with JSON', () => {
  const expectDiff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expectDiff).toEqual(readFile('../__fixtures__/file_diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result with YAML', () => {
  const expectDiff = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yaml'));
  expect(expectDiff).toEqual(readFile('../__fixtures__/file_diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result plain format', () => {
  const expectDiff = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yaml'), 'plain');
  expect(expectDiff).toEqual(readFile('../__fixtures__/file_diff_plain.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result JSON format', () => {
  const expectDiff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(expectDiff).toEqual(readFile('../__fixtures__/file_diff_stringify.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the wrong plain format', () => {
  expect(() => formatter(null, 'forward')).toThrow(Error);
});

test('Checking not supported files', () => {
  expect(() => parseFile(null, 'txt')).toThrow(Error);
});
