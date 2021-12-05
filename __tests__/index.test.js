import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';
import { parseFile } from '../src/formatters/index.js';

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
  const expectDiff = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'));
  expect(expectDiff).toEqual(readFile('../__fixtures__/file_diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result with YAML', () => {
  const expectDiff = genDiff(getFixturePath('file7.yaml'), getFixturePath('file8.yaml'));
  expect(expectDiff).toEqual(readFile('file_diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result plain format', () => {
  const expectDiff = genDiff(getFixturePath('file7.yaml'), getFixturePath('file8.yaml'), 'plain');
  expect(expectDiff).toEqual(readFile('file_diff_plain.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result JSON format', () => {
  const expectDiff = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'), 'json');
  expect(expectDiff).toEqual(readFile('file_diff_stringify.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the wrong plain format', () => {
  const expectDiff = genDiff(getFixturePath('file7.yaml'), getFixturePath('file8.yaml'), 'forward');
  expect(expectDiff).toEqual('Format forward is not supported.');
});

test('Checking not supported files', () => {
  const answer = parseFile('file1-2diff.txt', 'txt');
  expect(answer).toBe('Format txt is not supported.');
});
