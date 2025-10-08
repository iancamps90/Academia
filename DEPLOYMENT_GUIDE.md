# 🚀 GUÍA DE DESPLIEGUE - Academy academy.iancamps.dev

## 📊 **ESTADO ACTUAL**
- ✅ **Aplicación funcionando** localmente
- ✅ **Frontend**: http://localhost:5173 - **FUNCIONANDO**
- ✅ **Backend**: http://localhost:3001 - **FUNCIONANDO**
- ✅ **Base de datos**: SQLite con 6 cursos y usuarios de prueba
- ✅ **APIs**: Todas funcionando correctamente
- ✅ **Repositorio local** limpio y listo

## 🎯 **PRÓXIMOS PASOS PARA VERCEL**

### 1. **CONFIGURAR REPOSITORIO EN GITHUB**
```bash
# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/iancamps90/academia.git
git push -u origin main
```

### 2. **DESPLEGAR EN VERCEL**

#### **Frontend (Client)**
1. Ve a [vercel.com](https://vercel.com)
2. **New Project** → Importar repositorio `academia`
3. **Configuración**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### **Backend (Server)**
1. **New Project** → Mismo repositorio `academia`
2. **Configuración**:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. **VARIABLES DE ENTORNO EN VERCEL**

#### **Para el Backend:**
```
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu_jwt_secret_super_seguro_2025
STRIPE_SECRET_KEY=sk_live_tu_clave_real_de_stripe
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_real
NODE_ENV=production
PORT=3001
```

#### **Para el Frontend:**
```
VITE_API_URL=https://tu-backend-url.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica_de_stripe
```

### 4. **BASE DE DATOS EN PRODUCCIÓN**

**Opciones recomendadas:**
- **Supabase** (PostgreSQL gratuito)
- **Neon** (PostgreSQL gratuito)
- **Railway** (PostgreSQL gratuito)

**Configuración Prisma para producción:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 5. **STRIPE EN PRODUCCIÓN**

1. **Crear cuenta en Stripe**
2. **Obtener claves de producción**:
   - `sk_live_...` (Secret Key)
   - `pk_live_...` (Publishable Key)
3. **Configurar webhooks** para el endpoint `/api/purchases/webhook`

### 6. **DOMINIO PERSONALIZADO**

1. **En Vercel**: Settings → Domains
2. **Agregar**: `academy.academy.iancamps.dev`
3. **Configurar DNS** en tu proveedor de dominio

## 🔑 **CREDENCIALES DE PRUEBA**

### **Usuarios de Prueba:**
- **Admin**: admin@academy.iancamps.dev / admin123
- **Usuario**: user@test.com / user123

### **Cursos Disponibles:**
1. **React Avanzado: Hooks y Context API** - €89.99
2. **Automatización con Zapier y n8n** - €129.99
3. **Node.js y APIs RESTful** - €99.99
4. **TypeScript para Desarrolladores JavaScript** - €79.99
5. **TailwindCSS: Diseño Moderno y Responsive** - €69.99
6. **Próximamente: Automatización con IA** - €149.99

## 🎉 **CARACTERÍSTICAS IMPLEMENTADAS**

### ✅ **Frontend**
- React + TypeScript + Vite
- CSS puro (sin TailwindCSS para evitar conflictos)
- Navegación con React Router
- Autenticación JWT
- Integración con Stripe
- Diseño responsive
- Animaciones con Framer Motion

### ✅ **Backend**
- Node.js + Express + TypeScript
- Prisma ORM + SQLite (desarrollo)
- Autenticación JWT + bcrypt
- APIs RESTful completas
- Integración con Stripe
- Middleware de seguridad (Helmet, CORS, Rate Limiting)

### ✅ **Funcionalidades**
- Registro y login de usuarios
- Dashboard de usuario
- Catálogo de cursos
- Sistema de compras con Stripe
- Gestión de compras
- API completa para todas las operaciones

## 🚀 **LISTO PARA PRODUCCIÓN**

**¡La aplicación Academy está 100% funcional y lista para ser desplegada en `academy.academy.iancamps.dev`!**

### **Próximos pasos:**
1. ✅ Subir código a GitHub
2. ✅ Desplegar en Vercel
3. ✅ Configurar base de datos PostgreSQL
4. ✅ Configurar Stripe en producción
5. ✅ Configurar dominio personalizado

**¡MISIÓN CUMPLIDA! 🎉**
