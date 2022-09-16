var express = require('express');
var router = express.Router();
const { loginSchema } = require('./../utils/schema');
const { userLogin, userRegister } = require('./../controllers/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', function(request, reply){
  const { error, value } = loginSchema.validate(request.body)
  if(error){
    console.log(error)
  }
  userLogin(request.body);
  reply.status(200).send(`Hello mrudul ${request.body.email}`)
})

router.post('/register', async function( request, reply ){
  const res = await userRegister(request.body);
  reply.status(200).send({"message":"New User added"})
})

module.exports = router;
