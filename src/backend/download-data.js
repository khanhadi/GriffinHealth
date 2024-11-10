const https = require('https');
const fs = require('fs');
const path = require('path');

const fileUrl =
  'https://drive.google.com/file/d/1dXdzIj9teJvouDDROUddlSkypzJx7n1q/view?usp=sharing';
const destinationPath = path.resolve(
  __dirname,
  'apple_health_export_2024-11-10.csv'
);

const downloadFile = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  });
};

// Download only if the file doesn’t already exist
if (!fs.existsSync(destinationPath)) {
  downloadFile(fileUrl, destinationPath, () => {
    console.log('File downloaded');
  });
}
