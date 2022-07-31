const { Router } = require('express');
const { getDietsFromDB } = require('../controllers/diet_controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get ('/', getDietsFromDB)

module.exports = router;
