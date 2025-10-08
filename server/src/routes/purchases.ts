import { Router } from 'express';
import { 
  createCheckoutSession, 
  getUserCourses, 
  handleStripeWebhook 
} from '../controllers/purchaseController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Ruta pública para webhook de Stripe
router.post('/webhook/stripe', handleStripeWebhook);

// Rutas protegidas
router.post('/checkout/:id', authenticateToken, createCheckoutSession);
router.get('/user/courses', authenticateToken, getUserCourses);

export default router;
