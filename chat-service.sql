-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2022 at 11:05 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat-service`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_chats`
--

CREATE TABLE `all_chats` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `served_by` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `is_end` tinyint(1) DEFAULT NULL,
  `origin` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `plateform` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `agent_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_chats`
--

INSERT INTO `all_chats` (`id`, `status`, `served_by`, `created_date`, `is_end`, `origin`, `customer_id`, `address`, `plateform`, `city`, `country`, `agent_name`) VALUES
(4, 1, '36', '2022-04-21 23:41:25', NULL, 'http://localhost:3000', 'EfKSBvEyLClFC87jAAAe', '::1', '\"Windows\"', 'Rawalpindi', 'PK', NULL),
(5, 2, '', '2022-04-21 23:42:45', NULL, 'http://localhost:3000', 'bvvXtLveARmHr28AAAAh', '::ffff:127.0.0.1', 'undefined', 'Rawalpindi', 'PK', NULL),
(6, 1, '38', '2022-04-21 23:44:14', NULL, 'http://localhost:3000', 'gE3c0PyWIB1Z_Us_AAAp', '::ffff:127.0.0.1', 'undefined', 'Rawalpindi', 'PK', NULL),
(7, 1, '', '2022-04-22 23:10:32', NULL, 'http://localhost:3000', 'uvtQyFRXhMVLt13hAAAF', '::1', '\"Windows\"', 'Rawalpindi', 'PK', NULL),
(8, 1, '36', '2022-04-22 23:12:09', NULL, 'http://localhost:3000', 'rwKxjLkSPPYyK3czAAAG', '::1', '\"Windows\"', 'Rawalpindi', 'PK', 'hazratAnas'),
(9, 1, '36', '2022-04-22 23:14:21', NULL, 'http://localhost:3000', 'pfCKNz_QqP52xpLfAAAJ', '::1', '\"Windows\"', 'Rawalpindi', 'PK', 'hazrat Anas');

-- --------------------------------------------------------

--
-- Table structure for table `all_messages`
--

CREATE TABLE `all_messages` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` int(255) NOT NULL,
  `delivery` tinyint(1) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_messages`
--

INSERT INTO `all_messages` (`id`, `message`, `sender`, `receiver`, `delivery`, `date`, `source`) VALUES
(23, 'Hello', '_Mc43eoehXnjN0VyAAAy', 0, 0, '2022-04-12 01:39:22', NULL),
(24, 'Thank you.', '_Mc43eoehXnjN0VyAAAy', 0, 0, '2022-04-12 01:40:23', NULL),
(25, 'Hello', 'fmhAUj5YOtmp56LMAAAB', 0, 0, '2022-04-13 01:08:49', NULL),
(26, 'Hello Ali!!!!', 'fmhAUj5YOtmp56LMAAAB', 0, 0, '2022-04-13 01:09:19', NULL),
(27, 'sdfsdf', 'fv4iAhJ7qga8XBoPAAAD', 0, 0, '2022-04-13 01:10:27', NULL),
(28, 'Hi ', 'BKFL85hK27V8ScbfAAAG', 0, 0, '2022-04-14 02:20:26', NULL),
(29, 'Nizar', 'BKFL85hK27V8ScbfAAAG', 0, 0, '2022-04-14 02:20:28', NULL),
(30, 'ffff', 'BKFL85hK27V8ScbfAAAG', 0, 0, '2022-04-14 02:21:06', NULL),
(31, 'hi', 'tsZLIMyg__pCrfzuAAAT', 0, 0, '2022-04-14 02:22:03', NULL),
(32, 'new1', 'undefined', 0, 0, '2022-04-14 02:24:04', NULL),
(33, 'HIi', 'WnmXncJpuIei2TWaAAAV', 0, 0, '2022-04-14 12:04:52', NULL),
(34, 'Hi', 'cVp1uKahk78yQq6cAAAO', 0, 0, '2022-04-14 12:59:54', NULL),
(35, 'hi', 'obWJOo3ME1DIEODjAAAF', 0, 0, '2022-04-14 13:00:28', NULL),
(36, 'hey', 'obWJOo3ME1DIEODjAAAF', 0, 0, '2022-04-14 13:33:43', NULL),
(37, 'hello', 'gfuK0gTCqdc-b0g4AAAG', 0, 0, '2022-04-21 23:27:19', 'customer'),
(38, 'hello', 'vLRuSAeYqfFe9-XJAAAT', 0, 0, '2022-04-21 23:37:26', 'customer'),
(39, 'hello', 'EfKSBvEyLClFC87jAAAe', 0, 0, '2022-04-21 23:41:25', 'customer'),
(40, 'hello', 'EfKSBvEyLClFC87jAAAe', 0, 0, '2022-04-21 23:41:34', 'Agent'),
(41, 'yes', 'EfKSBvEyLClFC87jAAAe', 0, 0, '2022-04-21 23:41:37', 'customer'),
(42, '\ngg', 'EfKSBvEyLClFC87jAAAe', 0, 0, '2022-04-21 23:41:43', 'Agent'),
(43, 'hello', 'bvvXtLveARmHr28AAAAh', 0, 0, '2022-04-21 23:42:45', 'customer'),
(44, 'helo', 'gE3c0PyWIB1Z_Us_AAAp', 0, 0, '2022-04-21 23:44:14', 'customer'),
(45, 'g', 'gE3c0PyWIB1Z_Us_AAAp', 0, 0, '2022-04-21 23:44:58', 'Agent'),
(46, 'hello', 'EfKSBvEyLClFC87jAAAe', 0, 0, '2022-04-22 21:58:38', 'Agent'),
(47, 'hello', 'uvtQyFRXhMVLt13hAAAF', 0, 0, '2022-04-22 23:10:32', 'customer'),
(48, 'dasdas', 'rwKxjLkSPPYyK3czAAAG', 0, 0, '2022-04-22 23:12:09', 'customer'),
(49, 'sdfsdf', 'rwKxjLkSPPYyK3czAAAG', 0, 0, '2022-04-22 23:12:17', 'Agent'),
(50, 'hello', 'pfCKNz_QqP52xpLfAAAJ', 0, 0, '2022-04-22 23:14:21', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` int(11) NOT NULL,
  `owner_id` varchar(500) NOT NULL,
  `domain` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `owner_id`, `domain`) VALUES
(2, '37', 'https://jataq.com'),
(3, '37', 'https://google.com');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `lead_name` varchar(500) NOT NULL,
  `lead_email` varchar(500) NOT NULL,
  `lead_phone` varchar(500) NOT NULL,
  `agent_name` varchar(500) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `company_url` varchar(500) NOT NULL,
  `c_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `lead_name`, `lead_email`, `lead_phone`, `agent_name`, `date`, `company_url`, `c_name`) VALUES
(1, 'Ahad Aman', 'ahadaman757@gmail.com', '+923312099944', 'Ali Aman', '0000-00-00', 'https://jataq.com', 'jataq'),
(2, 'Hazrat Anas', 'anas123@gmail.com', '+923312099944', 'Ahad Aman', '2022-04-01', 'https://google.com', 'jataq'),
(5, 'john', 'anas92949@gmail.com', '03158914711', 'HAZRAT ANAS', '2022-04-22', 'http://localhost:3000', 'jataq'),
(6, 'anas', 'anas92949@gmail.com', '03158914711', 'HAZRAT ANAS', '2022-04-22', 'http://localhost:3000', 'jataq1'),
(7, 'anas', 'anas92949@gmail.com', '03158914711', 'HAZRAT ANAS', '2022-04-22', 'http://localhost:3000', 'jataq1'),
(9, 'john', 'hassan1234@gmail.com', '03158914711', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', '0'),
(10, 'inayat', 'inayat@gmail.com', '0315684654', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', '0'),
(11, 'finch', '17pwcse1537@uetpeshawar.edu.pk', '546541365465', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', '0'),
(12, 'sherry', 'iamanhunzai@gmail.com', '015974564', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', '0'),
(13, 'sherry', 'iamanhunzai@gmail.com', '015974564', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', 'abc'),
(14, 'sherry', 'iamanhunzai@gmail.com', '015974564', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', '0'),
(15, 'aman', 'iamanhunzai@gmail.com', '015684541645', 'HAZRAT ANAS', '2022-04-23', 'http://localhost:3000', '0');

-- --------------------------------------------------------

--
-- Table structure for table `registered_users`
--

CREATE TABLE `registered_users` (
  `id` int(11) NOT NULL,
  `f_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `c_name` varchar(255) DEFAULT NULL,
  `account_type` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `company_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registered_users`
--

INSERT INTO `registered_users` (`id`, `f_name`, `l_name`, `email`, `password`, `c_name`, `account_type`, `date`, `company_url`) VALUES
(36, 'hazrat', 'Anas', 'anas92949@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', '0', 'client', '2022-04-21 15:39:37', ''),
(37, 'ahadhf', 'aman', 'a@gmail.com', '202cb962ac59075b964b07152d234b70', 'jataq', 'client', '2022-04-21 12:27:01', 'https://jataq.com'),
(38, 'Hassan', 'Khan', 'hassan1234@gmail.com', '20b985ba91f9e8d150b8fcfd4372c07d', 'jataq5', 'agent', '2022-04-21 15:39:40', ''),
(39, 'finch', 'john', 'finch92949@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', 'abc', 'agent', '2022-04-04 16:12:40', ''),
(40, 'Nizar ', 'Hayat', 'nizar@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', 'jataq53', '', '2022-04-21 15:39:42', ''),
(46, 'Ali Aman', 'Hunzai', 'ali@gmail.com', 'bc1072a8c32d281a4f87855d250787b8', 'Chat-Reply', '', '2022-04-11 20:23:29', ''),
(47, 'nizar', 'hayat', 'nizarhayat@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'jataq1', '', '2022-04-21 15:39:45', ''),
(48, 'shoukat', 'khan', 'sk@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'abcc', '', '2022-04-13 21:52:15', ''),
(49, 'Testtest', 'test', 'test@gmail.com', '25d55ad283aa400af464c76d713c07ad', '42', '', '2022-04-21 15:39:47', ''),
(50, '123xy', 'test', 'new@gmail.com', '202cb962ac59075b964b07152d234b70', 'jataq53', '', '2022-04-21 15:39:49', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_chats`
--
ALTER TABLE `all_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `all_messages`
--
ALTER TABLE `all_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registered_users`
--
ALTER TABLE `registered_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_chats`
--
ALTER TABLE `all_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `all_messages`
--
ALTER TABLE `all_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `registered_users`
--
ALTER TABLE `registered_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
