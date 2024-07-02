#!/usr/bin/env node

import axios from "axios";
import * as fs from "fs";
import open from "open";
import ora from "ora";
import * as path from "path";
import * as readline from "readline";
import { v4 as uuidv4 } from "uuid";
import { BACKEND_URL } from "../config/config";

const AUTH_FILE = path.resolve(__dirname, "../../auth.json");

export async function login(): Promise<string | null | undefined> {
  const sessionId = uuidv4();
  const authorizationUrl = `${BACKEND_URL}/auth/google?sessionId=${sessionId}`;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
  };

  const answer = await question(`Open browser for authorization? (yes/no): `);
  rl.close();

  if (answer.toLowerCase() !== "yes") {
    console.log("Authorization aborted.");
    return;
  }

  console.log(`Opening browser to: ${authorizationUrl}`);
  open(authorizationUrl);

  console.log("Waiting for Authorization...");
  const spinner = ora("Waiting for Google ID...").start();

  const checkForGoogleId = async (): Promise<string | undefined | null> => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/auth/user-by-session?sessionId=${sessionId}`,
      );
      if (response.data.googleId) {
        spinner.succeed(
          "Authenticated with Google ID: " + response.data.googleId,
        );
        return response.data.googleId;
      }
    } catch (error) {
      console.error("Error fetching Google ID:", error);
    }
    return undefined;
  };

  let googleId;
  while (!googleId) {
    googleId = await checkForGoogleId();
    if (!googleId) {
      await new Promise((resolve) => setTimeout(resolve, 7000));
    }
  }

  if (googleId) {
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ googleId }));
    console.log("Authentication successful , you are logged in.");
  } else {
    spinner.fail("Authentication failed.");
  }

  return googleId;
}
