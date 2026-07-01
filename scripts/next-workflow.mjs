import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const mode = process.argv[2];
const passthroughArgs = process.argv.slice(3);
const isVercelEnvironment = Boolean(process.env.VERCEL);

const DIST_DIRS = {
  dev: ".next-dev",
  production: ".next-prod",
};

function getProductionDistDir() {
  return isVercelEnvironment ? undefined : DIST_DIRS.production;
}

function getProductionEnvOverrides() {
  const distDir = getProductionDistDir();

  return distDir ? { NEXT_DIST_DIR: distDir } : {};
}

function hasPortArg(args) {
  return args.some((arg) => arg === "--port" || arg === "-p");
}

function getPreviewArgs(args) {
  if (process.env.PORT || hasPortArg(args)) {
    return args;
  }

  return ["--port", "3001", ...args];
}

function runNext(command, args, envOverrides = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, command, ...args], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        ...envOverrides,
      },
      stdio: "inherit",
    });

    const forwardSignal = (signal) => {
      if (!child.killed) {
        child.kill(signal);
      }
    };

    const signals = ["SIGINT", "SIGTERM", "SIGHUP"];
    for (const signal of signals) {
      process.on(signal, forwardSignal);
    }

    child.on("error", (error) => {
      for (const signal of signals) {
        process.off(signal, forwardSignal);
      }
      reject(error);
    });

    child.on("exit", (code, signal) => {
      for (const signalName of signals) {
        process.off(signalName, forwardSignal);
      }

      if (signal) {
        resolve(1);
        return;
      }

      resolve(code ?? 0);
    });
  });
}

function ensureProductionBuildExists() {
  const distDir = getProductionDistDir() ?? ".next";
  return existsSync(join(process.cwd(), distDir, "BUILD_ID"));
}

async function main() {
  switch (mode) {
    case "dev": {
      process.exitCode = await runNext("dev", passthroughArgs, {
        NEXT_DIST_DIR: DIST_DIRS.dev,
      });
      return;
    }

    case "build": {
      process.exitCode = await runNext("build", passthroughArgs, getProductionEnvOverrides());
      return;
    }

    case "start": {
      if (!ensureProductionBuildExists()) {
        console.error(
          `No production build was found in ${getProductionDistDir() ?? ".next"}. Run "npm run build" or use "npm run preview" to rebuild and launch a fresh preview.`,
        );
        process.exitCode = 1;
        return;
      }

      process.exitCode = await runNext("start", passthroughArgs, getProductionEnvOverrides());
      return;
    }

    case "preview": {
      const buildExitCode = await runNext("build", [], {
        NEXT_DIST_DIR: DIST_DIRS.production,
      });

      if (buildExitCode !== 0) {
        process.exitCode = buildExitCode;
        return;
      }

      process.exitCode = await runNext("start", getPreviewArgs(passthroughArgs), {
        NEXT_DIST_DIR: DIST_DIRS.production,
      });
      return;
    }

    default: {
      console.error(
        'Usage: node scripts/next-workflow.mjs <dev|build|start|preview> [next args...]',
      );
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
