-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 30 Octobre 2016 à 20:11
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `bodytracker`
--
CREATE DATABASE IF NOT EXISTS `bodytracker` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bodytracker`;

-- --------------------------------------------------------

--
-- Structure de la table `body_measures`
--

DROP TABLE IF EXISTS `body_measures`;
CREATE TABLE IF NOT EXISTS `body_measures` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) DEFAULT NULL,
  `date` int(16) NOT NULL,
  `weight` int(10) NOT NULL,
  `neck` int(10) NOT NULL,
  `chest` int(10) NOT NULL,
  `shoulders` int(10) NOT NULL,
  `arm_right` int(10) NOT NULL,
  `arm_left` int(10) NOT NULL,
  `calf_right` int(10) NOT NULL,
  `calf_left` int(10) NOT NULL,
  `thigh_right` int(10) NOT NULL,
  `thigh_left` int(10) NOT NULL,
  `waist` int(10) NOT NULL,
  `id_image` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_image` (`id_image`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Vider la table avant d'insérer `body_measures`
--

TRUNCATE TABLE `body_measures`;
--
-- Contenu de la table `body_measures`
--

INSERT INTO `body_measures` (`id`, `id_user`, `date`, `weight`, `neck`, `chest`, `shoulders`, `arm_right`, `arm_left`, `calf_right`, `calf_left`, `thigh_right`, `thigh_left`, `waist`, `id_image`) VALUES
(1, 3, 1476682798, 80, 40, 110, 55, 34, 34, 41, 41, 58, 58, 90, 0),
(2, 1, 1476682798, 80, 40, 110, 55, 34, 34, 41, 41, 58, 58, 90, 0),
(3, 3, 1477173600, 80, 41, 109, 55, 35, 35, 40, 41, 58, 58, 88, 0);

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) DEFAULT NULL,
  `image_type` varchar(20) NOT NULL,
  `image_uri` text NOT NULL,
  `image_size` int(10) NOT NULL,
  `image_name` text NOT NULL,
  `date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `images`
--

TRUNCATE TABLE `images`;
-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(60) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` text NOT NULL,
  `signup_date` int(255) NOT NULL,
  `age` int(100) NOT NULL,
  `gender` enum('m','f') NOT NULL,
  `height` int(100) NOT NULL,
  `start_weight` int(255) NOT NULL,
  `target_weight` int(100) DEFAULT NULL,
  `last_login` int(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Vider la table avant d'insérer `user`
--

TRUNCATE TABLE `user`;
--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `lastname`, `firstname`, `username`, `password`, `signup_date`, `age`, `gender`, `height`, `start_weight`, `target_weight`, `last_login`, `status`) VALUES
(1, 'Wayne', 'Bruce', 'batman', '7d9b5c572750a18c533c07bbaf97bf014fa798fb7a7b5e0397d07750ed31d7dc', 0, 42, 'm', 198, 114, 100, 0, 'active'),
(3, 'kent', 'clarke', 'superman', '81880b9160d9457b1430077203f4a47c2980e9d0757598f31d1ba7def1511914', 0, 39, 'm', 198, 104, 100, 1477732274, 'active');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `body_measures`
--
ALTER TABLE `body_measures`
  ADD CONSTRAINT `body_measures_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
