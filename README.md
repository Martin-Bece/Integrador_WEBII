Sistema Hospitalario HIS (Hospital Information System)

Descripción

Este proyecto es un sistema hospitalario (HIS) desarrollado para gestionar la admisión, recepción y atención inicial de pacientes en un hospital o clínica. La aplicación permite registrar pacientes, asignar habitaciones y camas, realizar evaluaciones de enfermería y gestionar el proceso de internación y alta.

El sistema está desarrollado con Node.js, Express y PUG para renderizado del lado servidor. Utiliza MySQL como base de datos y Sequelize como ORM.

Tecnologías y Dependencias

express: Framework web para Node.js.

mysql2: Cliente MySQL para Node.js.

sequelize: ORM para modelar y acceder a la base de datos.

pug: Motor de plantillas para vistas en el servidor.

Dependencias de desarrollo

nodemon: Herramienta que reinicia automáticamente el servidor al detectar cambios en el código, útil durante el desarrollo.

sequelize-auto: Utilidad para generar modelos Sequelize automáticamente a partir de una base de datos existente.

Cómo ejecutar el proyecto

Importante: 
La aplicación debe ejecutarse usando Docker y Docker Compose. No es posible correrla correctamente con npm run start directamente debido a las dependencias de la base de datos y variables de entorno. Decidí usar docker para poder subir a railway, basandonos en el paso a paso subido a uno de los foros del aula virtual.

Requisitos

Tener instalado Docker

Pasos para levantar la aplicación

Clonar el repositorio:

git clone https://github.com/Martin-Bece/Integrador_WEBII.git
cd Integrador_WEBII

Crear un archivo .env en la raíz con las variables de entorno necesarias:

DB_NAME=bd_his
DB_USER=root
DB_PASSWORD=
DB_HOST=db
NODE_ENV=development
PORT=3000

Levantar los contenedores con Docker Compose:

docker compose up --build

Esto iniciará dos servicios:

app: el servidor Node.js con la aplicación

db: el servidor MySQL con la base de datos

El backend estará disponible en: http://localhost:3000

Base de datos

Se utiliza MySQL 8.0 en un contenedor separado. La base de datos se llama bd_his. El contenedor monta un volumen persistente db_data para conservar los datos. Además, se incluye un backup SQL en la raíz del proyecto para restaurar la base de datos con datos de prueba.

Enlaces importantes:

Repositorio GitHub: https://github.com/Martin-Bece/Integrador_WEBII.git

Aplicación desplegada: https://integradorwebii-production.up.railway.app/

Requisitos para la entrega y regularización: 

El sistema cubre el módulo de admisión y recepción de pacientes, funcionando correctamente según los requerimientos. No se implementó autenticación (no requerida), pero la aplicación permite probar el flujo sin necesidad de login. 
El proyecto está subido a GitHub con un histórico correcto de commits, y el endpoint principal para iniciar pruebas está disponible en la URL desplegada.

La interfaz está desarrollada con Bootstrap para facilitar la usabilidad.
