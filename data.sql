-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0+deb9u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Promotion_Contain_Product`
--

DROP TABLE IF EXISTS `Promotion_Contain_Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Promotion_Contain_Product` (
  `promotionId` varchar(0) DEFAULT NULL,
  `productId` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Promotion_Contain_Product`
--

LOCK TABLES `Promotion_Contain_Product` WRITE;
/*!40000 ALTER TABLE `Promotion_Contain_Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Promotion_Contain_Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` tinyint(4) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `clockIn` varchar(8) DEFAULT NULL,
  `clockOut` varchar(8) DEFAULT NULL,
  `timeWorked` tinyint(4) DEFAULT NULL,
  `typeWork` varchar(7) DEFAULT NULL,
  `employeeId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2024-03-22','15:45:44','15:45:58',0,'Missing',6);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill` (
  `id` varchar(0) DEFAULT NULL,
  `date` varchar(0) DEFAULT NULL,
  `worth` varchar(0) DEFAULT NULL,
  `status` varchar(0) DEFAULT NULL,
  `type` varchar(0) DEFAULT NULL,
  `branchId` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_lines`
--

DROP TABLE IF EXISTS `bill_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_lines` (
  `id` varchar(0) DEFAULT NULL,
  `name` varchar(0) DEFAULT NULL,
  `price` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_lines`
--

LOCK TABLES `bill_lines` WRITE;
/*!40000 ALTER TABLE `bill_lines` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `id` tinyint(4) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `location` varchar(8) DEFAULT NULL,
  `createdDate` varchar(10) DEFAULT NULL,
  `inventoryId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (2,'BKK','bangkok','2024-03-18',2),(3,'BUU','chonburi','2024-03-21',3),(4,'Los Santos','US','2024-03-21',4);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` tinyint(4) DEFAULT NULL,
  `firstName` varchar(5) DEFAULT NULL,
  `lastName` varchar(9) DEFAULT NULL,
  `tel` int(11) DEFAULT NULL,
  `point` smallint(6) DEFAULT NULL,
  `birthDate` varchar(10) DEFAULT NULL,
  `createdDate` varchar(10) DEFAULT NULL,
  `imageUrl` varchar(41) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Alisa','Saengchan',12345678,200,'2024-04-17','2024-03-22','739f0e48-d3a8-4be1-ab70-a57054a4a62a.jpeg');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` tinyint(4) DEFAULT NULL,
  `title` varchar(7) DEFAULT NULL,
  `salaryWage` mediumint(9) DEFAULT NULL,
  `minWorkHour` tinyint(4) DEFAULT NULL,
  `firstName` varchar(7) DEFAULT NULL,
  `lastName` varchar(7) DEFAULT NULL,
  `tel` bigint(20) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birthDate` varchar(10) DEFAULT NULL,
  `biography` varchar(15) DEFAULT NULL,
  `startDate` varchar(10) DEFAULT NULL,
  `imageUrl` varchar(41) DEFAULT NULL,
  `branchId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (4,'Owner',99999,4,'Jack','Maxload',999999999,'Male','2024-03-25','CEO','2022-03-10','f5f6b6bc-8fed-4242-a0c9-50c4a367c862.jpg',2),(5,'Manager',30000,7,'Soo-jin','So',111111111,'Female','2024-01-01','Pretty manager','2023-03-01','69a7adca-7903-4c22-ae55-7efaabd813b4.jpeg',2),(6,'Owner',15000,8,'Steve','Oven',232323232,'Male','2024-02-14','simple employee','2023-03-06','4c479acc-ecae-4257-895e-dbda5921645c.jpeg',2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `id` tinyint(4) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  `unit` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Brown Sugar','Kilogram'),(2,'White Sugar','Kilogram'),(3,'Almond milk','Litre');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id` tinyint(4) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'Pattaya'),(2,'BKK'),(3,'BUU'),(4,'Los Santos');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_item`
--

DROP TABLE IF EXISTS `inventory_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_item` (
  `id` tinyint(4) DEFAULT NULL,
  `balance` tinyint(4) DEFAULT NULL,
  `minBalance` tinyint(4) DEFAULT NULL,
  `ingredientId` tinyint(4) DEFAULT NULL,
  `inventoryId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_item`
--

LOCK TABLES `inventory_item` WRITE;
/*!40000 ALTER TABLE `inventory_item` DISABLE KEYS */;
INSERT INTO `inventory_item` VALUES (4,17,15,2,1),(5,2,5,2,2),(6,3,5,3,2),(8,4,5,1,2);
/*!40000 ALTER TABLE `inventory_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll` (
  `id` varchar(0) DEFAULT NULL,
  `status` varchar(0) DEFAULT NULL,
  `dueDate` varchar(0) DEFAULT NULL,
  `paidDate` varchar(0) DEFAULT NULL,
  `netEarnings` varchar(0) DEFAULT NULL,
  `totalDeduction` varchar(0) DEFAULT NULL,
  `totalEarnings` varchar(0) DEFAULT NULL,
  `branchId` varchar(0) DEFAULT NULL,
  `employeeId` varchar(0) DEFAULT NULL,
  `payrollDetailsId` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

LOCK TABLES `payroll` WRITE;
/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_details`
--

DROP TABLE IF EXISTS `payroll_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_details` (
  `id` varchar(0) DEFAULT NULL,
  `salaryWage` varchar(0) DEFAULT NULL,
  `bonus` varchar(0) DEFAULT NULL,
  `overtime` varchar(0) DEFAULT NULL,
  `incentive` varchar(0) DEFAULT NULL,
  `tax` varchar(0) DEFAULT NULL,
  `socialSecurityFund` varchar(0) DEFAULT NULL,
  `insurance` varchar(0) DEFAULT NULL,
  `otherEarnings` varchar(0) DEFAULT NULL,
  `otherDeduction` varchar(0) DEFAULT NULL,
  `positionAllowance` varchar(0) DEFAULT NULL,
  `absentLeaveLate` varchar(0) DEFAULT NULL,
  `welfare` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_details`
--

LOCK TABLES `payroll_details` WRITE;
/*!40000 ALTER TABLE `payroll_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` tinyint(4) DEFAULT NULL,
  `name` varchar(26) DEFAULT NULL,
  `price` tinyint(4) DEFAULT NULL,
  `type` varchar(9) DEFAULT NULL,
  `imageName` varchar(41) DEFAULT NULL,
  `category` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Black Coffee',40,'Drinks','2d599ace-df01-438d-913d-e675d31f6b38.jpeg','coffee'),(2,'Espresso',45,'Drinks','710d47a2-9ab5-46e3-988f-0c38de739ef0.jpg','coffee'),(3,'Macchiato',45,'Drinks','7b28106a-158c-40ef-b878-20f27e378dd5.jpg','coffee'),(4,'Butter Croissant',70,'Appetizer','80109f97-dd38-4a60-8ea1-e571d11be69e.jpg','bakery'),(5,'Chocolate Chip Cookie 1 pc',65,'Appetizer','bc79a2ad-ec49-4410-9b92-72972c245d94.jpeg','pastry');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotion` (
  `id` tinyint(4) DEFAULT NULL,
  `name` varchar(13) DEFAULT NULL,
  `combo` tinyint(4) DEFAULT NULL,
  `discountPercentage` decimal(2,1) DEFAULT NULL,
  `createdDate` varchar(10) DEFAULT NULL,
  `endDate` varchar(10) DEFAULT NULL,
  `description` varchar(67) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,'Morning Boost',0,0.1,'2024-03-17','2024-03-30','ตื่นมาใช้ชีวิตให้เข้มเหมือนกาแฟ ลด 10%**\n**เฉพาะสินค้าที่ร่วมรายการ');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion_contain_products`
--

DROP TABLE IF EXISTS `promotion_contain_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotion_contain_products` (
  `promotionId` tinyint(4) DEFAULT NULL,
  `productId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_contain_products`
--

LOCK TABLES `promotion_contain_products` WRITE;
/*!40000 ALTER TABLE `promotion_contain_products` DISABLE KEYS */;
INSERT INTO `promotion_contain_products` VALUES (1,1),(1,2),(1,3);
/*!40000 ALTER TABLE `promotion_contain_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt` (
  `id` tinyint(4) DEFAULT NULL,
  `totalPrice` smallint(6) DEFAULT NULL,
  `totalDiscount` decimal(3,1) DEFAULT NULL,
  `totalNet` decimal(4,1) DEFAULT NULL,
  `receivedAmount` smallint(6) DEFAULT NULL,
  `change` decimal(5,1) DEFAULT NULL,
  `createdDate` varchar(10) DEFAULT NULL,
  `createdTime` varchar(8) DEFAULT NULL,
  `paymentType` varchar(4) DEFAULT NULL,
  `promotionId` varchar(1) DEFAULT NULL,
  `employeeId` tinyint(4) DEFAULT NULL,
  `branchId` tinyint(4) DEFAULT NULL,
  `customerId` varchar(1) DEFAULT NULL,
  `usedPoint` tinyint(4) DEFAULT NULL,
  `earnPoint` tinyint(4) DEFAULT NULL,
  `totalPoint` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (1,130,0.0,130.0,130,0.0,'2024-03-22','04:54:30','cash','1',4,2,'1',0,0,0),(2,145,14.5,130.5,131,0.5,'2024-03-22','04:56:30','cash','1',4,2,'1',0,0,0),(3,150,15.0,135.0,135,0.0,'2024-03-22','04:57:00','cash','1',4,2,'1',0,50,100),(4,90,0.0,90.0,90,0.0,'2024-03-22','04:57:59','cash','1',4,2,'1',0,50,100),(5,135,0.0,135.0,140,5.0,'2024-03-22','04:59:33','cash','1',4,2,'1',0,0,0),(6,120,0.0,120.0,120,0.0,'2024-03-22','05:13:53','cash','1',4,2,'1',0,0,0),(7,120,0.0,120.0,120,0.0,'2024-03-22','05:15:12','cash','1',4,2,'1',0,0,0),(8,120,0.0,120.0,120,0.0,'2024-03-22','05:18:35','cash','1',4,2,'1',0,0,0),(9,130,0.0,130.0,130,0.0,'2024-03-22','05:25:46','cash','1',4,2,'1',0,0,0),(10,90,0.0,90.0,100,10.0,'2024-03-22','05:27:41','cash','1',4,2,'1',0,0,0),(11,90,0.0,90.0,110,20.0,'2024-03-22','05:28:10','cash','1',4,2,'1',0,0,0),(12,90,0.0,90.0,110,20.0,'2024-03-22','05:29:59','cash','1',4,2,'1',0,0,0),(13,90,0.0,90.0,110,20.0,'2024-03-22','05:31:32','cash','1',4,2,'1',0,0,0),(14,90,0.0,90.0,1110,1020.0,'2024-03-22','05:32:24','cash','1',4,2,'',0,0,0),(15,90,0.0,90.0,120,30.0,'2024-03-22','05:33:16','cash','1',4,2,'1',0,50,150),(16,90,0.0,90.0,110,20.0,'2024-03-22','05:36:17','cash','',4,2,'',0,0,0),(17,85,8.5,76.5,100,23.5,'2024-03-22','05:37:31','cash','1',4,2,'1',0,50,200);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_item`
--

DROP TABLE IF EXISTS `receipt_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt_item` (
  `id` tinyint(4) DEFAULT NULL,
  `amount` tinyint(4) DEFAULT NULL,
  `receiptId` tinyint(4) DEFAULT NULL,
  `productId` tinyint(4) DEFAULT NULL,
  `price` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_item`
--

LOCK TABLES `receipt_item` WRITE;
/*!40000 ALTER TABLE `receipt_item` DISABLE KEYS */;
INSERT INTO `receipt_item` VALUES (24,1,1,1,40),(25,1,1,2,45),(26,1,1,3,45),(27,2,2,1,80),(28,1,2,5,65),(29,2,3,1,80),(30,1,3,4,70),(31,1,4,3,45),(32,1,4,2,45),(33,1,5,2,45),(34,2,5,3,90),(35,3,6,1,120),(36,3,7,1,120),(37,3,8,1,120),(38,1,9,2,45),(39,1,9,1,40),(40,1,9,3,45),(41,1,10,3,45),(42,1,10,2,45),(43,1,11,3,45),(44,1,11,2,45),(45,1,12,3,45),(46,1,12,2,45),(47,1,13,3,45),(48,1,13,2,45),(49,1,14,3,45),(50,1,14,2,45),(51,1,15,3,45),(52,1,15,2,45),(53,1,16,3,45),(54,1,16,2,45),(55,1,17,1,40),(56,1,17,2,45);
/*!40000 ALTER TABLE `receipt_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replenishment`
--

DROP TABLE IF EXISTS `replenishment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replenishment` (
  `id` tinyint(4) DEFAULT NULL,
  `createdDate` varchar(10) DEFAULT NULL,
  `totalCost` smallint(6) DEFAULT NULL,
  `employeeId` tinyint(4) DEFAULT NULL,
  `inventoryId` tinyint(4) DEFAULT NULL,
  `createdTime` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replenishment`
--

LOCK TABLES `replenishment` WRITE;
/*!40000 ALTER TABLE `replenishment` DISABLE KEYS */;
INSERT INTO `replenishment` VALUES (1,'2024-03-22',1001,6,2,'15:58:05'),(2,'2024-03-22',1200,6,2,'20:54:06');
/*!40000 ALTER TABLE `replenishment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replenishment_item`
--

DROP TABLE IF EXISTS `replenishment_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replenishment_item` (
  `id` tinyint(4) DEFAULT NULL,
  `balance` tinyint(4) DEFAULT NULL,
  `cost` smallint(6) DEFAULT NULL,
  `replenishmentId` tinyint(4) DEFAULT NULL,
  `ingredientId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replenishment_item`
--

LOCK TABLES `replenishment_item` WRITE;
/*!40000 ALTER TABLE `replenishment_item` DISABLE KEYS */;
INSERT INTO `replenishment_item` VALUES (4,20,500,1,1),(5,20,501,1,2),(6,20,1200,2,3);
/*!40000 ALTER TABLE `replenishment_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` tinyint(4) DEFAULT NULL,
  `name` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'manager'),(3,'employee'),(4,'customer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sqlite_sequence`
--

DROP TABLE IF EXISTS `sqlite_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sqlite_sequence` (
  `name` varchar(18) DEFAULT NULL,
  `seq` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sqlite_sequence`
--

LOCK TABLES `sqlite_sequence` WRITE;
/*!40000 ALTER TABLE `sqlite_sequence` DISABLE KEYS */;
INSERT INTO `sqlite_sequence` VALUES ('replenishment_item',6),('payroll',0),('employee',6),('role',4),('ingredient',3),('product',5),('receipt_item',56),('user',9),('inventory_item',8),('inventory',4),('promotion',1),('attendance',1),('customer',1),('bill',0),('stock_taking_item',3),('branch',4),('receipt',17),('stock_taking',1),('replenishment',2);
/*!40000 ALTER TABLE `sqlite_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_taking`
--

DROP TABLE IF EXISTS `stock_taking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_taking` (
  `id` tinyint(4) DEFAULT NULL,
  `createdDate` varchar(10) DEFAULT NULL,
  `employeeId` tinyint(4) DEFAULT NULL,
  `inventoryId` tinyint(4) DEFAULT NULL,
  `createdTime` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_taking`
--

LOCK TABLES `stock_taking` WRITE;
/*!40000 ALTER TABLE `stock_taking` DISABLE KEYS */;
INSERT INTO `stock_taking` VALUES (1,'2024-03-22',6,2,'20:54:06');
/*!40000 ALTER TABLE `stock_taking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_taking_item`
--

DROP TABLE IF EXISTS `stock_taking_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_taking_item` (
  `id` tinyint(4) DEFAULT NULL,
  `balanceOld` tinyint(4) DEFAULT NULL,
  `balanceUpdate` tinyint(4) DEFAULT NULL,
  `stockTakingId` tinyint(4) DEFAULT NULL,
  `inventoryItemId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_taking_item`
--

LOCK TABLES `stock_taking_item` WRITE;
/*!40000 ALTER TABLE `stock_taking_item` DISABLE KEYS */;
INSERT INTO `stock_taking_item` VALUES (1,12,2,1,5),(2,10,3,1,6),(3,5,4,1,8);
/*!40000 ALTER TABLE `stock_taking_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` tinyint(4) DEFAULT NULL,
  `username` varchar(6) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `employeeId` varchar(1) DEFAULT NULL,
  `roleId` tinyint(4) DEFAULT NULL,
  `customerId` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'admin','$2b$10$voir4ayTSezcxQk2IEaZ4.F9tQYNaQuykFG40GYFM3Uz0zWE5RbKW','4',1,''),(7,'soojin','$2b$10$W0.cf6LHMEsbwklGrFLqrOVBaiZMbmYeMu0TyczQfFWdHZjM668wG','5',2,''),(8,'steve','$2b$10$72q8aWcelqyoexhDEOSdxOFmpvfTTSeO0ZRiArrUfhH2q//IAx64K','6',3,''),(9,'alisa','$2b$10$EzA1b5nAxZALk.vqB0HkA.ewEzWyz4vJ2InaXYMGRwNPndEp5wXTa','',4,'1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-11 11:57:10
