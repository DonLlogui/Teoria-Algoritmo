-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 14:17:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vitalfit_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `idEvento` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fechaEvento` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`idEvento`, `idUsuario`, `nombre`, `descripcion`, `fechaEvento`, `createdAt`) VALUES
(1, 1033181625, 'Aerobicos', 'Actividad física aerobica.', '2025-04-12 16:00:00', '2025-04-01 21:35:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

CREATE TABLE `foros` (
  `idForo` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foros`
--

INSERT INTO `foros` (`idForo`, `idUsuario`, `titulo`, `contenido`, `createdAt`, `updatedAt`) VALUES
(1, 1033181625, 'Comida saludable', 'Foro para dialogar acerca de comida esencial para una buena alimentación.', '2025-04-01 21:46:53', '2025-04-01 21:46:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidentes`
--

CREATE TABLE `incidentes` (
  `idIncidente` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `adminId` int(10) NOT NULL,
  `gestionRealizada` varchar(250) NOT NULL,
  `fechaGestion` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidentes`
--

INSERT INTO `incidentes` (`idIncidente`, `idUsuario`, `titulo`, `descripcion`, `estado`, `adminId`, `gestionRealizada`, `fechaGestion`, `createdAt`, `updatedAt`) VALUES
(1, 1025643940, 'Daño en las mancuernas', 'Mal uso de ellas, se desgastaron.', 'Revisión', 1033181625, 'El mantenimiento de los utencilios ya fue realizado.', '2025-04-02 13:00:00', '2025-04-01 22:23:30', '2025-04-01 22:23:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `idReporte` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`idReporte`, `idUsuario`, `titulo`, `contenido`, `createdAt`) VALUES
(1, 1033181625, 'Falta de servicios en el gym', 'Hace falta limpieza en las instalaciones.', '2025-04-01 21:06:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(10) NOT NULL,
  `documento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `telefono` int(10) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `rol` varchar(15) NOT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `documento`, `nombres`, `telefono`, `correo`, `contrasena`, `rol`, `estado`) VALUES
(1, '1033181625', 'Laura Posada', 2147483647, 'Laurasofia122007@gmail.com', '$2b$10$bcVBT0IYzngC9nKmmswzgeMmvF8bNmAL4N/GsQAIeuO4q2CDulxmu', 'Cliente', 'Activo'),
(2, '200', 'leidy Tabares', 309494885, 'leydit@gmail.com', '12345', 'Vendedor', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`idEvento`);

--
-- Indices de la tabla `foros`
--
ALTER TABLE `foros`
  ADD PRIMARY KEY (`idForo`);

--
-- Indices de la tabla `incidentes`
--
ALTER TABLE `incidentes`
  ADD PRIMARY KEY (`idIncidente`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`idReporte`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `idEvento` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `foros`
--
ALTER TABLE `foros`
  MODIFY `idForo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `incidentes`
--
ALTER TABLE `incidentes`
  MODIFY `idIncidente` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `idReporte` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
