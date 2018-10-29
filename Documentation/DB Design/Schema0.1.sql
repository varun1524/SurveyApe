-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: surveyape
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `invitees`
--

DROP TABLE IF EXISTS `invitees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `invitees` (
  `invite_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `survey_token` varchar(255) DEFAULT NULL,
  `survey_id` varchar(255) NOT NULL,
  PRIMARY KEY (`invite_id`),
  KEY `FKh2oco5lcy23olsefl2nh6k9f9` (`survey_id`),
  CONSTRAINT `FKh2oco5lcy23olsefl2nh6k9f9` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitees`
--

LOCK TABLES `invitees` WRITE;
/*!40000 ALTER TABLE `invitees` DISABLE KEYS */;
/*!40000 ALTER TABLE `invitees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option_ans`
--

DROP TABLE IF EXISTS `option_ans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `option_ans` (
  `option_id` varchar(255) NOT NULL,
  `option_text` longtext,
  `option_type` varchar(255) DEFAULT NULL,
  `question_id` varchar(255) NOT NULL,
  PRIMARY KEY (`option_id`),
  KEY `FKb44ur12nobvayyw803hnft1vy` (`question_id`),
  CONSTRAINT `FKb44ur12nobvayyw803hnft1vy` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_ans`
--

LOCK TABLES `option_ans` WRITE;
/*!40000 ALTER TABLE `option_ans` DISABLE KEYS */;
/*!40000 ALTER TABLE `option_ans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `question` (
  `question_id` varchar(255) NOT NULL,
  `is_multiple_choice` bit(1) DEFAULT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `question_type` varchar(255) DEFAULT NULL,
  `survey_id` varchar(255) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `FK65ro96jafjvulbqu8ia0pb254` (`survey_id`),
  CONSTRAINT `FK65ro96jafjvulbqu8ia0pb254` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `response_answers`
--

DROP TABLE IF EXISTS `response_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `response_answers` (
  `answer_id` varchar(255) NOT NULL,
  `answer_value` varchar(255) DEFAULT NULL,
  `question_id` varchar(255) NOT NULL,
  `response_id` varchar(255) NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `FK1tppa5kw6pqrfkv33cfv0ojs` (`question_id`),
  KEY `FK8in8ii22kecx21uf55sxqxevi` (`response_id`),
  CONSTRAINT `FK1tppa5kw6pqrfkv33cfv0ojs` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`),
  CONSTRAINT `FK8in8ii22kecx21uf55sxqxevi` FOREIGN KEY (`response_id`) REFERENCES `survey_response` (`response_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `response_answers`
--

LOCK TABLES `response_answers` WRITE;
/*!40000 ALTER TABLE `response_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `response_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `survey` (
  `survey_id` varchar(255) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `is_editable` bit(1) DEFAULT NULL,
  `is_published` bit(1) DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `survey_end_date` datetime DEFAULT NULL,
  `survey_name` varchar(255) DEFAULT NULL,
  `survey_type` varchar(255) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`survey_id`),
  KEY `FK51x6iogwvw5n6pa7sl339ltju` (`user_id`),
  CONSTRAINT `FK51x6iogwvw5n6pa7sl339ltju` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_response`
--

DROP TABLE IF EXISTS `survey_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `survey_response` (
  `response_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_submitted` bit(1) DEFAULT NULL,
  `survey_id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`response_id`),
  KEY `FK84qtox6878n0fh337ent4mwgo` (`survey_id`),
  KEY `FKp303wxa9jw73cwbcxlvhjrd9s` (`user_id`),
  CONSTRAINT `FK84qtox6878n0fh337ent4mwgo` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`),
  CONSTRAINT `FKp303wxa9jw73cwbcxlvhjrd9s` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_response`
--

LOCK TABLES `survey_response` WRITE;
/*!40000 ALTER TABLE `survey_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verificationcode` int(11) DEFAULT NULL,
  `verified` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
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

-- Dump completed on 2018-10-29 13:46:38
