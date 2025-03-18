# MiMascota
# 🐾 Plataforma de Gestión de Veterinarias y Adopciones

## 📌 Descripción
Esta plataforma web integra *veterinarias* para la atención de mascotas, *fundaciones* para permitir adopciones y un *registro de avances* para el seguimiento del bienestar de las mascotas. Su propósito es mejorar la conexión entre propietarios, veterinarias y organizaciones de adopción.

## 🚀 Características
- *Gestión de Veterinaria*: Permite a las clínicas veterinarias registrar, programar y llevar el historial médico de las mascotas.
- *Adopciones*: Integración con fundaciones para gestionar el proceso de adopción.
- *Seguimiento de Mascotas*: Registro detallado de la evolución de cada mascota, incluyendo citas, tratamientos y hábitos.
- *Interfaz Amigable*: Diseño intuitivo para facilitar su uso tanto a veterinarios como a propietarios de mascotas.

## 🛠️ Tecnologías Utilizadas
- *Frontend*: React.js
- *Backend*: Node.js 
- *Base de Datos*: Turso
- *Despliegue*:

## 📚 Uso del Sistema
1. *Registro/Login*: Crea una cuenta y accede a la plataforma.
2. *Gestión de Veterinarias*: Agrega veterinarias y administra su información.
3. *Adopciones*: Explora las mascotas disponibles y gestiona solicitudes.
4. *Seguimiento*: Registra los avances y salud de tu mascota.


# Implementación de Mecanismos de Seguridad en el Sistema

## 📌 Descripción

Este proyecto tiene como objetivo definir e implementar mecanismos de seguridad en el sistema para proteger la información del sistema y de los usuarios, garantizando la **confidencialidad, integridad y disponibilidad** de los datos.

## 🎯 Objetivos

- Implementar autenticación segura mediante credenciales cifradas.
- Aplicar autorización basada en roles para restringir accesos según permisos.
- Proteger el sistema contra ataques comunes como SQL Injection, XSS, y CSRF.
- Cifrar datos sensibles almacenados en la base de datos.
- Implementar auditoría y logging de eventos de seguridad.

## ✅ Criterios de Aceptación

- 🔒 **Autenticación segura** con credenciales cifradas.
- 👥 **Control de acceso basado en roles (RBAC)**.
- 🔐 **Protección contra ataques** (inyección SQL, XSS, CSRF).
- 🔑 **Cifrado de datos sensibles** en la base de datos.
- 📝 **Registro de eventos de seguridad** (inicio de sesión, intentos fallidos, cambios críticos).

## 🛠️ Tareas a Implementar

- Configurar autenticación segura con hashing de contraseñas (`bcrypt`, `Argon2`).
- Implementar un sistema de control de acceso basado en roles (RBAC).
- Aplicar validaciones de entrada para prevenir ataques.
- Configurar **HTTPS** y reforzar la seguridad en la API.
- Registrar **logs de eventos de seguridad** en archivos o bases de datos.

## 🔍 Análisis de Requerimientos

Antes de comenzar la implementación, se consideraron los siguientes puntos:

1. **Datos a proteger**:
   - Credenciales de usuario
   - Información personal
   - Datos de veterinarias y adopciones

2. **Riesgos potenciales**:
   - Acceso no autorizado
   - Robo de datos
   - Ataques como SQL Injection, XSS, CSRF

3. **Estándares de seguridad a seguir**:
   - [OWASP Top 10](https://owasp.org/www-project-top-ten/)
   - Buenas prácticas en bases de datos y APIs

## 🔒 Implementación de Seguridad

### 🔑 Autenticación y Manejo de Credenciales

- Implementar **JWT** o sesiones para autenticación de usuarios.
- Cifrado de contraseñas con `bcrypt` o `Argon2` antes de almacenarlas.

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = "MiContraseñaSegura";

bcrypt.hash(password, saltRounds, (err, hash) => {
  console.log("Contraseña cifrada:", hash);
});
```

- Configurar autenticación de **doble factor (2FA)** (Google Authenticator o códigos SMS).

### 👥 Control de Acceso Basado en Roles (RBAC)

1. Definir roles en el sistema: **Administrador, Veterinario, Usuario, Refugio, etc.**
2. Restringir accesos según permisos con **middleware** en el backend.

```javascript
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }
    next();
  };
};

// Uso en una ruta protegida
app.get('/admin', verificarRol(['Administrador']), (req, res) => {
  res.send('Bienvenido, Administrador');
});
```

### 🛡️ Protección Contra Ataques Comunes

- **SQL Injection**: Usar consultas parametrizadas o un ORM seguro (`Sequelize`, `Prisma`).

```javascript
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("database", "user", "password", { dialect: "mysql" });

const Usuario = sequelize.define("Usuario", {
  nombre: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
});

Usuario.findOne({ where: { email: "usuario@example.com" } });
```

- **XSS**: Sanitizar entradas de usuario con `DOMPurify`.

```javascript
const DOMPurify = require('dompurify');
const sanitizedInput = DOMPurify.sanitize("<script>alert('XSS');</script>");
console.log(sanitizedInput); // ""
```

- **CSRF**: Implementar tokens CSRF en formularios y peticiones API.

```javascript
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

app.post("/form", csrfProtection, (req, res) => {
  res.send("Formulario protegido contra CSRF");
});
```

### 🔒 Cifrado y Seguridad en la Base de Datos

- **Cifrado de datos sensibles** con `AES`.

```javascript
const crypto = require('crypto');
const algoritmo = 'aes-256-cbc';
const clave = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function cifrar(texto) {
  const cifrador = crypto.createCipheriv(algoritmo, clave, iv);
  return cifrador.update(texto, 'utf8', 'hex') + cifrador.final('hex');
}

console.log("Texto cifrado:", cifrar("Información Sensible"));
```

## 💪 Pruebas y Validaciones

- Utilizar herramientas como **OWASP ZAP** o **Burp Suite** para pruebas de seguridad.
- Simular ataques para verificar la robustez del sistema.
- Analizar logs en busca de intentos de acceso sospechosos.

## 🚀 Despliegue y Monitoreo

- Implementar **alertas de seguridad** para detectar intentos de intrusión.
- Mantener **actualizadas las dependencias** y aplicar parches de seguridad regularmente.

---

## 🌍 Cómo Contribuir

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/tu_usuario/tu_proyecto.git
   ```
2. **Crear una nueva rama**:
   ```sh
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Realizar cambios y confirmarlos**:
   ```sh
   git commit -m "Añadir nueva funcionalidad"
   ```
4. **Subir los cambios**:
   ```sh
   git push origin feature/nueva-funcionalidad
   ```
5. **Crear un Pull Request** 🚀

---

## 📚 Licencia

Este proyecto está bajo la licencia **MIT**.
