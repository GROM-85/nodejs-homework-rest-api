const Jimp = require('jimp');

async function resizeAndUpload(imgPath,newImgPath) {
  // Read the image.
  const image = await Jimp.read(imgPath);
  // Resize the image to width 250 and heigth 250.
  await image.resize(250, 250);
  // Save and overwrite the image
  await image.writeAsync(newImgPath);

}

module.exports = resizeAndUpload;