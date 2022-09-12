-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2022 at 02:07 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kent-water`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `address` varchar(250) NOT NULL,
  `romodel` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `lat` varchar(60) NOT NULL,
  `lng` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `address`, `romodel`, `phone`, `lat`, `lng`) VALUES
(8, 'Shivam', 'nhatto@websitebrush.com', 'Noida sector 62', 'New Model', '7906980193', '28.627981', '77.3648567'),
(9, 'kamal', 'ah.e2dev@gmail.com', 'noide sec 117', 'New Model', '123456789', '28.578703', '77.3970354'),
(10, 'rajest', 'sasasasa@sa.co', 'new delhi', 'full house ro system e3', '454-8585', '28.6139391', '77.2090212'),
(20, 'akash', 'info@gmail.com', 'Chetu, Sector 63 Road, A Block, Sector 63, Noida, Uttar Pradesh', 'full house ro system e3', '34232323232', '28.6214809', '77.3789153'),
(22, 'rahul kumar', 'yash121999@gmail.com', 'Gensofts Infosolutions Pvt. Ltd, G Block, Sector 63, Noida, Uttar Pradesh', 'Water Purifier RO+UV', '34232323232', '28.6179155', '77.39106819999999'),
(23, 'rahul kumar', 'yash121999@gmail.com', 'Gensofts Infosolutions Pvt. Ltd, G Block, Sector 63, Noida, Uttar Pradesh', 'Water Purifier RO+UV', '34232323232', '28.6179155', '77.39106819999999'),
(24, 'rahul kumar', 'yash121999@gmail.com', 'Gensofts Infosolutions Pvt. Ltd, G Block, Sector 63, Noida, Uttar Pradesh', 'Water Purifier RO+UV', '34232323232', '28.6179155', '77.39106819999999'),
(26, 'vishal', 'info@gmail.com', 'Noida, A Block, Sector 63, Noida, Uttar Pradesh', 'full house ro system e3', '454-8585', '28.6222024', '77.3790965'),
(28, 'sasasas', 'aakash.e2dv@gmail.com', 'Noida, A Block, Sector 63, Noida, Uttar Pradesh', 'New Model', '454-8585', '28.6222024', '77.3790965'),
(30, 'vishal', 'info@gmail.com', 'Noida, A Block, Sector 63, Noida, Uttar Pradesh', 'full house ro system e3', '34232323232', '28.6222024', '77.3790965'),
(31, 'sasasas', 'info@ooliv.de', 'Gensofts Infosolutions Pvt. Ltd, G Block, Sector 63, Noida, Uttar Pradesh', 'Water Purifier RO+UV', '784-7845', '28.6179155', '77.39106819999999'),
(32, 'wqwwq', 'info@ooliv.de', 'Gensofts Infosolutions Pvt. Ltd, G Block, Sector 63, Noida, Uttar Pradesh', 'Water Purifier RO+UV', '784-7845', '28.6179155', '77.39106819999999'),
(33, 'akash', 'ah.e2dev@gmail.com', 'Gensofts Infosolutions Pvt. Ltd, G Block, Sector 63, Noida, Uttar Pradesh', 'full house ro system e3', '34232323232', '28.6179155', '77.39106819999999'),
(34, 'Ultimnate', 'wadejournal007@gmail.com', 'Noida sector 18', 'Water Purifier RO+UV', '762378623897908', '28.570317', '77.3218196'),
(35, 'Ultimnate', 'wadejournal007@gmail.com', 'Noida sector 22', 'Water Purifier RO+UV', '762378623897908', '28.597062', '77.34823519999999'),
(36, 'vishal', 'vishal.e2dev@gmail.com', 'Agra, Kamla Nagar', 'New Model', '7906980193', '27.2144378', '78.0229878'),
(37, 'Ramesh', 'ramesh@gmail.com', 'Noida Sector 59 metro station', 'Water Purifier RO+UV', '454-8585', '28.606493', '77.372726');

-- --------------------------------------------------------

--
-- Table structure for table `romodules`
--

CREATE TABLE `romodules` (
  `id` int(11) NOT NULL,
  `model_id` varchar(100) NOT NULL,
  `model_name` varchar(100) NOT NULL,
  `model_pin_color` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `romodules`
--

INSERT INTO `romodules` (`id`, `model_id`, `model_name`, `model_pin_color`) VALUES
(5, 'f205', 'small row', '#313354'),
(6, 'y67', 'New Model', '#04ae40'),
(7, '454asdf', 'full house ro system e3', '#e00000'),
(8, 'WatP-527', 'Water Purifier RO+UV', '#d909dc');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(250) NOT NULL,
  `loggedin` tinyint(1) NOT NULL,
  `isadmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `loggedin`, `isadmin`) VALUES
(45, 'akash mittal', 'aakash.e2dev@gmail.com', '784-7845-8547', '$2a$10$ilUbrrUrg6zZtCTc1g/fO.lu11Wj4WocDHI0geP77cv2v9iqrbR0e', 0, 0),
(46, 'Parvez', 'info@gmail.com', '7458-7458-78', '$2a$10$6WEquHUOFUlnBfsd8bYfSO6jREVGmEXRtbFtH.GBB3o1NJ54bYtNW', 0, 1),
(48, 'Vikas', 'vikas@gmail.com', '458-8745', '$2a$10$o1WWAwqH5ojmimforh0f8eCKvvmtX3Avu.FtTm/lk/HDstnaptuc6', 0, 0),
(49, 'vishal', 'vishal.e2dev@gmail.com', '784-7845', '$2a$10$jU5QyTuOa4g4yiYdU8b7oucwQttut6ap9fhhSVOseHE5.6TDLrzYe', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `romodules`
--
ALTER TABLE `romodules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `romodules`
--
ALTER TABLE `romodules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
