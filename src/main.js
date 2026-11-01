import { MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { createApp } from 'vue';
import App from './App.vue';
import { service } from './service.js';
import { insertDiagram } from './insert.js';
import './style.css';

class DiagramModal extends Modal {
  constructor(plugin, target) {
    super(plugin.app);
    this.plugin = plugin;
    this.target = target;
  }
  onOpen() {
    this.modalEl.addClass('svgdiagram-modal');
    this.setTitle('SVG Diagram');
    this.vue = createApp(App, {
      target: this.target?.view ? `Embeds in ${this.target.file.basename}` : 'Saves an SVG file to your attachments folder',
      service: async (path, body) => service(await this.plugin.installationId(), path, body),
      insert: async diagram => {
        const result = await insertDiagram(this.app, this.target, diagram);
        new Notice(result.embedded ? `Added ${result.file.name}` : `Saved ${result.file.path}`);
        this.close();
      }
    });
    this.vue.mount(this.contentEl);
  }
  onClose() {
    this.vue?.unmount();
    this.contentEl.empty();
  }
}

export default class SvgDiagramPlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('workflow', 'Create diagram', () => this.openModal());
    this.addCommand({ id: 'create-diagram', name: 'Create diagram', callback: () => this.openModal() });
  }
  openModal() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    new DiagramModal(this, view?.file ? { view, file: view.file } : null).open();
  }
  async installationId() {
    const data = (await this.loadData()) ?? {};
    if (!data.installationId) {
      data.installationId = crypto.randomUUID();
      await this.saveData(data);
    }
    return data.installationId;
  }
}
