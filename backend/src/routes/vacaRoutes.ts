import { Router } from 'express';
import { vacaController } from '../controllers/vacaController';

const router = Router();

router.post('/vacas', vacaController.create);
router.get('/vacas', vacaController.getAll);
router.get('/vacas/:id', vacaController.getById);
router.put('/vacas/:id', vacaController.update);
router.delete('/vacas/:id', vacaController.delete);

export default router;