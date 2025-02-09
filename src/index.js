const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
//const { v4: uuidv4 } = require('uuid');
const users = [];

//Post Implementation
app.post('/users', (req, res) => {
  if (!req.body.name || !req.body.email){
    res.status(400).send('400: Bad request. Needs an entry for name and email.');
  }
  else{
//    let user = { "id": uuidv4(), ...req.body};
    let user = { "id": "placeholder", ...req.body};
    users.push(user);
    res.status(201).json({ user });
  }
});

//GET Implementation
app.get('/users/:id', (req, res) => {
  let user = users.find(u => u.id === req.params.id);
  if (!user){
    res.status(404).send('404: Not Found. ID not in database.');
  }
  else{
    res.status(200).json(user)
  }
});

//PUT Implementation
app.put('/users/:id', (req, res) => {
  let u_index = users.findIndex(u => u.id === req.params.id);
  if (!u_index){
    res.status(404).send('404: Not Found. ID not in database.');
  }
  else if (!req.body.name || req.body.email){
    res.status(400).send('400: Bad request. Needs an entry for name and email.');
  }
  else {
    users[u_index].name = req.body.name;
    users[u_index].name = req.body.email;
    res.status(200).json(users[u_index]);
  }
});

//DELETE Implementation
app.delete('/user/:id', (req,res) => {
    let u_index = users.findIndex(u => u.id === req.params.id);
  if (!u_index){
    res.status(404).send('404: Not Found. ID not in database.');
  }
  else{
    users.splice(u_index, 1);
    res.status(204).send('204: Entry removed.')
  }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
