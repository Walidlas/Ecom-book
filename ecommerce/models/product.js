
const mongoose = require("mongoose"); //Importer Mongoose
const { ObjectId } = mongoose.Schema;

const productShema = new mongoose.Schema({ //Créer Shema
  name: {
    type: String, //Type Premier lettre au majuscule
    require: true,
    maxLength: 150,
    trim: true //Les Esoace au debut est a la fin
  },
  description: {
    type: String, 
    require: true, 
    maxLength: 2000
  },   
  price: {
    type: Number, 
    require: true 
  }, 
  quantity: {
    type: Number, 
  }, 
  photo: {
    data: Buffer, 
    contentType: String, 
  }, 
  category: {//(__Chaque Produit a partienne a une seul Categorie__)
        type: ObjectId, 
        ref: 'Category', //le nom de la collection qui l'appartienne
        require:true, /*(__Une Categorie Peut Avoir Plusieur Product__)*/
  }, 
  shipping: {
        type: Boolean,
        require: false, 
        default: false
  },
  sold: {
      type: Number,
      default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productShema); //Exportation du module