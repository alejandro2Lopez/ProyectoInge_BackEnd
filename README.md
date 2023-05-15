# ProyectoInge_BackEnd

Creacion de base de datos
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema babershop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema babershop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `barbershop` ;
USE `barbershop` ;

-- -----------------------------------------------------
-- Table `babershop`.`Persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`Persona` (
  `idPersona` INT AUTO_INCREMENT NOT NULL,
`nombreUsuario` VARCHAR(45) NOT NULL,
  `contrasennia` VARCHAR(45) NOT NULL,
  `numeroTelefonico` VARCHAR(45) NOT NULL,
  `gmail` VARCHAR(50) NOT NULL,
  `activoSN` BIT NOT NULL DEFAULT 0,
  
  PRIMARY KEY (`idPersona`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `babershop`.`RolPersona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`RolPersona` (
  `idRolPersona` SMALLINT  AUTO_INCREMENT  NOT NULL,
  `Descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRolPersona`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `babershop`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`Producto` (
  `idProducto` INT  AUTO_INCREMENT NOT NULL,
  `imagen` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `babershop`.`TipoPersona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`TipoPersona` (
  `idTipoPersona` INT  AUTO_INCREMENT NOT NULL,
  `idPersona` INT NOT NULL,
  `idRolPersona` SMALLINT NOT NULL,
  PRIMARY KEY (`idTipoPersona`, `idPersona`, `idRolPersona`),
  INDEX `fk_TipoPersona_Persona_idx` (`idPersona` ASC) VISIBLE,
  INDEX `fk_TipoPersona_RolPersona1_idx` (`idRolPersona` ASC) VISIBLE,
  CONSTRAINT `fk_TipoPersona_Persona`
    FOREIGN KEY (`idPersona`)
    REFERENCES `babershop`.`Persona` (`idPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TipoPersona_RolPersona1`
    FOREIGN KEY (`idRolPersona`)
    REFERENCES `babershop`.`RolPersona` (`idRolPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `babershop`.`AgendaCita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`AgendaCita` (
  `idAgendaCita` INT  AUTO_INCREMENT NOT NULL,
  `hora` VARCHAR(10) NOT NULL,
  `fecha` DATE NOT NULL,
  `disponibleS/N` BIT NOT NULL,
  PRIMARY KEY (`idAgendaCita`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `babershop`.`TipoCorte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`TipoCorte` (
  `idTipoCorte` SMALLINT  AUTO_INCREMENT NOT NULL,
  `descripcion` VARCHAR(50) NOT NULL,
  `duracionCorte` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idTipoCorte`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `babershop`.`Cita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`Cita` (
  `idCita` INT  AUTO_INCREMENT NOT NULL,
  `idPersona` INT NOT NULL,
  `idAgendaCita` INT NOT NULL,
  `idTipoCorte` SMALLINT NOT NULL,
  PRIMARY KEY (`idCita`),
  INDEX `fk_Cita_Persona1_idx` (`idPersona` ASC) VISIBLE,
  INDEX `fk_Cita_AgendaCita1_idx` (`idAgendaCita` ASC) VISIBLE,
  INDEX `fk_Cita_TipoCorte1_idx` (`idTipoCorte` ASC) VISIBLE,
  CONSTRAINT `fk_Cita_Persona1`
    FOREIGN KEY (`idPersona`)
    REFERENCES `babershop`.`Persona` (`idPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_AgendaCita1`
    FOREIGN KEY (`idAgendaCita`)
    REFERENCES `babershop`.`AgendaCita` (`idAgendaCita`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_TipoCorte1`
    FOREIGN KEY (`idTipoCorte`)
    REFERENCES `babershop`.`TipoCorte` (`idTipoCorte`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `babershop`.`About`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`About` (
  `idAbout` SMALLINT  AUTO_INCREMENT NOT NULL,
  `Descripcion` VARCHAR(100) NULL,
  `idPersona` INT NULL,
  PRIMARY KEY (`idAbout`),
  INDEX `fk_About_Persona1_idx` (`idPersona` ASC) VISIBLE,
  CONSTRAINT `fk_About_Persona1`
    FOREIGN KEY (`idPersona`)
    REFERENCES `babershop`.`Persona` (`idPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `babershop`.`TrabajoRealizado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barbershop`.`TrabajoRealizado` (
  `idTrabajoRealizado` INT  AUTO_INCREMENT NOT NULL,
  `imagen` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(100) NULL,
  `idTipoCorte` SMALLINT NOT NULL,
  PRIMARY KEY (`idTrabajoRealizado`),
  INDEX `fk_TrabajoRealizado_TipoCorte1_idx` (`idTipoCorte` ASC) VISIBLE,
  CONSTRAINT `fk_TrabajoRealizado_TipoCorte1`
    FOREIGN KEY (`idTipoCorte`)
    REFERENCES `babershop`.`TipoCorte` (`idTipoCorte`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

Creación de store procedure

CREATE PROCEDURE insert_User(u_nombreUsuario VARCHAR(45),u_contrasennia varchar(45) ,u_numeroTelefonico VARCHAR(45), u_gmail VARCHAR(50))

 insert into Persona(nombreUsuario, contrasennia, numeroTelefonico ,gmail) values (u_nombreUsuario, u_contrasennia,u_numeroTelefonico, u_gmail)

CREATE PROCEDURE getUsers()
   
    SELECT nombreUsuario, numeroTelefonico, gmail, activoSN
    FROM Persona;
    
    CREATE PROCEDURE getRol()
   
     SELECT idRolPersona, Descripcion
    FROM RolPersona
