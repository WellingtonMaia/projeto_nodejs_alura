const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, callbackAddedImage) => 
{
  const acceptExtension = ['jpg', 'jpeg', 'png'];
  const extension = path.extname(filePath);
  const extensionIsValid = acceptExtension.indexOf(extension.substring(1)) !== -1;


  if (extensionIsValid) {
    const newPath = `./assets/images/${fileName}${extension}`;
  
    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callbackAddedImage(false, newPath));
  } else {
    const error = "Tipo é inválido"
    callbackAddedImage(error);
  }
}
