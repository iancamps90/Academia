const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('🔍 Verificando datos en la base de datos...\n');

    // Verificar usuarios
    const users = await prisma.user.findMany();
    console.log('👥 Usuarios:', users.length);
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Rol: ${user.role}`);
    });

    // Verificar cursos
    const courses = await prisma.course.findMany();
    console.log('\n📚 Cursos:', courses.length);
    courses.forEach(course => {
      console.log(`   - ${course.title} - €${course.price} - Publicado: ${course.published}`);
    });

    // Verificar plantillas
    const templates = await prisma.template.findMany();
    console.log('\n🛠️ Plantillas:', templates.length);
    templates.forEach(template => {
      console.log(`   - ${template.title} - €${template.price} - Categoría: ${template.category}`);
    });

    // Verificar artículos
    const articles = await prisma.article.findMany();
    console.log('\n📝 Artículos:', articles.length);
    articles.forEach(article => {
      console.log(`   - ${article.title} - Publicado: ${article.published}`);
    });

    // Si no hay cursos, crear algunos
    if (courses.length === 0) {
      console.log('\n⚠️ No hay cursos, creando algunos...');
      const newCourses = await prisma.course.createMany({
        data: [
          {
            title: 'Curso de React Avanzado',
            description: 'Aprende React desde cero con proyectos prácticos y las mejores prácticas',
            price: 99.99,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
            published: true
          },
          {
            title: 'Node.js y Express',
            description: 'Backend completo con Node.js, Express y bases de datos',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
            published: true
          },
          {
            title: 'TypeScript Profesional',
            description: 'TypeScript para desarrolladores modernos con ejemplos reales',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
            published: true
          }
        ]
      });
      console.log('✅ Cursos creados:', newCourses.count);
    }

  } catch (error) {
    console.error('❌ Error al verificar datos:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();

