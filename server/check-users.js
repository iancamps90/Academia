const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Verificando usuarios en la base de datos...\n');

    // Contar usuarios
    const userCount = await prisma.user.count();
    console.log(`📊 Total de usuarios: ${userCount}`);

    if (userCount > 0) {
      // Mostrar todos los usuarios
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });

      console.log('\n👥 Usuarios encontrados:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}`);
        console.log(`   Nombre: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Rol: ${user.role}`);
        console.log(`   Creado: ${user.createdAt.toLocaleString('es-ES')}`);
        console.log('   ---');
      });
    } else {
      console.log('\n❌ No hay usuarios en la base de datos');
      console.log('💡 Intenta registrar un usuario desde la aplicación');
    }

    // Verificar cursos también
    const courseCount = await prisma.course.count();
    console.log(`\n📚 Total de cursos: ${courseCount}`);

  } catch (e) {
    console.error('❌ Error al verificar usuarios:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

