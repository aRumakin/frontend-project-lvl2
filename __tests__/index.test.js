import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import yaml from 'js-yaml';
import { genDiff, getFile } from '../src/index.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const jsonParser = (file) => JSON.parse(readFile(file));
const yamlLoader = (file) => yaml.load(readFile(file));

test('Checking type of result', () => {
  const result1 = JSON.parse(readFile('file1.json'));
  const result2 = JSON.parse(readFile('file2.json'));
  expect(typeof result1).toEqual('object');
  expect(typeof result2).toEqual('object');
});

test('Checking getFile with JSON', () => {
  expect(typeof getFile(getFixturePath('file1.json'))).toEqual(typeof jsonParser('file1.json'));
  expect(typeof getFile(getFixturePath('file2.json'))).toEqual(typeof jsonParser('file2.json'));
});

test('Checking getFile with YAML', () => {
  expect(typeof getFile(getFixturePath('file3.yaml'))).toEqual(typeof yamlLoader('file3.yaml'));
  expect(typeof getFile(getFixturePath('file4.yaml'))).toEqual(typeof yamlLoader('file4.yaml'));
});

test('Checking the result with JSON', () => {
  const expectDiff = genDiff(jsonParser('file5.json'), jsonParser('file6.json'));
  expect(expectDiff).toEqual(readFile('file_diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result with YAML', () => {
  const expectDiff = genDiff(yamlLoader('file7.yaml'), yamlLoader('file8.yaml'));
  expect(expectDiff).toEqual(readFile('file_diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result plain format', () => {
  const expectDiff = genDiff(yamlLoader('file7.yaml'), yamlLoader('file8.yaml'), 'plain');
  expect(expectDiff).toEqual(readFile('file_diff_plain.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result JSON format', () => {
  const expectDiff = genDiff(jsonParser('file5.json'), jsonParser('file6.json'), 'json');
  expect(expectDiff).toEqual(readFile('file_diff_stringify.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the wrong plain format', () => {
  const expectDiff = genDiff(yamlLoader('file7.yaml'), yamlLoader('file8.yaml'), 'forward');
  expect(expectDiff).toBe('Format forward is not supported.');
});

test('Checking not supported files', () => {
  const answer = parseFile('file1-2diff.txt', getFixturePath('file1-2diff.txt'));
  expect(answer).toBe('Format .txt is not supported.');
});
