import { resolve } from 'node:path';
import { cp, mkdir } from 'node:fs/promises';
import { bundleApp } from './bundle-app.js';
export async function packageObsidian({ outputDirectory = resolve(import.meta.dirname, '../dist'), aliases = { '@svgdiagram/diagram/web': resolve(import.meta.dirname, '../shared/diagram/web.js') } } = {}) {
  await mkdir(outputDirectory, { recursive: true });
  await bundleApp({ entry: resolve(import.meta.dirname, '../src/main.js'), outputDirectory, aliases, globalName: 'SVGDiagramObsidian', translations: {}, format: 'cjs', external: ['obsidian'], scriptFile: 'main.js', cssFile: 'styles.css' });
  await cp(resolve(import.meta.dirname, '../manifest.json'), resolve(outputDirectory, 'manifest.json'));
}
if (import.meta.main) await packageObsidian();
