import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect } from '@jest/globals';
import yaml from 'js-yaml';
import { genDiff, getFile } from '../src/index.js';

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
  const expectDiff = genDiff(jsonParser('file1.json'), jsonParser('file2.json'));
  expect(expectDiff).toEqual(readFile('file1-2diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});

test('Checking the result with YAML', () => {
  const expectDiff = genDiff(yamlLoader('file3.yaml'), yamlLoader('file4.yaml'));
  expect(expectDiff).toEqual(readFile('file3-4diff.txt'));
  expect(typeof expectDiff).toEqual('string');
});
