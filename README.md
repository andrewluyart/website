# Andrew Luy Portfolio

Vercel-ready Next.js portfolio for Andrew Luy, sculptor and public artist.

## Edit content with TinaCMS

The site content is stored in `content/site.json` and managed through TinaCMS.

1. Copy `.env.example` to `.env.local`.
2. Add the Tina Cloud read-only token as `TINA_TOKEN`.
3. Run `npm run dev` and open `http://localhost:3000/admin`.

The editor manages Projects, News + Press, Biography, gallery images, the featured film, contact information, and homepage settings.

## Deploy

1. Create a new GitHub repository and upload the contents of this folder.
2. In Vercel, select **Add New > Project** and import that repository.
3. Leave Framework Preset set to **Next.js** and click **Deploy**.
4. In Vercel, add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` for Production, Preview, and Development.
5. After the preview is verified, add `andrewluy.com` under **Settings > Domains**.

`NEXT_PUBLIC_TINA_CLIENT_ID` is public configuration. `TINA_TOKEN` is secret and must never be committed to GitHub.
