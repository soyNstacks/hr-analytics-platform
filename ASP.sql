CREATE DATABASE  IF NOT EXISTS `employee_data` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `employee_data`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: employee_data
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `attrition`
--

DROP TABLE IF EXISTS `attrition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attrition` (
  `resignation_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `resignation_date` date DEFAULT NULL,
  `resignation_reason` varchar(255) NOT NULL,
  PRIMARY KEY (`resignation_id`),
  KEY `employee_id_idx` (`employee_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attrition`
--

LOCK TABLES `attrition` WRITE;
/*!40000 ALTER TABLE `attrition` DISABLE KEYS */;
INSERT INTO `attrition` VALUES (1,1,'2022-02-10','Internship End'),(2,3,'2022-02-22','Management'),(3,5,'2022-02-27','Pay'),(4,9,'2022-02-02','Management'),(5,13,'2022-02-10','Internship End');
/*!40000 ALTER TABLE `attrition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `race` varchar(255) NOT NULL,
  `is_female` tinyint NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Ben Tan',25,'Chinese',0,'Intern','Sales'),(2,'Jimmy Ng',32,'Chinese',0,'Manager','Sales'),(3,'Lakshmi Khatri',48,'Indian',1,'Executive','Sales'),(4,'Karen Chia',25,'Chinese',1,'Support Executive','IT'),(5,'Warren Telford',45,'Caucasian',0,'Managere','IT'),(6,'Daniel Goh',26,'Chinese',0,'Devops Junior','Operations'),(7,'Ken Forrester',30,'Caucasian',0,'Devops Senior','Operations'),(8,'Norah Ghawani',32,'Malay',1,'Devops Senior','Operations'),(9,'Celina Chandrapatti',40,'Indian',1,'Senior Researcher','R&D'),(10,'Theresa Wallace',35,'Caucasian',1,'Junior Researcher','R&D'),(11,'Thomas Tan',45,'Chinese',0,'Senior Researcher','R&D'),(12,'William Seylem',52,'Caucasian',0,'Research Lead','R&D'),(13,'Derrick Lim',22,'Chinese',0,'Intern','R&D'),(14,'Sharon Sheckler',24,'Caucasian',1,'Intern','R&D');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `payment_amount` double NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `employee_id_idx` (`employee_id`),
  CONSTRAINT `id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,'2021-11-30','Salary',800),(2,1,'2021-11-30','Salary',4000),(3,2,'2021-11-30','Salary',2500),(4,3,'2021-11-30','Salary',2500),(5,4,'2021-11-30','Salary',4000),(6,5,'2021-11-30','Salary',3500),(7,6,'2021-11-30','Salary',6000),(8,7,'2021-11-30','Salary',6000),(9,8,'2021-11-30','Salary',5500),(10,9,'2021-11-30','Salary',3500),(11,10,'2021-11-30','Salary',5500),(12,11,'2021-11-30','Salary',7500),(13,12,'2021-11-30','Salary',800),(14,13,'2021-11-30','Salary',900),(15,1,'2021-12-30','Salary',4000),(16,2,'2021-12-30','Salary',2500),(17,3,'2021-12-30','Salary',2500),(18,4,'2021-12-30','Salary',4000),(19,5,'2021-12-30','Salary',3500),(20,6,'2021-12-30','Salary',6000),(21,7,'2021-12-30','Salary',6000),(22,8,'2021-12-30','Salary',5500),(23,9,'2021-12-30','Salary',3500),(24,10,'2021-12-30','Salary',5500),(25,11,'2021-12-30','Salary',7500),(26,12,'2021-12-30','Salary',800),(27,13,'2021-12-30','Salary',900),(28,1,'2022-01-30','Salary',4000),(29,2,'2022-01-30','Salary',2500),(30,3,'2022-01-30','Salary',2500),(31,4,'2022-01-30','Salary',4000),(32,5,'2022-01-30','Salary',3500),(33,6,'2022-01-30','Salary',6000),(34,7,'2022-01-30','Salary',6000),(35,8,'2022-01-30','Salary',5500),(36,9,'2022-01-30','Salary',3500),(37,10,'2022-01-30','Salary',5500),(38,11,'2022-01-30','Salary',7500),(39,12,'2022-01-30','Salary',800),(40,13,'2022-01-30','Salary',900),(41,2,'2021-11-30','Commision',600),(42,3,'2021-11-30','Commision',1200),(43,12,'2021-11-30','Research Grant',5000),(44,2,'2021-12-30','Commision',850),(45,3,'2021-12-30','Commision',1500),(46,11,'2022-01-23','Research Grant',2000),(47,3,'2022-01-30','Commision',950),(48,2,'2022-01-30','Commision',550),(49,3,'2022-01-30','Commision',950),(50,1,'2021-12-30','Overtime',250.35);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `employee_id` int NOT NULL,
  `skills` longtext NOT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `e_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (2,'Tech Support, Leadership'),(3,'Wine, Piano, C++'),(4,'mySQL, Python'),(5,'HTML, CSS, JavaScript'),(8,'mySQL, Python, CSS, AWS'),(11,'mySQL, Python'),(12,'Cybersecurity, Penetration Testing, AWS, Quantum Computing');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-01 20:47:17
