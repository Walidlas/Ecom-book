
const expressJWT = require('express-jwt');
require("dotenv").config();//__Pour Acceder a Les Variables d'environement__//


  /*Middelwere qui verefier wsh nta (__signin__) => S'authentifier */
exports.requireSingnIn = expressJWT({//__C'est Une Methode qui Contienne Des Options (__secret__,  __algorithms__, __userProperty__)
  secret: process.env.CLE_SECRET,//__la variable d'environement ("la Clé Secret")__Pour Utiliser khassna Importiw (__require("dotenv").config()__)
  algorithms: ["HS256"],//algorithms pour genere token (__Si tu as le token sa ve dire que tu est deja S'authentifier__)
  userProperty: "auth",//Affecter les donnes li kaynin fi (__payload dyal 'TOKEN'__)  a une variable => "__auth__"
});

exports.isAuth = (req, res, next) => {//Midellwere isAuth => Pour Verifier Wsh nta howa Utilisateur S'authentifier
  
  let user = req.profile && req.auth && (req.profile._id == req.auth._id)//Verifier wsh recupere User and Wsh 3endi (__auth__) est (__Verifier Id du USER recupere avec USER Authentifier__)
    
  if(!user){
      return res.status(403).json({
        error: "__Access Denied__"
      })
    }
    next();//Continuer
}

exports.isAdmin = (req, res, next) => {//Midellwere Pour Verifier wsh C'est un (__User__) Ou (__Administrateur__)
  if(req.auth.role == 0){//Vous etes pas Administrator
      return res.status(403).json({
        error: "__Admin Resource, Access Denied !__"
      })
  }
  next();
}  

