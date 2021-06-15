#!/usr/bin/env node

import yargs from "yargs";
import { cmdDefault } from "$cli/commands/default";
import { cmdGenerate } from "$cli/commands/generate";

export const cmdMain = yargs
	.scriptName("xeho91")
	.alias("h", "help")
	.alias("v", "version")
	.command(cmdDefault)
	// .command(cmdExport)
	.command(cmdGenerate);

cmdMain.parse();
