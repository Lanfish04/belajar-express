const express = require('express');
const multer = require('multer');
const blake2 = require('blake2');
const blake3 = require('blake3');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer untuk menyimpan file sementara
const upload = multer({ dest: 'uploads/' });

// Middleware untuk melayani file statis (HTML, CSS, JS)
app.use(express.static('public'));

// Fungsi untuk membaca file dan menghasilkan hash Blake2 atau Blake3
function generateHash(filePath, algorithm) {
  const fileBuffer = fs.readFileSync(filePath);
  let hash;
  
  if (algorithm === 'blake2') {
    hash = blake2.createHash('blake2b').update(fileBuffer).digest('hex');
  } else if (algorithm === 'blake3') {
    hash = blake3.hash(fileBuffer).toString('hex');
  }

  return hash;
}

// Route untuk mengunggah dan membandingkan file
app.post('/compare', upload.array('documents', 2), (req, res) => {
  if (!req.files || req.files.length !== 2) {
    return res.status(400).send('Please upload exactly two files for comparison.');
  }

  const file1 = req.files[0];
  const file2 = req.files[1];

  // Menghasilkan hash untuk kedua file menggunakan Blake2
  const hash1Blake2 = generateHash(file1.path, 'blake2');
  const hash2Blake2 = generateHash(file2.path, 'blake2');

  // Menghasilkan hash untuk kedua file menggunakan Blake3
  const hash1Blake3 = generateHash(file1.path, 'blake3');
  const hash2Blake3 = generateHash(file2.path, 'blake3');

  // Membandingkan hash untuk Blake2 dan Blake3
  const areHashesEqualBlake2 = hash1Blake2 === hash2Blake2;
  const areHashesEqualBlake3 = hash1Blake3 === hash2Blake3;

  // Menghapus file yang diunggah setelah proses selesai
  fs.unlinkSync(file1.path);
  fs.unlinkSync(file2.path);

  // Mengirimkan hasil perbandingan
  res.json({
    message: 'Comparison Results',
    results: {
      blake2: {
        areFilesEqual: areHashesEqualBlake2,
        file1Hash: hash1Blake2,
        file2Hash: hash2Blake2,
      },
      blake3: {
        areFilesEqual: areHashesEqualBlake3,
        file1Hash: hash1Blake3,
        file2Hash: hash2Blake3,
      },
    },
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
