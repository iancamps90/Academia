import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear usuario administrador
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@academy.iancamps.dev' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@academy.iancamps.dev',
      password: adminPassword,
      role: 'admin',
    },
  });

  console.log('👤 Usuario administrador creado:', admin.email);

  // Crear usuario de prueba
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      name: 'Usuario de Prueba',
      email: 'user@test.com',
      password: userPassword,
      role: 'user',
    },
  });

  console.log('👤 Usuario de prueba creado:', user.email);

  // Crear cursos de ejemplo
  const courses = [
    {
      title: 'React Avanzado: Hooks y Context API',
      description: 'Aprende a dominar React con hooks personalizados, Context API, y patrones avanzados. Incluye proyectos prácticos y mejores prácticas para desarrollo profesional.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop',
    },
    {
      title: 'Automatización con Zapier y n8n',
      description: 'Domina la automatización de procesos con Zapier y n8n. Conecta aplicaciones, automatiza tareas repetitivas y optimiza tu flujo de trabajo.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    },
    {
      title: 'Node.js y APIs RESTful',
      description: 'Construye APIs robustas con Node.js, Express y Prisma. Aprende autenticación JWT, validación de datos y despliegue en producción.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop',
    },
    {
      title: 'TypeScript para Desarrolladores JavaScript',
      description: 'Migra de JavaScript a TypeScript y aprovecha el tipado estático. Mejora la calidad de tu código y reduce errores en tiempo de desarrollo.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop',
    },
    {
      title: 'TailwindCSS: Diseño Moderno y Responsive',
      description: 'Crea interfaces hermosas y responsive con TailwindCSS. Aprende utility-first CSS, componentes reutilizables y animaciones.',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
    },
    {
      title: 'Próximamente: Automatización con IA',
      description: 'Descubre cómo integrar inteligencia artificial en tus automatizaciones. ChatGPT, Claude y otras herramientas de IA para optimizar procesos.',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
    },
  ];

  for (const courseData of courses) {
    // Verificar si el curso ya existe
    const existingCourse = await prisma.course.findFirst({
      where: { title: courseData.title }
    });

    if (!existingCourse) {
      const course = await prisma.course.create({
        data: courseData,
      });
      console.log('📚 Curso creado:', course.title);
    } else {
      console.log('📚 Curso ya existe:', courseData.title);
    }
  }

  console.log('✅ Seed completado exitosamente!');
  console.log('\n📋 Credenciales de prueba:');
  console.log('👑 Admin: admin@iancamps.dev / admin123');
  console.log('👤 Usuario: user@test.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
