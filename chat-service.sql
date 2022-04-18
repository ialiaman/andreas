-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2022 at 09:59 PM
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
  `plateform` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_chats`
--

INSERT INTO `all_chats` (`id`, `status`, `served_by`, `created_date`, `is_end`, `origin`, `customer_id`, `address`, `plateform`) VALUES
(102, 0, '', '2022-04-15 00:49:40', NULL, 'http://localhost:3000', 'Rq66lb-dey4b_rx_AAAN', '::1', '\"Windows\"');

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
  `source` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_messages`
--

INSERT INTO `all_messages` (`id`, `message`, `sender`, `receiver`, `delivery`, `source`, `date`) VALUES
(399, 'dsfsdf', '4GAIrEB0-G-wngOfAAAV', 0, 0, 'customer', '2022-04-14 22:24:38'),
(400, 'fsfsdf', '4GAIrEB0-G-wngOfAAAV', 0, 0, 'customer', '2022-04-14 22:24:52'),
(401, 'fsfsd', 'TPlLz7gLBvtXYI9TAAAZ', 0, 0, 'customer', '2022-04-14 22:25:08'),
(402, 'dfsd', '4GAIrEB0-G-wngOfAAAV', 0, 0, 'Agent', '2022-04-14 22:26:25'),
(403, '\nfsdf', '4GAIrEB0-G-wngOfAAAV', 0, 0, 'Agent', '2022-04-14 22:26:26'),
(404, 'werwer', '4GAIrEB0-G-wngOfAAAV', 0, 0, 'Agent', '2022-04-14 22:27:47'),
(405, 'sdfsdf', 'TPlLz7gLBvtXYI9TAAAZ', 0, 0, 'Agent', '2022-04-14 22:28:43'),
(406, '\ndsfsdf', 'TPlLz7gLBvtXYI9TAAAZ', 0, 0, 'Agent', '2022-04-14 22:28:44'),
(407, 'sdfsdf', '3V0xKJU27kDAMqjxAAA5', 0, 0, 'customer', '2022-04-14 22:41:39'),
(408, 'sdfsdf', '3V0xKJU27kDAMqjxAAA5', 0, 0, 'Agent', '2022-04-14 22:42:10'),
(409, 'this is', '3V0xKJU27kDAMqjxAAA5', 0, 0, 'Agent', '2022-04-14 22:45:35'),
(410, 'fsdf', '3V0xKJU27kDAMqjxAAA5', 0, 0, 'customer', '2022-04-14 22:45:39'),
(411, 'hello', 'oXa0hW6TzxY1JbkQAAAb', 0, 0, 'customer', '2022-04-15 00:00:45'),
(412, 'hello', 'cTs2HoZ9vO7qfD7CAAAf', 0, 0, 'customer', '2022-04-15 00:01:34'),
(413, 'dsfsdf', 'eTmEUpiGwVenhmH_AAAD', 0, 0, 'customer', '2022-04-15 00:35:30'),
(414, 'fdgdfg', 'AtkQpkXk9wVCftGYAAAG', 0, 0, 'customer', '2022-04-15 00:36:46'),
(415, 'hello', 'Rq66lb-dey4b_rx_AAAN', 0, 0, 'customer', '2022-04-15 00:49:40');

-- --------------------------------------------------------

--
-- Table structure for table `registered_users`
--

CREATE TABLE `registered_users` (
  `id` int(11) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `c_name` varchar(255) NOT NULL,
  `account_type` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registered_users`
--

INSERT INTO `registered_users` (`id`, `f_name`, `l_name`, `email`, `password`, `c_name`, `account_type`, `date`) VALUES
(36, 'hazrat', 'Anas', 'anas92949@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', 'jataq', 'customer', '2022-04-04 16:10:50'),
(37, 'ahadhf', 'aman', 'iamanhunzai@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', 'jataq', 'client', '2022-04-04 16:11:00'),
(38, 'Hassan', 'Khan', 'hassan1234@gmail.com', '20b985ba91f9e8d150b8fcfd4372c07d', 'jataq', 'agent', '2022-04-04 16:11:04'),
(39, 'finch', 'john', 'finch92949@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', 'abc', 'agent', '2022-04-04 16:12:40'),
(40, 'Nizar ', 'Hayat', 'nizar@gmail.com', '1adbb3178591fd5bb0c248518f39bf6d', 'jataq', '', '2022-04-10 23:37:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_chats`
--
ALTER TABLE `all_chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `served_by` (`served_by`),
  ADD KEY `served_by_2` (`served_by`);

--
-- Indexes for table `all_messages`
--
ALTER TABLE `all_messages`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `all_messages`
--
ALTER TABLE `all_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=416;

--
-- AUTO_INCREMENT for table `registered_users`
--
ALTER TABLE `registered_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
