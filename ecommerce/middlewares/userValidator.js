//__Creer Une Methode Middelwere a Exporter__//

exports.userSingUpValidator = (req, res, next) => {
  //C'est Obligatoire madir liha Middelwere prcq les donnes jayin fi __req__ => khss nhawlohom sous form __'JSON'__
  /*__ Valider les donnes with 'Express-Validator' __*/
  req.check("name", "__Name is Required !__").notEmpty(); //(__first parameter la valeur__) (__second parameter message d'erreur__)
  
  req.check("email", "__Email is Required !__")//Second Parameter Message D'erreur
    .notEmpty()
    .isEmail() //Verifier est ce quelle est un Email
    .withMessage("Email Should be Like nom Johnpolo@gmail.com");//(__Message Erreur de Syntaxe

  req.check("password", "__Password is Required !__")
    .notEmpty()
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must between 6 and 10 characters");//(__Message Erreur de Syntaxe

    //__Pour Visualizer L'erreur__//
    const errors = req.validationErrors();//Methode Pour Valider Erreurs
     
     if(errors)
     {
        return res.status(400).json({error: errors[0].msg});
     }
    
     next();//else tu passe au Suivant
};
