/*(__Controller elle contient des methode__)*/

const User = require('../models/user');//Importation
const jwt = require('jsonwebtoken');//Importer (__Token__)

/*__Exporter La Methode (__Salam__) <=> le nom de la methode __*/
exports.salam = (req, res) => {
  res.send( {message: '__This is how we doo__' } );
};


exports.signup = (req, res) => {//Pour Creer Un Compte
    const user = new User(req.body)
    user.save((err, user) => {//Persister dans Data Base 
      if(err) {
        return res.status(400).send(err)
      }
        user.hashed_password = undefined;
        user.salt = undefined;

        res.send(user)//Envoier L'utilisateur Persister
    }) 
};


exports.signin = (req, res) => {//__Pour S'authentifier khassni (__Email__) and (__Password__) envoier dans (__req__) 
  const { email, password } = req.body; //Recupere email and password dans (__req.body__)
  //Verifier l'addresse mail wsk kayni fi la collection on a besoin du module (__User__) bash n9albo fiih
  User.findOne( {email}, (err, user) => {//Verifier L'email elle va executer une Callback
      if(err || !user){
          return res.status(400).json({/*__Bad Request__*/
              error: '__User not found with this Email, Please SignUp!__'
          })
      }
      //(__Si On a trouver Email maintenant on va verifier __Password wsh identique a ce email__)
     if(!user.authenticate(password)){//Password Not Existe (__3tinaha password li ghadi issift User__)
        return res.status(401).json({
            error: 'Email and Password dont Match !'
        })
     } 
     //C'est kolchi howa hadak je vais genere (__token__)  (npm i jsonwebtoken) __(__il kan 3endk token Sa ve dire tu est authentifier__)__
      
    const token = jwt.sign({_id: user._id, role:user.role }, process.env.CLE_SECRET )//first parameter /_id/ second parameter (__Clé Secrete__)
    
    //Ell fallait metre (___TOKEN___) Dans Une (___Cookie___) <=> (__npm i cookie-parser__'Pour Genere Cookie') 
    
    const { _id, name, email, role  } = user;//Nouvelle User A recuperer
   
    res.cookie('tokencookie', token, {expire: new Date() + 8062000})//First Parameter (__nom du cookie__) //Second Parameter (__token__) //Thered Parameter (__la durre du vie de cookie__)

    return res.json({ //je vais envoier un objet qui contienne  (__Token__) and sous objet (__User__)
       token, user: { _id, name, email, role }
    })    
  })  
}

exports.signout = (req, res) => {
  //On Va tue la (__ssesion__) => tue le (__cookie__) qu'on la appeler (__tokencookie__)
  res.clearCookie('tokencookie')// (__Supprimer la cookie__) __Le nom du cookie__

  res.json({
    message: '__Signing out Cookier Tuer__'
  })
}

