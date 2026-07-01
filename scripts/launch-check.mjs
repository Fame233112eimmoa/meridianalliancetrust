import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();

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
const warnings = [];
const passes = [];

const siteUrl =
  getEnvValue("NEXT_PUBLIC_SITE_URL", envFiles) || getEnvValue("SITE_URL", envFiles);
const googleVerification =
  getEnvValue("GOOGLE_SITE_VERIFICATION", envFiles) ||
  getEnvValue("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", envFiles);
const privateAccessEmail = getEnvValue("PRIVATE_ACCESS_EMAIL", envFiles);
const privateAccessPassword = getEnvValue("PRIVATE_ACCESS_PASSWORD", envFiles);
const privateAccessOtp = getEnvValue("PRIVATE_ACCESS_OTP", envFiles);
const privateAccessSessionSecret = getEnvValue("PRIVATE_ACCESS_SESSION_SECRET", envFiles);

if (!siteUrl) {
  findings.push("Set NEXT_PUBLIC_SITE_URL to the final public HTTPS domain.");
} else {
  try {
    const parsedSiteUrl = new URL(siteUrl);

    if (parsedSiteUrl.protocol !== "https:") {
      findings.push("NEXT_PUBLIC_SITE_URL must use HTTPS.");
    } else if (isLocalHostname(parsedSiteUrl.hostname)) {
      findings.push("NEXT_PUBLIC_SITE_URL must not point to localhost or another local hostname.");
    } else {
      passes.push(`Public site URL is configured as ${parsedSiteUrl.origin}.`);
    }
  } catch {
    findings.push("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

if (googleVerification || hasGoogleVerificationFile()) {
  passes.push("Google Search Console verification is configured.");
} else {
  findings.push(
    "Add GOOGLE_SITE_VERIFICATION or place the Google verification HTML file in public/.",
  );
}

if (privateAccessEmail) {
  passes.push("Protected access email is configured.");
} else {
  findings.push("Set PRIVATE_ACCESS_EMAIL for the protected login flow.");
}

if (privateAccessPassword) {
  passes.push("Protected access password is configured.");
} else {
  findings.push("Set PRIVATE_ACCESS_PASSWORD for the protected login flow.");
}

if (privateAccessOtp) {
  passes.push("Protected access OTP is configured.");
} else {
  findings.push("Set PRIVATE_ACCESS_OTP for the protected login flow.");
}

if (privateAccessSessionSecret) {
  passes.push("Protected access session secret is configured.");
} else {
  findings.push("Set PRIVATE_ACCESS_SESSION_SECRET for signed private-access cookies.");
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

printList("Passes", passes);
printList("Warnings", warnings);
printList("Required Fixes", findings);

if (findings.length) {
  console.log(`\nStatus: FAILED (${findings.length} required fix${findings.length === 1 ? "" : "es"})`);
  process.exitCode = 1;
} else {
  console.log("\nStatus: PASS");
}
