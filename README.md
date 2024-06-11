# Aplicación de Gestión y Consulta de Viajes

La aplicación se divide en tres partes:

## Servidor
La API REST está programada en Node.js, utilizando TypeScript y Prisma para la conexión con una base de datos MySQL.

## Frontend Web
Desarrollado en React.js, con las siguientes características:
- Autenticación mediante JWT.
- React Query para la consulta al backend.
- Tanstack Table para mostrar una tabla con todos los viajes, que incluye:
  - Paginación
  - Filtrado
  - Ordenación por columnas

## Aplicación Móvil
Construida en React Native, cuenta con autenticación JWT y se conecta a la API REST para realizar todas sus peticiones.
