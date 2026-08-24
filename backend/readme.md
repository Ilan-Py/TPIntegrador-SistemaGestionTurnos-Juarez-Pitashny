# Backend — Sistema de Gestión de Turnos Médicos

Backend del TP Integrador de Programación 2. Node.js + Express + MySQL.

---

## Estructura

```
backend/
├── scripts/
│   ├── clinica_ampliada.sql
│   └── usuarios_prueba.sql
├── postman/
│   ├── backend-semana-1.json
│   └── backend-semana-2.json
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── sede.controller.js
│   │   ├── cobertura.controller.js
│   │   ├── especialidad.controller.js
│   │   └── agendas.controller.js
│   ├── database/
│   │   └── database.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── sede.routes.js
│   │   ├── cobertura.routes.js
│   │   ├── especialidad.routes.js
│   │   └── agendas.routes.js
│   ├── app.js
│   └── index.js
├── .env.example
├── .gitignore
└── package.json
```

---

## Instrucciones para ejecutar

### 1 — Base de datos

- Encender XAMPP
- Importar `scripts/clinica_ampliada.sql` en phpMyAdmin

### 2 — Variables de entorno

Crear `.env` en la raíz de `backend/` copiando `.env.example`:

```
HOST=localhost
DATABASE=clinica
USER=root
PASSWORD=
JWT_SECRET=ClaveSecretaTP2026
JWT_EXPIRES_IN=8h
PORT=4000
```

### 3 — Instalar y correr

```bash
npm install
npm run dev
```

Servidor en `http://localhost:4000`

---

## Endpoints

### Semana 1 — Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /health | Health check | No |
| GET | /auth/coberturas | Coberturas disponibles para registro | No |
| POST | /auth/registro | Registro de paciente | No |
| POST | /auth/login | Login, devuelve JWT | No |
| GET | /auth/perfil | Perfil del usuario logueado | Token |

### Semana 2 — CRUD de entidades base y agenda

| Método | Ruta | Descripción | Rol |
|--------|------|-------------|-----|
| GET | /sedes | Listar sedes | administrador |
| POST | /sedes | Crear sede | administrador |
| PUT | /sedes/:id | Modificar sede | administrador |
| DELETE | /sedes/:id | Eliminar sede | administrador |
| GET | /especialidades | Listar especialidades | administrador |
| POST | /especialidades | Crear especialidad | administrador |
| PUT | /especialidades/:id | Modificar especialidad | administrador |
| DELETE | /especialidades/:id | Eliminar especialidad | administrador |
| GET | /coberturas/public | Listar coberturas sin auth | No |
| GET | /coberturas | Listar coberturas | administrador |
| POST | /coberturas | Crear cobertura | administrador |
| PUT | /coberturas/:id | Modificar cobertura | administrador |
| DELETE | /coberturas/:id | Eliminar cobertura | administrador |
| GET | /agendas | Listar agenda (filtrable por medico, sede, fecha) | medico, operador, administrador |
| POST | /agendas | Crear turno de agenda | medico, operador, administrador |
| PUT | /agendas/:id | Modificar turno de agenda | medico, operador, administrador |
| DELETE | /agendas/:id | Eliminar turno de agenda | medico, operador, administrador |

### Formato de respuesta uniforme

```json
{
  "codigo": 200,
  "estado": "ok",
  "datos": { }
}
```

---

## Credenciales de prueba

Importar `scripts/usuarios_prueba.sql` en phpMyAdmin luego de importar la base principal.

| Rol | DNI | Contraseña |
|-----|-----|------------|
| administrador | 00000001 | password123 |
| medico | 00000002 | password123 |
| operador | 00000003 | password123 |
| paciente | 00000004 | password123 |

La colección de Postman `backend/postman/backend-semana-2.json` incluye los 4 logins listos para usar.
