const exifr = require("exifr");

const extractImageMeta = async (fileBuffer) => {
      try {
            
            const exif = await exifr.parse(fileBuffer, {
                  gps: true,
                  tiff: true,
                  ifd0: true,
                  exif: true
            });
            return exif;

      } catch (error) {
            console.error(error);
            return null;
      }
}

module.exports = { extractImageMeta };