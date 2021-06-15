#!/usr/bin/env node

import yargs from "yargs";

export const cmdMain = yargs
	.scriptName("xeho91")
	.alias("h", "help")
	.alias("v", "version")
	.command(cmdDefault)
	// .command(cmdExport)

cmdMain.parse();
