const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'assets', 'imgDana');
const FILE_PATTERN = /^Cesual(\d+)\.jpg$/i;
const START_INDEX = 10;

async function run() {
  const files = fs
    .readdirSync(srcDir)
    .filter((file) => FILE_PATTERN.test(file))
    .sort((a, b) => {
      const aMatch = a.match(FILE_PATTERN);
      const bMatch = b.match(FILE_PATTERN);
      const aNumber = aMatch ? Number(aMatch[1]) : 0;
      const bNumber = bMatch ? Number(bMatch[1]) : 0;
      return aNumber - bNumber;
    });

  console.log('Found', files.length, 'Cesual image(s)');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const idx = String(START_INDEX + i).padStart(2, '0');
    const baseName = `product-${idx}`;
    const inputPath = path.join(srcDir, file);
    const outPath = path.join(srcDir, `${baseName}.webp`);
    const thumbPath = path.join(srcDir, `${baseName}-thumb.webp`);

    try {
      // full size ~1200px width
      await sharp(inputPath)
        .rotate()
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);

      // thumbnail ~400px width
      await sharp(inputPath)
        .rotate()
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(thumbPath);

      console.log('Processed', file, '->', `${baseName}.webp`);
    } catch (err) {
      console.error('Error processing', file, err.message);
    }
  }

  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
