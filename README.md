# 🎓 Academy - academy.iancamps.dev

Plataforma educativa para cursos, automatizaciones y productos digitales.

## 🚀 Características

- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **Pagos**: Stripe Checkout
- **Autenticación**: JWT + bcrypt
- **Animaciones**: Framer Motion
- **Deploy**: Vercel

## 📁 Estructura del Proyecto

```
academy/
├── client/          # Frontend React
├── server/          # Backend Node.js
├── .env            # Variables de entorno
└── README.md
```

## 🛠️ Instalación

1. **Instalar dependencias**:
   ```bash
   npm run install:all
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp env.example .env
   # Editar .env con tus credenciales
   ```

3. **Configurar base de datos**:
   ```bash
   cd server
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
# Base de datos
DATABASE_URL="postgresql://username:password@localhost:5432/academy_db"

# JWT
JWT_SECRET="tu-clave-secreta-jwt-aqui"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Servidor
PORT=3001
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 🗄️ Base de Datos

### Usuarios de Prueba
- **Admin**: `admin@iancamps.dev` / `admin123`
- **Usuario**: `user@test.com` / `user123`

### Comandos de Base de Datos
```bash
cd server

# Generar cliente Prisma
npm run db:generate

# Aplicar cambios al esquema
npm run db:push

# Poblar con datos de ejemplo
npm run db:seed

# Abrir Prisma Studio
npm run db:studio
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Producción**: https://academy.iancamps.dev

## 📋 Funcionalidades

### Para Usuarios
- ✅ Registro y login
- ✅ Explorar cursos
- ✅ Comprar cursos con Stripe
- ✅ Acceder a cursos comprados
- ✅ Dashboard personal

### Para Administradores
- ✅ CRUD de cursos
- ✅ Gestión de usuarios
- ✅ Panel de administración

## 🔧 Tecnologías

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Pagos**: Stripe
- **Autenticación**: JWT, bcrypt
- **Deploy**: Vercel

## 🚀 Despliegue en Vercel

### Preparación
1. **Configurar variables de entorno en Vercel**:
   - `DATABASE_URL`: URL de tu base de datos PostgreSQL (ej: Supabase, Neon, Railway)
   - `JWT_SECRET`: Clave secreta para JWT (genera una aleatoria)
   - `STRIPE_SECRET_KEY`: Clave secreta de Stripe (sk_live_...)
   - `STRIPE_WEBHOOK_SECRET`: Secreto del webhook de Stripe (whsec_...)
   - `FRONTEND_URL`: URL de tu frontend (ej: https://academy.iancamps.dev)

2. **Configurar base de datos**:
   - Usar PostgreSQL (recomendado: Supabase, Neon, o Railway)
   - Ejecutar migraciones: `npm run db:push`
   - Poblar datos: `npm run db:seed`

### Despliegue Automático
```bash
# 1. Conectar repositorio a Vercel
# Ve a https://vercel.com/new
# Importa el repositorio academy-iancamps

# 2. Configurar variables de entorno en Vercel Dashboard
# 3. Configurar dominio personalizado
vercel domains add academy.iancamps.dev
```

### Despliegue Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar dominio personalizado
vercel domains add academy.iancamps.dev
```

## 🔗 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Obtener usuario actual

### Cursos
- `GET /api/courses` - Listar todos los cursos
- `GET /api/courses/:id` - Obtener curso por ID
- `POST /api/courses` - Crear curso (admin)
- `PUT /api/courses/:id` - Actualizar curso (admin)
- `DELETE /api/courses/:id` - Eliminar curso (admin)

### Compras
- `POST /api/purchases/checkout/:id` - Crear sesión de Stripe
- `GET /api/purchases/user/courses` - Cursos del usuario
- `POST /api/purchases/webhook/stripe` - Webhook de Stripe

## 🛡️ Seguridad

- ✅ Autenticación JWT
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Helmet para headers de seguridad
- ✅ Validación de datos
- ✅ Middleware de autenticación

## 📝 Licencia

MIT © iancamps.dev 2025
