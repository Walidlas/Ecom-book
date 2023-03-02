
const { response } = require('express');
const { requireSingnIn } = require('../middlewares/auth');
const Category = require('../models/Category');

exports.createCategory = (req, res) => {//Persister une categorie envoier mn 3end un client

    const category = new Category(req.body);//Data li ghada tji mn 3end le client ghada tkoun fi req.body;
     
    category.save((err, category) => {//Persister une categorie dans la base de donnes 
        
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'  
            })
        }

        res.json({
            category: category//Si oui affecter categorie
        })
    })
}


exports.categoryId = (req, res, next, id) => {//__Middelwear pour recupere L'Id__

    Category.findById(id).exec((err, category) => {

        if(err || !category) {
            return res.status(404).json({
                error: 'Categorie not found !',
            })
        }
        
       req.category = category
       next(); 
    })
}


exports.showCategory = (req, res) => {
    
    let category = req.category;

    res.json({
        category
    })
}



exports.updateCategory = (req, res) => {

    let category = req.category;//Recuperer category

    category.name = req.body.name;//Update category

    category.save((err, category) => {//Persister dans la base de données

        if(err) {
            return res.status(400).json({
                error: 'bad request !'
            })
        }
        res.json({
            category, 
            message: 'Category updated successfully !'
        })
    })
}

exports.deleteCategory = (req, res) => {

    let category = req.category;//Recuperer Categorie

    category.remove((err, category) => {//Supprimer Categorie

        if(err) {
            return res.status(404).json({//404 <=> (__N'existe Pas__)
                error: 'category not found !'
            })
        }

        res.status(204).json({
            message: 'Category deleted !'
        })
    })
}

exports.allCategories = (req, res) => {//(__Pour Recupere tous les Categorie__)

    Category.find().exec((err, category) => {
        if(err){
            return res.status(500).json({
                error: err, 
            })
        }
        
        res.json({
            category
        })
    })

}