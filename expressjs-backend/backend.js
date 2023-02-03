const express = require('express');
const userServices = require('./models/user-services');
const cors = require('cors');
const app = express();
const port = 5000;
const users = { 
  users_list :
  [
    //  { 
    //     id : 'xyz789',
    //     name : 'Charlie',
    //     job: 'Janitor',
    //  },
    //  {
    //     id : 'abc123', 
    //     name: 'Mac',
    //     job: 'Bouncer',
    //  },
    //  {
    //     id : 'ppp222', 
    //     name: 'Mac',
    //     job: 'Professor',
    //  }, 
    //  {
    //     id: 'yat999', 
    //     name: 'Dee',
    //     job: 'Aspring actress',
    //  },
    //  {
    //     id: 'zap111', 
    //     name: 'Dennis',
    //     job: 'Bartender',
    //  },
    //  {
    //   id: 'zap111', 
    //   name: 'Dennis',
    //   job: 'Bartender',
    //  },
    //  {
    //   id: 'zap555', 
    //   name: 'Dennis',
    //   job: 'Bartender',
    //  }
  ]
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.get('/users', (req, res) => {
//   const name = req.query.name;
//   if (name != undefined){
//       let result = findUserByName(name);
//       result = {users_list: result};
//       res.send(result);
//   }
//   else{
//       res.send(users);
//   }
// });

// app.get('/users/:id', (req, res) => {
//   const id = req.params['id']; //or req.params.id
//   let result = findUserById(id);
//   if (result === undefined || result.length == 0)
//       res.status(404).send('Resource not found.');
//   else {
//       result = {users_list: result};
//       res.send(result);
//   }
// });


app.get('/users', async (req, res) => {
  const name = req.query['name'];
  const job = req.query['job'];
  try {
      const result = await userServices.getUsers(name, job);
      res.send({users_list: result});   
  } catch (error) {
      console.log(error);
      res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/users/:id', async (req, res) => {
  const id = req.params['id'];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
      res.status(404).send('Resource not found.');
  else {
      res.send({users_list: result});
  }
});

app.post('/users', async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser)
      res.status(201).send(savedUser);
  else
      res.status(500).end();
});

// app.get('/users/:name/:job', (req, res) => {
//   const name = req.params['name'];
//   const job = req.params['job'];
//   if (name != undefined){
//       let result = findUserByName(name);
//       result = findUserByJob(job);
//       // result = {users_list: result};
//       res.send(result);
//   }
//   else{
//       res.send(users);
//   }
// });

app.delete('/users/:id', async (req, res) => {
  const id = req.params['id']; //or req.params.id
  console.log(id)
  let result = await userServices.deleteUserByID(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      res.status(200).end();
  }
});

// app.post('/users', (req, res) => {
//   var userToAdd = req.body;
//   userToAdd = assignID(userToAdd)
//   addUser(userToAdd);
//   res.status(201).send(userToAdd);
// });

function delUser(found_users){
  found_users.forEach((obj, i) => {
    const index = users['users_list'].indexOf(obj)
    if (index > -1) {
      users['users_list'].splice(index, 1);
    }
  });
}

function assignID(user) {
  var rand_id = (Math.random() + 1).toString(36).substring(7);
  user.id = rand_id
  return user
}

function addUser(user){
  users['users_list'].push(user);
}

function findUserById(id) {
  return users['users_list'].filter( (user) => user['id'] === id); // or line below
  //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
  return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
  return users['users_list'].filter( (user) => user['job'] === job); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  