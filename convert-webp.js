// convert-webp.js (ES module)
import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Necesario para simular __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function convertirImagenes() {
  const archivos = await fs.readdir(publicDir);

  for (const archivo of archivos) {
    const ext = path.extname(archivo).toLowerCase();
    const nombreBase = path.basename(archivo, ext);

    if (['.png', '.webp', '.jpeg','.svg'].includes(ext)) {
      const originalPath = path.join(publicDir, archivo);
      const webpPath = path.join(publicDir, `${nombreBase}.webp`);

      if (!await fs.pathExists(webpPath)) {
        try {
          await sharp(originalPath)
            .webp({ quality: 90 })
            .toFile(webpPath);

          console.log(`✅ ${archivo} convertido a WebP`);
        } catch (err) {
          console.error(`❌ Error al convertir ${archivo}:`, err);
        }
      }
    }
  }
}

convertirImagenes();
