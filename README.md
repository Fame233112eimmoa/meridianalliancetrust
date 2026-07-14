# Meridian Alliance Trust UK

This project is a Next.js site for a public-facing marketing website plus a protected client-access area.

## Local Preview

Use these commands during development:

1. `npm run dev`
2. Open `http://localhost:3000`

If you want a production-style preview after making changes, use:

1. `npm run preview`
2. Open `http://localhost:3001`

Before a live deployment, run:

1. `npm run launch-check`
2. `npm run build`

If you want the launch check to fail on missing live-domain configuration, run:

1. `npm run launch-check:strict`

The project now keeps development output and production preview output in separate build directories, so switching between `dev`, `build`, `start`, and `preview` does not corrupt the local preview state.

## Before You Go Live

Set these environment variables in local development and on your hosting platform:

- `NEXT_PUBLIC_SITE_URL=https://meridianalliancetrust.com`
- `GOOGLE_SITE_VERIFICATION=your-search-console-verification-token`
- `PRIVATE_ACCESS_ACCOUNT_NAME=Approved Client Name`
- `PRIVATE_ACCESS_CUSTOMER_NUMBER=MTB-1024`
- `PRIVATE_ACCESS_PASSWORD=change-this-password`
- `PRIVATE_ACCESS_OTP=123456`
- `PRIVATE_ACCESS_SESSION_SECRET=replace-with-a-long-random-secret`

An example is included in `.env.example`.

The protected private-access flow includes built-in prototype defaults so a GitHub-to-Vercel
deployment can still open the login flow even before private-access environment variables are
configured. Any `PRIVATE_ACCESS_*` values you set on the host will override those defaults.

Before any real launch, replace the prototype defaults by setting the private-access environment
variables on the host.

The public SEO configuration is now set to use `https://meridianalliancetrust.com` as the canonical
site domain. Preview deployments still remain `noindex` so temporary Vercel URLs are not indexed by
mistake.

## Hosting

Host this as a live Next.js app on a platform that supports server-side Next.js, such as Vercel or another Node-capable host.

1. Run `npm run build`
2. Start the already-built production server with `npm start`
3. Deploy the full app with the same environment variables configured on the host
4. Make sure your final site loads at `https://meridianalliancetrust.com` over HTTPS

If you upload only static files to a plain HTML host, the protected client area will not work correctly because the login and OTP checks now happen on the server.

## Google Search Console

This project now generates:

- `/robots.txt`
- `/sitemap.xml`

Recommended setup:

1. Add your site in Google Search Console
2. Verify ownership
3. Submit `https://meridianalliancetrust.com/sitemap.xml`

If you use the HTML tag verification method, set `GOOGLE_SITE_VERIFICATION` before building.

If you use Google's HTML file verification method instead, place the exact file Google gives you inside `public/` and rebuild so it is copied to the site root.

## Indexing Behavior

Public pages are included in the sitemap:

- `/`
- `/create-account`
- `/contact`
- `/support`

The protected client-access pages are intentionally outside the public sitemap and use `noindex` metadata:

- `/client-access`
- `/client-access/otp`
- `/client-access/portal`

The protected sign-in and dashboard routes are intentionally excluded from the public sitemap and use `noindex` metadata:

- `/login`
- `/login/otp`
- `/dashboard`
- `/dashboard/*`

This hosted site is now positioned as a public-facing marketing and enquiry website, not a live online banking portal.

## Private Client Access

The site also includes a restricted client flow at `/client-access`.

The approved values can be overridden from environment variables:

- `PRIVATE_ACCESS_ACCOUNT_NAME`
- `PRIVATE_ACCESS_CUSTOMER_NUMBER`
- `PRIVATE_ACCESS_PASSWORD`
- `PRIVATE_ACCESS_OTP`
- `PRIVATE_ACCESS_SESSION_SECRET`

If those variables are absent, the app falls back to the built-in prototype values for local and
Vercel preview use. Change the variables and redeploy whenever you want to rotate access.
