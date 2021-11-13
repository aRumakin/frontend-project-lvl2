#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { genDiff } from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, { format }) => {
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse();
