const express = require('express'); // import express framework
const hbs = require('hbs');
const fs = require('fs');

var app = express(); // create express app, to create an app you just have to call the method

// add support for partials
hbs.registerPartials(__dirname + '/views/partials');

// CONFIGURE APP
app.set('view engine', 'hbs'); // configure app to use hanlebars

//MIDDLEWARE TUTORIAL - prints inforamtion about user request to console
app.use((req, res, next) => {
  // Get current time/date and assign it to a variable
  var now = new Date().toString();
  console.log(`Time page was accessed: ${now}`);
  console.log(`Request type: ${req.method}`);
  console.log(`Page the user accessed: ${req.url}`);

  var log = `${now}: ${req.method} ${req.url}`;

  // write request info to a log file
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  // tells express that middleware is done
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public')); // takes absolute path to the folder you want serve up


// register a partial funtion(helper), 2 arguements = name of the helper, function to run
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

// helper to change text to uppercase
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => { // create root route using arrow function
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the best website in the world...'
  });
  // res.send('<h1>Hello Express...</h1>'); // send text/html to the webpage
  // res.send({ // send json data to the webpage
  //   name: 'Daniel',
  //   likes: [
  //     'JavaScript',
  //     'Node.js'
  //   ]
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { // render about page from views dir
    pageTitle: 'About Page', // place information you want to inject into page asa second arguement
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'There has been a catastrophic error, go back, go back as far as you can....'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000...')
}); // tell app to listen on port 3000
