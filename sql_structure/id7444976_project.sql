-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Ott 24, 2018 alle 09:00
-- Versione del server: 10.1.31-MariaDB
-- Versione PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id7444976_project`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `defect`
--

CREATE TABLE `defect` (
  `id_defect` bigint(255) NOT NULL,
  `id_document` int(100) NOT NULL,
  `priorita` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `titolo_pagina` text COLLATE utf8_unicode_ci NOT NULL,
  `segnalazione` text COLLATE utf8_unicode_ci NOT NULL,
  `esito_atteso` text COLLATE utf8_unicode_ci NOT NULL,
  `data_richiesta` date NOT NULL,
  `data_implementazione` date NOT NULL,
  `id_Stato` int(100) NOT NULL,
  `id_lock` int(100) NOT NULL,
  `note` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `documenti`
--

CREATE TABLE `documenti` (
  `id` int(100) NOT NULL,
  `nome_documento` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `path` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `data_inserimento` date NOT NULL,
  `id_tipologia` int(100) NOT NULL,
  `id_progetto` int(100) NOT NULL,
  `id_stato` int(100) NOT NULL,
  `is_excel` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `excel`
--

CREATE TABLE `excel` (
  `id_defect` int(11) NOT NULL,
  `id_docuento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `lock`
--

CREATE TABLE `lock` (
  `id_utente` int(100) NOT NULL,
  `id_defect` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `permission`
--

CREATE TABLE `permission` (
  `id` int(100) NOT NULL,
  `valore` int(11) NOT NULL,
  `descrizione` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `permission`
--

INSERT INTO `permission` (`id`, `valore`, `descrizione`) VALUES
(5, 1, 'niente'),
(6, 2, 'tutto'),
(7, 3, 'lettura'),
(8, 4, 'scrittura'),
(9, 5, 'lettura e scrittura');

-- --------------------------------------------------------

--
-- Struttura della tabella `prg_utnt`
--

CREATE TABLE `prg_utnt` (
  `id_progetto` int(100) NOT NULL,
  `id_utente` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `progetti`
--

CREATE TABLE `progetti` (
  `id` int(100) NOT NULL,
  `nome_progetto` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `path_absolute` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `data_inizio` date NOT NULL,
  `data_fine` date NOT NULL,
  `stato_progetto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `Stati`
--

CREATE TABLE `Stati` (
  `id` int(100) NOT NULL,
  `nome_stato` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tipologia`
--

CREATE TABLE `tipologia` (
  `id` int(100) NOT NULL,
  `tipologia` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(100) NOT NULL,
  `nominativo` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `id_permission` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `nominativo`, `user`, `pass`, `email`, `id_permission`) VALUES
(1, 'carlo', 'paolo', 'tino', 'vaWle@QtiQWEno.t', 0),
(3, 'carlo', 'paolo', 'tinQWQEo', 'pepp@QtiQWEno.t', 0),
(4, 'carlo', 'paolo', 'tino', 'cosimpp@QtiQWEno.t', 0),
(9, 'carlo', 'paolo', 'tinQWQEo', 'cossimpp@QtiQWEno.t', 0),
(25, 'jj', 'paolo', 'tino', 'kk', 0),
(27, 'Pippo Valente', 'pippo', 'MD5(\'pippopippo\')', 'pippo@pippuzzo.it', 6),
(28, 'qwe qwe', 'vale', 'Dd/AsBqsZidueDComGHH5+hrNOsNNbwSi6/wg302ZW0=', 'vale@vale.vale', 6);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `defect`
--
ALTER TABLE `defect`
  ADD PRIMARY KEY (`id_defect`);

--
-- Indici per le tabelle `documenti`
--
ALTER TABLE `documenti`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `lock`
--
ALTER TABLE `lock`
  ADD PRIMARY KEY (`id_defect`);

--
-- Indici per le tabelle `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `prg_utnt`
--
ALTER TABLE `prg_utnt`
  ADD PRIMARY KEY (`id_progetto`,`id_utente`);

--
-- Indici per le tabelle `progetti`
--
ALTER TABLE `progetti`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `Stati`
--
ALTER TABLE `Stati`
  ADD UNIQUE KEY `unique` (`id`);

--
-- Indici per le tabelle `tipologia`
--
ALTER TABLE `tipologia`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `defect`
--
ALTER TABLE `defect`
  MODIFY `id_defect` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `documenti`
--
ALTER TABLE `documenti`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `progetti`
--
ALTER TABLE `progetti`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `Stati`
--
ALTER TABLE `Stati`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tipologia`
--
ALTER TABLE `tipologia`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
