# TPIntegrador — Sistema de Gestión de Turnos Médicos

Trabajo Práctico Integrador de Programación 2 — IES Santa Fe — 2026.

Sistema web para la gestión de turnos médicos, usuarios y agendas de una clínica. Desarrollo dividido en dos etapas: backend con Node.js y frontend con Angular 21.

**Desarrollado por Ilan Pitashny y Aaron Juarez.**

---

## Organización del repositorio

```
├── backend/    <- API REST — Node.js + Express + MySQL
├── frontend/   <- Aplicación web — Angular 21 + Angular Material
└── README.md
```

Cada carpeta tiene su propio README con instrucciones específicas.

---

## Stack tecnológico

**Backend**
- Node.js + Express
- MySQL / MariaDB
- JWT — autenticación
- bcrypt — hash de contraseñas

**Frontend** *(próxima etapa)*
- Angular 21
- Angular Material

---

## Changelog

### [Semana 2] — Backend: CRUD de sedes, especialidades, coberturas y agenda
#### Agregado
- CRUD completo de sedes — solo rol `administrador`
  - Validación antes de eliminar: no puede tener usuarios ni agenda asociada
- CRUD completo de especialidades — solo rol `administrador`
  - Validación antes de eliminar: no puede tener médicos asociados en `medico_especialidad`
- CRUD completo de coberturas — solo rol `administrador`
  - Validación antes de eliminar: no puede tener usuarios asociados
  - Endpoint público `GET /coberturas/public` reutilizable desde el registro de pacientes
- CRUD completo de agenda médica — roles `medico`, `operador`, `administrador`
  - El médico solo puede gestionar su propia agenda
  - El operador puede gestionar la agenda de cualquier médico y sede
  - El paciente no tiene acceso
  - Listado filtrable por médico, sede y fecha
- Script de usuarios de prueba `backend/scripts/usuarios_prueba.sql`
- Colección Postman `backend/postman/backend-semana-2.json`

### [Semana 1] — Backend: Setup y autenticación
#### Agregado
- Inicialización del proyecto Node.js + Express
- Conexión a MySQL con pool de conexiones
- Variables de entorno con dotenv
- Middleware `verificarToken` — valida JWT en requests protegidos
- Middleware `verificarRol` — valida el rol del usuario
- `GET /health` — health check del servidor
- `GET /auth/coberturas` — lista coberturas para el registro
- `POST /auth/registro` — registro de paciente con bcrypt
- `POST /auth/login` — login por DNI, devuelve JWT
- `GET /auth/perfil` — datos del usuario logueado (protegido)
- Script de base de datos `backend/scripts/clinica_ampliada.sql`
- Colección Postman `backend/postman/backend-semana-1.json`
