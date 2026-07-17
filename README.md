# Sandra Elias — Personal Site

A single-page personal site built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Deploying

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

Drag-and-drop the `dist/` folder onto Netlify, or connect the repo and let it run the build command above.

### Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Import the repo at vercel.com/new — these settings are detected automatically.

### GitHub Pages

1. Set `base` in `vite.config.js` to your repo name:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: "/your-repo-name/",
   });
   ```

2. Build the site: `npm run build`
3. Deploy the `dist/` folder to the `gh-pages` branch, e.g. with the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package:

   ```bash
   npm install -D gh-pages
   npx gh-pages -d dist
   ```

4. In the repo settings, set GitHub Pages to serve from the `gh-pages` branch.
