
const express = require("express"); //Importer Express
const cors = require('cors'); //Importation du (__"CORS"__) la partie BACKEND (__Sa ve dire "URL" ta3 BACKEND__) n'autourize pas la comunication m3a la prtie FRONTEND (__Sa ve dire "URL" ta3 FRONTEND__) Probleme howa (__Course original Shearing__) pour eviter had le probleme installer (__cros__)
const mongoose = require("mongoose"); //Importer Mongoose
const expressValidator = require('express-validator'); //Importer Express-Validator
const cookieParser = require('cookie-parser'); //Importer CookieParser

mongoose.set("debug", true);
mongoose.set("strictQuery", false);//Pour Eviter hadak le message li kitla3 lik aux niveau de Connections

//__Import Routes__//
const authRoutes = require('./routes/auth');//(__On l'import pour L'utiliser comme un middleware__)
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');


//__Config App__//
require("dotenv").config(); //Importer le Package <=> (__C'est Une Methode__)//Pour Acceder a Les Variables D'environement
const app = express(); //Methode


//Connect With Mongodb
mongoose.connect(process.env.DATABASE)// DATABASE hiya Url ta3 Data base dans mongodb (___On la ecrit dans le fichier D'envronemment___)
        .then(() => console.log("db connected"))
        .catch(() => console.log("not connect to db"));

//Middlewares
app.use(express.json())
app.use(cors());//methode
app.use(cookieParser())//Middlewares Pour Travailler avec les cookies
app.use(expressValidator())//methode



//__Routes Middleware__//
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/braintree', braintreeRoutes);



/*__Acceder a les Variable d'environnement__*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on port ${port}`)); //Creer Le Serveur





