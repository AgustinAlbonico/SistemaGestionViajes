CREATE DATABASE  IF NOT EXISTS `app_camiones_bottarelli` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `app_camiones_bottarelli`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: app_camiones_bottarelli
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('botta','ferchu123','Hernan','Bottareli');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camionero`
--

DROP TABLE IF EXISTS `camionero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camionero` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camionero`
--

LOCK TABLES `camionero` WRITE;
/*!40000 ALTER TABLE `camionero` DISABLE KEYS */;
INSERT INTO `camionero` VALUES ('iare','123','Alejo','Rosso'),('test','123','Agustin','Albonico');
/*!40000 ALTER TABLE `camionero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pago` (
  `id_metodoPago` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_metodoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viaje`
--

DROP TABLE IF EXISTS `viaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viaje` (
  `nro_viaje` int NOT NULL AUTO_INCREMENT,
  `fecha_viaje` date NOT NULL,
  `fecha_hora_guardado` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `patente` varchar(7) NOT NULL,
  `cantKms` decimal(10,0) NOT NULL,
  `observaciones` varchar(100) DEFAULT NULL,
  `particular` tinyint NOT NULL,
  `origen` varchar(45) NOT NULL,
  `destino` varchar(45) NOT NULL,
  `metodoPago` varchar(45) NOT NULL,
  `movimiento` varchar(50) NOT NULL,
  `modelo` varchar(45) NOT NULL,
  `marca` varchar(45) NOT NULL,
  `excedente` decimal(10,0) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`nro_viaje`),
  KEY `fk_viaje_camionero` (`username`),
  CONSTRAINT `viaje_camionero` FOREIGN KEY (`username`) REFERENCES `camionero` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viaje`
--

LOCK TABLES `viaje` WRITE;
/*!40000 ALTER TABLE `viaje` DISABLE KEYS */;
INSERT INTO `viaje` VALUES (4,'2024-03-23','2024-03-25 20:53:01','ASD312',608,'',1,'Didn','S snsn','Efectivo','Ndndbd','Ford','Ka',NULL,'test'),(5,'2024-03-21','2024-03-25 21:06:16','ASD534',608,'',0,'Didn','S snsn','Efectivo','Ndndbd','Ford','Ka',NULL,'test'),(6,'2024-03-25','2024-03-25 21:14:09','ABC726',608,'',0,'Didn','S snsn','Efectivo','Ndndbd','Ford','Ka',NULL,'test'),(7,'2024-03-25','2024-03-25 21:14:50','ABC726',608,'',0,'Didn','S snsn','Efectivo','Ndndbd','Ford','Ka',NULL,'test'),(8,'2024-03-25','2024-03-25 21:15:26','ABC726',608,'',0,'Didn','S snsn','Efectivo','Ndndbd','Ford','Ka',NULL,'test'),(9,'2024-03-25','2024-03-25 21:19:34','ABC726',608,'',0,'Didn','S snsn','Efectivo','Ndndbd','Ford','Ka',NULL,'test'),(10,'2024-03-25','2024-03-27 00:51:58','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(11,'2024-03-25','2024-03-27 00:52:00','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(12,'2024-03-25','2024-03-27 00:52:00','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(13,'2024-03-25','2024-03-27 00:52:00','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(14,'2024-03-25','2024-03-27 00:52:00','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(15,'2024-03-25','2024-03-27 00:52:00','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(16,'2024-03-25','2024-03-27 00:52:00','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(18,'2024-03-25','2024-03-27 00:52:01','ABC726',608,NULL,0,'Didn','asdasd','Efectivo','123sacad','Ford','Ka',NULL,'test'),(19,'2024-03-29','2024-03-28 03:40:05','ADC777',635,'',0,'Villa','Cordoba','Efectivo','Juandbfbd','Kakaka','Dfnfn',NULL,'test'),(20,'2024-03-06','2024-03-28 03:45:19','JJJ653',6850,'Eskerekfbf',1,'Dnbddb','Ofndnw','Efectivo ','Jfbdbd','Nfbf','Fbfbf',NULL,'test'),(21,'2024-03-28','2024-03-28 04:34:28','JFH976',6595,'',0,'Jdbdb','Dbdb','Dhdv','Eu dbd','Djdb','Abs',NULL,'test'),(22,'2024-03-28','2024-03-28 04:46:18','HBJ816',4649,'',0,'Jsbs','Sba','Bsbs','Udhdb','Jzbs','Anab',NULL,'test'),(23,'2024-03-29','2024-03-29 22:58:00','ACS123',1546454,'Taba pesado',0,'Aca','Alla','Efestivo','Kkck','209','Wolkgswaguen',NULL,'iare');
/*!40000 ALTER TABLE `viaje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 15:36:31
