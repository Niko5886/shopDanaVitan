const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'assets', 'imgDana');
const FILE_PATTERN = /^Cesual(\d+)\.jpg$/i;
const START_INDEX = 10;

async function run() {
  const files = fs
    .readdirSync(srcDir)
    .filter((file) => FILE_PATTERN.test(file) || /^dnbboutique\.png$/i.test(file))
    .sort((a, b) => {
      // Keep Cesual in numeric order, put dnbboutique at the end
      const aIsDnb = /^dnbboutique\.png$/i.test(a);
      const bIsDnb = /^dnbboutique\.png$/i.test(b);
      if (aIsDnb && !bIsDnb) return 1;
      if (bIsDnb && !aIsDnb) return -1;
      const aMatch = a.match(FILE_PATTERN);
      const bMatch = b.match(FILE_PATTERN);
      const aNumber = aMatch ? Number(aMatch[1]) : 0;
      const bNumber = bMatch ? Number(bMatch[1]) : 0;
      return aNumber - bNumber;
    });

  console.log('Found', files.length, 'Cesual image(s)');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(srcDir, file);

    try {
      if (/^dnbboutique\.png$/i.test(file)) {
        // Create background variants for home page
        const outPathBg = path.join(srcDir, `dnbboutique-bg.webp`);
        const outPathThumb = path.join(srcDir, `dnbboutique-bg-thumb.webp`);

        await sharp(inputPath)
          .rotate()
          .resize({ width: 2000, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outPathBg);

        await sharp(inputPath)
          .rotate()
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 70 })
          .toFile(outPathThumb);

        console.log('Processed background', file, '-> dnbboutique-bg.webp');
      } else {
        const idx = String(START_INDEX + i).padStart(2, '0');
        const baseName = `product-${idx}`;
        const outPath = path.join(srcDir, `${baseName}.webp`);
        const thumbPath = path.join(srcDir, `${baseName}-thumb.webp`);

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
      }
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
