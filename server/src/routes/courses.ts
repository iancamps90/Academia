import { Router } from 'express';
import { 
  getAllCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from '../controllers/courseController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Rutas protegidas (solo admin)
router.post('/', authenticateToken, requireAdmin, createCourse);
router.put('/:id', authenticateToken, requireAdmin, updateCourse);
router.delete('/:id', authenticateToken, requireAdmin, deleteCourse);

export default router;
