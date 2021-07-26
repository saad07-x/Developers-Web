const express = require('express');
const router = express.Router();


//@route    GET api/auth
//@desc     Test Route
//@access   Public - By public it means you don't need any token to access this. (e.g. no password required)
router.get('/', (req,res) => res.send('Auth Route'))


module.exports = router;