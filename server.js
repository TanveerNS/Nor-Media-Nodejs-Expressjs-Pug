const express = require('express');
const people = require('./people.json');

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    people: people.profiles,
	home: people.home
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    people: people.profiles,
	about: people.about
  });
});


app.get('/events', (req, res) => {
  res.render('events', {
    title: 'events',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});
app.get('/graphics', (req, res) => {
  res.render('graphics', {
    title: 'graphics',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});
app.get('/advertisement', (req, res) => {
  res.render('advertisement', {
    title: 'Advertisement',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});
app.get('/photography', (req, res) => {
  res.render('photography', {
    title: 'photography',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});
app.get('/digital-marketing', (req, res) => {
  res.render('digital-marketing', {
    title: 'digital-marketing',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});
app.get('/travel', (req, res) => {
  res.render('travel', {
    title: 'travel',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});

app.get('/semilar-workshop', (req, res) => {
  res.render('semilar-workshop', {
    title: 'Semilar Workshop',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});

app.get('/blog', (req, res) => {
  res.render('blog', {
    title: 'blog',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    people: people.profiles,
	about: people.about,
	home: people.home
  });
});

app.post('/connect', (req, res) => {
  res.render('connect', {
    title: 'Homepage',
    people: people.profiles
  });
});

app.get('/profile', (req, res) => {
  const person = people.profiles.find(p => p.id === req.query.id);
  console.log(person);
  res.render('profile', {
    title: `About ${person.firstname} ${person.lastname}`,
    person,
  });
});

var clients = 0;
var roomno = 1;

io.on('connection', function(socket) {
    console.log('A user connected');
	
	socket.send('Welcome Node App');
	
	socket.on('chat message', function(msg){
    console.log('message: ' + msg);
	io.emit('chat message', msg);
  });
	
	socket.on('chat button', function(msg){
		console.log('you click icon' + msg);
		io.emit('chat button', msg);
	});
	
	socket.on('social',function(msg){
		console.log('you click social icon');
		switch(msg) {
		  case "Facebook":
			io.emit('facebook',msg);
			break;
		  case "Twitter":
			io.emit('twitter',msg);
			break;
		  case "Youtube":
			io.emit('youtube',msg);
			break;
		  case "Instagram":
			io.emit('instagram',msg);
			break;
		  case "Linkedin":
			io.emit('linkedin',msg);
			break;			
		  default:
			console.log('please click on the icon');
		}
	});
  
	setTimeout(function(){
		socket.send('how may i help you');
	},1000);
	
   //Send a message after a timeout of 4seconds
   setTimeout(function() {
      socket.send('Sent a message 2 seconds after connection!');
   }, 2000);

   socket.on('disconnect', function () {
	   clients--;
      console.log('A user disconnected');
	  io.sockets.emit('broadcast', { description: clients + ' clients connected!'});
   });
   
   clients++;
   io.sockets.emit('broadcast',{description: clients + ' clients connected!'});
   
   //Increase roomno 2 clients are present in a room.
   if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
   socket.join("room-"+roomno);

   //Send this event to everyone in the room.
   io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
   
   
});

const server = http.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});