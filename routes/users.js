var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', function(request, reply){
  console.log(request.body)
  reply.status(200).send(`Hello mrudul ${request.body.email}`)
})

module.exports = router;
