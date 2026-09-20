import { defineConfig } from 'astro/config';

// Configured for GitHub Pages deployment.
// Replace "cork-site" with your actual repo name, or remove `base` entirely
// if you deploy to a custom domain / user.github.io root site.
export default defineConfig({
  site: 'https://your-org.github.io',
  base: '/cork-site',
});
