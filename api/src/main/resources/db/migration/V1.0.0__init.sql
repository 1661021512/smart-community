/*
 Navicat Premium Data Transfer

 Source Server         : cd.mengyunzhi.com
 Source Server Type    : MySQL
 Source Server Version : 50734
 Source Host           : ci.mengyunzhi.com:3633
 Source Schema         : smartcommunity

 Target Server Type    : MySQL
 Target Server Version : 50734
 File Encoding         : 65001

 Date: 26/09/2021 23:12:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for community3d
-- ----------------------------
DROP TABLE IF EXISTS `community3d`;
CREATE TABLE `community3d` (
                               `id` bigint(20) NOT NULL AUTO_INCREMENT,
                               `create_time` datetime(6) DEFAULT NULL,
                               `delete_at` bigint(20) DEFAULT NULL,
                               `deleted` bit(1) DEFAULT NULL,
                               `name` varchar(255) DEFAULT NULL,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for crimed_type
-- ----------------------------
DROP TABLE IF EXISTS `crimed_type`;
CREATE TABLE `crimed_type` (
                               `id` bigint(20) NOT NULL AUTO_INCREMENT,
                               `create_time` datetime(6) DEFAULT NULL,
                               `delete_at` bigint(20) DEFAULT NULL,
                               `deleted` bit(1) DEFAULT NULL,
                               `name` varchar(255) NOT NULL,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for crimed_type_resident
-- ----------------------------
DROP TABLE IF EXISTS `crimed_type_resident`;
CREATE TABLE `crimed_type_resident` (
                                        `resident_id` bigint(20) NOT NULL,
                                        `crimed_type_id` bigint(20) NOT NULL,
                                        KEY `FKq4rnw2jqabqncwyfx2fvrxeg9` (`crimed_type_id`),
                                        KEY `FK5tergqjb6bn5nnhfufu8brg5n` (`resident_id`),
                                        CONSTRAINT `FK5tergqjb6bn5nnhfufu8brg5n` FOREIGN KEY (`resident_id`) REFERENCES `resident` (`id`),
                                        CONSTRAINT `FKq4rnw2jqabqncwyfx2fvrxeg9` FOREIGN KEY (`crimed_type_id`) REFERENCES `crimed_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for cult
-- ----------------------------
DROP TABLE IF EXISTS `cult`;
CREATE TABLE `cult` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `create_time` datetime(6) DEFAULT NULL,
                        `delete_at` bigint(20) DEFAULT NULL,
                        `deleted` bit(1) DEFAULT NULL,
                        `last_used_time` datetime(6) DEFAULT NULL,
                        `name` varchar(255) NOT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for district
-- ----------------------------
DROP TABLE IF EXISTS `district`;
CREATE TABLE `district` (
                            `type` varchar(10) NOT NULL,
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `create_time` datetime(6) DEFAULT NULL,
                            `delete_at` bigint(20) DEFAULT NULL,
                            `deleted` bit(1) DEFAULT NULL,
                            `name` varchar(255) NOT NULL,
                            `pinyin` varchar(255) DEFAULT NULL,
                            `horizontal_offset` bigint(20) NOT NULL DEFAULT '0',
                            `house_type` smallint(6) NOT NULL DEFAULT '0',
                            `houses_length_of_floor` bigint(20) NOT NULL DEFAULT '0',
                            `max_floor` bigint(20) NOT NULL DEFAULT '0',
                            `unit_count` bigint(20) NOT NULL DEFAULT '0',
                            `vertical_offset` bigint(20) NOT NULL DEFAULT '0',
                            `establish_time` datetime(6) DEFAULT NULL,
                            `latitude` decimal(19,2) DEFAULT NULL,
                            `longitude` decimal(19,2) DEFAULT NULL,
                            `parent_id` bigint(20) DEFAULT NULL,
                            `model_id` bigint(20) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `FKqhpw6kbpeysnadj1h29wpr1e3` (`parent_id`),
                            KEY `FKpb81lil8loy6kgdskh9gthxh2` (`model_id`),
                            CONSTRAINT `FKpb81lil8loy6kgdskh9gthxh2` FOREIGN KEY (`model_id`) REFERENCES `village3d_model` (`id`),
                            CONSTRAINT `FKqhpw6kbpeysnadj1h29wpr1e3` FOREIGN KEY (`parent_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for enterprise
-- ----------------------------
DROP TABLE IF EXISTS `enterprise`;
CREATE TABLE `enterprise` (
                              `id` bigint(20) NOT NULL AUTO_INCREMENT,
                              `create_time` datetime(6) DEFAULT NULL,
                              `delete_at` bigint(20) DEFAULT NULL,
                              `deleted` bit(1) DEFAULT NULL,
                              `name` varchar(255) NOT NULL,
                              PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                         `create_time` datetime(6) DEFAULT NULL,
                         `delete_at` bigint(20) DEFAULT NULL,
                         `deleted` bit(1) DEFAULT NULL,
                         `area` bigint(20) NOT NULL,
                         `check_in_time` datetime(6) DEFAULT NULL,
                         `floor` bigint(20) NOT NULL,
                         `low_incoming` bit(1) NOT NULL,
                         `name` varchar(255) NOT NULL DEFAULT '',
                         `the_offset` bigint(20) NOT NULL DEFAULT '0',
                         `relief` bit(1) NOT NULL,
                         `remarks` varchar(255) NOT NULL,
                         `type` smallint(6) DEFAULT NULL,
                         `weight` bigint(20) DEFAULT NULL,
                         `width` bigint(20) DEFAULT NULL,
                         `building_id` bigint(20) NOT NULL,
                         `owner_id` bigint(20) DEFAULT NULL,
                         `unit_id` bigint(20) NOT NULL,
                         PRIMARY KEY (`id`),
                         KEY `FKilqkan7kp2vct3axw185dex84` (`building_id`),
                         KEY `FKija64r2m1ila593oi7xt4j91n` (`owner_id`),
                         KEY `FK9jmjvfil0iy0t2afs16tworsm` (`unit_id`),
                         CONSTRAINT `FK9jmjvfil0iy0t2afs16tworsm` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`),
                         CONSTRAINT `FKija64r2m1ila593oi7xt4j91n` FOREIGN KEY (`owner_id`) REFERENCES `resident` (`id`),
                         CONSTRAINT `FKilqkan7kp2vct3axw185dex84` FOREIGN KEY (`building_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for house_resident
-- ----------------------------
DROP TABLE IF EXISTS `house_resident`;
CREATE TABLE `house_resident` (
                                  `resident_id` bigint(20) NOT NULL,
                                  `house_id` bigint(20) NOT NULL,
                                  KEY `FK5py5w7hwu2o5yb0xbdmhhxa11` (`house_id`),
                                  KEY `FKafn3nn2cwl2ol80lyia0y1v2c` (`resident_id`),
                                  CONSTRAINT `FK5py5w7hwu2o5yb0xbdmhhxa11` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`),
                                  CONSTRAINT `FKafn3nn2cwl2ol80lyia0y1v2c` FOREIGN KEY (`resident_id`) REFERENCES `resident` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for job_type
-- ----------------------------
DROP TABLE IF EXISTS `job_type`;
CREATE TABLE `job_type` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `create_time` datetime(6) DEFAULT NULL,
                            `delete_at` bigint(20) DEFAULT NULL,
                            `deleted` bit(1) DEFAULT NULL,
                            `last_used_time` datetime(6) DEFAULT NULL,
                            `name` varchar(255) NOT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for job_type_resident
-- ----------------------------
DROP TABLE IF EXISTS `job_type_resident`;
CREATE TABLE `job_type_resident` (
                                     `resident_id` bigint(20) NOT NULL,
                                     `job_type_id` bigint(20) NOT NULL,
                                     KEY `FKk86id7mfht80nas5uunrrtg0m` (`job_type_id`),
                                     KEY `FKo5qtsr9adur1p4rxu2vjmlbfq` (`resident_id`),
                                     CONSTRAINT `FKk86id7mfht80nas5uunrrtg0m` FOREIGN KEY (`job_type_id`) REFERENCES `job_type` (`id`),
                                     CONSTRAINT `FKo5qtsr9adur1p4rxu2vjmlbfq` FOREIGN KEY (`resident_id`) REFERENCES `resident` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for relationship
-- ----------------------------
DROP TABLE IF EXISTS `relationship`;
CREATE TABLE `relationship` (
                                `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                `create_time` datetime(6) DEFAULT NULL,
                                `delete_at` bigint(20) DEFAULT NULL,
                                `deleted` bit(1) DEFAULT NULL,
                                `name` varchar(255) DEFAULT NULL,
                                `weight` int(11) DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for religious_belief
-- ----------------------------
DROP TABLE IF EXISTS `religious_belief`;
CREATE TABLE `religious_belief` (
                                    `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                    `create_time` datetime(6) DEFAULT NULL,
                                    `delete_at` bigint(20) DEFAULT NULL,
                                    `deleted` bit(1) DEFAULT NULL,
                                    `name` varchar(255) NOT NULL DEFAULT '',
                                    PRIMARY KEY (`id`),
                                    UNIQUE KEY `UK_mbc1ypjmm2k2u4u7s2i8slsc` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for resident
-- ----------------------------
DROP TABLE IF EXISTS `resident`;
CREATE TABLE `resident` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `create_time` datetime(6) DEFAULT NULL,
                            `delete_at` bigint(20) DEFAULT NULL,
                            `deleted` bit(1) DEFAULT NULL,
                            `account_number` varchar(255) DEFAULT NULL,
                            `be_chronic_disease` bit(1) DEFAULT NULL,
                            `be_crimed` bit(1) DEFAULT NULL,
                            `be_cult_member` bit(1) DEFAULT NULL,
                            `be_disabled` bit(1) DEFAULT NULL,
                            `be_disabled_solider` bit(1) DEFAULT NULL,
                            `be_empty_nest` bit(1) DEFAULT NULL,
                            `be_endowment_insurance` bit(1) DEFAULT NULL,
                            `be_enter_to_war` bit(1) DEFAULT NULL,
                            `be_floating` bit(1) DEFAULT NULL,
                            `be_left_behind_children` bit(1) DEFAULT NULL,
                            `be_letter_imitation_people` bit(1) DEFAULT NULL,
                            `be_lonely_or_widowed` bit(1) DEFAULT NULL,
                            `be_medical_insurance` bit(1) DEFAULT NULL,
                            `be_nuclear` bit(1) DEFAULT NULL,
                            `be_old_age_allowance` bit(1) DEFAULT NULL,
                            `be_soldier` bit(1) DEFAULT NULL,
                            `be_student` bit(1) DEFAULT NULL,
                            `be_subsistence_allowances` bit(1) DEFAULT NULL,
                            `be_volunteer` bit(1) DEFAULT NULL,
                            `chronic_disease_details` varchar(255) DEFAULT NULL,
                            `date_of_birth` datetime(6) DEFAULT NULL,
                            `domicile_place` varchar(255) DEFAULT NULL,
                            `education` smallint(6) DEFAULT NULL,
                            `employment_status` smallint(6) DEFAULT NULL,
                            `floated_date` datetime(6) DEFAULT NULL,
                            `floated_place` varchar(255) DEFAULT NULL,
                            `id_number` varchar(255) NOT NULL,
                            `letter_imitation_content` varchar(255) DEFAULT NULL,
                            `local_domicile` bit(1) DEFAULT NULL,
                            `marital_status` smallint(6) DEFAULT NULL,
                            `name` varchar(255) DEFAULT NULL,
                            `nationality` smallint(6) DEFAULT NULL,
                            `phone` varchar(255) DEFAULT NULL,
                            `political_climate` smallint(6) DEFAULT NULL,
                            `religion` varchar(255) DEFAULT NULL,
                            `remarks` varchar(255) DEFAULT NULL,
                            `school` varchar(255) DEFAULT NULL,
                            `school_address` varchar(255) DEFAULT NULL,
                            `sex` bit(1) DEFAULT NULL,
                            `work_place` varchar(255) DEFAULT NULL,
                            `enterprise_id` bigint(20) DEFAULT NULL,
                            `religious_belief_id` bigint(20) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `UK_8xqclsumlm6suao1tlixgu99i` (`id_number`),
                            KEY `FK8f2ujmj4e1w6bvvhi2ehuqlyq` (`enterprise_id`),
                            KEY `FKoo56cw52cbvnmjek46scuxyd0` (`religious_belief_id`),
                            CONSTRAINT `FK8f2ujmj4e1w6bvvhi2ehuqlyq` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise` (`id`),
                            CONSTRAINT `FKoo56cw52cbvnmjek46scuxyd0` FOREIGN KEY (`religious_belief_id`) REFERENCES `religious_belief` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for resident_relationships
-- ----------------------------
DROP TABLE IF EXISTS `resident_relationships`;
CREATE TABLE `resident_relationships` (
                                          `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                          `create_time` datetime(6) DEFAULT NULL,
                                          `delete_at` bigint(20) DEFAULT NULL,
                                          `deleted` bit(1) DEFAULT NULL,
                                          `another_resident_id` bigint(20) NOT NULL,
                                          `one_resident_id` bigint(20) NOT NULL,
                                          `relationship_id` bigint(20) NOT NULL,
                                          PRIMARY KEY (`id`),
                                          KEY `FKkbjiggujeqp8vc91rrqsp4s3w` (`another_resident_id`),
                                          KEY `FK38gge2g9nreo7gf6wm1ama13j` (`one_resident_id`),
                                          KEY `FKrjf8q0mbm0at3xia1ljo3v5ty` (`relationship_id`),
                                          CONSTRAINT `FK38gge2g9nreo7gf6wm1ama13j` FOREIGN KEY (`one_resident_id`) REFERENCES `resident` (`id`),
                                          CONSTRAINT `FKkbjiggujeqp8vc91rrqsp4s3w` FOREIGN KEY (`another_resident_id`) REFERENCES `resident` (`id`),
                                          CONSTRAINT `FKrjf8q0mbm0at3xia1ljo3v5ty` FOREIGN KEY (`relationship_id`) REFERENCES `relationship` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for resident_skill
-- ----------------------------
DROP TABLE IF EXISTS `resident_skill`;
CREATE TABLE `resident_skill` (
                                  `resident_id` bigint(20) NOT NULL,
                                  `skill_id` bigint(20) NOT NULL,
                                  KEY `FKb9mj57rg078u9pnc4v7y816ei` (`skill_id`),
                                  KEY `FKqu97wtrkb7ln2ryds6e0t8ety` (`resident_id`),
                                  CONSTRAINT `FKb9mj57rg078u9pnc4v7y816ei` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`),
                                  CONSTRAINT `FKqu97wtrkb7ln2ryds6e0t8ety` FOREIGN KEY (`resident_id`) REFERENCES `resident` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `create_time` datetime(6) DEFAULT NULL,
                        `delete_at` bigint(20) DEFAULT NULL,
                        `deleted` bit(1) DEFAULT NULL,
                        `name` varchar(255) NOT NULL,
                        `systemed` bit(1) DEFAULT NULL,
                        `value` varchar(255) NOT NULL,
                        `weight` int(11) NOT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for skill
-- ----------------------------
DROP TABLE IF EXISTS `skill`;
CREATE TABLE `skill` (
                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                         `create_time` datetime(6) DEFAULT NULL,
                         `delete_at` bigint(20) DEFAULT NULL,
                         `deleted` bit(1) DEFAULT NULL,
                         `last_used_time` datetime(6) DEFAULT NULL,
                         `name` varchar(255) NOT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for unit
-- ----------------------------
DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `create_time` datetime(6) DEFAULT NULL,
                        `delete_at` bigint(20) DEFAULT NULL,
                        `deleted` bit(1) DEFAULT NULL,
                        `name` varchar(255) NOT NULL DEFAULT '',
                        `weight` bigint(20) NOT NULL DEFAULT '0',
                        `building_id` bigint(20) NOT NULL,
                        PRIMARY KEY (`id`),
                        KEY `FKbid25lj4q6iwlxo7g33i9ku0h` (`building_id`),
                        CONSTRAINT `FKbid25lj4q6iwlxo7g33i9ku0h` FOREIGN KEY (`building_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `create_time` datetime(6) DEFAULT NULL,
                        `delete_at` bigint(20) DEFAULT NULL,
                        `deleted` bit(1) DEFAULT NULL,
                        `name` varchar(255) DEFAULT NULL,
                        `password` varchar(255) DEFAULT NULL,
                        `status` int(11) DEFAULT NULL,
                        `username` varchar(255) DEFAULT NULL,
                        `district_id` bigint(20) NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `UK5bd9yqnpf0w0teyr7iw28u388` (`username`,`delete_at`),
                        KEY `FKq6a9571l40g6c02up8o4ky79b` (`district_id`),
                        CONSTRAINT `FKq6a9571l40g6c02up8o4ky79b` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
                              `user_id` bigint(20) NOT NULL,
                              `roles_id` bigint(20) NOT NULL,
                              KEY `FKj9553ass9uctjrmh0gkqsmv0d` (`roles_id`),
                              KEY `FK55itppkw3i07do3h7qoclqd4k` (`user_id`),
                              CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
                              CONSTRAINT `FKj9553ass9uctjrmh0gkqsmv0d` FOREIGN KEY (`roles_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for village3d_model
-- ----------------------------
DROP TABLE IF EXISTS `village3d_model`;
CREATE TABLE `village3d_model` (
                                   `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                   `create_time` datetime(6) DEFAULT NULL,
                                   `delete_at` bigint(20) DEFAULT NULL,
                                   `deleted` bit(1) DEFAULT NULL,
                                   `name` varchar(255) DEFAULT NULL,
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
