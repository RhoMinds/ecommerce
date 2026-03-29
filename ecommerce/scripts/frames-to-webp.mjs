import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const root = process.cwd();
const framesDir = path.join(root, 'public', 'experience', 'frames');

const isPng = (name) => name.toLowerCase().endsWith('.png');
const isEzgifFrame = (name) => /^ezgif-frame-\d{3}\.png$/i.test(name);

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const toWebpPath = (pngPath) => pngPath.replace(/\.png$/i, '.webp');

const main = async () => {
  if (!(await exists(framesDir))) {
    console.error(`Frames folder not found: ${framesDir}`);
    process.exit(1);
  }

  const entries = await fs.readdir(framesDir);
  const pngs = entries.filter((name) => isPng(name) && isEzgifFrame(name)).sort();

  if (pngs.length === 0) {
    console.error(`No matching frames found in: ${framesDir}`);
    console.error(`Expected files like: ezgif-frame-001.png`);
    process.exit(1);
  }

  const concurrency = Math.max(1, Math.min(6, Number(process.env.FRAMES_CONCURRENCY || 4)));
  let index = 0;
  let converted = 0;
  let skipped = 0;

  const worker = async () => {
    while (true) {
      const i = index;
      index += 1;
      if (i >= pngs.length) return;

      const fileName = pngs[i];
      const inputPath = path.join(framesDir, fileName);
      const outputPath = toWebpPath(inputPath);

      const inputStat = await fs.stat(inputPath);
      const outputExists = await exists(outputPath);
      if (outputExists) {
        const outputStat = await fs.stat(outputPath);
        if (outputStat.mtimeMs >= inputStat.mtimeMs) {
          skipped += 1;
          continue;
        }
      }

      await sharp(inputPath, { sequentialRead: true })
        .webp({ lossless: true, effort: 6 })
        .toFile(outputPath);
      converted += 1;
    }
  };

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`Frames: ${pngs.length}`);
  console.log(`Converted: ${converted}`);
  console.log(`Skipped (up-to-date): ${skipped}`);
  console.log(`Output: ${path.relative(root, framesDir)}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

