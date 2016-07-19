var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/', function(ctx, next){
  title('Platzigram');
  var main = document.getElementById('main-container');

  var pictures = [
    {
      user: {
        username:'fip3',
        avatar: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/45537_422800539157_2150048_n.jpg?oh=74fa4353f2d6fe9d7a5434640a7f2704&oe=57F2B8E9'
      },
      url: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/13770529_10154333404344798_8160011981890782288_n.jpg?oh=58f161f2749ced679ef33f70dabd921c&oe=582FE67A',
      likes: 5,
      liked: true
    },

    {
      user: {
        username:'fip3',
        avatar: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/45537_422800539157_2150048_n.jpg?oh=74fa4353f2d6fe9d7a5434640a7f2704&oe=57F2B8E9'
      },
      url: 'https://scontent.fscl3-1.fna.fbcdn.net/v/t1.0-9/12743668_10153937542994798_5943561022104462831_n.jpg?oh=69d529ed982407338f37d39e4964fa73&oe=57EF2F1A',
      likes: 12,
      liked: true
    }

  ];

  empty(main).appendChild(template(pictures));

})