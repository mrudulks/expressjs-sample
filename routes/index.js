var express = require('express');
var router = express.Router();
const { database } = require('./../db')
/* GET home page. */
router.use(logger)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', auth,async function( request, reply ){
  const user = await database.select().from('users')
  console.log("Home page")
  reply.status(200).send(user)
})

function logger(request, reply, next){
  console.log("Log");
  next();
}
function auth( request, reply, next){
  console.log(request.body)
  next();
}
function error(err, request, reply, next){
  if (!test) console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.status(500);
  res.send('Internal Server Error');
}
module.exports = router;
