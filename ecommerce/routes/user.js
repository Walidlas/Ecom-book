const express = require('express');
const { getOneUser, updateOneUser } = require('../controllers/userController')
const { userById } = require('../middlewares/user');
const { requireSingnIn , isAuth } = require('../middlewares/auth')

const router = express.Router();

router.get('/:userId', requireSingnIn, isAuth , getOneUser)

router.put('/:userId', requireSingnIn, isAuth , updateOneUser)

router.param('userId', userById)//Mli tkoun 3endi chi route fiha un parametre smito (__userId__) elle va declencher la methode (__userById__ <=> Middelwere)

module.exports = router;//(__Exportation du router__)'__Pour faire Require dans une autre page__'
