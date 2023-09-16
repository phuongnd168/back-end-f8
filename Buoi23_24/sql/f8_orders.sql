-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               11.0.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for f8_orders
CREATE DATABASE IF NOT EXISTS `f8_orders` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `f8_orders`;

-- Dumping structure for table f8_orders.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  `province_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_customers_province_id_foreign` (`province_id`) USING BTREE,
  CONSTRAINT `FK_customers_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.customers: ~7 rows (approximately)
INSERT INTO `customers` (`id`, `name`, `email`, `password`, `status`, `province_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
	(1, 'Phuong', 'Phuong@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 0, 1, NULL, '2023-09-07 04:28:40', '2023-08-28 04:28:41'),
	(2, 'Phuong1', 'phuong1@gmail.com', '2467d3744600858cc9026d5ac6005305', 1, 3, NULL, '2023-09-07 04:29:01', '2023-08-28 04:29:01'),
	(3, 'Phuong2', 'phuong2@gmail.com', 'c4f23dc833c99e450fb56c8dd6e6d859', 1, NULL, NULL, '2023-09-07 04:30:44', '2023-08-28 04:30:44'),
	(4, 'Hoàng An', 'an@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, 3, NULL, '2023-09-07 02:12:25', '2023-08-31 02:12:27'),
	(5, 'Phuong3', 'phuong3@gmail.com', '73882ab1fa529d7273da0db6b49cc4f3', NULL, 3, NULL, '2023-09-07 02:25:11', '2023-09-07 02:25:12'),
	(6, 'Phuong4', 'phuong4@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL, NULL, NULL, NULL),
	(7, 'Phuong5', 'phuong5@gmail.com', 'c6035bd3e95191654aef86b4f97d6a57', 1, NULL, NULL, NULL, NULL);

-- Dumping structure for table f8_orders.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customers_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` float NOT NULL,
  `status_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customers_id` (`customers_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.orders: ~5 rows (approximately)
INSERT INTO `orders` (`id`, `customers_id`, `quantity`, `total`, `status_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 2, 10000, 3, '2022-08-31 02:42:27', '2023-08-31 02:42:28'),
	(2, 1, 3, 20000, 2, '2023-08-31 02:42:42', '2023-08-31 02:42:43'),
	(3, 1, 1, 5000, 3, '2023-08-31 02:42:59', '2023-08-31 02:42:59'),
	(4, 3, 5, 100000, 3, '2023-08-31 02:43:10', '2023-08-31 02:43:11'),
	(5, 4, 2, 33333, 1, '2023-08-31 02:53:28', '2023-08-31 02:53:29');

-- Dumping structure for table f8_orders.order_detail
CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` float NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.order_detail: ~2 rows (approximately)
INSERT INTO `order_detail` (`id`, `order_id`, `product_id`, `price`, `quantity`, `amount`, `created_at`, `updated_at`) VALUES
	(1, 2, 1, 10000, 1, 222, NULL, NULL),
	(2, 4, 2, 2222, 2, 222, NULL, NULL);

-- Dumping structure for table f8_orders.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` float DEFAULT 0,
  `thumbnail` varchar(150) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.products: ~2 rows (approximately)
INSERT INTO `products` (`id`, `sku`, `name`, `description`, `price`, `thumbnail`, `category_id`, `created_at`, `updated_at`) VALUES
	(1, 'ABC', 'Máy lọc', 'abc', 111111, NULL, 1, NULL, NULL),
	(2, 'XYZ', 'Máy cày', 'abc', 23232, NULL, 3, NULL, NULL);

-- Dumping structure for table f8_orders.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.product_categories: ~3 rows (approximately)
INSERT INTO `product_categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Danh mục 1', '2023-08-31 03:39:06', '2023-08-31 03:39:07'),
	(2, 'Danh mục 2', '2023-08-31 03:39:12', '2023-08-31 03:39:13'),
	(3, 'Danh mục 3', '2023-08-31 03:39:19', '2023-08-31 03:39:20');

-- Dumping structure for table f8_orders.province
CREATE TABLE IF NOT EXISTS `province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.province: ~3 rows (approximately)
INSERT INTO `province` (`id`, `name`) VALUES
	(1, 'Hà Nội'),
	(2, 'Đà Nẵng'),
	(3, 'Hồ Chí Minh');

-- Dumping structure for table f8_orders.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_orders.status: ~3 rows (approximately)
INSERT INTO `status` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Chờ xử lý', '2023-08-31 02:41:49', '2023-08-31 02:41:50'),
	(2, 'Đang xử lý', '2023-08-31 02:42:08', '2023-08-31 02:42:09'),
	(3, 'Đã thanh toán', '2023-08-31 02:42:10', '2023-08-31 02:42:10');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
