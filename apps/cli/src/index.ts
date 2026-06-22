#!/usr/bin/env -S npx tsx
import { Command } from "commander";
import { PIPELINE_STEPS } from "@contentmonster/core/types";

const program = new Command();

program
  .name("contentmonster")
  .description("ContentMonster content-generation CLI (ad-creative + book pipelines)")
  .version("0.1.0.0");

program
  .command("steps")
  .description("List the ad-creative pipeline steps")
  .action(() => {
    PIPELINE_STEPS.forEach((step, i) => console.log(`${i}. ${step}`));
  });

program
  .command("download-assets")
  .description("Sync a client's assets from Google Drive into clients/<id>/assets/")
  .option("-c, --client <id>", "client tenant id", "jaca")
  .action((opts) => {
    console.log(`[download-assets] client=${opts.client} — not implemented yet`);
  });

program
  .command("generate-scene")
  .description("Generate a scene background via the AI pipeline (Nano Banana / Gemini)")
  .option("-c, --client <id>", "client tenant id", "jaca")
  .option("-s, --scene <id>", "scene template id")
  .action((opts) => {
    console.log(
      `[generate-scene] client=${opts.client} scene=${opts.scene ?? "(none)"} — not implemented yet`,
    );
  });

program.parse();
