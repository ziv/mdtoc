#!/usr/bin/env node
import {readFileSync} from 'fs';
import {program} from 'commander';
import * as getStdin from 'get-stdin';
import {mtdoc} from './mtdoc';

const main = async (start: number, depth: number, path?: string) => {
    const content = (undefined !== path) ? readFileSync(path).toString() : await getStdin();
    console.log(mtdoc(content, {start, depth}));
}

program.version('0.0.1')
    .option('-d, --depth <depth>', 'depth of content, default 4', parseInt, 4)
    .option('-s, --start <satrt>', 'starting header, default 2', parseInt,2)
    .parse(process.argv);


main(program.start, program.depth, program.args[0] || undefined).catch(console.log);
