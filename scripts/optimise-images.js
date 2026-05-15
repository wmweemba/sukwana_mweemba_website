import sharp from 'sharp';
import { readFileSync, statSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';

const IMAGES_DIR = new URL('../assets/images/', import.meta.url).pathname;

// *1 images: primary card — max 600×700, quality 82
// *2 and *3 images: modal gallery — max 800×600, quality 80
function getConfig(filename) {
  const base = basename(filename, extname(filename));
  if (base.endsWith('1')) {
    return { width: 600, height: 700, quality: 82, limitKB: 150 };
  }
  return { width: 800, height: 600, quality: 80, limitKB: 100 };
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + 'KB';
}

const sources = readdirSync(IMAGES_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (sources.length === 0) {
  console.log('No source images found in', IMAGES_DIR);
  process.exit(0);
}

console.log(`Processing ${sources.length} images...\n`);

let allPassed = true;

for (const file of sources) {
  const inputPath = join(IMAGES_DIR, file);
  const base = basename(file, extname(file));
  const outputPath = join(IMAGES_DIR, `${base}.webp`);
  const { width, height, quality, limitKB } = getConfig(file);

  const inputSize = statSync(inputPath).size;

  await sharp(inputPath)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  const outputSize = statSync(outputPath).size;
  const savings = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);
  const outputKB = outputSize / 1024;
  const status = outputKB <= limitKB ? '✓' : `⚠ OVER ${limitKB}KB limit`;

  console.log(`${file} → ${base}.webp`);
  console.log(`  ${formatKB(inputSize)} → ${formatKB(outputSize)}  (${savings}% savings)  ${status}`);

  if (outputKB > limitKB) allPassed = false;
}

console.log('\nDone.');
if (!allPassed) {
  console.log('⚠ One or more files exceeded their size target — lower quality or crop tighter.');
}
