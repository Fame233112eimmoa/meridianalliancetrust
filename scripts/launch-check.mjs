import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const isStrictMode =
  process.argv.includes("--strict") ||
  process.env.CI === "true" ||
  process.env.VERCEL === "1" ||
  process.env.VERCEL === "true";

function parseEnvFile(path) {
  if (!existsSync(path)) {
    return {};
  }

  const content = readFileSync(path, "utf8");
  const result = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function getEnvValue(key, envFiles) {
  const runtimeValue = process.env[key]?.trim();

  if (runtimeValue) {
    return runtimeValue;
  }

  for (const envFile of envFiles) {
    const value = envFile[key]?.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function isLocalHostname(hostname) {
  const lower = hostname.toLowerCase();

  return (
    lower === "localhost" ||
    lower === "127.0.0.1" ||
    lower === "0.0.0.0" ||
    lower.endsWith(".local")
  );
}

function hasGoogleVerificationFile() {
  const publicDir = join(projectRoot, "public");

  if (!existsSync(publicDir)) {
    return false;
  }

  return readdirSync(publicDir).some((entry) => /^google[a-z0-9]+\.html$/i.test(entry));
}

function checkFile(path) {
  return existsSync(join(projectRoot, path));
}

function printList(title, items) {
  if (!items.length) {
    return;
  }

  console.log(`\n${title}`);

  for (const item of items) {
    console.log(`- ${item}`);
  }
}

const envFiles = [
  parseEnvFile(join(projectRoot, ".env.local")),
  parseEnvFile(join(projectRoot, ".env")),
];

const findings = [];
const deploymentFindings = [];
const warnings = [];
const passes = [];

const siteUrl =
  getEnvValue("NEXT_PUBLIC_SITE_URL", envFiles) || getEnvValue("SITE_URL", envFiles);
const googleVerification =
  getEnvValue("GOOGLE_SITE_VERIFICATION", envFiles) ||
  getEnvValue("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", envFiles);
const privateAccessCustomerNumber = getEnvValue("PRIVATE_ACCESS_CUSTOMER_NUMBER", envFiles);
const privateAccessPassword = getEnvValue("PRIVATE_ACCESS_PASSWORD", envFiles);
const privateAccessOtp = getEnvValue("PRIVATE_ACCESS_OTP", envFiles);
const privateAccessSessionSecret = getEnvValue("PRIVATE_ACCESS_SESSION_SECRET", envFiles);

if (!siteUrl) {
  deploymentFindings.push("Set NEXT_PUBLIC_SITE_URL to the final public HTTPS domain.");
} else {
  try {
    const parsedSiteUrl = new URL(siteUrl);

    if (parsedSiteUrl.protocol !== "https:") {
      deploymentFindings.push("NEXT_PUBLIC_SITE_URL must use HTTPS.");
    } else if (isLocalHostname(parsedSiteUrl.hostname)) {
      deploymentFindings.push(
        "NEXT_PUBLIC_SITE_URL must not point to localhost or another local hostname.",
      );
    } else {
      passes.push(`Public site URL is configured as ${parsedSiteUrl.origin}.`);
    }
  } catch {
    deploymentFindings.push("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

if (googleVerification || hasGoogleVerificationFile()) {
  passes.push("Google Search Console verification is configured.");
} else {
  warnings.push(
    "Add GOOGLE_SITE_VERIFICATION or place the Google verification HTML file in public/.",
  );
}

if (privateAccessCustomerNumber) {
  passes.push("Protected access customer number override is configured.");
} else {
  warnings.push(
    "PRIVATE_ACCESS_CUSTOMER_NUMBER is not set; the deployed app will use the built-in prototype customer number.",
  );
}

if (privateAccessPassword) {
  passes.push("Protected access password override is configured.");
} else {
  warnings.push(
    "PRIVATE_ACCESS_PASSWORD is not set; the deployed app will use the built-in prototype password.",
  );
}

if (privateAccessOtp) {
  passes.push("Protected access OTP override is configured.");
} else {
  warnings.push(
    "PRIVATE_ACCESS_OTP is not set; the deployed app will use the built-in prototype OTP.",
  );
}

if (privateAccessSessionSecret) {
  passes.push("Protected access session secret override is configured.");
} else {
  warnings.push(
    "PRIVATE_ACCESS_SESSION_SECRET is not set; the deployed app will use the built-in prototype cookie secret.",
  );
}

const requiredFiles = [
  "app/icon.png",
  "app/apple-icon.png",
  "app/manifest.ts",
  "app/robots.ts",
  "app/sitemap.ts",
  "public/images/meridian-home-hero.jpg",
  "public/images/meridian-logo-monogram.jpg",
];

for (const file of requiredFiles) {
  if (checkFile(file)) {
    passes.push(`Required asset exists: ${file}`);
  } else {
    findings.push(`Missing required asset or route file: ${file}`);
  }
}

if (!checkFile(".env.example")) {
  warnings.push("The .env.example file is missing.");
} else {
  passes.push("Environment example file exists.");
}

if (!checkFile("README.md")) {
  warnings.push("README.md is missing.");
} else {
  passes.push("Deployment notes are present in README.md.");
}

console.log("Launch Readiness Check");
console.log(`Mode: ${isStrictMode ? "strict" : "local"}`);

printList("Passes", passes);
printList("Remaining Live Setup", deploymentFindings);
printList("Warnings", warnings);
printList("Required Fixes", findings);

const blockingFindings = findings.length + (isStrictMode ? deploymentFindings.length : 0);

if (blockingFindings) {
  console.log(
    `\nStatus: FAILED (${blockingFindings} required fix${blockingFindings === 1 ? "" : "es"})`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `\nStatus: PASS${deploymentFindings.length ? " (live domain still needs to be set before launch)" : ""}`,
  );
}
