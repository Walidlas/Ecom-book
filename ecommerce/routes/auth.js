
const express = require("express");
const  { salam, signup, signin, signout } = require('../controllers/authController')/*__('{}' dernahom prcq On peut Importer Plusieur Methode__*/
const router = express.Router(); //Methode Router (__Remplace les 'app' <=> 'router'__)
const { userSingUpValidator } = require('../middlewares/userValidator')//C'est Un Validateur
const { requireSingnIn } = require('../middlewares/auth')

//__Ici On Declare Les Routes__//

router.get("/", salam);// (__/api/users__)

router.post('/signup', userSingUpValidator, signup);// (__/api/users/singup__)
router.post('/signin' , signin);// (__/api/users/signin__)
router.get('/signout', signout);// (__/api/users/signout__)

router.get("/hello", requireSingnIn,  (req, res) => {
    res.send('hello there');  
})

module.exports = router; //(__Exportation du router__)'__Pour faire Require dans une autre page__'

