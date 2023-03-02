const mongoose = require("mongoose"); //Importer Mongoose

const categoryShema = new mongoose.Schema({ //Créer Shema
  name: {
    type: String, //Type
    require: true,
    maxLength: 32,
    trim: true, //Les Esoace au debut est a la fin
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Category", categoryShema); //Exportation du module
