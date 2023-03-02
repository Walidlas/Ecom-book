const Product = require("../models/product"); //Importer Product
const _ = require('lodash'); //Pour faire Update du Product Autoumatiquement
const fs = require("fs");
const formidable = require("formidable");
const Joi = require('joi');
const { response } = require("express");

exports.createProduct = (req, res) => {
  /*__Khassna ndiro appload On meme temp que la creation du produit La Structure machi fhal Categorie
    Pour Faire L'appload on a besoin d'un Package qui S'appele (__ULTER__) Awla (__FORMIDABLE__)__*/

  let form = new formidable.IncomingForm(); //Bache ncreer un objet j'ai besoin d'executer la methode (__IncomingForm__)
  
  form.keepExtensions = true; //Kheli liya L'extension

  form.parse(req, (err, fields, files) => {
    //(__'files' <=> Contienne Les Fichier__)  (__'fields' <=> Contienne les champs = les Attribut du produit__) (first parameter => request), (Second parameter => Une Methode Anonyme)

    if (err) {
      //Si Existe L'erreur
      return res.status(400).json({
        error: "Image could not uploaded !",
      });
    }

    let product = new Product(fields); //Si non je creer un Objet mn Model et je lui donne les champs li homa jayin fi fields

    if(files.photo) {//Elle Contienne des information sur le fichier li bghina ndiro liih upload

      if(files.photo.size > Math.pow(40, 6)) {//La photo a ubload elle depasse pas (__4MB__)
        return res.status(400).json({
            error: 'Image should be less than 2mb in size'
        })
      }
      //Verifier est ce que j'ai montionner le champs photo Si Oui Ghadi n3amer Le Model dyali
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
      //product.customphoto = true;
    }
 
    const schema = Joi.object({//Creer Schema mn (__Joi__)
      name: Joi.string().required(), 
      description: Joi.string().required(),
      price: Joi.required(),
      quantity: Joi.required(),
      category: Joi.required(),
    })

    const { error } = schema.validate(fields);

    if(error) {
      return res.status(400).json({
          error: error.details[0].message
      })
    }

    product.save((err, product) => {//Persister dans la base de donnes

      if (err) {
        return res.status(400).json({
          err: "Product not persist",
        });
      }

      res.json({
        //Envoier a la partie client le produit persister
        product

      }) 
    }) 
  })
}

exports.productById = (req, res, next, id) => {//middleware quand l'a executer dans le controller
  
  Product.findById(id).exec((err, product) => {//Callbacks
    
    if(err || !product){
        return res.status(404).json({
          error: 'Product not found !'//Dans le cas Defavorable
        })
    }

    req.product = product;//On affect Le product trouves
    next();//continue

  })
}

exports.showProduct = (req, res) => {//Pour afficher le product

    req.product.photo = undefined;//Pour ne pas envoier la photo
  
    res.json({
            product: req.product
    })
}

exports.removeProduct = (req, res) => {//Le Produit ghadi ikoun deja recuperer dans le (__req__) 

    let product = req.product//Recuperer le produit dans une variable pour le supprimer       

    product.remove((err, product) =>{

      if(err){
          return res.status(404).json({
              error: 'Product not deleted !'
          })
      }

      res.status(204).json({})//dans la suppression on onvoi un objet vide la bonne pratique c'est de le supprimer sans retourner le product supprimer
    
    })
}

exports.updateProduct = (req, res) => {

  let form = new formidable.IncomingForm(); 
  
  form.parse(req, (err, fields, files) => {

    if (err) {
      //Si Existe L'erreur
      return res.status(400).json({
        error: "Image could not uploaded !",
      });
    }

    let product = req.product; 
    
    product = _.extend(product, fields)//--Pour faire la modefication des champs d'un product (__'Extends kifache kikhdem kayched les valeurs li kaynin fi fields ou il les affect a product'__)--//

    if(files.photo) {

      if(files.photo.size > Math.pow(40, 6)) {
        return res.status(400).json({
            error: 'Image should be less than 2mb in size'
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
 
    const schema = Joi.object({
      name: Joi.string().required(), 
      description: Joi.string().required(),
      price: Joi.required(),
      quantity: Joi.required(),
      category: Joi.required(),
    })

    const { error } = schema.validate(fields);

    if(error) {
      return res.status(400).json({
          error: error.details[0].message
      })
    }

    product.save((err, product) => {

      if (err) {
        return res.status(400).json({
          err: "Product not persist",
        });
      }

      res.json({

        product

     }) 

    })  

  })
}

exports.productById = (req, res, next, id) => {//middleware quand l'a executer dans le controller
  
  Product.findById(id)
             .populate('category')
             .exec((err, product) => {//Callbacks
    
    if(err || !product) {
        return res.status(404).json({
          error: 'Product not found !'//Dans le cas Defavorable
        })
    }

    req.product = product;//On affect Le product trouves
    next();//continue

  })
}

exports.showProduct = (req, res) => {//Pour afficher le product

    req.product.photo = undefined;//Pour ne pas envoier la photo

    res.json({
          product: req.product
    })
}

exports.allProducts = (req, res) => {//(__La recuperation des liste des produit__)
      
    /*__Pour traiter les queries (__ sortBy + order + limit __)
      __On definit had l'affichage du product a traver les trois variable (__ ortBy + order + limit __) ===> (---kifache nthakmo fi les queries---) */

  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'; // (__tu peux faire le sorting bache ma bghiti__) Pour acceder a les variables li dayzine fi (__URL__) la kant had la requette dayza fi Url on va utilizer --la condition "ternair" (__?__)-- Si non je vais prend on consederation que sorting howa (__ID__)
  let order = req.query.order ? req.query.order : 'asc'; // Ordere (__Asendent__) ou (__Desendent__)
  let limit = req.query.limit ? parseInt(req.query.limit) : 100; // (__il faut que tu le perse vers 'INT'__)  Limit Sa ve dire On recupere pas tous on (__recupere just 6 Product par default__)
   
  let query = {}
  
  let { search, category } = req.query;

  if(search){//S'il a effectuer une recherche je vais faire la recherche avec le nom du produit 
     query.name = {$regex: search, $options: 'i'};  
  }
  
  if(category){
     query.category = category
  }

   
  Product.find(query)//Recuperer la liste des product  
         .select("-photo")//recuperer tous les info sur le produit sauf la photo
         .populate('category')//kola produit jib liya m3ah categorie dyalo (__Recupere l'objet categorie li 3endo dak (__ID__)  
         .sort([[sortBy, order]])//sortihom liya comment tu veux l'affichage sous forms d'un tableau 
         .limit(limit)//Limitih afficher oar default si j'ai pas mentionner (__6 product__)
         .exec((err, products) => {//__Executer had les requette__

              if(err) {//__Si on a pas trouver les produit__
                 return res.status(404).json({
                   error: 'Product not founud !'
                 })
              }

              res.json({
                 products
              })
         })        
} 


exports.relatedProduct = (req, res) => {//(__pour recuperer les produit li 3endhom la meme relation avec le produit__)
  
   let limit = req.query.limit ? parseInt(req.query.limit) : 6;//__matjibche liya tous les produit qui appartienne a la meme categorie Seulement 6 Produit__

   Product.find({category: req.product.category, _id: { $ne: req.product._id } })//Recupere tous les produit qui appartienne la meme category sauf lui meme
          .limit(limit)
          .select('-photo')//pour negleger la photo dans l'affichage
          .populate('category', '_id name')//Recupere seulement (__name est Id__) ta3 dik la categorie
          .exec((err, products) => {

              if(err) {
                return res.status(404).json({
                   error: "Product not found !"
                })
              }
              
              res.json({
                products
              })              
          })
}


exports.SearchProduct = (req, res) => { 

  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'; // (__tu peux faire le sorting bache ma bghiti__) Pour acceder a les variables li dayzine fi (__URL__) la kant had la requette dayza fi Url on va utilizer --la condition "ternair" (__?__)-- Si non je vais prend on consederation que sorting howa (__ID__)
  let order = req.query.order ? req.query.order : 'asc'; // Ordere (__Asendent__) ou (__Desendent__)
  let limit = req.body.limit ? parseInt(req.query.limit) : 100; // (__il faut que tu le perse vers 'INT'__)  Limit Sa ve dire On recupere pas tous on (__recupere just 6 Product par default__)
  let skip = parseInt(req.body.skip);//Skip howa (__'offset fi la base de donnes'__) 
  let findArgs = {};// C'est un objet => les argument li ghadi ntbaza 3lihom bache ndiro search (prix_min,  prix_max, livraison_gratuit .... )

  console.log(req.body.filters) 

  /*__Traitement pour traiter les argument de la recherche__*/  
  for (let key in req.body.filters){//(__Je boucle sur un attribute li smito filters__)
      if (req.body.filters[key].length > 0) {//(__ghadi ndir la recherche par had [KEY] li ghan3tiha__)
        if (key === "price") {//__la kan key howa prix => search par prix ra prix 3endo (__un minimum est un maximum__)
        // gte - greater then price [0-10]
        // lte - less than
        findArgs[key] = {
            $gte: req.body.filters[key][0],//(__Prix minimum__) 
            $lte: req.body.filters[key][1]//(__Prix maximum__)
        };
      } else {//Si non la kent baghi n9aleb par une autre key (livreason_gratuit ...)
        findArgs[key] = req.body.filters[key];
      }
  }
}



  Product.find(findArgs)//Recuperer la liste des product  
         .select("-photo")//recuperer tous les info sur le produit sauf la photo
         .populate('category')//kola produit jib liya m3ah categorie dyalo (__Recupere l'objet categorie li 3endo dak (__ID__)  
         .sort([[sortBy, order]])//sortihom liya comment tu veux l'affichage sous forms d'un tableau 
         .limit(limit)//Limitih afficher oar default si j'ai pas mentionner (__6 product__)
         .skip(skip)//Offsset dans la base de donnes
         .exec((err, product) => {//__Executer had les requette__

              if(err) {//__Si on a pas trouver les produit__
                 return res.status(404).json({
                   error: 'Product not founud !'
                 })
              }

              res.json({
                 product
              })
         })          
}


exports.photoProduct = (req, res) => {//(__Image est stocker dans la base de donnes Binary__)
   /**__Cette ecriture on l'applelle distructouring__**/
    const { data, contentType } = req.product.photo//hadi ra fiha data et contentType sans faire --(__req.product.photo.data__)-- on met had la structure (__la meme chose pour contentType__) qui est professionelle

    if(data) {//(__Sa ve dire que si j'ai data j'ai Image__)

        res.set('Content-type', contentType)//first parameter (__'Content-type'__) second parameter (__le content type dyalna li howa "--req.product.photo.contentType--"__)

        return res.send(data)//return moi la photo
    }   
}