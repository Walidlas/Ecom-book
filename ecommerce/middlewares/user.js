

const User = require('../models/user');//Importer Le Model

exports.userById = (req, res, next, id) => {
    
    User.findById(id).exec((err, user) => {//Recupere L'id ta3 User (__Callback__)

    if(err || !user){
        return res.status(400).json({
            error: "user not found !"
        })
    }

    req.profile = user;//Si user exist on l'affect a un attribut fi request li smito (__profile__) t9dar tssemih li bghiti
    next();//else => Continue   
    })
}