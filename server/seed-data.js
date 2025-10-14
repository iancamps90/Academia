const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Creando datos de prueba...\n');

    // Crear plantillas de ejemplo
    const templates = await prisma.template.createMany({
      data: [
        {
          title: 'Template E-commerce React',
          description: 'Plantilla completa de tienda online con React, TypeScript y TailwindCSS. Incluye carrito de compras, pagos con Stripe y panel de administración.',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
          category: 'web',
          published: true
        },
        {
          title: 'Automatización Zapier + n8n',
          description: 'Flujos de automatización completos para conectar APIs, bases de datos y servicios. Incluye templates para CRM, email marketing y más.',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
          category: 'automation',
          published: true
        },
        {
          title: 'Dashboard Analytics',
          description: 'Panel de control moderno con gráficos interactivos, métricas en tiempo real y exportación de datos. Perfecto para startups.',
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
          category: 'web',
          published: true
        }
      ],
      skipDuplicates: true
    });

    console.log('✅ Plantillas creadas:', templates);

    // Buscar el admin para crear artículos
    const admin = await prisma.user.findUnique({
      where: { email: 'ian@iancamps.dev' }
    });

    if (admin) {
      // Crear artículos de blog
      const articles = await prisma.article.createMany({
        data: [
          {
            title: 'Cómo crear una aplicación web moderna con React',
            content: 'En este artículo te enseñamos paso a paso cómo crear una aplicación web moderna usando React, TypeScript y las mejores prácticas de desarrollo. Cubriremos desde la configuración inicial hasta el despliegue en producción.',
            excerpt: 'Aprende a crear aplicaciones web modernas con React y TypeScript siguiendo las mejores prácticas de desarrollo.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            published: true,
            authorId: admin.id
          },
          {
            title: 'Automatización de procesos con Zapier y n8n',
            content: 'La automatización de procesos puede ahorrarte horas de trabajo manual. Te mostramos cómo usar Zapier y n8n para crear flujos de trabajo eficientes que conecten tus herramientas favoritas.',
            excerpt: 'Descubre cómo automatizar tus procesos de trabajo usando Zapier y n8n para aumentar tu productividad.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            published: true,
            authorId: admin.id
          },
          {
            title: 'Mejores prácticas de seguridad en aplicaciones web',
            content: 'La seguridad es fundamental en cualquier aplicación web. Te explicamos las mejores prácticas para proteger tu aplicación, desde la autenticación hasta la protección contra ataques comunes.',
            excerpt: 'Aprende las mejores prácticas de seguridad para proteger tu aplicación web de amenazas comunes.',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
            published: true,
            authorId: admin.id
          }
        ],
        skipDuplicates: true
      });

      console.log('✅ Artículos creados:', articles);
    } else {
      console.log('⚠️ No se encontró el admin, saltando creación de artículos');
    }

    // Mostrar resumen
    const stats = {
      users: await prisma.user.count(),
      courses: await prisma.course.count(),
      templates: await prisma.template.count(),
      articles: await prisma.article.count()
    };

    console.log('\n📊 Resumen de datos:');
    console.log(`   Usuarios: ${stats.users}`);
    console.log(`   Cursos: ${stats.courses}`);
    console.log(`   Plantillas: ${stats.templates}`);
    console.log(`   Artículos: ${stats.articles}`);

  } catch (error) {
    console.error('❌ Error al crear datos:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();

