-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2022 at 07:39 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
  `created_date` datetime DEFAULT current_timestamp(),
  `is_end` tinyint(1) DEFAULT NULL,
  `customer_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_chats`
--

INSERT INTO `all_chats` (`id`, `status`, `created_date`, `is_end`, `customer_id`) VALUES
(36, 0, '2022-04-14 02:24:04', NULL, 'undefined');

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
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_messages`
--

INSERT INTO `all_messages` (`id`, `message`, `sender`, `receiver`, `delivery`, `date`) VALUES
(23, 'Hello', '_Mc43eoehXnjN0VyAAAy', 0, 0, '2022-04-12 01:39:22'),
(24, 'Thank you.', '_Mc43eoehXnjN0VyAAAy', 0, 0, '2022-04-12 01:40:23'),
(25, 'Hello', 'fmhAUj5YOtmp56LMAAAB', 0, 0, '2022-04-13 01:08:49'),
(26, 'Hello Ali!!!!', 'fmhAUj5YOtmp56LMAAAB', 0, 0, '2022-04-13 01:09:19'),
(27, 'sdfsdf', 'fv4iAhJ7qga8XBoPAAAD', 0, 0, '2022-04-13 01:10:27'),
(28, 'Hi ', 'BKFL85hK27V8ScbfAAAG', 0, 0, '2022-04-14 02:20:26'),
(29, 'Nizar', 'BKFL85hK27V8ScbfAAAG', 0, 0, '2022-04-14 02:20:28'),
(30, 'ffff', 'BKFL85hK27V8ScbfAAAG', 0, 0, '2022-04-14 02:21:06'),
(31, 'hi', 'tsZLIMyg__pCrfzuAAAT', 0, 0, '2022-04-14 02:22:03'),
(32, 'new1', 'undefined', 0, 0, '2022-04-14 02:24:04'),
(33, 'HIi', 'WnmXncJpuIei2TWaAAAV', 0, 0, '2022-04-14 12:04:52'),
(34, 'Hi', 'cVp1uKahk78yQq6cAAAO', 0, 0, '2022-04-14 12:59:54'),
(35, 'hi', 'obWJOo3ME1DIEODjAAAF', 0, 0, '2022-04-14 13:00:28'),
(36, 'hey', 'obWJOo3ME1DIEODjAAAF', 0, 0, '2022-04-14 13:33:43');

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
  `date` date NOT NULL,
  `company_url` varchar(500) NOT NULL,
  `c_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `lead_name`, `lead_email`, `lead_phone`, `agent_name`, `date`, `company_url`, `c_name`) VALUES
(1, 'Ahad Aman', 'ahadaman757@gmail.com', '+923312099944', 'Ali Aman', '0000-00-00', 'https://jataq.com', 'jataq'),
(2, 'Hazrat Anas', 'anas123@gmail.com', '+923312099944', 'Ahad Aman', '2022-04-01', 'https://google.com', 'jataq');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `all_messages`
--
ALTER TABLE `all_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `registered_users`
--
ALTER TABLE `registered_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `all_chats`
--
ALTER TABLE `all_chats`
  ADD CONSTRAINT `all_chats_ibfk_1` FOREIGN KEY (`id`) REFERENCES `registered_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
