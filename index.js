var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//file analyse api path 
//using multer npm package to handle file uploading
app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
  //req.file is the 'upfile' file 
  //req.body will hold the text fileds, if there were any 
  let fileData = req.file;
  if(req.file === undefined)
  {
    return res.send('File not found');
  }

  res.json({name: fileData.originalname, type: fileData.mimetype, size: fileData.size})
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
