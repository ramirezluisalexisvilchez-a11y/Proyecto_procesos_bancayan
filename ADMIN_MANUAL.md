# 🔐 Sistema de Administración Local - Shalom Envíos

## Credenciales de Administrador

**Email:** `admin@shalom.com`  
**Contraseña:** `admin123`

---

## 📋 Cómo usar el sistema

### 1. **Página Principal**
- Ve a `index.html`
- Haz clic en el botón **"🔐 Ingresar"** en la navegación superior

### 2. **Iniciar Sesión como Administrador**
- En la página de login (`usuario.html`), ingresa:
  - **Email:** `admin@shalom.com`
  - **Contraseña:** `admin123`
- Se abrirá automáticamente el **Panel de Administración** (`admin.html`)

### 3. **Iniciar Sesión como Usuario Regular**
- Crea una nueva cuenta registrándote
- O usa credenciales de usuario registradas
- Se abrirá el **Dashboard de Usuario** (`dashboard.html`)

---

## 🎯 Funcionalidades del Panel Admin

### Dashboard Principal
- **📊 Estadísticas generales** del sistema
- Envíos totales, pendientes, entregados
- Total de usuarios
- Ingresos totales generados

### Gestión de Envíos
- **Ver todos los envíos** del sistema
- **Actualizar estado** de envíos en tiempo real
- Cambiar entre estados: Pendiente → En Tránsito → Entregado → Cancelado
- Filtrar por estado
- Buscar por ID o destinatario

### Gestión de Usuarios
- **Ver todos los usuarios** registrados
- Información de contacto
- Roles (administrador/usuario)
- Fecha de registro

### Estadísticas
- Análisis de envíos por estado
- Peso promedio de envíos
- Tarifa promedio
- Información del sistema

### Configuración
- **Modificar tarifas** base y costo por kilogramo
- Limpiar todos los datos (con confirmación)
- Ver información del sistema

---

## 💾 Almacenamiento de Datos

Todos los datos se guardan en **localStorage** del navegador:

- `shalomUsers` - Lista de usuarios (con contraseñas)
- `shalomCurrentUser` - Usuario actualmente autenticado
- `shalomEnvios` - Todos los envíos registrados
- `tarifaBase` - Tarifa base configurada
- `costoKg` - Costo por kilogramo

### ⚠️ Importante
- Los datos se guardan **localmente** en el navegador
- Se perderán si se limpia el caché
- No están sincronizados entre dispositivos
- Es adecuado para desarrollo local

---

## 🔄 Flujo de Autenticación

```
[index.html] --clic en "Ingresar"--> [usuario.html]
                                           |
                                    [Ingresar credenciales]
                                           |
                                    ¿Es admin?
                                    /        \
                                 SÍ          NO
                                  |            |
                            [admin.html]  [dashboard.html]
```

---

## 📝 Crear Envíos

### Como Usuario Regular
1. Ir a Dashboard (`dashboard.html`)
2. Seleccionar **"📝 Crear Envío"**
3. Llenar formulario:
   - Destinatario
   - Teléfono
   - Email
   - Dirección
   - Ciudad/Distrito
   - Descripción
   - Peso (en kg)
4. La tarifa se calcula automáticamente
5. Enviar formulario

### Como Administrador
- No puedes crear envíos directamente
- Puedes ver y gestionar todos los envíos creados
- Puedes actualizar su estado

---

## 🔍 Rastrear Envíos

### Como Usuario
1. Ir a Dashboard
2. Seleccionar **"🔍 Rastrear"**
3. Ingresa número de envío (ej: ENV-001)
4. Ver detalles del envío

### Como Administrador
- Todos los envíos son visibles en **"📦 Todos los Envíos"**
- Puedes cambiar el estado en tiempo real

---

## 🆘 Problemas Comunes

### No aparecen los envíos
- Asegúrate de estar registrado/autenticado
- Verifica que hayas creado envíos
- Comprueba la consola del navegador (F12) para errores

### Contraseña olvidada
- Actualmente no hay recuperación de contraseña
- Crea una nueva cuenta
- O limpia localStorage y vuelve a registrarte

### Limpiar datos
- Abre la consola del navegador (F12)
- Ejecuta: `localStorage.clear()`
- Recarga la página

---

## 📦 Estructura de Datos

### Usuario
```json
{
  "id": "admin-001",
  "nombre": "Administrador",
  "email": "admin@shalom.com",
  "password": "admin123",
  "telefono": "999999999",
  "rol": "administrador",
  "fechaRegistro": "21/01/2026"
}
```

### Envío
```json
{
  "id": "ENV-123456",
  "usuario": "Juan Pérez",
  "destinatario": "María López",
  "telefono": "987654321",
  "email": "cliente@email.com",
  "direccion": "Calle 123, Lima",
  "ciudad": "Lima",
  "distrito": "San Isidro",
  "descripcion": "Paquete frágil",
  "peso": 2.5,
  "tarifa": "23.75",
  "estado": "Pendiente",
  "fechaCreacion": "2026-01-21T10:30:00.000Z"
}
```

---

## 🚀 Próximas Mejoras

- [ ] Autenticación en backend
- [ ] Base de datos en servidor
- [ ] Notificaciones por email
- [ ] Seguimiento GPS real
- [ ] Integración de pagos
- [ ] Dashboard mejorado
- [ ] Reportes avanzados

---

**Última actualización:** 21 de enero de 2026
