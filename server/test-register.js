const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

async function testRegister() {
  try {
    console.log('🧪 Probando registro de usuario...\n');

    const testUser = {
      name: 'Usuario de Prueba',
      email: 'test@academy.com',
      password: '123456'
    };

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email }
    });

    if (existingUser) {
      console.log('⚠️ El usuario ya existe, eliminándolo...');
      await prisma.user.delete({
        where: { email: testUser.email }
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    console.log('🔐 Contraseña hasheada correctamente');

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        password: hashedPassword
      }
    });

    console.log('✅ Usuario creado exitosamente:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Nombre: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Rol: ${user.role}`);
    console.log(`   Creado: ${user.createdAt.toLocaleString('es-ES')}`);

    // Generar JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'academy-super-secret-jwt-key-2025',
      { expiresIn: '7d' }
    );

    console.log('\n🎫 JWT Token generado:');
    console.log(token.substring(0, 50) + '...');

    // Verificar que el usuario se guardó
    const savedUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (savedUser) {
      console.log('\n✅ Usuario verificado en la base de datos');
    } else {
      console.log('\n❌ Error: Usuario no encontrado en la base de datos');
    }

  } catch (error) {
    console.error('❌ Error en el test de registro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegister();

