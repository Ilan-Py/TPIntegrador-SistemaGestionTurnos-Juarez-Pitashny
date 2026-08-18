# Backend — Sistema de Gestión de Turnos Médicos

Backend del TP Integrador de Programación 2. Node.js + Express + MySQL.

---

## Estructura

```
backend/
├── scripts/
│   └── clinica_ampliada.sql    <- Script de base de datos
├── postman/
│   └── backend-semana-1.json    <- Colección de pruebas Postman
├── src/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── database/
│   │   └── database.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── sede.routes.js
│   ├── app.js
│   └── index.js
├── .env.example
├── .gitignore
└── package.json
```

---

## Instrucciones para ejecutar

### 1 — Base de datos

- Encender XAMPP (o levantar MySQL/MariaDB por otro medio, ej. MySQL Workbench)
- Importar `scripts/clinica_ampliada.sql` en phpMyAdmin (o ejecutar el script desde Workbench: File > Open SQL Script > Run)

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
| GET | /auth/coberturas | Coberturas disponibles | No |
| POST | /auth/registro | Registro de paciente | No |
| POST | /auth/login | Login, devuelve JWT | No |
| GET | /auth/perfil | Perfil del usuario logueado | Token |
| GET | /auth/admin-only | Prueba de rol admin | Token + rol |

### Semana 1 — CRUD de sedes

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /sedes | Listado de sedes | Token + rol admin |
| POST | /sedes | Alta de sede (`nombre`, `direccion`, `telefono`) | Token + rol admin |
| PUT | /sedes/:id | Modificación de una sede existente | Token + rol admin |
| DELETE | /sedes/:id | Baja de una sede. Valida que no tenga médicos, operadores ni agenda asociada antes de eliminar (si tiene, responde 400 en vez de 500) | Token + rol admin |

### Formato de respuesta uniforme

```json
{
  "codigo": 200,
  "estado": "ok",
  "datos": { }
}
```

---

## Colección Postman

Las pruebas de los endpoints están disponibles en:

- **Link público:** https://ilan-p-s-team.postman.co/workspace/Team-Workspace~6da058d9-9eac-492e-838d-66f0b4ffacb8/folder/47962904-404c7aea-d410-4284-8e54-adcfd6eb21e0?action=share&source=copy-link&creator=47962904
- **Archivo exportado:** `backend/postman/clinica-semana1.json` (importar en Postman si se prefiere trabajar localmente)

Flujo recomendado para probar:
1. `GET /health` — verificar que el servidor está activo
2. `GET /auth/coberturas` — ver coberturas disponibles
3. `POST /auth/registro` — registrar paciente nuevo
4. `POST /auth/login` — el token se guarda automáticamente en la variable `{{token}}`
5. `GET /auth/perfil` — con token → 200
6. `GET /auth/perfil` — sin token → 401
7. `GET /auth/admin-only` — con token de paciente → 403
8. `POST /sedes` — con token de admin → 201
9. `GET /sedes` — con token de admin → 200
10. `PUT /sedes/:id` — con token de admin → 200
11. `DELETE /sedes/:id` — sede sin dependencias, con token de admin → 200
12. `DELETE /sedes/:id` — sede con médicos/agenda asociada, con token de admin → 400 (error controlado)
13. `GET /sedes` (o cualquier endpoint de sedes) — sin token → 401
14. `GET /sedes` (o cualquier endpoint de sedes) — con token de paciente → 403

---

## Credenciales de prueba

Registrar un usuario con `POST /auth/registro`. Para probar rol admin, modificar el campo `rol` directamente en phpMyAdmin (o en MySQL Workbench) con:

```sql
UPDATE usuario SET rol = 'admin' WHERE id = <id_del_usuario>;
```

Después del cambio, volver a hacer `POST /auth/login` con ese usuario para generar un token nuevo (el token viejo conserva el rol que tenía al momento de loguearse).
