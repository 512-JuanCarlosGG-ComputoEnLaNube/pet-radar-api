# Pet Radar API

API NestJS con PostgreSQL/PostGIS y Redis.

## Levantar con Docker Compose

Necesitas Docker Desktop iniciado y configurado para contenedores Linux.

1. Si no tienes `.env`, crea uno a partir del ejemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Configura las variables de `.env`. Las credenciales de correo y el token de
   Mapbox deben ser reales para usar esas integraciones. Los valores de ejemplo
   permiten iniciar la API, pero no enviar correos ni usar mapas.

3. Desde la raiz del proyecto ejecuta:

   ```sh
   docker compose up -d
   ```

Compose construye la imagen de la API cuando no existe, inicia PostgreSQL/PostGIS
y Redis, espera sus comprobaciones de salud y ejecuta las migraciones pendientes
antes de iniciar la API. No necesitas instalar Node.js en tu computadora.

- API: http://localhost:3001/ (responde `Hello World!`).
- PostgreSQL: `localhost:5432`, con las credenciales de `.env`.
- Redis: `localhost:6379`.

Los puertos se pueden cambiar con `API_PORT`, `POSTGRES_PORT` y
`REDIS_PUBLISHED_PORT`. Dentro de Docker, la API usa `postgres:5432` y
`redis:6379`; Compose reemplaza los hosts locales de `.env`.

## Verificar y administrar

```sh
docker compose ps
docker compose logs -f pet-radar-api
docker compose down
```

`docker compose down` conserva los datos en volumenes. No uses `down -v` salvo
que quieras borrar los datos de PostgreSQL y Redis.

Despues de cambiar codigo o dependencias, reconstruye la API:

```sh
docker compose up -d --build
```

Las migraciones se ejecutan automaticamente en Docker con
`DB_MIGRATIONS_RUN=true`; `synchronize` permanece desactivado. `init.sql` habilita
PostGIS al crear una base nueva. Cambiar las credenciales de PostgreSQL en `.env`
no modifica usuarios o contrasenas de un volumen ya inicializado.

Si tienes datos creados con la configuracion anterior, respalda la base antes de
usarlos: el montaje de PostgreSQL ahora apunta a `/var/lib/postgresql/data`
y `PGDATA` usa la subcarpeta `pgdata`.
No borres volumenes para resolver problemas de arranque sin un respaldo.

## Desarrollo fuera de Docker

Completa `REDIS_HOST=localhost` y `REDIS_PORT=6379` en `.env` si aun no existen.

```sh
docker compose up -d postgres redis
npm ci
npm run migration:run
npm run start:dev
```

En este modo Nest escucha en http://localhost:3000/. Si cambias los puertos
publicados de PostgreSQL o Redis, ajusta tambien `DB_PORT` o `REDIS_PORT` en `.env`.

`.env` se excluye de Git y del contexto de construccion de Docker. Usa
`.env.example` para compartir la configuracion sin credenciales.
