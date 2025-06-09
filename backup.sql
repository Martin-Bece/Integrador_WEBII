-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2025 a las 23:58:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_his`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admisiones`
--

CREATE TABLE `admisiones` (
  `idAdmision` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `motivo_id` int(11) NOT NULL,
  `origen_id` int(11) NOT NULL,
  `fecha_admision` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('Activa','Alta') NOT NULL DEFAULT 'Activa',
  `habitacion_id` int(11) NOT NULL,
  `cama_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admisiones`
--

INSERT INTO `admisiones` (`idAdmision`, `paciente_id`, `motivo_id`, `origen_id`, `fecha_admision`, `estado`, `habitacion_id`, `cama_id`) VALUES
(3, 7, 13, 1, '2025-06-02 19:05:24', 'Activa', 44, 67),
(4, 2, 76, 1, '2025-06-02 19:09:33', 'Activa', 19, 28),
(5, 3, 14, 1, '2025-06-03 16:51:30', 'Activa', 44, 68),
(6, 8, 8, 3, '2025-06-03 16:52:56', 'Activa', 2, 2),
(7, 10, 76, 1, '2025-06-03 17:05:04', 'Activa', 39, 60),
(8, 11, 76, 1, '2025-06-03 17:05:38', 'Activa', 19, 29),
(9, 5, 34, 3, '2025-06-03 17:28:11', 'Activa', 9, 12),
(10, 6, 45, 2, '2025-06-03 17:54:33', 'Activa', 12, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alas`
--

CREATE TABLE `alas` (
  `idAla` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alas`
--

INSERT INTO `alas` (`idAla`, `nombre`) VALUES
(3, 'Este'),
(1, 'Norte'),
(4, 'Oeste'),
(2, 'Sur');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `idCama` int(11) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL DEFAULT 'libre'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`idCama`, `habitacion_id`, `estado`) VALUES
(1, 1, 'libre'),
(2, 2, 'ocupada'),
(3, 2, 'libre'),
(4, 3, 'libre'),
(5, 3, 'libre'),
(6, 4, 'ocupada'),
(7, 5, 'libre'),
(8, 6, 'libre'),
(9, 7, 'libre'),
(10, 8, 'libre'),
(11, 8, 'libre'),
(12, 9, 'ocupada'),
(13, 10, 'libre'),
(14, 10, 'libre'),
(15, 11, 'libre'),
(16, 12, 'ocupada'),
(17, 12, 'libre'),
(18, 13, 'libre'),
(19, 13, 'libre'),
(20, 14, 'libre'),
(21, 15, 'libre'),
(22, 16, 'libre'),
(23, 16, 'libre'),
(24, 17, 'libre'),
(25, 17, 'libre'),
(26, 18, 'libre'),
(27, 18, 'libre'),
(28, 19, 'ocupada'),
(29, 19, 'ocupada'),
(30, 20, 'libre'),
(31, 20, 'libre'),
(32, 21, 'libre'),
(33, 22, 'libre'),
(34, 22, 'libre'),
(35, 23, 'libre'),
(36, 24, 'ocupada'),
(37, 25, 'libre'),
(38, 25, 'libre'),
(39, 26, 'libre'),
(40, 26, 'libre'),
(41, 27, 'libre'),
(42, 28, 'libre'),
(43, 28, 'libre'),
(44, 29, 'libre'),
(45, 30, 'libre'),
(46, 30, 'libre'),
(47, 31, 'libre'),
(48, 32, 'libre'),
(49, 32, 'libre'),
(50, 33, 'libre'),
(51, 33, 'libre'),
(52, 34, 'libre'),
(53, 35, 'libre'),
(54, 36, 'libre'),
(55, 36, 'libre'),
(56, 37, 'libre'),
(57, 37, 'libre'),
(58, 38, 'libre'),
(59, 38, 'libre'),
(60, 39, 'ocupada'),
(61, 40, 'libre'),
(62, 41, 'libre'),
(63, 41, 'libre'),
(64, 42, 'libre'),
(65, 42, 'libre'),
(66, 43, 'libre'),
(67, 44, 'ocupada'),
(68, 44, 'ocupada'),
(69, 45, 'libre'),
(70, 45, 'libre'),
(71, 46, 'libre'),
(72, 46, 'libre'),
(73, 47, 'libre'),
(74, 47, 'libre'),
(75, 48, 'libre'),
(76, 49, 'libre'),
(77, 49, 'libre'),
(78, 50, 'libre'),
(79, 50, 'libre'),
(80, 51, 'libre'),
(81, 51, 'libre'),
(82, 52, 'libre'),
(83, 53, 'libre'),
(84, 54, 'libre'),
(85, 55, 'libre'),
(86, 56, 'libre'),
(87, 56, 'libre'),
(88, 57, 'libre'),
(89, 57, 'libre'),
(90, 58, 'libre'),
(91, 58, 'libre'),
(92, 59, 'libre'),
(93, 59, 'libre'),
(94, 60, 'libre'),
(95, 60, 'libre'),
(96, 61, 'libre'),
(97, 61, 'libre'),
(98, 62, 'libre'),
(99, 62, 'libre'),
(100, 63, 'libre'),
(101, 63, 'libre'),
(102, 64, 'libre'),
(103, 64, 'libre'),
(104, 65, 'libre'),
(105, 66, 'libre'),
(106, 67, 'libre'),
(107, 68, 'libre'),
(108, 69, 'libre'),
(109, 70, 'libre'),
(110, 70, 'libre'),
(111, 71, 'libre'),
(112, 72, 'libre'),
(113, 73, 'libre'),
(114, 73, 'libre'),
(115, 74, 'libre'),
(116, 75, 'libre'),
(117, 75, 'libre'),
(118, 76, 'libre'),
(119, 77, 'libre'),
(120, 78, 'libre'),
(121, 78, 'libre'),
(122, 79, 'libre'),
(123, 79, 'libre'),
(124, 80, 'libre'),
(125, 81, 'libre'),
(126, 82, 'libre'),
(127, 83, 'libre'),
(128, 83, 'libre'),
(129, 84, 'libre'),
(130, 85, 'libre'),
(131, 85, 'libre'),
(132, 86, 'libre'),
(133, 87, 'libre'),
(134, 87, 'libre'),
(135, 88, 'libre'),
(136, 88, 'libre'),
(137, 89, 'libre'),
(138, 89, 'libre'),
(139, 90, 'libre'),
(140, 91, 'libre'),
(141, 92, 'libre'),
(142, 93, 'libre'),
(143, 93, 'libre'),
(144, 94, 'libre'),
(145, 94, 'libre'),
(146, 95, 'libre'),
(147, 95, 'libre'),
(148, 96, 'libre'),
(149, 96, 'libre'),
(150, 97, 'libre'),
(151, 98, 'libre'),
(152, 98, 'libre'),
(153, 99, 'libre'),
(154, 99, 'libre'),
(155, 100, 'libre'),
(156, 100, 'libre'),
(157, 101, 'libre'),
(158, 101, 'libre'),
(159, 102, 'libre'),
(160, 103, 'libre'),
(161, 103, 'libre'),
(162, 104, 'libre'),
(163, 105, 'libre'),
(164, 105, 'libre'),
(165, 106, 'libre'),
(166, 106, 'libre'),
(167, 107, 'libre'),
(168, 107, 'libre'),
(169, 108, 'libre'),
(170, 108, 'libre'),
(171, 109, 'libre'),
(172, 110, 'libre'),
(173, 110, 'libre'),
(174, 111, 'libre'),
(175, 112, 'libre'),
(176, 112, 'libre'),
(177, 113, 'libre'),
(178, 114, 'libre'),
(179, 114, 'libre'),
(180, 115, 'libre'),
(181, 116, 'libre'),
(182, 117, 'libre'),
(183, 118, 'libre'),
(184, 118, 'libre'),
(185, 119, 'libre'),
(186, 120, 'libre'),
(187, 121, 'libre'),
(188, 122, 'libre'),
(189, 123, 'libre'),
(190, 123, 'libre'),
(191, 124, 'libre'),
(192, 125, 'libre'),
(193, 125, 'libre'),
(194, 126, 'libre'),
(195, 127, 'libre'),
(196, 127, 'libre'),
(197, 128, 'libre'),
(198, 129, 'libre'),
(199, 130, 'libre'),
(200, 131, 'libre'),
(201, 131, 'libre'),
(202, 132, 'libre'),
(203, 132, 'libre'),
(204, 133, 'libre'),
(205, 133, 'libre'),
(206, 134, 'libre'),
(207, 134, 'libre'),
(208, 135, 'libre'),
(209, 135, 'libre'),
(210, 136, 'libre'),
(211, 136, 'libre'),
(212, 137, 'libre'),
(213, 138, 'libre'),
(214, 139, 'libre'),
(215, 139, 'libre'),
(216, 140, 'libre'),
(217, 141, 'libre'),
(218, 142, 'libre'),
(219, 142, 'libre'),
(220, 143, 'libre'),
(221, 144, 'libre'),
(222, 144, 'libre'),
(223, 145, 'libre'),
(224, 145, 'libre'),
(225, 146, 'libre'),
(226, 146, 'libre'),
(227, 147, 'libre'),
(228, 147, 'libre'),
(229, 148, 'libre'),
(230, 149, 'libre'),
(231, 150, 'libre'),
(232, 150, 'libre'),
(233, 151, 'libre'),
(234, 151, 'libre'),
(235, 152, 'libre'),
(236, 153, 'libre'),
(237, 154, 'libre'),
(238, 154, 'libre'),
(239, 155, 'libre'),
(240, 156, 'libre'),
(241, 156, 'libre'),
(242, 157, 'libre'),
(243, 158, 'libre'),
(244, 158, 'libre'),
(245, 159, 'libre'),
(246, 160, 'libre'),
(247, 161, 'libre'),
(248, 162, 'libre'),
(249, 162, 'libre'),
(250, 163, 'libre'),
(251, 164, 'libre'),
(252, 165, 'libre'),
(253, 166, 'libre'),
(254, 166, 'libre'),
(255, 167, 'libre'),
(256, 167, 'libre'),
(257, 168, 'libre'),
(258, 168, 'libre'),
(259, 169, 'libre'),
(260, 170, 'libre'),
(261, 170, 'libre'),
(262, 171, 'libre'),
(263, 171, 'libre'),
(264, 172, 'libre'),
(265, 173, 'libre'),
(266, 173, 'libre'),
(267, 174, 'libre'),
(268, 175, 'libre'),
(269, 175, 'libre'),
(270, 176, 'libre'),
(271, 177, 'libre'),
(272, 178, 'libre'),
(273, 179, 'libre'),
(274, 180, 'libre'),
(275, 180, 'libre'),
(276, 181, 'libre'),
(277, 181, 'libre'),
(278, 182, 'libre'),
(279, 183, 'libre'),
(280, 183, 'libre'),
(281, 184, 'libre'),
(282, 184, 'libre'),
(283, 185, 'libre'),
(284, 185, 'libre'),
(285, 186, 'libre'),
(286, 187, 'libre'),
(287, 187, 'libre'),
(288, 188, 'libre'),
(289, 189, 'libre'),
(290, 189, 'libre'),
(291, 190, 'libre'),
(292, 191, 'libre'),
(293, 191, 'libre'),
(294, 192, 'libre'),
(295, 192, 'libre'),
(296, 193, 'libre'),
(297, 194, 'libre'),
(298, 195, 'libre'),
(299, 195, 'libre'),
(300, 196, 'libre'),
(301, 197, 'libre'),
(302, 197, 'libre'),
(303, 198, 'libre'),
(304, 198, 'libre'),
(305, 199, 'libre'),
(306, 200, 'libre'),
(307, 200, 'libre'),
(308, 201, 'libre'),
(309, 201, 'libre'),
(310, 202, 'libre'),
(311, 203, 'libre'),
(312, 204, 'libre'),
(313, 204, 'libre'),
(314, 205, 'libre'),
(315, 206, 'libre'),
(316, 207, 'libre'),
(317, 207, 'libre'),
(318, 208, 'libre'),
(319, 209, 'libre'),
(320, 210, 'libre'),
(321, 210, 'libre'),
(322, 211, 'libre'),
(323, 211, 'libre'),
(324, 212, 'libre'),
(325, 212, 'libre'),
(326, 213, 'libre'),
(327, 214, 'libre'),
(328, 215, 'libre'),
(329, 215, 'libre'),
(330, 216, 'libre'),
(331, 216, 'libre'),
(332, 217, 'libre'),
(333, 218, 'libre'),
(334, 218, 'libre'),
(335, 219, 'libre'),
(336, 219, 'libre'),
(337, 220, 'libre'),
(338, 220, 'libre'),
(339, 221, 'libre'),
(340, 222, 'libre'),
(341, 222, 'libre'),
(342, 223, 'libre'),
(343, 223, 'libre'),
(344, 224, 'libre'),
(345, 224, 'libre'),
(346, 225, 'libre'),
(347, 226, 'libre'),
(348, 227, 'libre'),
(349, 227, 'libre'),
(350, 228, 'libre'),
(351, 229, 'libre'),
(352, 230, 'libre'),
(353, 231, 'libre'),
(354, 231, 'libre'),
(355, 232, 'libre'),
(356, 233, 'libre'),
(357, 234, 'libre'),
(358, 234, 'libre'),
(359, 235, 'libre'),
(360, 236, 'libre'),
(361, 236, 'libre'),
(362, 237, 'libre'),
(363, 237, 'libre'),
(364, 238, 'libre'),
(365, 239, 'libre'),
(366, 240, 'libre'),
(367, 241, 'libre'),
(368, 241, 'libre'),
(369, 242, 'libre'),
(370, 242, 'libre'),
(371, 243, 'libre'),
(372, 244, 'libre'),
(373, 245, 'libre'),
(374, 246, 'libre'),
(375, 246, 'libre'),
(376, 247, 'libre'),
(377, 248, 'libre'),
(378, 248, 'libre'),
(379, 249, 'libre'),
(380, 250, 'libre'),
(381, 250, 'libre'),
(382, 251, 'libre'),
(383, 252, 'libre'),
(384, 252, 'libre'),
(385, 253, 'libre'),
(386, 253, 'libre'),
(387, 254, 'libre'),
(388, 255, 'libre'),
(389, 255, 'libre'),
(390, 256, 'libre'),
(391, 257, 'libre'),
(392, 257, 'libre'),
(393, 258, 'libre'),
(394, 258, 'libre'),
(395, 259, 'libre'),
(396, 259, 'libre'),
(397, 260, 'libre'),
(398, 261, 'libre'),
(399, 261, 'libre'),
(400, 262, 'libre'),
(401, 262, 'libre'),
(402, 263, 'libre'),
(403, 264, 'libre'),
(404, 265, 'libre'),
(405, 265, 'libre'),
(406, 266, 'libre'),
(407, 267, 'libre'),
(408, 268, 'libre'),
(409, 268, 'libre'),
(410, 269, 'libre'),
(411, 270, 'libre'),
(412, 270, 'libre'),
(413, 271, 'libre'),
(414, 271, 'libre'),
(415, 272, 'libre'),
(416, 273, 'libre'),
(417, 273, 'libre'),
(418, 274, 'libre'),
(419, 274, 'libre'),
(420, 275, 'libre'),
(421, 276, 'libre'),
(422, 276, 'libre'),
(423, 277, 'libre'),
(424, 277, 'libre'),
(425, 278, 'libre'),
(426, 279, 'libre'),
(427, 279, 'libre'),
(428, 280, 'libre'),
(429, 280, 'libre'),
(430, 281, 'libre'),
(431, 282, 'libre'),
(432, 282, 'libre'),
(433, 283, 'libre'),
(434, 283, 'libre'),
(435, 284, 'libre'),
(436, 285, 'libre'),
(437, 286, 'libre'),
(438, 287, 'libre'),
(439, 287, 'libre'),
(440, 288, 'libre'),
(441, 289, 'libre'),
(442, 289, 'libre'),
(443, 290, 'libre'),
(444, 291, 'libre'),
(445, 291, 'libre'),
(446, 292, 'libre'),
(447, 293, 'libre'),
(448, 293, 'libre'),
(449, 294, 'libre'),
(450, 295, 'libre'),
(451, 296, 'libre'),
(452, 296, 'libre'),
(453, 297, 'libre'),
(454, 298, 'libre'),
(455, 298, 'libre'),
(456, 299, 'libre'),
(457, 299, 'libre'),
(458, 300, 'libre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `idEspecialidad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`idEspecialidad`, `nombre`) VALUES
(2, 'Cardiología'),
(15, 'Cirugía General'),
(1, 'Clínica Médica'),
(17, 'Cuidados Paliativos'),
(20, 'Emergentología'),
(16, 'Endocrinología'),
(4, 'Gastroenterología'),
(12, 'Ginecología'),
(9, 'Hematología'),
(6, 'Infectología'),
(8, 'Nefrología'),
(3, 'Neumonología'),
(5, 'Neurología'),
(13, 'Obstetricia'),
(10, 'Oncología Clínica'),
(11, 'Psiquiatría'),
(18, 'Reumatología'),
(19, 'Terapia Intensiva'),
(14, 'Traumatología y Ortopedia'),
(7, 'Urología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `idHabitacion` int(11) NOT NULL,
  `ala_id` int(11) NOT NULL,
  `unidad_id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`idHabitacion`, `ala_id`, `unidad_id`, `numero`, `capacidad`) VALUES
(1, 2, 1, 1, 1),
(2, 3, 2, 2, 2),
(3, 4, 3, 3, 2),
(4, 1, 4, 4, 1),
(5, 2, 5, 5, 1),
(6, 3, 6, 6, 1),
(7, 4, 7, 7, 1),
(8, 1, 8, 8, 2),
(9, 2, 9, 9, 1),
(10, 3, 10, 10, 2),
(11, 4, 11, 11, 1),
(12, 1, 12, 12, 2),
(13, 2, 13, 13, 2),
(14, 3, 14, 14, 1),
(15, 4, 15, 15, 1),
(16, 1, 16, 16, 2),
(17, 2, 17, 17, 2),
(18, 3, 18, 18, 2),
(19, 4, 19, 19, 2),
(20, 1, 20, 20, 2),
(21, 2, 1, 21, 1),
(22, 3, 2, 22, 2),
(23, 4, 3, 23, 1),
(24, 1, 4, 24, 1),
(25, 2, 5, 25, 2),
(26, 3, 6, 26, 2),
(27, 4, 7, 27, 1),
(28, 1, 8, 28, 2),
(29, 2, 9, 29, 1),
(30, 3, 10, 30, 2),
(31, 4, 11, 31, 1),
(32, 1, 12, 32, 2),
(33, 2, 13, 33, 2),
(34, 3, 14, 34, 1),
(35, 4, 15, 35, 1),
(36, 1, 16, 36, 2),
(37, 2, 17, 37, 2),
(38, 3, 18, 38, 2),
(39, 4, 19, 39, 1),
(40, 1, 20, 40, 1),
(41, 2, 1, 41, 2),
(42, 3, 2, 42, 2),
(43, 4, 3, 43, 1),
(44, 1, 4, 44, 2),
(45, 2, 5, 45, 2),
(46, 3, 6, 46, 2),
(47, 4, 7, 47, 2),
(48, 1, 8, 48, 1),
(49, 2, 9, 49, 2),
(50, 3, 10, 50, 2),
(51, 4, 11, 51, 2),
(52, 1, 12, 52, 1),
(53, 2, 13, 53, 1),
(54, 3, 14, 54, 1),
(55, 4, 15, 55, 1),
(56, 1, 16, 56, 2),
(57, 2, 17, 57, 2),
(58, 3, 18, 58, 2),
(59, 4, 19, 59, 2),
(60, 1, 20, 60, 2),
(61, 2, 1, 61, 2),
(62, 3, 2, 62, 2),
(63, 4, 3, 63, 2),
(64, 1, 4, 64, 2),
(65, 2, 5, 65, 1),
(66, 3, 6, 66, 1),
(67, 4, 7, 67, 1),
(68, 1, 8, 68, 1),
(69, 2, 9, 69, 1),
(70, 3, 10, 70, 2),
(71, 4, 11, 71, 1),
(72, 1, 12, 72, 1),
(73, 2, 13, 73, 2),
(74, 3, 14, 74, 1),
(75, 4, 15, 75, 2),
(76, 1, 16, 76, 1),
(77, 2, 17, 77, 1),
(78, 3, 18, 78, 2),
(79, 4, 19, 79, 2),
(80, 1, 20, 80, 1),
(81, 2, 1, 81, 1),
(82, 3, 2, 82, 1),
(83, 4, 3, 83, 2),
(84, 1, 4, 84, 1),
(85, 2, 5, 85, 2),
(86, 3, 6, 86, 1),
(87, 4, 7, 87, 2),
(88, 1, 8, 88, 2),
(89, 2, 9, 89, 2),
(90, 3, 10, 90, 1),
(91, 4, 11, 91, 1),
(92, 1, 12, 92, 1),
(93, 2, 13, 93, 2),
(94, 3, 14, 94, 2),
(95, 4, 15, 95, 2),
(96, 1, 16, 96, 2),
(97, 2, 17, 97, 1),
(98, 3, 18, 98, 2),
(99, 4, 19, 99, 2),
(100, 1, 20, 100, 2),
(101, 2, 1, 101, 2),
(102, 3, 2, 102, 1),
(103, 4, 3, 103, 2),
(104, 1, 4, 104, 1),
(105, 2, 5, 105, 2),
(106, 3, 6, 106, 2),
(107, 4, 7, 107, 2),
(108, 1, 8, 108, 2),
(109, 2, 9, 109, 1),
(110, 3, 10, 110, 2),
(111, 4, 11, 111, 1),
(112, 1, 12, 112, 2),
(113, 2, 13, 113, 1),
(114, 3, 14, 114, 2),
(115, 4, 15, 115, 1),
(116, 1, 16, 116, 1),
(117, 2, 17, 117, 1),
(118, 3, 18, 118, 2),
(119, 4, 19, 119, 1),
(120, 1, 20, 120, 1),
(121, 2, 1, 121, 1),
(122, 3, 2, 122, 1),
(123, 4, 3, 123, 2),
(124, 1, 4, 124, 1),
(125, 2, 5, 125, 2),
(126, 3, 6, 126, 1),
(127, 4, 7, 127, 2),
(128, 1, 8, 128, 1),
(129, 2, 9, 129, 1),
(130, 3, 10, 130, 1),
(131, 4, 11, 131, 2),
(132, 1, 12, 132, 2),
(133, 2, 13, 133, 2),
(134, 3, 14, 134, 2),
(135, 4, 15, 135, 2),
(136, 1, 16, 136, 2),
(137, 2, 17, 137, 1),
(138, 3, 18, 138, 1),
(139, 4, 19, 139, 2),
(140, 1, 20, 140, 1),
(141, 2, 1, 141, 1),
(142, 3, 2, 142, 2),
(143, 4, 3, 143, 1),
(144, 1, 4, 144, 2),
(145, 2, 5, 145, 2),
(146, 3, 6, 146, 2),
(147, 4, 7, 147, 2),
(148, 1, 8, 148, 1),
(149, 2, 9, 149, 1),
(150, 3, 10, 150, 2),
(151, 4, 11, 151, 2),
(152, 1, 12, 152, 1),
(153, 2, 13, 153, 1),
(154, 3, 14, 154, 2),
(155, 4, 15, 155, 1),
(156, 1, 16, 156, 2),
(157, 2, 17, 157, 1),
(158, 3, 18, 158, 2),
(159, 4, 19, 159, 1),
(160, 1, 20, 160, 1),
(161, 2, 1, 161, 1),
(162, 3, 2, 162, 2),
(163, 4, 3, 163, 1),
(164, 1, 4, 164, 1),
(165, 2, 5, 165, 1),
(166, 3, 6, 166, 2),
(167, 4, 7, 167, 2),
(168, 1, 8, 168, 2),
(169, 2, 9, 169, 1),
(170, 3, 10, 170, 2),
(171, 4, 11, 171, 2),
(172, 1, 12, 172, 1),
(173, 2, 13, 173, 2),
(174, 3, 14, 174, 1),
(175, 4, 15, 175, 2),
(176, 1, 16, 176, 1),
(177, 2, 17, 177, 1),
(178, 3, 18, 178, 1),
(179, 4, 19, 179, 1),
(180, 1, 20, 180, 2),
(181, 2, 1, 181, 2),
(182, 3, 2, 182, 1),
(183, 4, 3, 183, 2),
(184, 1, 4, 184, 2),
(185, 2, 5, 185, 2),
(186, 3, 6, 186, 1),
(187, 4, 7, 187, 2),
(188, 1, 8, 188, 1),
(189, 2, 9, 189, 2),
(190, 3, 10, 190, 1),
(191, 4, 11, 191, 2),
(192, 1, 12, 192, 2),
(193, 2, 13, 193, 1),
(194, 3, 14, 194, 1),
(195, 4, 15, 195, 2),
(196, 1, 16, 196, 1),
(197, 2, 17, 197, 2),
(198, 3, 18, 198, 2),
(199, 4, 19, 199, 1),
(200, 1, 20, 200, 2),
(201, 2, 1, 201, 2),
(202, 3, 2, 202, 1),
(203, 4, 3, 203, 1),
(204, 1, 4, 204, 2),
(205, 2, 5, 205, 1),
(206, 3, 6, 206, 1),
(207, 4, 7, 207, 2),
(208, 1, 8, 208, 1),
(209, 2, 9, 209, 1),
(210, 3, 10, 210, 2),
(211, 4, 11, 211, 2),
(212, 1, 12, 212, 2),
(213, 2, 13, 213, 1),
(214, 3, 14, 214, 1),
(215, 4, 15, 215, 2),
(216, 1, 16, 216, 2),
(217, 2, 17, 217, 1),
(218, 3, 18, 218, 2),
(219, 4, 19, 219, 2),
(220, 1, 20, 220, 2),
(221, 2, 1, 221, 1),
(222, 3, 2, 222, 2),
(223, 4, 3, 223, 2),
(224, 1, 4, 224, 2),
(225, 2, 5, 225, 1),
(226, 3, 6, 226, 1),
(227, 4, 7, 227, 2),
(228, 1, 8, 228, 1),
(229, 2, 9, 229, 1),
(230, 3, 10, 230, 1),
(231, 4, 11, 231, 2),
(232, 1, 12, 232, 1),
(233, 2, 13, 233, 1),
(234, 3, 14, 234, 2),
(235, 4, 15, 235, 1),
(236, 1, 16, 236, 2),
(237, 2, 17, 237, 2),
(238, 3, 18, 238, 1),
(239, 4, 19, 239, 1),
(240, 1, 20, 240, 1),
(241, 2, 1, 241, 2),
(242, 3, 2, 242, 2),
(243, 4, 3, 243, 1),
(244, 1, 4, 244, 1),
(245, 2, 5, 245, 1),
(246, 3, 6, 246, 2),
(247, 4, 7, 247, 1),
(248, 1, 8, 248, 2),
(249, 2, 9, 249, 1),
(250, 3, 10, 250, 2),
(251, 4, 11, 251, 1),
(252, 1, 12, 252, 2),
(253, 2, 13, 253, 2),
(254, 3, 14, 254, 1),
(255, 4, 15, 255, 2),
(256, 1, 16, 256, 1),
(257, 2, 17, 257, 2),
(258, 3, 18, 258, 2),
(259, 4, 19, 259, 2),
(260, 1, 20, 260, 1),
(261, 2, 1, 261, 2),
(262, 3, 2, 262, 2),
(263, 4, 3, 263, 1),
(264, 1, 4, 264, 1),
(265, 2, 5, 265, 2),
(266, 3, 6, 266, 1),
(267, 4, 7, 267, 1),
(268, 1, 8, 268, 2),
(269, 2, 9, 269, 1),
(270, 3, 10, 270, 2),
(271, 4, 11, 271, 2),
(272, 1, 12, 272, 1),
(273, 2, 13, 273, 2),
(274, 3, 14, 274, 2),
(275, 4, 15, 275, 1),
(276, 1, 16, 276, 2),
(277, 2, 17, 277, 2),
(278, 3, 18, 278, 1),
(279, 4, 19, 279, 2),
(280, 1, 20, 280, 2),
(281, 2, 1, 281, 1),
(282, 3, 2, 282, 2),
(283, 4, 3, 283, 2),
(284, 1, 4, 284, 1),
(285, 2, 5, 285, 1),
(286, 3, 6, 286, 1),
(287, 4, 7, 287, 2),
(288, 1, 8, 288, 1),
(289, 2, 9, 289, 2),
(290, 3, 10, 290, 1),
(291, 4, 11, 291, 2),
(292, 1, 12, 292, 1),
(293, 2, 13, 293, 2),
(294, 3, 14, 294, 1),
(295, 4, 15, 295, 1),
(296, 1, 16, 296, 2),
(297, 2, 17, 297, 1),
(298, 3, 18, 298, 2),
(299, 4, 19, 299, 2),
(300, 1, 20, 300, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `idMedico` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `idEspecialidad` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`idMedico`, `nombre`, `apellido`, `matricula`, `telefono`, `activo`, `idEspecialidad`) VALUES
(1, 'Camila', 'Díaz', 'M0001', '1148932269', 1, 1),
(2, 'Ana', 'Torres', 'M0002', '1141552250', 1, 1),
(3, 'Andrés', 'López', 'M0003', '1141459180', 1, 1),
(4, 'Valeria', 'Díaz', 'M0004', '1145505540', 1, 2),
(5, 'Ana', 'Martínez', 'M0005', '1148459537', 1, 2),
(6, 'Sofía', 'Gómez', 'M0006', '1146259406', 1, 2),
(7, 'José', 'Fernández', 'M0007', '1148123456', 1, 3),
(8, 'Raúl', 'Pérez', 'M0008', '1146234567', 1, 3),
(9, 'Lucía', 'Vega', 'M0009', '1147123456', 1, 3),
(10, 'Claudia', 'Morales', 'M0010', '1147321987', 1, 4),
(11, 'Mario', 'Benítez', 'M0011', '1147983245', 1, 4),
(12, 'Laura', 'Herrera', 'M0012', '1147556482', 1, 4),
(13, 'Carlos', 'Suárez', 'M0013', '1147665544', 1, 5),
(14, 'Julia', 'Castro', 'M0014', '1147441223', 1, 5),
(15, 'Bruno', 'Ortega', 'M0015', '1147223355', 1, 5),
(16, 'Luciano', 'Flores', 'M0016', '1147112233', 1, 6),
(17, 'Natalia', 'Vargas', 'M0017', '1147883344', 1, 6),
(18, 'Esteban', 'Cabrera', 'M0018', '1147664433', 1, 6),
(19, 'Fernanda', 'Acosta', 'M0019', '1147992233', 1, 7),
(20, 'Marcos', 'Luna', 'M0020', '1147881122', 1, 7),
(21, 'Graciela', 'Sosa', 'M0021', '1147559988', 1, 7),
(22, 'Sebastián', 'Reyes', 'M0022', '1147221199', 1, 8),
(23, 'Cristina', 'Ibarra', 'M0023', '1147338899', 1, 8),
(24, 'Emiliano', 'Ríos', 'M0024', '1147662233', 1, 8),
(25, 'Marina', 'Leiva', 'M0025', '1147119988', 1, 9),
(26, 'Gabriela', 'Ojeda', 'M0026', '1147556677', 1, 9),
(27, 'Federico', 'Salas', 'M0027', '1147994411', 1, 9),
(28, 'Oscar', 'Cardozo', 'M0028', '1147003322', 1, 10),
(29, 'Romina', 'Navarro', 'M0029', '1147889988', 1, 10),
(30, 'Pablo', 'Palacios', 'M0030', '1147445566', 1, 10),
(31, 'Elsa', 'Ferreyra', 'M0031', '1147654388', 1, 11),
(32, 'Lucas', 'Aguirre', 'M0032', '1147223344', 1, 11),
(33, 'Roxana', 'García', 'M0033', '1147123399', 1, 11),
(34, 'Alberto', 'Ledesma', 'M0034', '1147336655', 1, 12),
(35, 'Belén', 'Bravo', 'M0035', '1147667890', 1, 12),
(36, 'Cecilia', 'Delgado', 'M0036', '1147002211', 1, 12),
(37, 'Jonathan', 'Silva', 'M0037', '1147112234', 1, 13),
(38, 'Patricia', 'Sánchez', 'M0038', '1147332233', 1, 13),
(39, 'Alejandro', 'Mansilla', 'M0039', '1147221234', 1, 13),
(40, 'Lucía', 'Alonso', 'M0040', '1147445567', 1, 14),
(41, 'Iván', 'Campos', 'M0041', '1147884455', 1, 14),
(42, 'Andrea', 'Núñez', 'M0042', '1147556678', 1, 14),
(43, 'Felipe', 'Domínguez', 'M0043', '1147223345', 1, 15),
(44, 'Mercedes', 'Ayala', 'M0044', '1147553322', 1, 15),
(45, 'Tomás', 'Villalba', 'M0045', '1147995566', 1, 15),
(46, 'Martina', 'Paredes', 'M0046', '1147883345', 1, 16),
(47, 'Elena', 'Correa', 'M0047', '1147447788', 1, 16),
(48, 'Pedro', 'Molina', 'M0048', '1147008877', 1, 16),
(49, 'Julián', 'Esquivel', 'M0049', '1147223346', 1, 17),
(50, 'Milagros', 'Villar', 'M0050', '1147553323', 1, 17),
(51, 'Axel', 'Luna', 'M0051', '1147995567', 1, 17),
(52, 'Carolina', 'Franco', 'M0052', '1147883346', 1, 18),
(53, 'Ricardo', 'Carrizo', 'M0053', '1147447789', 1, 18),
(54, 'Yesica', 'Moreno', 'M0054', '1147008878', 1, 18),
(55, 'Guillermo', 'Santana', 'M0055', '1147223347', 1, 19),
(56, 'Daniela', 'Lozano', 'M0056', '1147553324', 1, 19),
(57, 'Enzo', 'Peralta', 'M0057', '1147995568', 1, 19),
(58, 'Tatiana', 'Rivero', 'M0058', '1147883347', 1, 20),
(59, 'Nahuel', 'Acuña', 'M0059', '1147447790', 1, 20),
(60, 'José', 'Rodríguez', 'M0060', '1147008879', 1, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivos`
--

CREATE TABLE `motivos` (
  `idMotivo` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `idEspecialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `motivos`
--

INSERT INTO `motivos` (`idMotivo`, `descripcion`, `idEspecialidad`) VALUES
(1, 'Descompensación metabólica', 1),
(2, 'Neumonía severa', 1),
(3, 'Fiebre de origen desconocido persistente', 1),
(4, 'Síndrome confusional agudo', 1),
(5, 'Insuficiencia cardíaca descompensada', 2),
(6, 'Arritmias complejas', 2),
(7, 'Dolor precordial con sospecha de infarto', 2),
(8, 'Crisis hipertensiva', 2),
(9, 'Accidente cerebrovascular agudo', 3),
(10, 'Crisis epiléptica prolongada', 3),
(11, 'Alteración del estado de conciencia', 3),
(12, 'Síndrome vertiginoso incapacitante', 3),
(13, 'Fractura ósea con requerimiento de cirugía', 4),
(14, 'Luxación grave', 4),
(15, 'Politraumatismo', 4),
(16, 'Dolor óseo severo con inmovilidad', 4),
(17, 'Neumonía bilateral', 5),
(18, 'Crisis asmática grave', 5),
(19, 'EPOC exacerbado', 5),
(20, 'Insuficiencia respiratoria aguda', 5),
(21, 'Hemorragia digestiva alta', 6),
(22, 'Pancreatitis aguda', 6),
(23, 'Obstrucción intestinal', 6),
(24, 'Hepatitis aguda con ictericia', 6),
(25, 'Embarazo ectópico', 7),
(26, 'Amenaza de aborto con sangrado', 7),
(27, 'Quiste ovárico complicado', 7),
(28, 'Endometritis aguda', 7),
(29, 'Cólico renal refractario', 8),
(30, 'Retención urinaria aguda', 8),
(31, 'Infección urinaria con fiebre persistente', 8),
(32, 'Litiasis obstructiva', 8),
(33, 'Cetoacidosis diabética', 9),
(34, 'Hipoglucemia severa', 9),
(35, 'Crisis tiroidea', 9),
(36, 'Desbalance hidroelectrolítico', 9),
(37, 'Sepsis de foco desconocido', 10),
(38, 'Fiebre prolongada con compromiso general', 10),
(39, 'Infección de piel diseminada', 10),
(40, 'Infección postquirúrgica severa', 10),
(41, 'Celulitis extensa con fiebre', 11),
(42, 'Eritema multiforme mayor', 11),
(43, 'Infección por abscesos múltiples', 11),
(44, 'Reacción cutánea severa a medicamentos', 11),
(45, 'Celulitis orbitaria', 12),
(46, 'Uveítis severa', 12),
(47, 'Trauma ocular penetrante', 12),
(48, 'Glaucoma agudo', 12),
(49, 'Absceso periamigdalino', 13),
(50, 'Otitis media complicada con mastoiditis', 13),
(51, 'Epistaxis masiva', 13),
(52, 'Obstrucción de vías aéreas altas', 13),
(53, 'Psicosis aguda', 14),
(54, 'Riesgo suicida elevado', 14),
(55, 'Descompensación de trastorno bipolar', 14),
(56, 'Agitación psicomotriz severa', 14),
(57, 'Evaluación por intento de suicidio', 15),
(58, 'Internación por trastornos alimentarios graves', 15),
(59, 'Evaluación por riesgo autolesivo', 15),
(60, 'Crisis emocional con pérdida de contacto con la realidad', 15),
(61, 'Lupus eritematoso con afectación orgánica', 16),
(62, 'Artritis reumatoide con brote severo', 16),
(63, 'Vasculitis sistémica activa', 16),
(64, 'Síndrome antifosfolípido con trombosis', 16),
(65, 'Insuficiencia renal aguda', 17),
(66, 'Síndrome nefrótico con edema generalizado', 17),
(67, 'Crisis hipertensiva renal', 17),
(68, 'Hematuria macroscópica con dolor renal', 17),
(69, 'Anemia severa con disnea', 18),
(70, 'Trombocitopenia con sangrado activo', 18),
(71, 'Pancitopenia febril', 18),
(72, 'Sospecha de linfoma agudo', 18),
(73, 'Dolor oncológico refractario', 19),
(74, 'Fiebre en paciente inmunocomprometido', 19),
(75, 'Compresión medular por metástasis', 19),
(76, 'Sangrado tumoral activo', 19),
(77, 'Paciente pluripatológico descompensado', 20),
(78, 'Síndrome febril con deterioro general', 20),
(79, 'Caquexia por enfermedad crónica', 20),
(80, 'Evaluación preoperatoria urgente', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mutuales`
--

CREATE TABLE `mutuales` (
  `idMutual` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mutuales`
--

INSERT INTO `mutuales` (`idMutual`, `nombre`) VALUES
(11, 'Accord Salud'),
(3, 'DOSEP'),
(10, 'Federada Salud'),
(6, 'Galeno'),
(4, 'IOMA'),
(7, 'Medicus'),
(8, 'Omint'),
(1, 'OSDE'),
(2, 'PAMI'),
(9, 'Sancor Salud'),
(5, 'Swiss Medical');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `origenes`
--

CREATE TABLE `origenes` (
  `idOrigen` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `origenes`
--

INSERT INTO `origenes` (`idOrigen`, `nombre`) VALUES
(2, 'Derivación'),
(1, 'Emergencia'),
(3, 'Turno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `idPaciente` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `dni` bigint(20) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `mutual_id` int(11) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`idPaciente`, `nombre`, `apellido`, `dni`, `fecha_nacimiento`, `sexo`, `telefono`, `direccion`, `mutual_id`, `activo`) VALUES
(1, 'Horacio', 'Almada', 12345678, '1985-06-01', 'M', '123456789', 'Calle Falsa 123', 1, 1),
(2, 'Martin', 'Becerra', 47266622, '2006-03-23', 'M', '2664304069', 'Angel Dominguez 32', 3, 1),
(3, 'Santiago', 'Becerra', 46072720, '2004-11-06', 'M', '2664164893', 'Angel Dominguez 32', 1, 1),
(5, 'Carolina', 'Becerra', 38731849, '1995-06-14', 'F', '2664101010', 'Rivadavia 1100', 1, 1),
(6, 'Ariel', 'Becerra', 23448180, '1973-09-05', 'M', '2664334760', 'Angel Dominguez 32', 1, 1),
(7, 'Juancho', 'Trivago', 11111111, '1935-01-01', 'M', '2612258890', 'Chacabuco 200', 2, 1),
(8, 'Matias', 'Borsasatti', 12121212, '1990-03-23', 'M', '1234121212', 'Santa Fe 1100', 9, 1),
(9, NULL, NULL, 12312312, NULL, 'M', NULL, NULL, NULL, 1),
(10, 'Julieta', 'Fernandez', 22222222, '2000-06-20', 'F', '2664334799', 'Manuel Lezcano 2020', 7, 1),
(11, 'Mario', 'Arriola', 33333333, '1992-12-12', 'M', '2665666666', 'La Punilla 1199', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `idTurno` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idEspecialidad` int(11) NOT NULL,
  `idMedico` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`idTurno`, `paciente_id`, `fecha`, `hora`, `idEspecialidad`, `idMedico`, `estado`) VALUES
(2, 3, '2025-06-08', '15:30:00', 14, 42, 'Pendiente'),
(5, 7, '2025-06-11', '09:30:00', 11, 32, 'Pendiente'),
(6, 8, '2025-07-04', '15:30:00', 18, 53, 'Pendiente'),
(7, 5, '2025-07-06', '08:15:00', 9, 26, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades`
--

CREATE TABLE `unidades` (
  `idUnidad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidades`
--

INSERT INTO `unidades` (`idUnidad`, `nombre`) VALUES
(2, 'Cardiología'),
(15, 'Cirugía General'),
(1, 'Clínica Médica'),
(17, 'Cuidados Paliativos'),
(20, 'Emergentología'),
(16, 'Endocrinología'),
(4, 'Gastroenterología'),
(12, 'Ginecología'),
(9, 'Hematología'),
(6, 'Infectología'),
(8, 'Nefrología'),
(3, 'Neumonología'),
(5, 'Neurología'),
(13, 'Obstetricia'),
(10, 'Oncología Clínica'),
(11, 'Psiquiatría'),
(18, 'Reumatología'),
(19, 'Terapia Intensiva'),
(14, 'Traumatología y Ortopedia'),
(7, 'Urología');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD PRIMARY KEY (`idAdmision`),
  ADD KEY `fk_admision_habitacion` (`habitacion_id`) USING BTREE,
  ADD KEY `fk_admision_cama` (`cama_id`) USING BTREE,
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `motivo_id` (`motivo_id`),
  ADD KEY `origen_id` (`origen_id`);

--
-- Indices de la tabla `alas`
--
ALTER TABLE `alas`
  ADD PRIMARY KEY (`idAla`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`idCama`),
  ADD KEY `habitacion_id` (`habitacion_id`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`idEspecialidad`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`idHabitacion`),
  ADD KEY `fk_habitacion_unidad` (`unidad_id`) USING BTREE,
  ADD KEY `ala_id` (`ala_id`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`idMedico`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- Indices de la tabla `motivos`
--
ALTER TABLE `motivos`
  ADD PRIMARY KEY (`idMotivo`),
  ADD UNIQUE KEY `descripcion` (`descripcion`),
  ADD KEY `especialidad_motivos` (`idEspecialidad`) USING BTREE;

--
-- Indices de la tabla `mutuales`
--
ALTER TABLE `mutuales`
  ADD PRIMARY KEY (`idMutual`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `origenes`
--
ALTER TABLE `origenes`
  ADD PRIMARY KEY (`idOrigen`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`idPaciente`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `fk_paciente_mutual` (`mutual_id`) USING BTREE;

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`idTurno`),
  ADD KEY `fk_especialidades_turnos` (`idEspecialidad`) USING BTREE,
  ADD KEY `fk_medico_turnos` (`idMedico`) USING BTREE,
  ADD KEY `paciente_id` (`paciente_id`);

--
-- Indices de la tabla `unidades`
--
ALTER TABLE `unidades`
  ADD PRIMARY KEY (`idUnidad`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  MODIFY `idAdmision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `alas`
--
ALTER TABLE `alas`
  MODIFY `idAla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `idCama` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=459;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `idEspecialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `idHabitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `idMedico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `motivos`
--
ALTER TABLE `motivos`
  MODIFY `idMotivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `mutuales`
--
ALTER TABLE `mutuales`
  MODIFY `idMutual` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `origenes`
--
ALTER TABLE `origenes`
  MODIFY `idOrigen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `idPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `idTurno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `unidades`
--
ALTER TABLE `unidades`
  MODIFY `idUnidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD CONSTRAINT `admisiones_ibfk_1289` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`idPaciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_1290` FOREIGN KEY (`motivo_id`) REFERENCES `motivos` (`idMotivo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_1291` FOREIGN KEY (`origen_id`) REFERENCES `origenes` (`idOrigen`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_1292` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idHabitacion`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_1293` FOREIGN KEY (`cama_id`) REFERENCES `camas` (`idCama`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `camas`
--
ALTER TABLE `camas`
  ADD CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idHabitacion`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `habitaciones_ibfk_515` FOREIGN KEY (`ala_id`) REFERENCES `alas` (`idAla`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `habitaciones_ibfk_516` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`idUnidad`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `motivos`
--
ALTER TABLE `motivos`
  ADD CONSTRAINT `motivos_ibfk_1` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidades` (`idEspecialidad`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`mutual_id`) REFERENCES `mutuales` (`idMutual`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_772` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`idPaciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_773` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidades` (`idEspecialidad`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_774` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`idMedico`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
