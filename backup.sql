-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: bd_his
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EmpleadosAdmision`
--

DROP TABLE IF EXISTS `EmpleadosAdmision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmpleadosAdmision` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idEmpleado`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmpleadosAdmision`
--

LOCK TABLES `EmpleadosAdmision` WRITE;
/*!40000 ALTER TABLE `EmpleadosAdmision` DISABLE KEYS */;
INSERT INTO `EmpleadosAdmision` VALUES (1,'40000001','Paula','Martinez','paula.martinez@his.com','1992-03-14','2664000001',1),(2,'40000002','Sergio','Alvarez','sergio.alvarez@his.com','1988-07-29','2664000002',1),(3,'40000003','Romina','Gomez','romina.gomez@his.com','1995-01-11','2664000003',1),(4,'40000004','Marcos','Pereyra','marcos.pereyra@his.com','1990-06-03','2664000004',1),(5,'40000005','Luca','Fernandez','lucia.fernandez@his.com','1987-04-19','2664000005',1),(6,'40000006','Claudio','Vega','claudio.vega@his.com','1993-09-23','2664000006',1),(7,'40000007','Gabriela','Soto','gabriela.soto@his.com','1991-11-30','2664000007',1),(8,'40000008','Hernan','Mendoza','hernan.mendoza@his.com','1989-02-25','2664000008',1),(9,'40000009','Valeria','Diaz','valeria.diaz@his.com','1994-12-15','2664000009',1),(10,'40000010','Matias','Cabrera','matias.cabrera@his.com','1996-08-07','2664000010',1);
/*!40000 ALTER TABLE `EmpleadosAdmision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admisiones`
--

DROP TABLE IF EXISTS `admisiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admisiones` (
  `idAdmision` int NOT NULL AUTO_INCREMENT,
  `paciente_id` int NOT NULL,
  `motivo_id` int NOT NULL,
  `origen_id` int NOT NULL,
  `fecha_admision` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('Activa','Alta') NOT NULL DEFAULT 'Activa',
  `habitacion_id` int NOT NULL,
  `cama_id` int NOT NULL,
  PRIMARY KEY (`idAdmision`),
  KEY `fk_admision_habitacion` (`habitacion_id`) USING BTREE,
  KEY `fk_admision_cama` (`cama_id`) USING BTREE,
  KEY `paciente_id` (`paciente_id`),
  KEY `motivo_id` (`motivo_id`),
  KEY `origen_id` (`origen_id`),
  CONSTRAINT `admisiones_ibfk_326` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`idPaciente`) ON UPDATE CASCADE,
  CONSTRAINT `admisiones_ibfk_327` FOREIGN KEY (`motivo_id`) REFERENCES `motivos` (`idMotivo`) ON UPDATE CASCADE,
  CONSTRAINT `admisiones_ibfk_328` FOREIGN KEY (`origen_id`) REFERENCES `origenes` (`idOrigen`) ON UPDATE CASCADE,
  CONSTRAINT `admisiones_ibfk_329` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idHabitacion`) ON UPDATE CASCADE,
  CONSTRAINT `admisiones_ibfk_330` FOREIGN KEY (`cama_id`) REFERENCES `camas` (`idCama`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admisiones`
--

LOCK TABLES `admisiones` WRITE;
/*!40000 ALTER TABLE `admisiones` DISABLE KEYS */;
INSERT INTO `admisiones` VALUES (3,7,13,1,'2025-06-02 19:05:24','Activa',44,67),(4,2,76,1,'2025-06-02 19:09:33','Activa',19,28),(5,3,14,1,'2025-06-03 16:51:30','Activa',44,68),(6,8,8,3,'2025-06-03 16:52:56','Activa',2,2),(7,10,76,1,'2025-06-03 17:05:04','Activa',39,60),(8,11,76,1,'2025-06-03 17:05:38','Activa',19,29),(9,5,34,3,'2025-06-03 17:28:11','Activa',9,12),(10,6,45,2,'2025-06-03 17:54:33','Activa',12,16),(11,12,47,3,'2025-07-25 18:51:33','Activa',32,48),(12,13,6,1,'2025-07-25 18:52:32','Activa',2,3);
/*!40000 ALTER TABLE `admisiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alas`
--

DROP TABLE IF EXISTS `alas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alas` (
  `idAla` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idAla`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alas`
--

LOCK TABLES `alas` WRITE;
/*!40000 ALTER TABLE `alas` DISABLE KEYS */;
INSERT INTO `alas` VALUES (3,'Este'),(1,'Norte'),(4,'Oeste'),(2,'Sur');
/*!40000 ALTER TABLE `alas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camas`
--

DROP TABLE IF EXISTS `camas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camas` (
  `idCama` int NOT NULL AUTO_INCREMENT,
  `habitacion_id` int NOT NULL,
  `estado` varchar(100) NOT NULL DEFAULT 'libre',
  PRIMARY KEY (`idCama`),
  KEY `habitacion_id` (`habitacion_id`),
  CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idHabitacion`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=459 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camas`
--

LOCK TABLES `camas` WRITE;
/*!40000 ALTER TABLE `camas` DISABLE KEYS */;
INSERT INTO `camas` VALUES (1,1,'libre'),(2,2,'ocupada'),(3,2,'ocupada'),(4,3,'libre'),(5,3,'libre'),(6,4,'ocupada'),(7,5,'libre'),(8,6,'libre'),(9,7,'libre'),(10,8,'libre'),(11,8,'libre'),(12,9,'ocupada'),(13,10,'libre'),(14,10,'libre'),(15,11,'libre'),(16,12,'ocupada'),(17,12,'libre'),(18,13,'libre'),(19,13,'libre'),(20,14,'libre'),(21,15,'libre'),(22,16,'libre'),(23,16,'libre'),(24,17,'libre'),(25,17,'libre'),(26,18,'libre'),(27,18,'libre'),(28,19,'ocupada'),(29,19,'ocupada'),(30,20,'libre'),(31,20,'libre'),(32,21,'libre'),(33,22,'libre'),(34,22,'libre'),(35,23,'libre'),(36,24,'ocupada'),(37,25,'libre'),(38,25,'libre'),(39,26,'libre'),(40,26,'libre'),(41,27,'libre'),(42,28,'libre'),(43,28,'libre'),(44,29,'libre'),(45,30,'libre'),(46,30,'libre'),(47,31,'libre'),(48,32,'ocupada'),(49,32,'libre'),(50,33,'libre'),(51,33,'libre'),(52,34,'libre'),(53,35,'libre'),(54,36,'libre'),(55,36,'libre'),(56,37,'libre'),(57,37,'libre'),(58,38,'libre'),(59,38,'libre'),(60,39,'ocupada'),(61,40,'libre'),(62,41,'libre'),(63,41,'libre'),(64,42,'libre'),(65,42,'libre'),(66,43,'libre'),(67,44,'ocupada'),(68,44,'ocupada'),(69,45,'libre'),(70,45,'libre'),(71,46,'libre'),(72,46,'libre'),(73,47,'libre'),(74,47,'libre'),(75,48,'libre'),(76,49,'libre'),(77,49,'libre'),(78,50,'libre'),(79,50,'libre'),(80,51,'libre'),(81,51,'libre'),(82,52,'libre'),(83,53,'libre'),(84,54,'libre'),(85,55,'libre'),(86,56,'libre'),(87,56,'libre'),(88,57,'libre'),(89,57,'libre'),(90,58,'libre'),(91,58,'libre'),(92,59,'libre'),(93,59,'libre'),(94,60,'libre'),(95,60,'libre'),(96,61,'libre'),(97,61,'libre'),(98,62,'libre'),(99,62,'libre'),(100,63,'libre'),(101,63,'libre'),(102,64,'libre'),(103,64,'libre'),(104,65,'libre'),(105,66,'libre'),(106,67,'libre'),(107,68,'libre'),(108,69,'libre'),(109,70,'libre'),(110,70,'libre'),(111,71,'libre'),(112,72,'libre'),(113,73,'libre'),(114,73,'libre'),(115,74,'libre'),(116,75,'libre'),(117,75,'libre'),(118,76,'libre'),(119,77,'libre'),(120,78,'libre'),(121,78,'libre'),(122,79,'libre'),(123,79,'libre'),(124,80,'libre'),(125,81,'libre'),(126,82,'libre'),(127,83,'libre'),(128,83,'libre'),(129,84,'libre'),(130,85,'libre'),(131,85,'libre'),(132,86,'libre'),(133,87,'libre'),(134,87,'libre'),(135,88,'libre'),(136,88,'libre'),(137,89,'libre'),(138,89,'libre'),(139,90,'libre'),(140,91,'libre'),(141,92,'libre'),(142,93,'libre'),(143,93,'libre'),(144,94,'libre'),(145,94,'libre'),(146,95,'libre'),(147,95,'libre'),(148,96,'libre'),(149,96,'libre'),(150,97,'libre'),(151,98,'libre'),(152,98,'libre'),(153,99,'libre'),(154,99,'libre'),(155,100,'libre'),(156,100,'libre'),(157,101,'libre'),(158,101,'libre'),(159,102,'libre'),(160,103,'libre'),(161,103,'libre'),(162,104,'libre'),(163,105,'libre'),(164,105,'libre'),(165,106,'libre'),(166,106,'libre'),(167,107,'libre'),(168,107,'libre'),(169,108,'libre'),(170,108,'libre'),(171,109,'libre'),(172,110,'libre'),(173,110,'libre'),(174,111,'libre'),(175,112,'libre'),(176,112,'libre'),(177,113,'libre'),(178,114,'libre'),(179,114,'libre'),(180,115,'libre'),(181,116,'libre'),(182,117,'libre'),(183,118,'libre'),(184,118,'libre'),(185,119,'libre'),(186,120,'libre'),(187,121,'libre'),(188,122,'libre'),(189,123,'libre'),(190,123,'libre'),(191,124,'libre'),(192,125,'libre'),(193,125,'libre'),(194,126,'libre'),(195,127,'libre'),(196,127,'libre'),(197,128,'libre'),(198,129,'libre'),(199,130,'libre'),(200,131,'libre'),(201,131,'libre'),(202,132,'libre'),(203,132,'libre'),(204,133,'libre'),(205,133,'libre'),(206,134,'libre'),(207,134,'libre'),(208,135,'libre'),(209,135,'libre'),(210,136,'libre'),(211,136,'libre'),(212,137,'libre'),(213,138,'libre'),(214,139,'libre'),(215,139,'libre'),(216,140,'libre'),(217,141,'libre'),(218,142,'libre'),(219,142,'libre'),(220,143,'libre'),(221,144,'libre'),(222,144,'libre'),(223,145,'libre'),(224,145,'libre'),(225,146,'libre'),(226,146,'libre'),(227,147,'libre'),(228,147,'libre'),(229,148,'libre'),(230,149,'libre'),(231,150,'libre'),(232,150,'libre'),(233,151,'libre'),(234,151,'libre'),(235,152,'libre'),(236,153,'libre'),(237,154,'libre'),(238,154,'libre'),(239,155,'libre'),(240,156,'libre'),(241,156,'libre'),(242,157,'libre'),(243,158,'libre'),(244,158,'libre'),(245,159,'libre'),(246,160,'libre'),(247,161,'libre'),(248,162,'libre'),(249,162,'libre'),(250,163,'libre'),(251,164,'libre'),(252,165,'libre'),(253,166,'libre'),(254,166,'libre'),(255,167,'libre'),(256,167,'libre'),(257,168,'libre'),(258,168,'libre'),(259,169,'libre'),(260,170,'libre'),(261,170,'libre'),(262,171,'libre'),(263,171,'libre'),(264,172,'libre'),(265,173,'libre'),(266,173,'libre'),(267,174,'libre'),(268,175,'libre'),(269,175,'libre'),(270,176,'libre'),(271,177,'libre'),(272,178,'libre'),(273,179,'libre'),(274,180,'libre'),(275,180,'libre'),(276,181,'libre'),(277,181,'libre'),(278,182,'libre'),(279,183,'libre'),(280,183,'libre'),(281,184,'libre'),(282,184,'libre'),(283,185,'libre'),(284,185,'libre'),(285,186,'libre'),(286,187,'libre'),(287,187,'libre'),(288,188,'libre'),(289,189,'libre'),(290,189,'libre'),(291,190,'libre'),(292,191,'libre'),(293,191,'libre'),(294,192,'libre'),(295,192,'libre'),(296,193,'libre'),(297,194,'libre'),(298,195,'libre'),(299,195,'libre'),(300,196,'libre'),(301,197,'libre'),(302,197,'libre'),(303,198,'libre'),(304,198,'libre'),(305,199,'libre'),(306,200,'libre'),(307,200,'libre'),(308,201,'libre'),(309,201,'libre'),(310,202,'libre'),(311,203,'libre'),(312,204,'libre'),(313,204,'libre'),(314,205,'libre'),(315,206,'libre'),(316,207,'libre'),(317,207,'libre'),(318,208,'libre'),(319,209,'libre'),(320,210,'libre'),(321,210,'libre'),(322,211,'libre'),(323,211,'libre'),(324,212,'libre'),(325,212,'libre'),(326,213,'libre'),(327,214,'libre'),(328,215,'libre'),(329,215,'libre'),(330,216,'libre'),(331,216,'libre'),(332,217,'libre'),(333,218,'libre'),(334,218,'libre'),(335,219,'libre'),(336,219,'libre'),(337,220,'libre'),(338,220,'libre'),(339,221,'libre'),(340,222,'libre'),(341,222,'libre'),(342,223,'libre'),(343,223,'libre'),(344,224,'libre'),(345,224,'libre'),(346,225,'libre'),(347,226,'libre'),(348,227,'libre'),(349,227,'libre'),(350,228,'libre'),(351,229,'libre'),(352,230,'libre'),(353,231,'libre'),(354,231,'libre'),(355,232,'libre'),(356,233,'libre'),(357,234,'libre'),(358,234,'libre'),(359,235,'libre'),(360,236,'libre'),(361,236,'libre'),(362,237,'libre'),(363,237,'libre'),(364,238,'libre'),(365,239,'libre'),(366,240,'libre'),(367,241,'libre'),(368,241,'libre'),(369,242,'libre'),(370,242,'libre'),(371,243,'libre'),(372,244,'libre'),(373,245,'libre'),(374,246,'libre'),(375,246,'libre'),(376,247,'libre'),(377,248,'libre'),(378,248,'libre'),(379,249,'libre'),(380,250,'libre'),(381,250,'libre'),(382,251,'libre'),(383,252,'libre'),(384,252,'libre'),(385,253,'libre'),(386,253,'libre'),(387,254,'libre'),(388,255,'libre'),(389,255,'libre'),(390,256,'libre'),(391,257,'libre'),(392,257,'libre'),(393,258,'libre'),(394,258,'libre'),(395,259,'libre'),(396,259,'libre'),(397,260,'libre'),(398,261,'libre'),(399,261,'libre'),(400,262,'libre'),(401,262,'libre'),(402,263,'libre'),(403,264,'libre'),(404,265,'libre'),(405,265,'libre'),(406,266,'libre'),(407,267,'libre'),(408,268,'libre'),(409,268,'libre'),(410,269,'libre'),(411,270,'libre'),(412,270,'libre'),(413,271,'libre'),(414,271,'libre'),(415,272,'libre'),(416,273,'libre'),(417,273,'libre'),(418,274,'libre'),(419,274,'libre'),(420,275,'libre'),(421,276,'libre'),(422,276,'libre'),(423,277,'libre'),(424,277,'libre'),(425,278,'libre'),(426,279,'libre'),(427,279,'libre'),(428,280,'libre'),(429,280,'libre'),(430,281,'libre'),(431,282,'libre'),(432,282,'libre'),(433,283,'libre'),(434,283,'libre'),(435,284,'libre'),(436,285,'libre'),(437,286,'libre'),(438,287,'libre'),(439,287,'libre'),(440,288,'libre'),(441,289,'libre'),(442,289,'libre'),(443,290,'libre'),(444,291,'libre'),(445,291,'libre'),(446,292,'libre'),(447,293,'libre'),(448,293,'libre'),(449,294,'libre'),(450,295,'libre'),(451,296,'libre'),(452,296,'libre'),(453,297,'libre'),(454,298,'libre'),(455,298,'libre'),(456,299,'libre'),(457,299,'libre'),(458,300,'libre');
/*!40000 ALTER TABLE `camas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enfermeros`
--

DROP TABLE IF EXISTS `enfermeros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enfermeros` (
  `idEnfermero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `matricula` varchar(30) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  PRIMARY KEY (`idEnfermero`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enfermeros`
--

LOCK TABLES `enfermeros` WRITE;
/*!40000 ALTER TABLE `enfermeros` DISABLE KEYS */;
INSERT INTO `enfermeros` VALUES (1,'Luca','Gonzalez','30123456','ENF001','1161234567','lucia.gonzalez@hospital.com','1988-04-15'),(2,'Mariano','Perez','31234567','ENF002','1162345678','mariano.perez@hospital.com','1985-06-22'),(3,'Carla','Martinez','42345678','ENF003','1163456789','carla.martinez@hospital.com','1990-11-03'),(4,'Julian','Ramirez','43456789','ENF004','1164567890','julian.ramirez@hospital.com','1987-09-10'),(5,'Ana','Torres','44567890','ENF005','1165678901','ana.torres@hospital.com','1992-01-19'),(6,'Tomas','Fernandez','35678901','ENF006','1166789012','tomas.fernandez@hospital.com','1989-07-27'),(7,'Valentina','Lopez','36789012','ENF007','1167890123','valentina.lopez@hospital.com','1991-05-08'),(8,'Diego','Sosa','37890123','ENF008','1168901234','diego.sosa@hospital.com','1986-12-30'),(9,'Micaela','Ruiz','38901234','ENF009','1169012345','micaela.ruiz@hospital.com','1993-03-14'),(10,'Federico','Vega','39012345','ENF010','1170123456','federico.vega@hospital.com','1990-08-02');
/*!40000 ALTER TABLE `enfermeros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidades` (
  `idEspecialidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idEspecialidad`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (2,'Cardiologa'),(15,'Ciruga General'),(1,'Clnica Mdica'),(17,'Cuidados Paliativos'),(20,'Emergentologa'),(16,'Endocrinologa'),(4,'Gastroenterologa'),(12,'Ginecologa'),(9,'Hematologa'),(6,'Infectologa'),(8,'Nefrologa'),(3,'Neumonologa'),(5,'Neurologa'),(13,'Obstetricia'),(10,'Oncologa Clnica'),(11,'Psiquiatra'),(18,'Reumatologa'),(19,'Terapia Intensiva'),(14,'Traumatologa y Ortopedia'),(7,'Urologa');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacion_fisica`
--

DROP TABLE IF EXISTS `evaluacion_fisica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion_fisica` (
  `id_evaluacion` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `presion_arterial` varchar(10) DEFAULT NULL,
  `frecuencia_respiratoria` int DEFAULT NULL,
  `temperatura_corporal` decimal(4,1) DEFAULT NULL,
  `color_piel` varchar(50) DEFAULT NULL,
  `observaciones` text,
  `fecha_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_evaluacion`),
  UNIQUE KEY `id_evaluacion` (`id_evaluacion`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `evaluacion_fisica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`idPaciente`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion_fisica`
--

LOCK TABLES `evaluacion_fisica` WRITE;
/*!40000 ALTER TABLE `evaluacion_fisica` DISABLE KEYS */;
INSERT INTO `evaluacion_fisica` VALUES (1,2,'120/70',100,36.9,'Normal','Se lo ve decaido, pero nada fuera de lo normal','2025-07-22 18:24:22'),(2,3,'110/60',98,38.1,'Normal','Leves tiritamientos','2025-07-22 18:30:48'),(3,12,'120/70',100,40.9,'Normal','Esta hirviendo','2025-07-25 18:56:19');
/*!40000 ALTER TABLE `evaluacion_fisica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones` (
  `idHabitacion` int NOT NULL AUTO_INCREMENT,
  `ala_id` int NOT NULL,
  `unidad_id` int NOT NULL,
  `numero` int NOT NULL,
  `capacidad` int NOT NULL,
  PRIMARY KEY (`idHabitacion`),
  KEY `fk_habitacion_unidad` (`unidad_id`) USING BTREE,
  KEY `ala_id` (`ala_id`),
  CONSTRAINT `habitaciones_ibfk_131` FOREIGN KEY (`ala_id`) REFERENCES `alas` (`idAla`) ON UPDATE CASCADE,
  CONSTRAINT `habitaciones_ibfk_132` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`idUnidad`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES (1,2,1,1,1),(2,3,2,2,2),(3,4,3,3,2),(4,1,4,4,1),(5,2,5,5,1),(6,3,6,6,1),(7,4,7,7,1),(8,1,8,8,2),(9,2,9,9,1),(10,3,10,10,2),(11,4,11,11,1),(12,1,12,12,2),(13,2,13,13,2),(14,3,14,14,1),(15,4,15,15,1),(16,1,16,16,2),(17,2,17,17,2),(18,3,18,18,2),(19,4,19,19,2),(20,1,20,20,2),(21,2,1,21,1),(22,3,2,22,2),(23,4,3,23,1),(24,1,4,24,1),(25,2,5,25,2),(26,3,6,26,2),(27,4,7,27,1),(28,1,8,28,2),(29,2,9,29,1),(30,3,10,30,2),(31,4,11,31,1),(32,1,12,32,2),(33,2,13,33,2),(34,3,14,34,1),(35,4,15,35,1),(36,1,16,36,2),(37,2,17,37,2),(38,3,18,38,2),(39,4,19,39,1),(40,1,20,40,1),(41,2,1,41,2),(42,3,2,42,2),(43,4,3,43,1),(44,1,4,44,2),(45,2,5,45,2),(46,3,6,46,2),(47,4,7,47,2),(48,1,8,48,1),(49,2,9,49,2),(50,3,10,50,2),(51,4,11,51,2),(52,1,12,52,1),(53,2,13,53,1),(54,3,14,54,1),(55,4,15,55,1),(56,1,16,56,2),(57,2,17,57,2),(58,3,18,58,2),(59,4,19,59,2),(60,1,20,60,2),(61,2,1,61,2),(62,3,2,62,2),(63,4,3,63,2),(64,1,4,64,2),(65,2,5,65,1),(66,3,6,66,1),(67,4,7,67,1),(68,1,8,68,1),(69,2,9,69,1),(70,3,10,70,2),(71,4,11,71,1),(72,1,12,72,1),(73,2,13,73,2),(74,3,14,74,1),(75,4,15,75,2),(76,1,16,76,1),(77,2,17,77,1),(78,3,18,78,2),(79,4,19,79,2),(80,1,20,80,1),(81,2,1,81,1),(82,3,2,82,1),(83,4,3,83,2),(84,1,4,84,1),(85,2,5,85,2),(86,3,6,86,1),(87,4,7,87,2),(88,1,8,88,2),(89,2,9,89,2),(90,3,10,90,1),(91,4,11,91,1),(92,1,12,92,1),(93,2,13,93,2),(94,3,14,94,2),(95,4,15,95,2),(96,1,16,96,2),(97,2,17,97,1),(98,3,18,98,2),(99,4,19,99,2),(100,1,20,100,2),(101,2,1,101,2),(102,3,2,102,1),(103,4,3,103,2),(104,1,4,104,1),(105,2,5,105,2),(106,3,6,106,2),(107,4,7,107,2),(108,1,8,108,2),(109,2,9,109,1),(110,3,10,110,2),(111,4,11,111,1),(112,1,12,112,2),(113,2,13,113,1),(114,3,14,114,2),(115,4,15,115,1),(116,1,16,116,1),(117,2,17,117,1),(118,3,18,118,2),(119,4,19,119,1),(120,1,20,120,1),(121,2,1,121,1),(122,3,2,122,1),(123,4,3,123,2),(124,1,4,124,1),(125,2,5,125,2),(126,3,6,126,1),(127,4,7,127,2),(128,1,8,128,1),(129,2,9,129,1),(130,3,10,130,1),(131,4,11,131,2),(132,1,12,132,2),(133,2,13,133,2),(134,3,14,134,2),(135,4,15,135,2),(136,1,16,136,2),(137,2,17,137,1),(138,3,18,138,1),(139,4,19,139,2),(140,1,20,140,1),(141,2,1,141,1),(142,3,2,142,2),(143,4,3,143,1),(144,1,4,144,2),(145,2,5,145,2),(146,3,6,146,2),(147,4,7,147,2),(148,1,8,148,1),(149,2,9,149,1),(150,3,10,150,2),(151,4,11,151,2),(152,1,12,152,1),(153,2,13,153,1),(154,3,14,154,2),(155,4,15,155,1),(156,1,16,156,2),(157,2,17,157,1),(158,3,18,158,2),(159,4,19,159,1),(160,1,20,160,1),(161,2,1,161,1),(162,3,2,162,2),(163,4,3,163,1),(164,1,4,164,1),(165,2,5,165,1),(166,3,6,166,2),(167,4,7,167,2),(168,1,8,168,2),(169,2,9,169,1),(170,3,10,170,2),(171,4,11,171,2),(172,1,12,172,1),(173,2,13,173,2),(174,3,14,174,1),(175,4,15,175,2),(176,1,16,176,1),(177,2,17,177,1),(178,3,18,178,1),(179,4,19,179,1),(180,1,20,180,2),(181,2,1,181,2),(182,3,2,182,1),(183,4,3,183,2),(184,1,4,184,2),(185,2,5,185,2),(186,3,6,186,1),(187,4,7,187,2),(188,1,8,188,1),(189,2,9,189,2),(190,3,10,190,1),(191,4,11,191,2),(192,1,12,192,2),(193,2,13,193,1),(194,3,14,194,1),(195,4,15,195,2),(196,1,16,196,1),(197,2,17,197,2),(198,3,18,198,2),(199,4,19,199,1),(200,1,20,200,2),(201,2,1,201,2),(202,3,2,202,1),(203,4,3,203,1),(204,1,4,204,2),(205,2,5,205,1),(206,3,6,206,1),(207,4,7,207,2),(208,1,8,208,1),(209,2,9,209,1),(210,3,10,210,2),(211,4,11,211,2),(212,1,12,212,2),(213,2,13,213,1),(214,3,14,214,1),(215,4,15,215,2),(216,1,16,216,2),(217,2,17,217,1),(218,3,18,218,2),(219,4,19,219,2),(220,1,20,220,2),(221,2,1,221,1),(222,3,2,222,2),(223,4,3,223,2),(224,1,4,224,2),(225,2,5,225,1),(226,3,6,226,1),(227,4,7,227,2),(228,1,8,228,1),(229,2,9,229,1),(230,3,10,230,1),(231,4,11,231,2),(232,1,12,232,1),(233,2,13,233,1),(234,3,14,234,2),(235,4,15,235,1),(236,1,16,236,2),(237,2,17,237,2),(238,3,18,238,1),(239,4,19,239,1),(240,1,20,240,1),(241,2,1,241,2),(242,3,2,242,2),(243,4,3,243,1),(244,1,4,244,1),(245,2,5,245,1),(246,3,6,246,2),(247,4,7,247,1),(248,1,8,248,2),(249,2,9,249,1),(250,3,10,250,2),(251,4,11,251,1),(252,1,12,252,2),(253,2,13,253,2),(254,3,14,254,1),(255,4,15,255,2),(256,1,16,256,1),(257,2,17,257,2),(258,3,18,258,2),(259,4,19,259,2),(260,1,20,260,1),(261,2,1,261,2),(262,3,2,262,2),(263,4,3,263,1),(264,1,4,264,1),(265,2,5,265,2),(266,3,6,266,1),(267,4,7,267,1),(268,1,8,268,2),(269,2,9,269,1),(270,3,10,270,2),(271,4,11,271,2),(272,1,12,272,1),(273,2,13,273,2),(274,3,14,274,2),(275,4,15,275,1),(276,1,16,276,2),(277,2,17,277,2),(278,3,18,278,1),(279,4,19,279,2),(280,1,20,280,2),(281,2,1,281,1),(282,3,2,282,2),(283,4,3,283,2),(284,1,4,284,1),(285,2,5,285,1),(286,3,6,286,1),(287,4,7,287,2),(288,1,8,288,1),(289,2,9,289,2),(290,3,10,290,1),(291,4,11,291,2),(292,1,12,292,1),(293,2,13,293,2),(294,3,14,294,1),(295,4,15,295,1),(296,1,16,296,2),(297,2,17,297,1),(298,3,18,298,2),(299,4,19,299,2),(300,1,20,300,1);
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_medico`
--

DROP TABLE IF EXISTS `historial_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_medico` (
  `idHistorial` int NOT NULL AUTO_INCREMENT,
  `idPaciente` int NOT NULL,
  `enfermedades_previas` text,
  `cirugias` text,
  `alergias` text,
  `medicamentos_actuales` text,
  `antecedentes_familiares` text,
  `contacto_emergencia` varchar(255) DEFAULT NULL,
  `idSintoma` int DEFAULT NULL,
  PRIMARY KEY (`idHistorial`),
  KEY `fk_historial_sintomas` (`idSintoma`) USING BTREE,
  KEY `idPaciente` (`idPaciente`),
  CONSTRAINT `historial_medico_ibfk_15` FOREIGN KEY (`idPaciente`) REFERENCES `pacientes` (`idPaciente`) ON UPDATE CASCADE,
  CONSTRAINT `historial_medico_ibfk_16` FOREIGN KEY (`idSintoma`) REFERENCES `sintomas` (`idSintoma`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_medico`
--

LOCK TABLES `historial_medico` WRITE;
/*!40000 ALTER TABLE `historial_medico` DISABLE KEYS */;
INSERT INTO `historial_medico` VALUES (1,2,'Ninguna','Rodilla Derecha','Mosquitos, Dipirona','Ninguna','Anemia','Alina 2664259970',228),(2,3,'Ninguna','Apendicitis','Adermicina','Ninguno','Alopecía','Balatro 5556778899',40),(3,12,'Epilepsia','Cirugia de apendice','polen','Ibuprofeno 1g','Diabetes','Stefano 34613448094',139);
/*!40000 ALTER TABLE `historial_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informe_enfermero`
--

DROP TABLE IF EXISTS `informe_enfermero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informe_enfermero` (
  `id_informe` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_enfermero` int NOT NULL,
  `id_medico` int NOT NULL,
  `informe` text NOT NULL,
  `fecha_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_informe`),
  UNIQUE KEY `id_informe` (`id_informe`),
  KEY `id_enfermero` (`id_enfermero`),
  KEY `id_medico` (`id_medico`),
  CONSTRAINT `informe_enfermero_ibfk_49` FOREIGN KEY (`id_enfermero`) REFERENCES `enfermeros` (`idEnfermero`) ON UPDATE CASCADE,
  CONSTRAINT `informe_enfermero_ibfk_50` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`idMedico`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informe_enfermero`
--

LOCK TABLES `informe_enfermero` WRITE;
/*!40000 ALTER TABLE `informe_enfermero` DISABLE KEYS */;
/*!40000 ALTER TABLE `informe_enfermero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicos` (
  `idMedico` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `idEspecialidad` int DEFAULT '1',
  `dni` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idMedico`),
  UNIQUE KEY `matricula` (`matricula`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (1,'Camila','Diaz','M0001','1148932269',1,1,'11111111'),(2,'Ana','Torres','M0002','1141552250',1,1,'22222222'),(3,'Andres','Lopez','M0003','1141459180',1,1,'33333333'),(4,'Valeria','Diaz','M0004','1145505540',1,2,'44444444'),(5,'Ana','Martinez','M0005','1148459537',1,2,'55555555'),(6,'Sofia','Gomez','M0006','1146259406',1,2,'66666666'),(7,'Jose','Fernandez','M0007','1148123456',1,3,'77777777'),(8,'Raul','Perez','M0008','1146234567',1,3,'88888888'),(9,'Luca','Vega','M0009','1147123456',1,3,'99999999'),(10,'Claudia','Morales','M0010','1147321987',1,4,'12345678'),(11,'Mario','Benitez','M0011','1147983245',1,4,'23456789'),(12,'Laura','Herrera','M0012','1147556482',1,4,'34567890'),(13,'Carlos','Suarez','M0013','1147665544',1,5,'45678901'),(14,'Julia','Castro','M0014','1147441223',1,5,'56789012'),(15,'Bruno','Ortega','M0015','1147223355',1,5,'67890123'),(16,'Luciano','Flores','M0016','1147112233',1,6,'78901234'),(17,'Natalia','Vargas','M0017','1147883344',1,6,'89012345'),(18,'Esteban','Cabrera','M0018','1147664433',1,6,'90123456'),(19,'Fernanda','Acosta','M0019','1147992233',1,7,'01234567'),(20,'Marcos','Luna','M0020','1147881122',1,7,'11223344'),(21,'Graciela','Sosa','M0021','1147559988',1,7,'22334455'),(22,'Sebastian','Reyes','M0022','1147221199',1,8,'33445566'),(23,'Cristina','Ibarra','M0023','1147338899',1,8,'44556677'),(24,'Emiliano','Ros','M0024','1147662233',1,8,'55667788'),(25,'Marina','Leiva','M0025','1147119988',1,9,'66778899'),(26,'Gabriela','Ojeda','M0026','1147556677',1,9,'77889900'),(27,'Federico','Salas','M0027','1147994411',1,9,'88990011'),(28,'Oscar','Cardozo','M0028','1147003322',1,10,'99001122'),(29,'Romina','Navarro','M0029','1147889988',1,10,'10101010'),(30,'Pablo','Palacios','M0030','1147445566',1,10,'20202020'),(31,'Elsa','Ferreyra','M0031','1147654388',1,11,'30303030'),(32,'Lucas','Aguirre','M0032','1147223344',1,11,'40404040'),(33,'Roxana','Garcia','M0033','1147123399',1,11,'50505050'),(34,'Alberto','Ledesma','M0034','1147336655',1,12,'60606060'),(35,'Belen','Bravo','M0035','1147667890',1,12,'70707070'),(36,'Cecilia','Delgado','M0036','1147002211',1,12,'80808080'),(37,'Jonathan','Silva','M0037','1147112234',1,13,'90909090'),(38,'Patricia','Sanchez','M0038','1147332233',1,13,'12121212'),(39,'Alejandro','Mansilla','M0039','1147221234',1,13,'23232323'),(40,'Luca','Alonso','M0040','1147445567',1,14,'34343434'),(41,'Ivan','Campos','M0041','1147884455',1,14,'45454545'),(42,'Andrea','Nuez','M0042','1147556678',1,14,'56565656'),(43,'Felipe','Dominguez','M0043','1147223345',1,15,'67676767'),(44,'Mercedes','Ayala','M0044','1147553322',1,15,'78787878'),(45,'Tomas','Villalba','M0045','1147995566',1,15,'89898989'),(46,'Martina','Paredes','M0046','1147883345',1,16,'90909091'),(47,'Elena','Correa','M0047','1147447788',1,16,'81818181'),(48,'Pedro','Molina','M0048','1147008877',1,16,'72727272'),(49,'Julian','Esquivel','M0049','1147223346',1,17,'63636363'),(50,'Milagros','Villar','M0050','1147553323',1,17,'54545454'),(51,'Axel','Luna','M0051','1147995567',1,17,'45454546'),(52,'Carolina','Franco','M0052','1147883346',1,18,'56565657'),(53,'Ricardo','Carrizo','M0053','1147447789',1,18,'67676768'),(54,'Yesica','Moreno','M0054','1147008878',1,18,'78787879'),(55,'Guillermo','Santana','M0055','1147223347',1,19,'89898980'),(56,'Daniela','Lozano','M0056','1147553324',1,19,'90909092'),(57,'Enzo','Peralta','M0057','1147995568',1,19,'81818182'),(58,'Tatiana','Rivero','M0058','1147883347',1,20,'72727273'),(59,'Nahuel','Acuna','M0059','1147447790',1,20,'63636364'),(60,'Jose','Rodriguez','M0060','1147008879',1,20,'54545455');
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motivos`
--

DROP TABLE IF EXISTS `motivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivos` (
  `idMotivo` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `idEspecialidad` int NOT NULL,
  PRIMARY KEY (`idMotivo`),
  UNIQUE KEY `descripcion` (`descripcion`),
  KEY `especialidad_motivos` (`idEspecialidad`) USING BTREE,
  CONSTRAINT `motivos_ibfk_1` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidades` (`idEspecialidad`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motivos`
--

LOCK TABLES `motivos` WRITE;
/*!40000 ALTER TABLE `motivos` DISABLE KEYS */;
INSERT INTO `motivos` VALUES (1,'Descompensacin metablica',1),(2,'Neumona severa',1),(3,'Fiebre de origen desconocido persistente',1),(4,'Sndrome confusional agudo',1),(5,'Insuficiencia cardaca descompensada',2),(6,'Arritmias complejas',2),(7,'Dolor precordial con sospecha de infarto',2),(8,'Crisis hipertensiva',2),(9,'Accidente cerebrovascular agudo',3),(10,'Crisis epilptica prolongada',3),(11,'Alteracin del estado de conciencia',3),(12,'Sndrome vertiginoso incapacitante',3),(13,'Fractura sea con requerimiento de ciruga',4),(14,'Luxacin grave',4),(15,'Politraumatismo',4),(16,'Dolor seo severo con inmovilidad',4),(17,'Neumona bilateral',5),(18,'Crisis asmtica grave',5),(19,'EPOC exacerbado',5),(20,'Insuficiencia respiratoria aguda',5),(21,'Hemorragia digestiva alta',6),(22,'Pancreatitis aguda',6),(23,'Obstruccin intestinal',6),(24,'Hepatitis aguda con ictericia',6),(25,'Embarazo ectpico',7),(26,'Amenaza de aborto con sangrado',7),(27,'Quiste ovrico complicado',7),(28,'Endometritis aguda',7),(29,'Clico renal refractario',8),(30,'Retencin urinaria aguda',8),(31,'Infeccin urinaria con fiebre persistente',8),(32,'Litiasis obstructiva',8),(33,'Cetoacidosis diabtica',9),(34,'Hipoglucemia severa',9),(35,'Crisis tiroidea',9),(36,'Desbalance hidroelectroltico',9),(37,'Sepsis de foco desconocido',10),(38,'Fiebre prolongada con compromiso general',10),(39,'Infeccin de piel diseminada',10),(40,'Infeccin postquirrgica severa',10),(41,'Celulitis extensa con fiebre',11),(42,'Eritema multiforme mayor',11),(43,'Infeccin por abscesos mltiples',11),(44,'Reaccin cutnea severa a medicamentos',11),(45,'Celulitis orbitaria',12),(46,'Uvetis severa',12),(47,'Trauma ocular penetrante',12),(48,'Glaucoma agudo',12),(49,'Absceso periamigdalino',13),(50,'Otitis media complicada con mastoiditis',13),(51,'Epistaxis masiva',13),(52,'Obstruccin de vas areas altas',13),(53,'Psicosis aguda',14),(54,'Riesgo suicida elevado',14),(55,'Descompensacin de trastorno bipolar',14),(56,'Agitacin psicomotriz severa',14),(57,'Evaluacin por intento de suicidio',15),(58,'Internacin por trastornos alimentarios graves',15),(59,'Evaluacin por riesgo autolesivo',15),(60,'Crisis emocional con prdida de contacto con la realidad',15),(61,'Lupus eritematoso con afectacin orgnica',16),(62,'Artritis reumatoide con brote severo',16),(63,'Vasculitis sistmica activa',16),(64,'Sndrome antifosfolpido con trombosis',16),(65,'Insuficiencia renal aguda',17),(66,'Sndrome nefrtico con edema generalizado',17),(67,'Crisis hipertensiva renal',17),(68,'Hematuria macroscpica con dolor renal',17),(69,'Anemia severa con disnea',18),(70,'Trombocitopenia con sangrado activo',18),(71,'Pancitopenia febril',18),(72,'Sospecha de linfoma agudo',18),(73,'Dolor oncolgico refractario',19),(74,'Fiebre en paciente inmunocomprometido',19),(75,'Compresin medular por metstasis',19),(76,'Sangrado tumoral activo',19),(77,'Paciente pluripatolgico descompensado',20),(78,'Sndrome febril con deterioro general',20),(79,'Caquexia por enfermedad crnica',20),(80,'Evaluacin preoperatoria urgente',20);
/*!40000 ALTER TABLE `motivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mutuales`
--

DROP TABLE IF EXISTS `mutuales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mutuales` (
  `idMutual` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idMutual`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mutuales`
--

LOCK TABLES `mutuales` WRITE;
/*!40000 ALTER TABLE `mutuales` DISABLE KEYS */;
INSERT INTO `mutuales` VALUES (11,'Accord Salud'),(3,'DOSEP'),(10,'Federada Salud'),(6,'Galeno'),(4,'IOMA'),(7,'Medicus'),(12,'Ninguna'),(8,'Omint'),(1,'OSDE'),(2,'PAMI'),(9,'Sancor Salud'),(5,'Swiss Medical');
/*!40000 ALTER TABLE `mutuales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origenes`
--

DROP TABLE IF EXISTS `origenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origenes` (
  `idOrigen` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idOrigen`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
/*!40000 ALTER TABLE `origenes` DISABLE KEYS */;
INSERT INTO `origenes` VALUES (2,'Derivacin'),(1,'Emergencia'),(3,'Turno');
/*!40000 ALTER TABLE `origenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `idPaciente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `dni` bigint NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `mutual_id` int DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idPaciente`),
  UNIQUE KEY `dni` (`dni`),
  KEY `fk_paciente_mutual` (`mutual_id`) USING BTREE,
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`mutual_id`) REFERENCES `mutuales` (`idMutual`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'Horacio','Almada',12345678,'1985-06-01','M','123456789','Calle Falsa 123',1,1),(2,'Martin','Becerra',47266622,'2006-03-23','M','2664304069','Angel Dominguez 32',3,1),(3,'Santiago','Becerra',46072720,'2004-11-06','M','2664164893','Angel Dominguez 32',1,1),(5,'Carolina','Becerra',38731849,'1995-06-14','F','2664101010','Rivadavia 1100',1,1),(6,'Ariel','Becerra',23448180,'1973-09-05','M','2664334760','Angel Dominguez 32',1,1),(7,'Juancho','Trivago',11111111,'1935-01-01','M','2612258890','Chacabuco 200',2,1),(8,'Matias','Borsasatti',12121212,'1990-03-23','M','1234121212','Santa Fe 1100',9,1),(9,NULL,NULL,12312312,NULL,'M',NULL,NULL,NULL,1),(10,'Julieta','Fernandez',22222222,'2000-06-20','F','2664334799','Manuel Lezcano 2020',7,1),(11,'Mario','Arriola',33333333,'1992-12-12','M','2665666666','La Punilla 1199',9,1),(12,'Valentino','Jazbani',47902936,'2007-05-14','O','2664701709','Jesus Maria',1,1),(13,'Geremias','Cadamuro',56562322,'2011-08-12','M','3549112233','Jesus Maria 1100',4,1);
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_de_cuidados`
--

DROP TABLE IF EXISTS `plan_de_cuidados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_de_cuidados` (
  `id_plan` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_enfermero` int NOT NULL,
  `id_paciente` int NOT NULL,
  `intervenciones_inmediatas` text NOT NULL,
  `medicamentos` text,
  `tratamiento` text,
  `fecha_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_plan`),
  UNIQUE KEY `id_plan` (`id_plan`),
  KEY `id_enfermero` (`id_enfermero`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `plan_de_cuidados_ibfk_49` FOREIGN KEY (`id_enfermero`) REFERENCES `enfermeros` (`idEnfermero`) ON UPDATE CASCADE,
  CONSTRAINT `plan_de_cuidados_ibfk_50` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`idPaciente`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_de_cuidados`
--

LOCK TABLES `plan_de_cuidados` WRITE;
/*!40000 ALTER TABLE `plan_de_cuidados` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_de_cuidados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sintomas`
--

DROP TABLE IF EXISTS `sintomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sintomas` (
  `idSintoma` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `prioridad` enum('alta','media','baja') NOT NULL,
  `idMotivo` int NOT NULL,
  PRIMARY KEY (`idSintoma`),
  KEY `fk_sintomas_motivos` (`idMotivo`) USING BTREE,
  CONSTRAINT `sintomas_ibfk_1` FOREIGN KEY (`idMotivo`) REFERENCES `motivos` (`idMotivo`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sintomas`
--

LOCK TABLES `sintomas` WRITE;
/*!40000 ALTER TABLE `sintomas` DISABLE KEYS */;
INSERT INTO `sintomas` VALUES (1,'Hiperglucemia persistente','alta',1),(2,'Sed excesiva','media',1),(3,'Fatiga','baja',1),(4,'Fiebre alta','alta',2),(5,'Tos productiva','media',2),(6,'Dolor torcico','baja',2),(7,'Fiebre prolongada','alta',3),(8,'Sudoracin nocturna','media',3),(9,'Prdida de peso','baja',3),(10,'Desorientacin','alta',4),(11,'Agitacin','media',4),(12,'Somnolencia','baja',4),(13,'Disnea','alta',5),(14,'Edema en extremidades','media',5),(15,'Fatiga','baja',5),(16,'Palpitaciones','alta',6),(17,'Mareo','media',6),(18,'Fatiga','baja',6),(19,'Dolor torcico intenso','alta',7),(20,'Nuseas','media',7),(21,'Sudoracin fra','baja',7),(22,'Dolor de cabeza severo','alta',8),(23,'Visin borrosa','media',8),(24,'Ansiedad','baja',8),(25,'Debilidad sbita','alta',9),(26,'Dificultad para hablar','media',9),(27,'Prdida de equilibrio','baja',9),(28,'Convulsiones prolongadas','alta',10),(29,'Confusin postictal','media',10),(30,'Fatiga','baja',10),(31,'Somnolencia','alta',11),(32,'Desorientacin','media',11),(33,'Letargo','baja',11),(34,'Vrtigo intenso','alta',12),(35,'Nuseas','media',12),(36,'Inestabilidad','baja',12),(37,'Dolor intenso en la zona','alta',13),(38,'Deformidad visible','media',13),(39,'Limitacin de movimiento','baja',13),(40,'Dolor intenso','alta',14),(41,'Deformidad','media',14),(42,'Hinchazn','baja',14),(43,'Dolor generalizado','alta',15),(44,'Hematomas','media',15),(45,'Confusin','baja',15),(46,'Dolor severo','alta',16),(47,'Inmovilidad de la zona afectada','media',16),(48,'Edema','baja',16),(49,'Fiebre alta','alta',17),(50,'Tos productiva','media',17),(51,'Dificultad para respirar','baja',17),(52,'Disnea severa','alta',18),(53,'Sibilancias','media',18),(54,'Tos persistente','baja',18),(55,'Disnea progresiva','alta',19),(56,'Tos crnica','media',19),(57,'Expectoracin aumentada','baja',19),(58,'Cianosis','alta',20),(59,'Taquicardia','media',20),(60,'Confusin','baja',20),(61,'Vmitos con sangre','alta',21),(62,'Dolor abdominal','media',21),(63,'Fatiga','baja',21),(64,'Dolor epigstrico intenso','alta',22),(65,'Nuseas y vmitos','media',22),(66,'Fiebre','baja',22),(67,'Distensin abdominal','alta',23),(68,'Dolor abdominal clico','media',23),(69,'Estreimiento','baja',23),(70,'Ictericia','alta',24),(71,'Fatiga','media',24),(72,'Dolor abdominal','baja',24),(73,'Dolor plvico severo','alta',25),(74,'Sangrado vaginal','media',25),(75,'Mareo','baja',25),(76,'Sangrado vaginal','alta',26),(77,'Dolor abdominal leve','media',26),(78,'Contracciones','baja',26),(79,'Dolor plvico','alta',27),(80,'Distensin abdominal','media',27),(81,'Nuseas','baja',27),(82,'Fiebre','alta',28),(83,'Dolor plvico','media',28),(84,'Secrecin vaginal','baja',28),(85,'Dolor lumbar intenso','alta',29),(86,'Nuseas','media',29),(87,'Hematuria','baja',29),(88,'Incapacidad para orinar','alta',30),(89,'Dolor suprapbico','media',30),(90,'Distensin abdominal','baja',30),(91,'Fiebre','alta',31),(92,'Disuria','media',31),(93,'Urgencia urinaria','baja',31),(94,'Dolor lumbar','alta',32),(95,'Nuseas','media',32),(96,'Hematuria','baja',32),(97,'Hiperglucemia','alta',33),(98,'Respiracin rpida','media',33),(99,'Fatiga','baja',33),(100,'Sudoracin profusa','alta',34),(101,'Confusin','media',34),(102,'Debilidad','baja',34),(103,'Taquicardia','alta',35),(104,'Nerviosismo','media',35),(105,'Prdida de peso','baja',35),(106,'Calambres musculares','alta',36),(107,'Debilidad','media',36),(108,'Confusin','baja',36),(109,'Fiebre alta','alta',37),(110,'Taquicardia','media',37),(111,'Confusin','baja',37),(112,'Fiebre','alta',38),(113,'Sudoracin nocturna','media',38),(114,'Prdida de peso','baja',38),(115,'Eritema extenso','alta',39),(116,'Dolor local','media',39),(117,'Fiebre','baja',39),(118,'Dolor intenso','alta',40),(119,'Secrecin purulenta','media',40),(120,'Fiebre','baja',40),(121,'Eritema','alta',41),(122,'Dolor local','media',41),(123,'Fiebre','baja',41),(124,'Lesiones cutneas','alta',42),(125,'Picazn','media',42),(126,'Fiebre','baja',42),(127,'Dolor localizado','alta',43),(128,'Inflamacin','media',43),(129,'Fiebre','baja',43),(130,'Eritema extenso','alta',44),(131,'Prurito intenso','media',44),(132,'Fiebre','baja',44),(133,'Dolor ocular','alta',45),(134,'Edema palpebral','media',45),(135,'Fiebre','baja',45),(136,'Dolor ocular','alta',46),(137,'Fotofobia','media',46),(138,'Visin borrosa','baja',46),(139,'Dolor intenso','alta',47),(140,'Prdida de visin','media',47),(141,'Lagrimeo','baja',47),(142,'Dolor ocular severo','alta',48),(143,'Visin borrosa','media',48),(144,'Nuseas','baja',48),(145,'Dolor de garganta','alta',49),(146,'Dificultad para tragar','media',49),(147,'Fiebre','baja',49),(148,'Dolor de odo','alta',50),(149,'Fiebre','media',50),(150,'Secrecin auditiva','baja',50),(151,'Sangrado nasal abundante','alta',51),(152,'Mareo','media',51),(153,'Debilidad','baja',51),(154,'Dificultad para respirar','alta',52),(155,'Estridor','media',52),(156,'Tos persistente','baja',52),(157,'Alucinaciones','alta',53),(158,'Delirios','media',53),(159,'Agitacin','baja',53),(160,'Ideas suicidas','alta',54),(161,'Aislamiento social','media',54),(162,'Tristeza','baja',54),(163,'Cambios de nimo','alta',55),(164,'Irritabilidad','media',55),(165,'Fatiga','baja',55),(166,'Agitacin','alta',56),(167,'Confusin','media',56),(168,'Ansiedad','baja',56),(169,'Intento de suicidio reciente','alta',57),(170,'Depresin','media',57),(171,'Aislamiento social','baja',57),(172,'Prdida de peso','alta',58),(173,'Desnutricin','media',58),(174,'Fatiga','baja',58),(175,'Conductas autolesivas','alta',59),(176,'Ansiedad','media',59),(177,'Depresin','baja',59),(178,'Desconexin de la realidad','alta',60),(179,'Confusin','media',60),(180,'Agitacin','baja',60),(181,'Fatiga','alta',61),(182,'Dolor articular','media',61),(183,'Fiebre','baja',61),(184,'Dolor articular intenso','alta',62),(185,'Rigidez matinal','media',62),(186,'Fatiga','baja',62),(187,'Lesiones cutneas','alta',63),(188,'Fiebre','media',63),(189,'Fatiga','baja',63),(190,'Dolor e inflamacin en extremidades','alta',64),(191,'Edema','media',64),(192,'Fatiga','baja',64),(193,'Disminucin del volumen urinario','alta',65),(194,'Edema','media',65),(195,'Fatiga','baja',65),(196,'Edema generalizado','alta',66),(197,'Proteinuria','media',66),(198,'Fatiga','baja',66),(199,'Dolor lumbar','alta',67),(200,'Hipertensin severa','media',67),(201,'Hematuria','baja',67),(202,'Sangrado en orina','alta',68),(203,'Dolor lumbar','media',68),(204,'Infeccin urinaria recurrente','baja',68),(205,'Disnea','alta',69),(206,'Fatiga','media',69),(207,'Palidez','baja',69),(208,'Sangrado activo','alta',70),(209,'Fatiga','media',70),(210,'Moretones','baja',70),(211,'Fiebre','alta',71),(212,'Debilidad','media',71),(213,'Palidez','baja',71),(214,'Aumento de ganglios linfticos','alta',72),(215,'Fiebre','media',72),(216,'Prdida de peso','baja',72),(217,'Dolor intenso','alta',73),(218,'Fatiga','media',73),(219,'Depresin','baja',73),(220,'Fiebre persistente','alta',74),(221,'Sudoracin nocturna','media',74),(222,'Prdida de peso','baja',74),(223,'Dolor de espalda','alta',75),(224,'Debilidad','media',75),(225,'Prdida de sensibilidad','baja',75),(226,'Sangrado activo','alta',76),(227,'Dolor localizado','media',76),(228,'Fatiga','baja',76),(229,'Fatiga','alta',77),(230,'Debilidad','media',77),(231,'Prdida de peso','baja',77),(232,'Fiebre persistente','alta',78),(233,'Sudoracin nocturna','media',78),(234,'Prdida de apetito','baja',78),(235,'Prdida de peso severa','alta',79),(236,'Debilidad generalizada','media',79),(237,'Fatiga','baja',79),(238,'Ansiedad','alta',80),(239,'Taquicardia','media',80),(240,'Nuseas','baja',80);
/*!40000 ALTER TABLE `sintomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnos` (
  `idTurno` int NOT NULL AUTO_INCREMENT,
  `paciente_id` int NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idEspecialidad` int NOT NULL,
  `idMedico` int NOT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`idTurno`),
  KEY `fk_especialidades_turnos` (`idEspecialidad`) USING BTREE,
  KEY `fk_medico_turnos` (`idMedico`) USING BTREE,
  KEY `paciente_id` (`paciente_id`),
  CONSTRAINT `turnos_ibfk_193` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`idPaciente`) ON UPDATE CASCADE,
  CONSTRAINT `turnos_ibfk_194` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidades` (`idEspecialidad`) ON UPDATE CASCADE,
  CONSTRAINT `turnos_ibfk_195` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`idMedico`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
INSERT INTO `turnos` VALUES (5,7,'2025-06-11','09:30:00',11,32,'Pendiente'),(6,8,'2025-07-04','15:30:00',18,53,'Pendiente'),(7,5,'2025-07-06','08:15:00',9,26,'Pendiente'),(8,12,'2025-07-28','16:55:00',12,36,'Atendido');
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `idUnidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idUnidad`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (2,'Cardiologa'),(15,'Ciruga General'),(1,'Clnica Mdica'),(17,'Cuidados Paliativos'),(20,'Emergentologa'),(16,'Endocrinologa'),(4,'Gastroenterologa'),(12,'Ginecologa'),(9,'Hematologa'),(6,'Infectologa'),(8,'Nefrologa'),(3,'Neumonologa'),(5,'Neurologa'),(13,'Obstetricia'),(10,'Oncologa Clnica'),(11,'Psiquiatra'),(18,'Reumatologa'),(19,'Terapia Intensiva'),(14,'Traumatologa y Ortopedia'),(7,'Urologa');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `contrasea` varchar(255) NOT NULL,
  `rol` enum('medico','admision','enfermero','admin') NOT NULL,
  `dni` varchar(20) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Camila11111111','$2b$10$PiJQFpqDLaMPezHK4Mqg8.uUuP8uRpnI/AXHXJcHLmMj0B6oSh5pu','medico','11111111'),(2,'Ana22222222','$2b$10$pWRBdIu9mTiG5jYbl4QZ0uK8R1PX5zJPnvLq7v1q5wGc4WZMr6iCy','medico','22222222'),(3,'Andres33333333','$2b$10$5VXJfYiW8k0cnPe9dDNg6O7TxgM0QXUlQ/v8YIysYOpf7DxWosD1y','medico','33333333'),(4,'Valeria44444444','$2b$10$UgUpuUzGOyI0lCwhrEkPqeITyqO1ZMs/gDGYQFQ7HlxQ5fxTeHTqK','medico','44444444'),(5,'Ana55555555','$2b$10$LzGfHZ9MnFwplgnO7DvJgu24aZwTXMZKGJ3dETjT55F3xJHpYmW5i','medico','55555555'),(6,'Sofia66666666','$2b$10$QKUReQ5AlF2Tffmx2GcT9eBlgI0pxIg7Yf4z9rITfD6SRz9YO6TDC','medico','66666666'),(7,'Jose77777777','$2b$10$Z7tRZ4Y/I6r0cq/rXxk9auKMbDxmW8npYb9Qv3cQ59FO1mnXqhbQO','medico','77777777'),(8,'Raul88888888','$2b$10$p4j8tn2MVHxqIKGYVNCF1eRRnWUpF6PPX0hbHXc92LVmQZ8EkFX66','medico','88888888'),(9,'Luca99999999','$2b$10$Yk5uYxHln.QyPQJpfTj8BuFAepTNg0duXl.NvLW0OyHh9yl1cN4cS','medico','99999999'),(10,'Claudia12345678','$2b$10$2I1mW2q8DQFxMZ2E6zv6bu4GqONZbRcMKPXLox3b6YXoIjupE/vYO','medico','12345678'),(11,'Mario23456789','$2b$10$DeogllAwtS4j10P20kKtvOIlIqOZtC5k0a8P/JcLwEbJd7RmF5hzG','medico','23456789'),(12,'Laura34567890','$2b$10$dOrLFQzESoY1PjSEahS0xOMhIY3Ksv7LgSUQxQbG2TTEcl0Ghlh7K','medico','34567890'),(13,'Carlos45678901','$2b$10$8PjrWvWbWqQVrXpLTwNG4eCzGfTnzQFKNx5zRz5Mbdlk0bBRYZ5PS','medico','45678901'),(14,'Julia56789012','$2b$10$RWMyZsw2Lf4kUJYwnDRGpO0hkXVvV8TKNkRZfn3GR9LMiqeNjpZ0u','medico','56789012'),(15,'Bruno67890123','$2b$10$MqM6LTsZHTA7uNs6Jdgo7O1v9QPRMPYyxOkc3sv4rX1QHxuZ1WHq2','medico','67890123'),(16,'Luciano78901234','$2b$10$AlIX8NhBGcKzRNYxjEgzLOHe1kOlsNQXezV1ikCI3K6UnZQ4kxxKq','medico','78901234'),(17,'Natalia89012345','$2b$10$VeRHdUKDkRgIHLb1Mp8nqOUnIr4Na4Jcw10E7QAxw9nKu7hWi05W6','medico','89012345'),(18,'Esteban90123456','$2b$10$15BtpkvQfX9sK6IGu0yWKeK79sFhQKPaRk4uZXTZ1w1k3Zx6Kqz6S','medico','90123456'),(19,'Fernanda01234567','$2b$10$p3UwnXPt2Qv2UtgX63mRMOVVbC2N2xFZbVxqKwV7FYSJoXdfKnpTa','medico','01234567'),(20,'Marcos11223344','$2b$10$Tf6pLuC5YkqOMFtNpuZxO.2dOfQ8XQqQa0Vf3/IvHa6oY.c.8r1Ce','medico','11223344'),(21,'Graciela22334455','$2b$10$LpGZrWAB4q7ep9Ckh2coDeKmTFKKeUuCwqCOckRwvA3F2Ee5m0DPq','medico','22334455'),(22,'Sebastian33445566','$2b$10$XGsyEOBjJ/8fL7cJHv/jEOe2YnXGgcUe.YAmiwwTf.jd1T4zM3q3S','medico','33445566'),(23,'Cristina44556677','$2b$10$Z79J0xjeSVvhj0zEvz4W/O4EbMaM6RUoI8LtEsMsqcrR0jE0eFzyO','medico','44556677'),(24,'Emiliano55667788','$2b$10$BdFKEprPNlm9dAqROKsxTOs0IsVK9ZcxQ/XtRIF1GE65vBqxYaNWa','medico','55667788'),(25,'Marina66778899','$2b$10$0Q8DXovF3dZB2nOSq5Jq1uV6NgjiCvt5k8o1SlMTN46HCM7QAJfXu','medico','66778899'),(26,'Gabriela77889900','$2b$10$Vymrn77HZXYMVeXkQEXv5uRwgA5gCdFthCiqHBOO4Ha3DfEvATwI2','medico','77889900'),(27,'Federico88990011','$2b$10$h7MBPBG7RLCMJmTKcdZcHe6JkU3fI0j3qcFgSnAz9D4W5q1xMKCzS','medico','88990011'),(28,'Oscar99001122','$2b$10$ZExDJJjj0cuG2QKpeJls8u0T4Odv62KmV7RmLgPlKOmPUSBR0qOge','medico','99001122'),(29,'Romina10101010','$2b$10$2nTYPj5psPBbX7S1B1hXquxNnp2FqGxnGLcbo6Yy50xczQhZf5bC2','medico','10101010'),(30,'Pablo20202020','$2b$10$hx9o5wiJWsuRe1Jtv4xReOI3ck8cwrxyg4NU8ITLcRU9nCyHf6OQe','medico','20202020'),(31,'Elsa30303030','$2b$10$p6LmZqLyD5k3m6Q1tAUKqe6bJx7bXD4p2eLdM9Xjfq.OzDcQZqNO6','medico','30303030'),(32,'Lucas40404040','$2b$10$CW8rhGUSd8z1X0IjFb7Dxut1JZ9iy6PrA/hZb7kTPX5dJBPkpybpa','medico','40404040'),(33,'Roxana50505050','$2b$10$4veE3K0G/nFZvxiYQxnF6u7HXVrlOdH7OyWxHMRD4J7T1qtdI1Qxe','medico','50505050'),(34,'Alberto60606060','$2b$10$9SOHVFtLfFifbFEM0ZC6F.Mv7rW3N8ZjHdLF8rBYA6p7uEEaGc7uq','medico','60606060'),(35,'Belen70707070','$2b$10$p0bTnXk4gkIVLj9qMvLdCeOqv6wP0skk5W3pMqp.Lvo0cQUeBbkz2','medico','70707070'),(36,'Cecilia80808080','$2b$10$p7rrACv6SZ/qxFAqODn0luSgVNVY/rEVjRX0oXnqLF4HZH7PoMOGy','medico','80808080'),(37,'Jonathan90909090','$2b$10$HfPfSTJbU6aT4hz.jtg.5uyEa5Ol0SQE6/1J1v7joZgrIlmP6yDOa','medico','90909090'),(38,'Patricia12121212','$2b$10$6cU35Nk54JJrDHzCS0u5iuUOSr6A9c14Ct5J4dyP7v7oi/k81Fuwu','medico','12121212'),(39,'Alejandro23232323','$2b$10$H0yApE5SgyB3C6r43ynCxO99yTS.0s4IYyX5BR4/6ivxdP7SvDEKq','medico','23232323'),(40,'Luca34343434','$2b$10$MrZ4RlfhLo/O0gKx3kgqwex09TxI4fymTc0txhCGYQxL0X1lb7xHO','medico','34343434'),(41,'Ivan45454545','$2b$10$kxO4ZJfFP3.KL9bRx6FVYO9SflbPmqZHgPcFgYdj7S7qHqY1YhxEa','medico','45454545'),(42,'Andrea56565656','$2b$10$hkwMjc5nN7pRoWb1g3P7fOYRCERrRRz4W6Gg1QvPLKUsfz9Iqa3Uu','medico','56565656'),(43,'Felipe67676767','$2b$10$Cmr8woVByPbDDZq5XB1GUuHDP4cPejIxIe0VNHnMTyrDO0qvSYaXW','medico','67676767'),(44,'Mercedes78787878','$2b$10$BTLT9FLQcbxZXOtW5Lc5HOKFKCQpDZq7f4c7X7c5Ty6YzVJXk/W8m','medico','78787878'),(45,'Tomas89898989','$2b$10$Z1J4qzvN7tRWm1c3k4QzreEKn7szvvAwlAqk/W7pYAxUrmp3s2E4S','medico','89898989'),(46,'Martina90909091','$2b$10$37oZJWv7CJWq1eAlBMGcQeLZoK5hJj3RWq8/ttLtchDcV65tLdP0y','medico','90909091'),(47,'Elena81818181','$2b$10$ooMnGi5ySDRr8O7O2xxyfOTLMF/FhxBqjMZLa8rZxFOEkUvC5Bph2','medico','81818181'),(48,'Pedro72727272','$2b$10$FySlQaoxrLvO5paXPR1hHeztP7EvHztBqnro4pKp8X7ikWpvTpLOe','medico','72727272'),(49,'Julian63636363','$2b$10$yqQhp2DpM2nRRIiljHS5DewLwLpDDZX6r2ydLqZYqHaCNYxQzIR3C','medico','63636363'),(50,'Milagros54545454','$2b$10$vpYVuOUQzNhQxS1g4PAO6u6TZBkZK.2fc95b2e3FP3SK6CXGvPhG2','medico','54545454'),(51,'Axel45454546','$2b$10$8kcIv3JodF1HMehJq/63WOapv4HqvDBcgZP61V9hyzo6DFRfDdIhG','medico','45454546'),(52,'Carolina56565657','$2b$10$snmQ0hPQgTxmUYXlIwFgROZb52sn6CU5vApuIBruQmQHr4UGVK6pa','medico','56565657'),(53,'Ricardo67676768','$2b$10$kHzK9LG8aDww3nq38cM3puEqpp8Ty8Wdpw8a9s0yW6UnJ3ZGLZn5K','medico','67676768'),(54,'Yesica78787879','$2b$10$hZ2/k3tqDL7/5mjA39mKOeB33hx9q3ntcILR8NTCPJ9Yr3IY5EyMO','medico','78787879'),(55,'Guillermo89898980','$2b$10$izg9JPsfQ66fj95ip1QW3uOZ22Ox7cm9i2Sm/FbvwTklPqyqXZQz2','medico','89898980'),(56,'Daniela90909092','$2b$10$uDyE7bWkUuzD8Q0BoFc4WuQHqGfSPJhUqH5+7NRCuW6HzFbLZkJea','medico','90909092'),(57,'Enzo81818182','$2b$10$PQlB2B43KYP/5hOYyTyBdeHEDjoJv5jxNwd0cLz3jIqHvPQo6ZvOm','medico','81818182'),(58,'Tatiana72727273','$2b$10$qT6HhTY0vJhdPmF2OSpR4e5wT.1Pq0QXyHj22klEe0wFKx8YvoOdQi','medico','72727273'),(59,'Nahuel63636364','$2b$10$dp1ZxIbCJO8PTSC4QpnNs.Xpb6ZVo9QfNjvSbyJvMXX8NhGnXqFZO','medico','63636364'),(60,'Jose54545455','$2b$10$Q04aEY/0YPSGYn4OT.2PzeuTQkGnPNlp46zoZYqHTAlR2E69FkGty','medico','54545455'),(71,'Luca30123456','$2b$10$x3YNbqg3HrQclTX2D5xHpu/62X.JkXBwlGgOPyR3iwz8fGhq6cK8m','enfermero','30123456'),(72,'Mariano31234567','$2b$10$jls3J5q0Q1f6Sx3Y1rWyOeA9hcPL3Jo6xA10L5ndVhMfx5UiKx5Cy','enfermero','31234567'),(73,'Carla42345678','$2b$10$ciCnVnvH4Z5JBDQ9dyavY.dhDk9brFNGQ4nGmDL2TnZLQCDN0K0Iy','enfermero','42345678'),(74,'Julian43456789','$2b$10$jHjAkW.6iFevXq6CnkZzquPHyITuUwAxxOLQO6mOhT9xOnUn3OXE6','enfermero','43456789'),(75,'Ana44567890','$2b$10$j6O42dQ2B2Wzp3vT/DaL1uYBWX3qzXL02Dceo7Uj7H0qKG9KlmqH6','enfermero','44567890'),(76,'Tomas35678901','$2b$10$5a1RHqHPHXP9sW0D3cIpneS8q23sqBW4xuQ3I7H40WKi4Rv8pQBOq','enfermero','35678901'),(77,'Valentina36789012','$2b$10$4G5W32tAq8yGHWtt6k5Gueu5cK6MGy5qKwZQeVbkT9VsGOXHP69vC','enfermero','36789012'),(78,'Diego37890123','$2b$10$EiGqxyPL5lTH5ykL.2KmgObdJu1eEkmyD5iMG3ow9okRtGr5Ixq82','enfermero','37890123'),(79,'Micaela38901234','$2b$10$Pk/HeXzB3Bx66xQFludrge61sjK16oC5INhHxhpWDXwlbXwzv2Si6','enfermero','38901234'),(80,'Federico39012345','$2b$10$NgnqWJnAP6G0z75UnO0j6uEKzQqp85d22CY4BAvWkWnAq5dWjYkWq','enfermero','39012345'),(81,'Paula40000001','$2b$10$GQKxhJuY9E7w7i5LMcvl5OLHTiQjpkuqY8H16/U37f6JqH9hFVniq','admision','40000001'),(82,'Sergio40000002','$2b$10$C2MkZ1ySxhImqZzKrI6Xuucd3ZV5P75pbYTvwVrBv6Mp9qtB7EECm','admision','40000002'),(83,'Romina40000003','$2b$10$Zsh6WFMssb4YbJ6PgCHjfuWzqH0q2mN94rL54DkHtO8ovTFrYKruK','admision','40000003'),(84,'Marcos40000004','$2b$10$Wxv8cO6HfpdR1ww9YokJ4u/4E4xZqk6AVtDCbwlzj83O3BLJ3fsdC','admision','40000004'),(85,'Luca40000005','$2b$10$D6uMk7w1n8XGfRqlS9QIxO0QWkUpNUjN7JlOxq3sVEr8oXj6qgQza','admision','40000005'),(86,'Claudio40000006','$2b$10$Pf0NpN5yCxVnRLsDzEyka.u5N/QG6m9RklCHm7rfDRnR3j4KWKuQ6','admision','40000006'),(87,'Gabriela40000007','$2b$10$8HkzSxIyLszWpGQKZBQfne8J5RwEFMxKaqg/EqaM8c/9Wf4P.zW3e','admision','40000007'),(88,'Hernan40000008','$2b$10$C0JcN.jxj2UKp4qHsTe8PuUewyMs0/yQvn6I0DYR6jfJzw4WCUcqW','admision','40000008'),(89,'Valeria40000009','$2b$10$jCy0fEJXN1XytXjWPHc4U.oxRx4Tpqkb3FmHzHSgHavv7Yi.3EAPW','admision','40000009'),(90,'Matias40000010','$2b$10$K6GVU5xzDvIF7v1YBGh4GOa4nktflTwZBrw2YrTBBjOEwI/PPFb2u','admision','40000010');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-08 20:01:42
