-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 08 Octobre 2016 à 11:38
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
  `id_image` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_image` (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `body_measures`
--

TRUNCATE TABLE `body_measures`;
-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) DEFAULT NULL,
  `url` text NOT NULL,
  `date` int(20) NOT NULL,
  `comment` text,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `images`
--

TRUNCATE TABLE `images`;
-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) DEFAULT NULL,
  `date` int(255) NOT NULL,
  `duration` int(255) NOT NULL,
  `location` text NOT NULL,
  `goal` text NOT NULL,
  `mood` varchar(20) NOT NULL,
  `conditions` enum('good','normal','bad','worst') NOT NULL,
  `conditions_comment` text NOT NULL,
  `type` enum('endurance','strenght','mix') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_user_2` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `session`
--

TRUNCATE TABLE `session`;
-- --------------------------------------------------------

--
-- Structure de la table `user`
--

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
  `weight` int(255) NOT NULL,
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

INSERT INTO `user` (`id`, `lastname`, `firstname`, `username`, `password`, `signup_date`, `age`, `gender`, `height`, `weight`, `status`) VALUES
(1, 'Wayne', 'Bruce', 'batman', '7d9b5c572750a18c533c07bbaf97bf014fa798fb7a7b5e0397d07750ed31d7dc', 0, 42, 'm', 198, 114, ''),
(3, 'kent', 'clarke', 'superman', '81880b9160d9457b1430077203f4a47c2980e9d0757598f31d1ba7def1511914', 0, 39, 'm', 198, 104, '');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `body_measures`
--
ALTER TABLE `body_measures`
  ADD CONSTRAINT `body_measures_ibfk_2` FOREIGN KEY (`id_image`) REFERENCES `images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `body_measures_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `session` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
