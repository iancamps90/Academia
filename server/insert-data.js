const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertData() {
  try {
    // Insertar cursos de prueba
    const courses = await prisma.course.createMany({
      data: [
        {
          title: 'Curso de React',
          description: 'Aprende React desde cero con proyectos prácticos',
          price: 99.99,
          image: 'https://via.placeholder.com/300x200',
          published: true
        },
        {
          title: 'Curso de Node.js',
          description: 'Backend con Node.js y Express',
          price: 149.99,
          image: 'https://via.placeholder.com/300x200',
          published: true
        },
        {
          title: 'Curso de TypeScript',
          description: 'TypeScript para desarrolladores modernos',
          price: 79.99,
          image: 'https://via.placeholder.com/300x200',
          published: true
        }
      ],
      skipDuplicates: true
    });

    console.log('✅ Cursos insertados:', courses);
    
    // Verificar que se insertaron
    const allCourses = await prisma.course.findMany();
    console.log('📚 Total de cursos:', allCourses.length);
    console.log('📋 Cursos:', allCourses);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertData();

