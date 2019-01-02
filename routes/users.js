var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/:user_name', function(req, res, next) {
  res.render('users', { user_name: req.params.user_name });
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;


