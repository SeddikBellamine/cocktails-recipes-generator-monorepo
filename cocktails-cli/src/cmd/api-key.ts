#!/usr/bin/env node

import axios from "axios";
import { Command } from "commander";
import * as fs from "fs";
import ora from "ora";
import * as path from "path";
import { BACKEND_URL } from "../config/config";
import { login } from "./login";

const AUTH_FILE = path.resolve(__dirname, "../../auth.json");

const getStoredGoogleId = (): string | null | undefined => {
  if (fs.existsSync(AUTH_FILE)) {
    const data = fs.readFileSync(AUTH_FILE, "utf8");
    const { googleId } = JSON.parse(data);
    return googleId;
  }
  return null;
};

export const apiKey = new Command("api-key")
  .description("Generate or manage API keys")
  .option("--generate", "Generate a new API key")
  .option("--permission-addRecipe", "Add permission to add recipes")
  .option("--permission-viewRecipes", "Add permission to view recipes")
  .action(async (cmd) => {
    if (cmd.generate) {
      let googleId = getStoredGoogleId();
      if (!googleId) {
        console.log(
          'You are not authenticated. Please run "cocktail login" first.',
        );
        googleId = await login();
        if (!googleId) {
          console.error("Authentication failed.");
          return;
        }
      }

      const permissions = [];
      if (cmd.permissionAddRecipe) {
        permissions.push("addRecipe");
      }
      if (cmd.permissionViewRecipes) {
        permissions.push("viewRecipes");
      }

      const spinner = ora("Generating API key...").start();

      try {
        const response = await axios.post(`${BACKEND_URL}/api-key/generate`, {
          userId: googleId,
          permissions: permissions,
        });
        spinner.succeed("Generated API Key: " + response.data.apiKey);
      } catch (error) {
        spinner.fail("Error generating API key: " + error);
      }
    }
  });
