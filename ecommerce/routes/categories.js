const express = require("express");

const { userById } = require("../middlewares/user");

const router = express.Router();

const { 
     allCategories, 
     createCategory,
     deleteCategory,
     updateCategory,
     categoryId,
     showCategory
 } = require("../controllers/categoryController");

const { requireSingnIn, isAuth, isAdmin } = require("../middlewares/auth");

router.get('/', allCategories);



router.post("/create/:userId", [requireSingnIn, isAuth, isAdmin], createCategory);//(__Create category__)

router.put("/:categoryId/:userId", [requireSingnIn, isAuth, isAdmin], updateCategory);//(__Update category On la donne L'Id du category et L'Id du user => Admin__)

router.delete("/:categoryId/:userId", [requireSingnIn, isAuth, isAdmin], deleteCategory);//(__Delete category On la donne L'Id du category et L'Id du user => Admin__)



router.get('/:categoryId', showCategory);//Affiche moi les information ta3 category li 3endha dak (__ID__)

router.param("userId", userById); //Mli tkoun 3endi chi route fiha un parametre smito (__userId__) elle va declencher la methode (__userById__ <=> Middelwere)
router.param('categoryId', categoryId);

module.exports = router;