-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 11 Octobre 2016 à 11:30
-- Version du serveur :  10.1.16-MariaDB
-- Version de PHP :  5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
CREATE TABLE `body_measures` (
  `id` int(10) NOT NULL,
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
  `id_image` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vider la table avant d'insérer `body_measures`
--

TRUNCATE TABLE `body_measures`;
--
-- Contenu de la table `body_measures`
--

INSERT INTO `body_measures` (`id`, `id_user`, `date`, `weight`, `neck`, `chest`, `shoulders`, `arm_right`, `arm_left`, `calf_right`, `calf_left`, `thigh_right`, `thigh_left`, `waist`, `id_image`) VALUES
(32, 3, 1453417200, 100, 21, 21, 21, 21, 2, 1, 21, 21, 2, 12, 0),
(34, 3, 1453417800, 104, 21, 21, 21, 21, 2, 1, 21, 21, 2, 12, 0),
(35, 3, 1456095600, 99, 54, 54, 54, 54, 5, 4, 54, 54, 54, 54, 0),
(36, 3, 1458946800, 97, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 0);

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` int(10) NOT NULL,
  `id_user` int(10) DEFAULT NULL,
  `url` text NOT NULL,
  `date` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vider la table avant d'insérer `images`
--

TRUNCATE TABLE `images`;
-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL,
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
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vider la table avant d'insérer `user`
--

TRUNCATE TABLE `user`;
--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `lastname`, `firstname`, `username`, `password`, `signup_date`, `age`, `gender`, `height`, `start_weight`, `target_weight`, `status`) VALUES
(1, 'Wayne', 'Bruce', 'batman', '7d9b5c572750a18c533c07bbaf97bf014fa798fb7a7b5e0397d07750ed31d7dc', 0, 42, 'm', 198, 114, 100, 'active'),
(3, 'kent', 'clarke', 'superman', '81880b9160d9457b1430077203f4a47c2980e9d0757598f31d1ba7def1511914', 0, 39, 'm', 198, 104, 100, 'active');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `body_measures`
--
ALTER TABLE `body_measures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_image` (`id_image`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `body_measures`
--
ALTER TABLE `body_measures`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
