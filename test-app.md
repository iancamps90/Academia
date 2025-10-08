# 🧪 Guía de Pruebas - Academy iancamps.dev

## 🌐 URLs de Prueba

### Frontend
- **Aplicación Principal**: http://localhost:5173
- **Landing Page**: http://localhost:5173/
- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register
- **Dashboard**: http://localhost:5173/dashboard (requiere login)

### Backend API
- **Health Check**: http://localhost:3001/health
- **API Root**: http://localhost:3001/
- **Cursos**: http://localhost:3001/api/courses
- **Registro**: http://localhost:3001/api/auth/register
- **Login**: http://localhost:3001/api/auth/login

## 🔑 Credenciales de Prueba

### Usuario Administrador
- **Email**: admin@iancamps.dev
- **Password**: admin123
- **Acceso**: Dashboard + Panel Admin

### Usuario Normal
- **Email**: user@test.com
- **Password**: user123
- **Acceso**: Dashboard

## ✅ Checklist de Pruebas

### 🎨 Frontend - Landing Page
- [ ] Hero section se muestra correctamente
- [ ] Título "Bienvenido a iancamps.dev Academy"
- [ ] Botones "Explorar Cursos" y "Crear Cuenta" funcionan
- [ ] Sección de cursos destacados muestra 2 cursos
- [ ] Diseño responsive en móvil/desktop
- [ ] Animaciones de Framer Motion funcionan

### 🔐 Autenticación
- [ ] **Registro**:
  - [ ] Formulario de registro funciona
  - [ ] Validación de campos (nombre, email, contraseña)
  - [ ] Redirección a dashboard tras registro exitoso
  - [ ] Mensaje de error si email ya existe

- [ ] **Login**:
  - [ ] Formulario de login funciona
  - [ ] Validación de credenciales
  - [ ] Redirección a dashboard tras login exitoso
  - [ ] Mensaje de error con credenciales incorrectas

### 📊 Dashboard
- [ ] Muestra nombre del usuario logueado
- [ ] Lista cursos comprados (vacía inicialmente)
- [ ] Botón "Explorar Cursos" funciona
- [ ] Estadísticas del usuario (cursos comprados, fecha de registro)
- [ ] Acciones rápidas funcionan
- [ ] Sección "Próximamente" visible

### 📚 Cursos
- [ ] **Lista de Cursos**:
  - [ ] Muestra 6 cursos de ejemplo
  - [ ] Cada curso muestra: título, descripción, precio, imagen
  - [ ] Botón "Ver detalles" funciona
  - [ ] Diseño de tarjetas con hover effects

- [ ] **Detalle de Curso**:
  - [ ] Página individual del curso
  - [ ] Información completa (título, descripción, precio)
  - [ ] Botón "Comprar Ahora" (redirige a Stripe)
  - [ ] Características del curso (acceso inmediato, garantía, etc.)

### 🛡️ Protección de Rutas
- [ ] Dashboard requiere autenticación
- [ ] Redirección a login si no está autenticado
- [ ] Panel admin solo accesible para administradores
- [ ] Usuarios normales no pueden acceder a /admin

### 🎨 UI/UX
- [ ] **Navegación**:
  - [ ] Navbar responsive
  - [ ] Logo y enlaces funcionan
  - [ ] Menú móvil funciona
  - [ ] Estado de autenticación se muestra correctamente

- [ ] **Diseño**:
  - [ ] Colores y tipografía consistentes
  - [ ] Animaciones suaves
  - [ ] Loading states
  - [ ] Notificaciones toast funcionan

### 🔧 Funcionalidades Técnicas
- [ ] **API**:
  - [ ] Health check responde 200
  - [ ] Endpoint de cursos funciona
  - [ ] Autenticación JWT funciona
  - [ ] CORS configurado correctamente

- [ ] **Base de Datos**:
  - [ ] Usuarios se crean correctamente
  - [ ] Cursos se cargan desde la base de datos
  - [ ] Relaciones entre entidades funcionan

## 🐛 Problemas Conocidos

### API de Cursos
- **Problema**: Error 500 en `/api/courses`
- **Causa**: Posible problema con la conexión a la base de datos
- **Solución**: Verificar que la base de datos esté accesible

### Stripe Checkout
- **Problema**: Botón "Comprar Ahora" no funciona
- **Causa**: Claves de Stripe son de prueba
- **Solución**: Configurar claves reales para producción

## 🎯 Pruebas de Integración

### Flujo Completo de Usuario
1. [ ] Usuario visita landing page
2. [ ] Se registra con email nuevo
3. [ ] Recibe confirmación y es redirigido a dashboard
4. [ ] Explora cursos disponibles
5. [ ] Ve detalles de un curso
6. [ ] Intenta comprar (redirige a Stripe)
7. [ ] Vuelve al dashboard

### Flujo de Administrador
1. [ ] Admin se loguea con credenciales admin
2. [ ] Accede al dashboard
3. [ ] Ve enlace al panel de administración
4. [ ] Accede al panel admin (placeholder)

## 📱 Pruebas de Responsive

### Desktop (1920x1080)
- [ ] Layout se ve correctamente
- [ ] Navegación horizontal
- [ ] Grid de cursos en 2 columnas

### Tablet (768x1024)
- [ ] Layout se adapta
- [ ] Navegación colapsa
- [ ] Grid de cursos en 1 columna

### Móvil (375x667)
- [ ] Layout móvil
- [ ] Menú hamburguesa funciona
- [ ] Texto legible
- [ ] Botones accesibles

## 🚀 Pruebas de Performance

- [ ] Página carga en menos de 3 segundos
- [ ] Animaciones son fluidas (60fps)
- [ ] No hay errores en consola
- [ ] API responde en menos de 1 segundo

## ✅ Criterios de Aceptación

La aplicación está lista para producción cuando:
- [ ] Todas las funcionalidades básicas funcionan
- [ ] Autenticación es segura
- [ ] UI es responsive y accesible
- [ ] No hay errores críticos
- [ ] Performance es aceptable
- [ ] Documentación está completa
