import { dirname, resolve } from 'node:path';
import { cp, mkdir } from 'node:fs/promises';
import { bundleApp } from './bundle-app.js';
const base = resolve(import.meta.dirname, '..');
const vue = dirname(Bun.resolveSync('vue/package.json', base));
export async function packageObsidian({ outputDirectory = base, aliases = { vue, '@svgdiagram/diagram/web': resolve(base, 'shared/diagram/web.js') } } = {}) {
  await mkdir(outputDirectory, { recursive: true });
  await bundleApp({ entry: resolve(base, 'src/main.js'), outputDirectory, aliases, globalName: 'SVGDiagramObsidian', translations: {}, format: 'cjs', external: ['obsidian'], scriptFile: 'main.js', cssFile: 'styles.css' });
  if (resolve(outputDirectory) !== base) await cp(resolve(base, 'manifest.json'), resolve(outputDirectory, 'manifest.json'));
}
if (import.meta.main) await packageObsidian();
