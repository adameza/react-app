const express = require('express');
const app = express();
const port = 5000;
const users = { 
  users_list :
  [
     { 
        id : 'xyz789',
        name : 'Charlie',
        job: 'Janitor',
     },
     {
        id : 'abc123', 
        name: 'Mac',
        job: 'Bouncer',
     },
     {
        id : 'ppp222', 
        name: 'Mac',
        job: 'Professor',
     }, 
     {
        id: 'yat999', 
        name: 'Dee',
        job: 'Aspring actress',
     },
     {
        id: 'zap555', 
        name: 'Dennis',
        job: 'Bartender',
     },
     {
      id: 'zap555', 
      name: 'Dennis',
      job: 'Bartender',
     },
     {
      id: 'zap555', 
      name: 'Dennis',
      job: 'Bartender',
     }
  ]
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
  const name = req.query.name;
  if (name != undefined){
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
  }
  else{
      res.send(users);
  }
});

app.get('/users/:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      result = {users_list: result};
      res.send(result);
  }
});

app.get('/users/:name/:job', (req, res) => {
  const name = req.params['name'];
  const job = req.params['job'];
  if (name != undefined){
      let result = findUserByName(name);
      result = findUserByJob(job);
      // result = {users_list: result};
      res.send(result);
  }
  else{
      res.send(users);
  }
});

const findUserByJob = (job) => { 
  return users['users_list'].filter( (user) => user['job'] === job); 
}

app.delete('/users/:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      delUser(result);
      res.status(200).end();
  }
});

function delUser(user){
  const id = users['users_list'].indexOf(user)
  if (id > -1) {
    users['users_list'].splice(id, 1);
  }
}

app.post('/users', (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).end();
});

function addUser(user){
  users['users_list'].push(user);
}

function findUserById(id) {
  return users['users_list'].find( (user) => user['id'] === id); // or line below
  //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
  return users['users_list'].filter( (user) => user['name'] === name); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  