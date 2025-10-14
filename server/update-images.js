const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateImages() {
  try {
    // Actualizar imágenes de los cursos
    await prisma.course.updateMany({
      data: {
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
      }
    });

    console.log('✅ Imágenes actualizadas');
    
    // Verificar cursos
    const courses = await prisma.course.findMany();
    console.log('📚 Cursos actualizados:', courses);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImages();
