#!/usr/bin/env node

import yargs from "yargs";

import { cmdDefault } from "./commands/default";
import { cmdGenerate } from "./commands/generate";

yargs(process.argv.slice(2))
	.scriptName("xeho91")
	.alias("h", "help")
	.alias("v", "version")
	.command(cmdDefault)
	.command(cmdGenerate)
	.parse();
