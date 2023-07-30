-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: flowershop
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(128) NOT NULL,
  `customerid` varchar(128) NOT NULL,
  `total` int NOT NULL,
  `products` json NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lng` decimal(10,8) NOT NULL,
  `address` varchar(200) NOT NULL,
  `status` tinyint NOT NULL,
  `createdAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderCustomer_idx` (`customerid`),
  CONSTRAINT `orderCustomer` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('4e70d24c-2e58-11ee-af72-f02f74cb559c','a5450992-2e2d-11ee-af72-f02f74cb559c',445,'[\"{\\\"id\\\":\\\"4eb971ce-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Carnations\\\",\\\"price\\\":\\\"120\\\"}\", \"{\\\"id\\\":\\\"20726477-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Chrysanthemums\\\",\\\"price\\\":\\\"100\\\"}\", \"{\\\"id\\\":\\\"67c7f891-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Dahila\\\",\\\"price\\\":\\\"225\\\"}\"]',10.73672363,-61.30371094,'Blanchisseuse Road, Blanchisseuse, Tunapuna-Piarco, TT',0,'2023-07-29 21:38:50'),('8353ab11-2e58-11ee-af72-f02f74cb559c','1c9a7582-2e2d-11ee-af72-f02f74cb559c',345,'[\"{\\\"id\\\":\\\"4eb971ce-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Carnations\\\",\\\"price\\\":\\\"120\\\"}\", \"{\\\"id\\\":\\\"67c7f891-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Dahila\\\",\\\"price\\\":\\\"225\\\"}\"]',10.38301561,-61.19659424,'Cushe Trace, Mayaro-Rio Claro, TT',1,'2023-07-29 21:40:19'),('8f3c6e3c-2e58-11ee-af72-f02f74cb559c','1c9a7582-2e2d-11ee-af72-f02f74cb559c',235,'[\"{\\\"id\\\":\\\"5d8e83c8-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Daffodil\\\",\\\"price\\\":\\\"15\\\"}\", \"{\\\"id\\\":\\\"4eb971ce-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Carnations\\\",\\\"price\\\":\\\"120\\\"}\", \"{\\\"id\\\":\\\"20726477-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Chrysanthemums\\\",\\\"price\\\":\\\"100\\\"}\"]',10.57207056,-61.25701904,'Cumuto Road, San Raphael, Couva-Tabaquite-Talparo, TT',0,'2023-07-29 21:40:39'),('9313ab89-2e58-11ee-af72-f02f74cb559c','1c9a7582-2e2d-11ee-af72-f02f74cb559c',370,'[\"{\\\"id\\\":\\\"67c7f891-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Dahila\\\",\\\"price\\\":\\\"225\\\"}\", \"{\\\"id\\\":\\\"4eb971ce-2ce2-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Carnations\\\",\\\"price\\\":\\\"120\\\"}\", \"{\\\"id\\\":\\\"f913e567-2ce1-11ee-af72-f02f74cb559c\\\",\\\"name\\\":\\\"Orchids\\\",\\\"price\\\":\\\"25\\\"}\"]',10.78259463,-61.07299805,'Matelot, Sangre Grande, TT',0,'2023-07-29 21:40:45');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-30  9:45:09
