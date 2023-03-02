const User = require('../models/user');//Importation du model User

exports.getOneUser = (req, res) => {

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
     
    res.json({
        user: req.profile//dak user li fi req.profile hoto fi (__user => C'est un attribut smito user)
    })
}

exports.updateOneUser = (req, res) => {//Pour faire la modefication d'un User

    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {//__Premier parametre (__Id du user__) Second parametre (__les information du user a changer li kaynin fi req.body__) (__thered parameter return liya l'objet modefier__)__ 

        if(err) {
            return res.status(400).json({err})
        }

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;

        res.json({
            user
        })

    })                                      
}