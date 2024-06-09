-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: app_camiones_bottarelli
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('botta','123','Hernan','Bottareli');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `camionero`
--

LOCK TABLES `camionero` WRITE;
/*!40000 ALTER TABLE `camionero` DISABLE KEYS */;
INSERT INTO `camionero` VALUES ('iare','123','Alejo','Rosso'),('test','123','Agustin','Albonico');
/*!40000 ALTER TABLE `camionero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
INSERT INTO `metodo_pago` VALUES (1,'EFECTIVO'),(2,'TRANSFERENCIA'),(3,'OTROS');
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `viaje`
--

LOCK TABLES `viaje` WRITE;
/*!40000 ALTER TABLE `viaje` DISABLE KEYS */;
INSERT INTO `viaje` VALUES (4,'2024-03-23','2024-03-25 20:53:01','ASD312',608,1,'Didn','S snsn','Ndndbd','Ford','Ka','',NULL,'test'),(5,'2024-03-21','2024-03-25 21:06:16','ASD534',608,0,'Didn','S snsn','Ndndbd','Ford','Ka','',NULL,'test'),(6,'2024-03-25','2024-03-25 21:14:09','ABC726',608,0,'Didn','S snsn','Ndndbd','Ford','Ka','',NULL,'test'),(7,'2024-03-25','2024-03-25 21:14:50','ABC726',608,0,'Didn','S snsn','Ndndbd','Ford','Ka','',NULL,'test'),(8,'2024-03-25','2024-03-25 21:15:26','ABC726',608,0,'Didn','S snsn','Ndndbd','Ford','Ka','',NULL,'test'),(9,'2024-03-25','2024-03-25 21:19:34','ABC726',608,0,'Didn','S snsn','Ndndbd','Ford','Ka','',NULL,'test'),(10,'2024-03-25','2024-03-27 00:51:58','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(11,'2024-03-25','2024-03-27 00:52:00','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(12,'2024-03-25','2024-03-27 00:52:00','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(13,'2024-03-25','2024-03-27 00:52:00','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(14,'2024-03-25','2024-03-27 00:52:00','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(15,'2024-03-25','2024-03-27 00:52:00','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(16,'2024-03-25','2024-03-27 00:52:00','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(18,'2024-03-25','2024-03-27 00:52:01','ABC726',608,0,'Didn','asdasd','123sacad','Ford','Ka',NULL,NULL,'test'),(19,'2024-03-29','2024-03-28 03:40:05','ADC777',635,0,'Villa','Cordoba','Juandbfbd','Kakaka','Dfnfn','',NULL,'test'),(20,'2024-03-06','2024-03-28 03:45:19','JJJ653',6850,1,'Dnbddb','Ofndnw','Jfbdbd','Nfbf','Fbfbf','Eskerekfbf',NULL,'test'),(21,'2024-03-28','2024-03-28 04:34:28','JFH976',6595,0,'Jdbdb','Dbdb','Eu dbd','Djdb','Abs','',NULL,'test'),(22,'2024-03-28','2024-03-28 04:46:18','HBJ816',4649,0,'Jsbs','Sba','Udhdb','Jzbs','Anab','',NULL,'test'),(23,'2024-05-01','2024-03-29 22:58:00','OKF940',357.2,1,'Aresquito','Villa Eloisa','02312311412','ka','Ford','atr pum pepa',NULL,'iare'),(29,'2024-05-02','2024-05-01 23:35:25','OKF940',650,1,'Aresquito','Villa Eloisa','02312311412','ka','Ford',NULL,NULL,'iare'),(30,'2024-03-02','2024-05-02 16:23:52','OKF940',650,1,'cañada','Villa Eloisa','02312311412','ka','Ford',NULL,NULL,'iare'),(33,'2024-03-17','2024-05-02 16:27:47','OKF940',650,1,'cañada','Villa Eloisa','02312311412','ka','Ford',NULL,NULL,'iare'),(34,'2024-05-02','2024-05-02 16:28:12','OKF940',650.7,1,'cañada','Villa Eloisa','02312311412','ka','Ford',NULL,NULL,'iare'),(35,'2024-05-02','2024-05-02 18:33:07','OKF940',650,1,'cañada','Villa Eloisa','02312311412','ka','Ford',NULL,NULL,'iare'),(36,'2024-04-29','2024-05-02 20:03:15','JJJ999',950.5,1,'Rosario ','Salta ','Jddb','Jsjsj','Jdbdb',NULL,NULL,'test');
/*!40000 ALTER TABLE `viaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `viaje_metodopago`
--

LOCK TABLES `viaje_metodopago` WRITE;
/*!40000 ALTER TABLE `viaje_metodopago` DISABLE KEYS */;
INSERT INTO `viaje_metodopago` VALUES (4,1,0),(4,2,0),(5,1,0),(6,2,0),(23,1,0),(23,2,0),(29,2,0),(30,2,0),(33,2,0),(34,2,0),(35,2,0),(36,1,0),(36,2,0);
/*!40000 ALTER TABLE `viaje_metodopago` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-15 22:52:00
