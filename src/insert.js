import { MarkdownView, normalizePath } from 'obsidian';
export function diagramFileName(name) {
  const slug = name.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  return `${slug || 'diagram'}.svg`;
}
export async function insertDiagram(app, target, { svg, name }) {
  const sourcePath = target?.file?.path ?? '';
  const path = normalizePath(await app.fileManager.getAvailablePathForAttachment(diagramFileName(name), sourcePath));
  const file = await app.vault.create(path, svg);
  const view = target?.view;
  if (!(view instanceof MarkdownView) || !view.file || view.getMode() !== 'source') return { file, embedded: false };
  view.editor.replaceSelection(`!${app.fileManager.generateMarkdownLink(file, view.file.path)}\n`);
  return { file, embedded: true };
}
