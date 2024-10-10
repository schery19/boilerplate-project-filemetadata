var express = require('express');
var cors = require('cors');
const multer = require('multer');

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: 'uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});


// app.post('/api/fileanalyse', function (req, res) {
//   if (!req.file) {
//     return res.status(400).json({ error: 'Aucun fichier téléchargé' });
//   }

//   // Configuration de multer pour stocker les fichiers dans le dossier 'uploads'
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Dossier de stockage des fichiers
//     },
//     filename: (req, file, cb) => {
//       // Générez un nom de fichier unique
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
//     }
//   });

//   upload.single('myFile')

//   // Initialisation de multer
//   const upload = multer({ storage: storage });

//   // Récupérer les informations du fichier téléchargé
//   const fileInfo = {
//     name: req.file.originalname,  // Nom original du fichier
//     type: req.file.mimetype,      // Type MIME du fichier
//     size: req.file.size           // Taille du fichier en bytes
//   };

//   console,log(fileInfo);

//   // Retourner ces informations en JSON
//   res.json({
//     fileInfo
//   });
// });







const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
