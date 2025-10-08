import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(courses);
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) }
    });

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error al obtener curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, image } = req.body;

    // Validaciones básicas
    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        image,
      }
    });

    res.status(201).json({
      message: 'Curso creado exitosamente',
      course
    });
  } catch (error) {
    console.error('Error al crear curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, image } = req.body;

    // Verificar que el curso existe
    const existingCourse = await prisma.course.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Validaciones básicas
    if (price && price <= 0) {
      return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
    }

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(image && { image }),
      }
    });

    res.json({
      message: 'Curso actualizado exitosamente',
      course
    });
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar que el curso existe
    const existingCourse = await prisma.course.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    await prisma.course.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
