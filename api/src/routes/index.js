const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes.js');
const recipe = require('./recipe.js');
const diet = require('./diets.js');
// const addDiet = require('./addDiet');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/recipe', recipe);
router.use('/diets', diet);
// router.use('/addDiet', addDiet);

module.exports = router;
