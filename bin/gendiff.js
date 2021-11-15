#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { genDiff, getFile } from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = getFile(filepath1);
    const file2 = getFile(filepath2);
    console.log(genDiff(file1, file2));
  });

program.parse();
