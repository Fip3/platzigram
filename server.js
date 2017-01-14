var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');
var config = require('./config');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

var s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey
})

/*STORAGE PARA INGESTA DE ARCHIVOS EN AWS S3*/
var storage = multerS3({
  s3: s3,
  bucket: 'fi-platzigram',
  acl: 'public-read',
  metadata: function(req, file, cb){
    cb(null, { fieldName: file.fieldname})
  },
  key: function(req, file, cb){
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

/* STORAGE PARA INGESTA DE ARCHIVOS EN DISCO LOCAL

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})*/
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine','pug');

app.use(express.static('public'));

app.get('/', function(req,res){
	res.render('index', { title: 'Platzigram'});
});

app.get('/signup', function(req,res){
	res.render('index', { title: 'Platzigram - Ingreso'});
});

app.get('/signin', function(req,res){
	res.render('index', { title: 'Platzigram - Inscríbete'});
});

app.get('/api/pictures', function (req,res){

	var pictures = [
    {
      user: {
        username:'fip3',
        avatar: 'avatar1.png'
      },
      url: 'subida1.jpg',
      likes: 1,
      liked: false,
      createdAt: new Date().setFullYear(2016,6,16)
    },

    {
      user: {
        username:'koala',
        avatar: 'avatar2.png'
      },
      url: 'koala.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().getTime()
    }

  ];

  setTimeout(function () {
  	res.send(pictures);
  }, 1000);
  

});

app.post('/api/pictures', function(req, res){
  upload(req, res, function(err){
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded!');
  });
});

app.listen(3000, function(err){
	if (err) return console.log('Ha habido un error'), process.exit(1);

	console.log('Platzigram escuchando al puerto 3000');
});