var page = require('page');

var main = document.getElementById('main-container');

page('/', function(){
  main.innerHTML ='Home <a href="/signup">SIGNUP</a>';
})

page('/signup', function(ctx, next){
  main.innerHTML = 'Signup <a href="/">HOME</a>';
})

page();