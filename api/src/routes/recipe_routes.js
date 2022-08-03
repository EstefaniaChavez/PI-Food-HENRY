const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {idRecipe, recipesCreate, nameRecipe, deleteRecipe } = require('../controllers/recipe_controller')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', nameRecipe) 
router.get('/:id', idRecipe)
router.post('/', recipesCreate) 
router.delete('/:id', deleteRecipe)
router.get('/filter/:dietName', ) 

module.exports = router;
