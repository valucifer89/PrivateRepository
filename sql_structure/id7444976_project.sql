-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Ott 29, 2018 alle 15:58
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
-- Struttura della tabella `descrizione_progetto`
--

CREATE TABLE `descrizione_progetto` (
  `id_progetto` int(100) NOT NULL,
  `descrip` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `descrizione_progetto`
--

INSERT INTO `descrizione_progetto` (`id_progetto`, `descrip`) VALUES
(3, 'descr 3'),
(4, 'descr 4'),
(5, 'descr 5'),
(6, 'INSERT INTO `progetti` (`id`, `nome_progetto`, `path_absolute`, `data_inizio`, `data_fine`, `stato_progetto`) VALUES (NULL, \'cane\', \'cane\', \'\', \'\', \'1\');'),
(7, 'peppino');

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
(1, 1, 'tutto'),
(2, 2, 'niente'),
(3, 3, 'lettura'),
(4, 4, 'lettura e scrittura');

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

--
-- Dump dei dati per la tabella `progetti`
--

INSERT INTO `progetti` (`id`, `nome_progetto`, `path_absolute`, `data_inizio`, `data_fine`, `stato_progetto`) VALUES
(3, 'qweqwe', 'qweqwe', '2018-10-01', '2018-10-18', 1),
(4, 'qweqweqweqweqweq', 'qweqweqweqweqweq', '2018-10-03', '2018-10-24', 2),
(5, 'agg', 'agg', '2018-10-19', '2018-10-20', 3),
(6, 'cane', 'cane', '0000-00-00', '0000-00-00', 6),
(7, 'peppino', 'peppino', '0000-00-00', '0000-00-00', 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `psw_forgot`
--

CREATE TABLE `psw_forgot` (
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `Stati`
--

CREATE TABLE `Stati` (
  `id` int(100) NOT NULL,
  `nome_stato` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `Stati`
--

INSERT INTO `Stati` (`id`, `nome_stato`) VALUES
(1, 'Inizio Implementazione'),
(2, 'Implementazione in Ambiente di Sv.'),
(3, 'Rilascio in Collaudo'),
(4, 'Fase UAT'),
(5, 'Fase Defect'),
(6, 'Rilascio in Produzione');

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
(28, 'qwe qwe', 'vale', 'Dd/AsBqsZidueDComGHH5+hrNOsNNbwSi6/wg302ZW0=', 'vale@vale.vale', 1),
(37, 'gianni', 'gianni', 'sRqh6mJh5hxy42/LSGgHY4uV3tYxenC3tDxiu1dd4UI=', 'gianni@vale.com', 6),
(39, 'gianni gianni', 'gianni', 'sRqh6mJh5hxy42/LSGgHY4uV3tYxenC3tDxiu1dd4UI=', 'vdemastro2@vale.com', 6),
(41, 'giuann giuann', 'giuann', 'jH0NhP2WSw2zN/JEVXur6BthKKfZM0qVizb5tiXX/xM=', 'giuann@vale.com', 6),
(44, 'qwe', 'qwe', 'pEtW6MmcnPUvglrUpKWEVWf81Nnc+VvI+C3jqvIZ6cQ=', 'qwe@vale.com', 6),
(45, 'pepp', 'pepp', '+JSN7H/rn13OVF+xS/c0+iE61r5t+yZu4SvLS4OVTOA=', 'pepp@vale.com', 5),
(46, 'pepp@vale.com', 'pepp@vale.com', 'Ve4DcIrzKzxQjtA33ZnA4Mr1v01vN2xk7yTavwMdboA=', 'p1epp@vale.com', 6),
(48, 'asdasd', 'asdasd', 'skXP9+z1eluVp0FjrCFD6vI89G/rM3qjAXDCeW+fPFM=', 'asdasd@vale.com', 7),
(49, 'asd', 'asd', 'k5qAhLQTGuMNQQf9J4Vuk6RRjnm/QoJkUNAYtg0fsgA=', 'asd@vale.com', 5),
(59, 'ciao', 'ciao', '98VTMCAqU5P2Hv4c4vqPa+p/hISdapQgrZm5JIq5K2o=', 'ciao@vale.com', 7),
(64, 'asd1', 'asd1', 'sDgmt49XlhA+3DzLV5GA0urM3MUptj1RmrZVWowIPeI=', 'asd1@vale.com', 7),
(65, 'asd2', 'asd2', '39ICLJfo7H9JQMquOi2zbOrICB3k/F+lxvleaSIlE/Q=', 'asd2@vale.com', 6),
(66, 'qweqwe', 'qweqwe', '+fAH/xLTdK/9HUcv1Dwz+5I07THa/WrzPc9bD00W4IE=', 'qweqwe@vale.com', 6),
(67, '123', '123', 'G3VqwDYNEgkD8td0EZ7wIgd3qdJO0p2Hjja+Lun4/Jc=', '123@vale.com', 6),
(68, 'asdasd', 'asdasd', 'skXP9+z1eluVp0FjrCFD6vI89G/rM3qjAXDCeW+fPFM=', 'asdasdasd@vale.com', 6),
(69, 'marco@vale.com', 'marco@vale.com', 'FervVeN0aFXrrebLJhxpzUHZWOp76/y/nPuU2DGmiTY=', 'marco@vale.com', 6),
(71, 'lala', 'lala', 'LdgRNIlPToCptob0MUdLRejYvQ5HWQSxhjMTXdGSYNE=', 'lala@vale.com', 6),
(73, 'lala', 's', 'u8oetZyAPrW7LjcZfBqiJHrYVp5uZC8kLcNWaZ6AhoA=', 'lalssa@vale.com', 8),
(74, 'aaa', 'ssss', 'y4D2K2UC8vuUlzeRZrWCTmjDQN05YxAyTgJN19f9AoM=', 'sss@vale.com', 7),
(76, 'as', 's', 'SWlbKRZ27zvssuGNVxcCmMjaOV53c+v1vqXnr6nBwJo=', 'vdemaasdstro2@vale.com', 8),
(77, 'qweqweqweqwe', '123123123', 'gHR1gOVouUvdyZB/DPD6QBQ4ZMUQJnOOR/1H2p8PEcc=', '12345@vale.com', 5),
(79, 'tino', 'tino', '98qny8Z5UtCPRJ2a2eVGjHX5IZT4RzCy76seX/0i1VU=', 'tino@vale.com', 5),
(80, 'carmine attanasio', 'carmine', 'PZMy/z2vRu1dujb/O8YJ1TDWaHPaxhHLO8ku0dboj7M=', 'carmine@vale.com', 8);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `defect`
--
ALTER TABLE `defect`
  ADD PRIMARY KEY (`id_defect`);

--
-- Indici per le tabelle `descrizione_progetto`
--
ALTER TABLE `descrizione_progetto`
  ADD UNIQUE KEY `id_progetto` (`id_progetto`);

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
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `Stati`
--
ALTER TABLE `Stati`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `tipologia`
--
ALTER TABLE `tipologia`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
