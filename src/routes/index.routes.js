import { Router } from 'express';
import { subirImagen, verCollage, eliminarImagen } from './../controllers/index.controllers.js';

const router = Router();

// rutas
router.get('/', (req, res) => {
  const title = 'Nueva imagen';
  res.render('home', { title });
});

router.post('/imagen', subirImagen);
router.get('/collage', verCollage);
router.get('/deleteImg/:posicion', eliminarImagen);

export default router;
