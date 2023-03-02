const express = require("express");

const router = express.Router();

const { userById } = require("../middlewares/user");

const { 
     photoProduct, 
     SearchProduct, 
     relatedProduct,    
     allProducts, 
     createProduct,
     showProduct,
     productById,
     removeProduct,
     updateProduct
 } = require("../controllers/productController");

const { requireSingnIn, isAuth, isAdmin } = require("../middlewares/auth");


router.get('/', allProducts);//Pour recupere tous les products

router.get('/:productId', showProduct)//La Recuperation et l'affichage d'un seul Produit (__showProduct__) => C'est Une Methode Dans Le Controller



router.get('/related/:productId', relatedProduct)//Pour recuperer les produit li 3endhom la meme relation avec la categori il S'appelle (__ Related Products__) => On relation avec le meme produit



router.post('/search', SearchProduct);

router.get('/photo/:productId', photoProduct);//(__Get Photo from Database__)

router.post("/create/:userId", [requireSingnIn, isAuth, isAdmin], createProduct);

router.delete('/:productId/:userId', [requireSingnIn, isAuth, isAdmin], removeProduct);//__On Le donne (__Id__) du produit a supprimer est (__Id__) ta3 admin khasso ikoun s'authentifier

router.put('/:productId/:userId', [requireSingnIn, isAuth, isAdmin], updateProduct);

router.param("userId", userById); //Mli tkoun 3endi chi route fiha un parametre smito (__userId__) elle va declencher la methode (__userById__ <=> Middelwere)
router.param('productId', productById);//Mli tkoun 3endi chi route fiha un parametre smito (__productId__) elle va declencher la methode (__productId__ <=> Middelwere)



module.exports = router;