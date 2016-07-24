var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
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
        avatar: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/45537_422800539157_2150048_n.jpg?oh=74fa4353f2d6fe9d7a5434640a7f2704&oe=57F2B8E9'
      },
      url: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/13770529_10154333404344798_8160011981890782288_n.jpg?oh=58f161f2749ced679ef33f70dabd921c&oe=582FE67A',
      likes: 1,
      liked: false,
      createdAt: new Date().setFullYear(2016,6,16)
    },

    {
      user: {
        username:'fip3',
        avatar: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/45537_422800539157_2150048_n.jpg?oh=74fa4353f2d6fe9d7a5434640a7f2704&oe=57F2B8E9'
      },
      url: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/12743668_10153937542994798_5943561022104462831_n.jpg?oh=69d529ed982407338f37d39e4964fa73&oe=57EF2F1A',
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