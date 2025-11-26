#  Traza Shipments - Frontend

Frontend desarrollado con Angular 18 para el sistema de gestión de envíos con cumplimiento RNDC.

## Descripción

Aplicación web SPA (Single Page Application) 

Principales Funciones:
- Panel administrativo para gestión de envíos
- Sistema de autenticación con tokens
- Rastreo de pedido sin necesidad de registro
- Diseño responsive y moderno
- Integración completa con API REST Laravel

##  Tecnologías

- **Angular**: 18.2.21
- **TypeScript**: 5.5+
- **Angular SSR**: Server-Side Rendering habilitado
- **Standalone Components**: Arquitectura Angular

##  Requisitos

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI 18.x

##  Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en http://localhost:4200
```

## URLs de la Aplicación

- **Home / Tracking Público**: http://localhost:4200
- **Login**: http://localhost:4200/login
- **Lista de Envíos**: http://localhost:4200/shipments
- **Crear Envío**: http://localhost:4200/shipments/create
- **Ver Detalle**: http://localhost:4200/shipments/:id

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                           # Módulo core
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Protección de rutas
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts    # Inyección automática de token
│   │   ├── models/
│   │   │   ├── user.model.ts          # Interface de Usuario
│   │   │   └── shipment.model.ts      # Interfaces de Envíos
│   │   └── services/
│   │       ├── auth.service.ts        # Servicio de autenticación
│   │       └── shipment.service.ts    # Servicio de envíos
│   │
│   ├── features/                       # Componentes principales
│   │   ├── auth/
│   │   │   └── login/                 # Componente de login
│   │   ├── shipments/
│   │   │   ├── shipment-list/         # Lista con paginación
│   │   │   ├── shipment-detail/       # Vista detallada
│   │   │   └── shipment-form/         # Crear/Editar
│   │   └── tracking/
│   │       └── tracking-public.component.*  # Tracking público
│   │
│   ├── shared/                         # Componentes compartidos
│   │   ├── navbar/                    # Barra de navegación
│   │   └── loading/                   # Spinner de carga
│   │
│   ├── app.component.*                # Componente raíz
│   ├── app.config.ts                  # Configuración de providers
│   └── app.routes.ts                  # Rutas de la aplicación
│
├── environments/
│   ├── environment.ts                 # Variables de desarrollo
│   └── environment.prod.ts            # Variables de producción
│
├── public/
│   └── fondobl.png                    # Imagen de fondo
│
└── assets/                            # Assets estáticos
```

## Componentes Principales

### 1. **Login Component**
- Autenticación de usuarios
- Validación de formularios
- Redirección automática
- Fondo personalizado con blur

### 2. **Shipment List Component**
- Lista paginada de envíos
- Información RNDC visible (remesa, manifiesto, placa, peso)
- Botones: Ver, Editar, Activar/Desactivar, Eliminar
- Paginado

### 3. **Shipment Detail Component**
- Vista completa del envío
- Información de participantes
- Datos RNDC
- Botones para editar o volver

### 4. **Shipment Form Component**
- Formulario reactivo con validaciones
- Modo crear y editar
- Dropdowns dinámicos (terceros, mercancías)
- Validación en tiempo real
- Campos opcionales RNDC

### 5. **Tracking Public Component**
- Búsqueda pública sin login
- Diseño moderno con gradiente
- Estados visuales del envío
- Información completa de la ruta
- Badge de activo/inactivo

### 6. **Navbar Component**
- Logo y nombre de usuario
- Botón de logout
- Responsive

## Seguridad

### Auth Guard
Protege las rutas que requieren autenticación:
```typescript
canActivate: [authGuard]
```

### Auth Interceptor
Inyecta automáticamente el token Bearer en todas las peticiones HTTP:
```typescript
headers = headers.set('Authorization', `Bearer ${token}`);
```

### Token Management
- Almacenamiento en localStorage
- Validación automática
- Limpieza al logout

## 🔄 Servicios

### AuthService
```typescript
- login(credentials): Observable<AuthResponse>
- logout(): void
- isAuthenticated(): boolean
- getToken(): string | null
- getUser(): User | null
```

### Servicios de Shipment
```typescript
- getShipments(page): Observable<PaginatedResponse>
- getShipment(id): Observable<Shipment>
- createShipment(data): Observable<Shipment>
- updateShipment(id, data): Observable<Shipment>
- deleteShipment(id): Observable<{message: string}>
- activateShipment(id): Observable<any>
- deactivateShipment(id): Observable<any>
- getThirds(): Observable<Third[]>
- getMerchandises(): Observable<Merchandise[]>
- getShipmentByTrackingNumber(tracking): Observable<Shipment>
```

##  Variables de Entorno

### development (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

### production (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.tudominio.com/api'
};
```

## Estilos

- CSS puro (no frameworks externos)
- Variables CSS para consistencia
- Animaciones importadas de proyecto github

## Comandos 

```bash
# Desarrollo
npm start                    # Iniciar servidor dev
ng serve                     # Alternativa

# Compilación
ng build                     # Build de desarrollo
ng build --configuration production  # Build de producción

# Testing
ng test                      # Ejecutar tests unitarios
ng e2e                       # Tests end-to-end

# Linting
ng lint                      # Verificar código

# Generar componentes
ng generate component nombre
ng g c nombre               # Atajo

# Generar servicios
ng generate service nombre
ng g s nombre               # Atajo
```

## 📊 Características Destacadas

### Validaciones en Tiempo Real
-  Campos requeridos se dejaron marcados con *
-  Mensajes de error específicos
-  Validación visual con bordes rojos
-  Botón submit deshabilitado si hay errores

### Manejo de Estados
-  Mensajes de error claros


## 🐛 Solución de Problemas

### Error: Can't resolve '@angular/...'
```bash
npm install
```

### Error: Port 4200 already in use
```bash
ng serve --port 4300
```

### Error: CORS en desarrollo
- Verificar que el backend esté corriendo en puerto 8000
- Verificar CORS en Laravel

### Error: 401 Unauthorized
- Verificar que el token esté en localStorage
- Login nuevamente

##  Credenciales de Prueba

```
Email: edward.gabriel@grupooet.com
Password: password
```


Hecho con Amor <3 Edward Gabriel Acosta



