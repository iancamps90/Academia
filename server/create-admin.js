const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔐 Creando usuario admin (ian@iancamps.dev)...\n');

    // Verificar si ya existe el admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'ian@iancamps.dev' }
    });

    if (existingAdmin) {
      console.log('⚠️ El admin ya existe, actualizando rol...');
      
      // Actualizar rol a admin
      const updatedAdmin = await prisma.user.update({
        where: { email: 'ian@iancamps.dev' },
        data: { role: 'admin' }
      });

      console.log('✅ Admin actualizado:');
      console.log(`   ID: ${updatedAdmin.id}`);
      console.log(`   Nombre: ${updatedAdmin.name}`);
      console.log(`   Email: ${updatedAdmin.email}`);
      console.log(`   Rol: ${updatedAdmin.role}`);
    } else {
      // Crear nuevo admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = await prisma.user.create({
        data: {
          name: 'Ian Camps',
          email: 'ian@iancamps.dev',
          password: hashedPassword,
          role: 'admin'
        }
      });

      console.log('✅ Admin creado exitosamente:');
      console.log(`   ID: ${admin.id}`);
      console.log(`   Nombre: ${admin.name}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Rol: ${admin.role}`);
      console.log(`   Contraseña: admin123 (cambiar después)`);
    }

    // Verificar que solo hay un admin
    const adminCount = await prisma.user.count({
      where: { role: 'admin' }
    });

    console.log(`\n📊 Total de admins en el sistema: ${adminCount}`);

    if (adminCount > 1) {
      console.log('⚠️ ADVERTENCIA: Hay más de un admin en el sistema');
    } else {
      console.log('✅ Perfecto: Solo hay un admin en el sistema');
    }

  } catch (error) {
    console.error('❌ Error al crear admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

