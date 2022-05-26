//////////dependencies////////
const express = require('express');
const app = express();
require('dotenv').config();
const session = require('express-session');
const bcrypt = require('bcrypt');
const hashString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10));

///////////middleware////////
app.use(
    session({
        secret: process.env.SECRET,
        resave:false,
        saveUninitialized:false,
    })
);
/////////// any route//controllers////////
app.get('/any', (req, res) =>{
    req.session.anyProperty = 'any value';
    res.send('this is the route that sets the value of req.session.anyProperty')
})

//////////retrieve routes////////
app.get('/retrieve', (req, res) =>{
    if(req.session.anyProperty === 'something youw want it to'){
        res.send('it matches! cool');
    }else{
        res.send('nope, not a match');
    }
});
/////////update route//////////
app.get('/update', (req, res) => {
    req.session.anyProperty = 'something you want it to';
    res.send('this is the route that updates req.session.anyProperty')
});

///////////detroy route////////
app.get('/destroy', (req, res) =>{
      req.session.destroy((error) =>{
    if(error){
        res.send(error)
    }else {
        res.send({
            success:true,
           });
         }
      });
  });

  ////////////hash route/////////////
app.get('/hashed', (req, res) => {
     const hashString = bcrypt.hashSync('example', bcrypt.genSaltSync(10));
     res.send(hashString);
  })
/////////////compare route///////
app.get('/compare', (req, res) => {
    const hashedString = bcrypt.hashSync('example', bcrypt.genSaltSync(10));
    const isSameString = bcrypt.compareSync('yourGuessHere', hashedString);
    res.send(isSameString)
})


////////////listener////////
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`listening on port:${PORT}`));