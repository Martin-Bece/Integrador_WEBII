# Sistema Hospitalario HIS (Hospital Information System)

 Descripción
Este proyecto es un **sistema hospitalario (HIS)** desarrollado para gestionar el proceso completo de internación en un hospital o clínica.  

La aplicación cubre desde la admisión y recepción de pacientes, pasando por la asignación de habitaciones y camas, la evaluación inicial de enfermería y médica, hasta el alta hospitalaria, con registro en base de datos.  

El sistema está desarrollado con **Node.js, Express y PUG** (renderizado del lado del servidor), utiliza **MySQL** como base de datos y **Sequelize** como ORM.  

---

# Funcionalidades principales
- **Admisión y recepción**
  - Registro de pacientes con sus datos personales y de contacto.  
  - Asignación de habitación y cama disponible.  
- **Evaluación inicial por enfermería**
  - Verificación de datos del paciente.  
  - Registro de antecedentes médicos, cirugías, alergias, medicamentos y antecedentes familiares.  
  - Registro de motivo de internación y síntomas principales.  
  - Registro de signos vitales: presión arterial, frecuencia cardíaca, frecuencia respiratoria, temperatura, aspecto general.  
  - Elaboración de un plan de cuidados preliminar.  
- **Evaluación médica**
  - Diagnóstico inicial.  
  - Solicitud de estudios y tratamientos.  
- **Alta hospitalaria**
  - Registro de fecha de alta.  
  - Resumen de la internación.  
  - Liberación de cama y actualización de disponibilidad.  
- **Panel administrativo (ABMC)**
  - Gestión de pacientes, médicos, enfermeros, especialidades, habitaciones, camas, unidades, usuarios y mutuales.
  - Resumen General del hospital.

---

# Tecnologías y dependencias
- **express**: Framework web para Node.js.  
- **express-session**: Manejo de sesiones en el servidor.  
- **mysql2**: Cliente MySQL para Node.js.  
- **sequelize**: ORM para modelar y acceder a la base de datos.  
- **pug**: Motor de plantillas para vistas en el servidor.  
- **bcrypt**: Librería para encriptar contraseñas.  
- **bootstrap**: Framework CSS para la interfaz.   

# Dependencias de desarrollo
- **nodemon**: Reinicio automático del servidor en desarrollo.  
- **sequelize-auto**: Generación automática de modelos Sequelize a partir de la base existente.  

---

# Cómo ejecutar el proyecto

**Importante:**  
La aplicación debe ejecutarse usando **Docker y Docker Compose**.  
No es posible correrla directamente con `npm run start` debido a las dependencias de la base de datos y variables de entorno.  

# Requisitos
- Tener instalado **Docker**.  

# Pasos
1. Clonar el repositorio:

   git clone https://github.com/Martin-Bece/Integrador_WEBII.git cd Integrador_WEBII

2. Crear un archivo `.env` en la raíz con las variables de entorno necesarias:
   ```
   DB_NAME=bd_his
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=db
   NODE_ENV=development
   PORT=3000
   ```

3. Levantar los contenedores con Docker Compose:
   docker compose up --build

Esto iniciará dos servicios:
- **app:** servidor Node.js con la aplicación.  
- **db:** servidor MySQL con la base de datos.  

Acceder en: [http://localhost:3000]

---

# Usuarios de prueba

El sistema cuenta con autenticación obligatoria, por lo tanto brindo las credenciales de ejemplo para acceder a los módulos y probar el flujo completo:

*Usuario Administrador*

User: tito10203041

Contraseña: 10203041

*Usuario Medicos*

User: Luca34343434

Contraseña: 34343434

*Usuario Medicos Especialistas*

User: Martin10101011

Contraseña: 10101011

*Usuario Enfermería*

User: Federico39012345

Contraseña: 39012345

*Usuario Admisión*

User: Paula40000001

Contraseña: 40000001

--- *Aclaracion*: El medico brindado es un Traumatologo con pacientes ya asignados, si quiere probar cargando pacientes nuevos, debera utilizar el motivo "Luxación Grave" para probar el flujo completo.

# Base de datos
- Se utiliza **MySQL 8.0** en un contenedor separado.  
- Nombre de la base: `bd_his`.  
- Se monta un volumen persistente `db_data` para conservar los datos.  
- Incluye un backup SQL con datos de prueba en la raiz del proyecto.  
- La base está diseñada en **Tercera Forma Normal (3FN)**.  

---

# Enlaces importantes
- **Repositorio GitHub:** [Integrador_WEBII](https://github.com/Martin-Bece/Integrador_WEBII.git)  
- **Aplicación desplegada:** [Railway App](https://integradorwebii-production.up.railway.app/)  
// Momentaneamente desactivada por que se me vencio la licencia de Railway

---

# Estado del proyecto
 *Proyecto finalizado*.  
Cubre todos los módulos solicitados:  
- Admisión y recepción  
- Asignación de camas  
- Evaluación inicial de enfermería  
- Evaluación médica  
- Alta hospitalaria  
- Panel administrativo con ABMC de entidades  
