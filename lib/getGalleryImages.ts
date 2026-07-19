import fs from "fs";
import path from "path";

const GALLERY_DIR = path.join(process.cwd(), "public/images/galery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function getGalleryImages(): string[] {
  if (!fs.existsSync(GALLERY_DIR)) {
    return [];
  }

  return fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ru", { numeric: true }))
    .map((file) => `/images/galery/${file}`);
}
