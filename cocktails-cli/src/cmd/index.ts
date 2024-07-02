#!/usr/bin/env node

import { Command } from "commander";
import { apiKey } from "./api-key";
import { login } from "./login";

const program = new Command();

program
  .name("cocktail")
  .description("CLI of Cocktail Recipe generator")
  .version("0.0.1");

program
  .command("login")
  .description("Authenticate with Google OAuth")
  .action(async () => {
    await login();
  });

program.addCommand(apiKey);

export { program };
