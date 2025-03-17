#!/usr/bin/env node

import create from "@xz-cli/create";
import { Command } from "commander";
import fse from "fs-extra";
import path from "node:path";

const pkgJson = fse.readJSONSync(
  path.join(import.meta.dirname, "../package.json")
);

const program = new Command();

program
  .name("xz-cli")
  .description("xz-cli 是一个用于创建项目的脚手架工具")
  .version(pkgJson.version);

program
  .command("create")
  .description("创建新项目")
  .action(async () => {
    await create();
  });

program.parse();
