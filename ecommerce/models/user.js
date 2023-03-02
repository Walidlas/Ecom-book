const mongoose = require("mongoose");
const crypto = require("crypto");//Module Pour Crypter Le mot de Passe
/*__const uuid = require("uuid");__*/
const { v1: uuid } = require("uuid");//Pour L'affecter a (__salt__) Pour creypter le mot de passe a travers la version (__V1__)

const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //Espace au debut et a la fin
      maxlength: 50,
      required: true,
    },
    email: {
        type: String,
        trim: true, //__Eviter Les Espace au debut et a la fin
        maxlength: 50,
        required: true,
        unique: true, 
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      //Gerer password mn (__UUID__)
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,/*__Administrateur ou User (0)=> Utilisateur (1)=> Admin__*/
      default: 0,
    },
    history: {
      type: Array,
      default: [], //tableau vide
    },
  }, { timestamps: true } );//__Pour Me Generer (__"createdAt": "2022-12-14T19:52:30.277Z" , "updatedAt": "2022-12-14T19:52:30.277Z"__)



  

        /*(___ Password Virtuelle ___)*/
userShema.virtual("password")//(__Ce password elles est creer Virtualy elle existe pas physiquement__) d'onc elle va me construire deux Methode '_.Set_' '_.Get_' __)
  .set(function (password) {//(__Function kanssta9beel fiha password li ghadi issift User__)
    this._password = password;//Attribut (__ '_password' __) ghadi affecter liih password qui va me donner Utilisateur
    this.salt = uuid(); //(__uuid__) hiya whd la chaine chaque user katkoun 3endo a travers la quelle kantbaza 3liha pour generer le mot de passe
    this.hashed_password = this.cryptPassword(password);//On affect hashed_password a une function pour crepter password
  })
  .get(function () {
    return this._password;
  });
     /*(___ Methode Virtuelle ___)*/
userShema.methods = {//c'est un objet
  
  authenticate: function(textpassword) { //__Methode qui verifier est ce que (__password du client__) est identique au (__password du User__)__//
      return this.cryptPassword(textpassword) === this.hashed_password;// (=== __Verifier la valeur est le type__) (__hasher password apres comparih m3a pssword hasher fi __DB__)
    
  }, 

  cryptPassword: function (password) {//Definir la function de cryptage password
    if (!password) return "";

    try {//(__S'il existe__)
      return crypto
        .createHmac("sha1", this.salt)//(Premier Parametre__"Sha1" Algorithme de cryptage__) (_dexieme parametre je basse sur le "__Salt__" li tgenera mn "__uuid__" c'est lui Q'uon va le Cryptere
        .update("password") //__Le champ Virtuelle que je vais modifier__//
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userShema);
