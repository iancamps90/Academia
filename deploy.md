# 🚀 Guía de Despliegue - Academy iancamps.dev

## 📋 Pasos para Desplegar

### 1. 📦 Crear Repositorio en GitHub
```bash
# Opción A: Usando GitHub CLI (recomendado)
gh auth login
gh repo create academy-iancamps --public --description "Academy platform for iancamps.dev" --source=. --remote=origin --push

# Opción B: Manual
# 1. Ve a https://github.com/new
# 2. Nombre: academy-iancamps
# 3. Descripción: Academy platform for iancamps.dev - React + Node.js + Stripe
# 4. Público
# 5. NO inicializar con README
# 6. Crear repositorio
```

### 2. 🔗 Conectar Repositorio Local
```bash
# Si no usaste GitHub CLI, conecta manualmente:
git remote add origin https://github.com/TU_USUARIO/academy-iancamps.git
git branch -M main
git push -u origin main
```

### 3. 🗄️ Configurar Base de Datos
```bash
# Opción A: Supabase (Recomendado)
# 1. Ve a https://supabase.com
# 2. Crea un nuevo proyecto
# 3. Copia la URL de conexión
# 4. Ejecuta migraciones:
npm run db:push
npm run db:seed

# Opción B: Neon
# 1. Ve a https://neon.tech
# 2. Crea una base de datos
# 3. Copia la URL de conexión
```

### 4. 💳 Configurar Stripe
```bash
# 1. Ve a https://stripe.com
# 2. Crea una cuenta o inicia sesión
# 3. Ve a Developers > API Keys
# 4. Copia las claves:
#    - Publishable key (pk_live_...)
#    - Secret key (sk_live_...)
# 5. Configura webhook:
#    - Endpoint: https://academy.iancamps.dev/api/purchases/webhook/stripe
#    - Eventos: checkout.session.completed
#    - Copia el webhook secret (whsec_...)
```

### 5. 🚀 Desplegar en Vercel
```bash
# Opción A: Automático (Recomendado)
# 1. Ve a https://vercel.com/new
# 2. Importa el repositorio academy-iancamps
# 3. Configura las variables de entorno:
#    - DATABASE_URL: tu_url_de_postgresql
#    - JWT_SECRET: genera_una_clave_aleatoria
#    - STRIPE_SECRET_KEY: sk_live_...
#    - STRIPE_WEBHOOK_SECRET: whsec_...
#    - FRONTEND_URL: https://academy.iancamps.dev
# 4. Deploy

# Opción B: Manual
npm i -g vercel
vercel
# Sigue las instrucciones
```

### 6. 🌐 Configurar Dominio
```bash
# 1. En Vercel Dashboard:
#    - Ve a tu proyecto
#    - Settings > Domains
#    - Agrega: academy.iancamps.dev

# 2. En tu proveedor de DNS:
#    - Crea un registro CNAME
#    - Nombre: academy
#    - Valor: cname.vercel-dns.com
```

## 🔧 Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT
JWT_SECRET="tu-clave-secreta-super-segura"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# URLs
FRONTEND_URL="https://academy.iancamps.dev"
```

## ✅ Verificación Post-Despliegue

1. **Frontend**: https://academy.iancamps.dev
2. **API Health**: https://academy.iancamps.dev/api/health
3. **Cursos**: https://academy.iancamps.dev/api/courses
4. **Registro**: https://academy.iancamps.dev/register
5. **Login**: https://academy.iancamps.dev/login

## 🎯 Credenciales de Prueba

- **Admin**: admin@iancamps.dev / admin123
- **Usuario**: user@test.com / user123

## 🆘 Solución de Problemas

### Error de Base de Datos
```bash
# Verificar conexión
npm run db:push
npm run db:seed
```

### Error de Stripe
- Verificar claves en Vercel Dashboard
- Verificar webhook endpoint
- Verificar eventos configurados

### Error de Build
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 Soporte

Si tienes problemas, revisa:
1. Logs en Vercel Dashboard
2. Variables de entorno
3. Configuración de DNS
4. Estado de Stripe Dashboard
