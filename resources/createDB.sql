SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Team4
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Team4
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `Team4` DEFAULT CHARACTER SET utf8 ;
USE `Team4` ;

-- -----------------------------------------------------------------
/*
DROP TABLE Team4.Owns;
DROP TABLE Team4.Sells;
DROP TABLE Team4.Transactions;
DROP TABLE Team4.Inventory;
DROP TABLE Team4.User;
*/

-- -----------------------------------------------------------

-- -----------------------------------------------------
-- Table `Team4`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team4`.`User` (
  `idUser` INT AUTO_INCREMENT,
  `email` VARCHAR(26) NOT NULL,
  `name` VARCHAR(26) NOT NULL,
  `username` VARCHAR(26) NOT NULL,
  `pwd` VARCHAR(15) NOT NULL,
  `reminder` VARCHAR(45) NOT NULL,
  `curBal` DOUBLE NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Team4`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team4`.`Inventory` (
  `idInventory` INT AUTO_INCREMENT,
  `Pname` VARCHAR(22) NOT NULL,
  `Pdescription` VARCHAR(37) NOT NULL,
  PRIMARY KEY (`idInventory`),
  UNIQUE INDEX `idInventory_UNIQUE` (`idInventory` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team4`.`Transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team4`.`Transactions` (
  `Tid` INT AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `buyer_idUser` INT NOT NULL,
  `seller_idUser` INT NOT NULL,
  `item_idInventory` INT NOT NULL,
  PRIMARY KEY (`Tid`, `buyer_idUser`, `seller_idUser`, `item_idInventory`),
  UNIQUE INDEX `Tid_UNIQUE` (`Tid` ASC),
  INDEX `fk_Transactions_User_idx` (`buyer_idUser` ASC),
  INDEX `fk_Transactions_User1_idx` (`seller_idUser` ASC),
  INDEX `fk_Transactions_Inventory1_idx` (`item_idInventory` ASC),
  CONSTRAINT `fk_Transactions_Userbuy`
    FOREIGN KEY (`buyer_idUser`)
    REFERENCES `Team4`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transactions_Usersell`
    FOREIGN KEY (`seller_idUser`)
    REFERENCES `Team4`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transactions_Inventory1`
    FOREIGN KEY (`item_idInventory`)
    REFERENCES `Team4`.`Inventory` (`idInventory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team4`.`Sells`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team4`.`Sells` (
  `4sale_id` INT AUTO_INCREMENT,
  `item_idInventory` INT NOT NULL,
  `seller_idUser` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  PRIMARY KEY (`4sale_id`,`item_idInventory`, `seller_idUser`),
  INDEX `fk_Inventory_has_User_User1_idx` (`seller_idUser` ASC),
  INDEX `fk_Inventory_has_User_Inventory1_idx` (`item_idInventory` ASC),
  CONSTRAINT `fk_Inventory_has_User_Inventory1`
    FOREIGN KEY (`item_idInventory`)
    REFERENCES `Team4`.`Inventory` (`idInventory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventory_has_User_User1`
    FOREIGN KEY (`seller_idUser`)
    REFERENCES `Team4`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team4`.`Owns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team4`.`Owns` (
  `item_idInventory` INT NOT NULL,
  `owner_idUser` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`item_idInventory`, `owner_idUser`),
  INDEX `fk_Inventory_has_User_User2_idx` (`owner_idUser` ASC),
  INDEX `fk_Inventory_has_User_Inventory2_idx` (`item_idInventory` ASC),
  CONSTRAINT `fk_Inventory_has_User_Inventory2`
    FOREIGN KEY (`item_idInventory`)
    REFERENCES `Team4`.`Inventory` (`idInventory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventory_has_User_User2`
    FOREIGN KEY (`owner_idUser`)
    REFERENCES `Team4`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


