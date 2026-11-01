# SVG Diagram for Obsidian

Make diagrams for your notes. Pick one of ten free makers (Venn diagram, Punnett square, T-chart, number line, coordinate plane, scatter plot, dot plot, histogram, pie chart and line graph), edit the content, and add it to the current note. Or describe an idea and let AI draw it, with 10 free AI generations per installation.

Each diagram is saved as a standalone `.svg` file in your attachments folder and embedded at the cursor. Fonts are embedded in the file, so it looks the same in light and dark themes, on other devices, and outside Obsidian.

## Use it

1. Run **SVG Diagram: Create diagram** from the command palette, or select the diagram icon in the ribbon.
2. Choose **Free makers** or **AI generation**.
3. Select **Add to note**. In Reading view, or with no note open, the file is saved without an embed.

## Free makers

Makers run entirely inside Obsidian. They send nothing over the network and have no limits.

## AI generation, network use and privacy

AI generation is optional and off until you tick the consent box each session.

- It sends your prompt and a random installation ID to `https://svgdiagram.ai/rest/v1/obsidian`. Nothing from your vault is read or sent.
- The installation ID is created on first use and stored in this plugin's `data.json`. It only counts your free generations.
- No SVG Diagram account is needed. Each installation gets 10 successful AI generations. Failed generations are not counted.
- The plugin has no payments, ads or telemetry. svgdiagram.ai offers paid plans on its website, but they are not needed for this plugin, and the free makers stay unlimited.
- The service keeps prompts, generated diagrams and the installation ID to deliver the result and enforce the allowance. See the [privacy policy](https://svgdiagram.ai/privacy) and [terms](https://svgdiagram.ai/terms).

## Build from source

Requires [Bun](https://bun.sh). This repository contains the complete plain JavaScript and Vue source, including the shared maker code and font packages.

```sh
bun install --frozen-lockfile --ignore-scripts
bun run build
```

The build writes `main.js` and `styles.css` next to `manifest.json`.

## License

GPL-2.0-or-later. Vue is MIT and the bundled fonts use the SIL Open Font License; see `LICENSES/`.

Support: support@svgdiagram.ai · Made by Tony Zedginidze · https://svgdiagram.ai
