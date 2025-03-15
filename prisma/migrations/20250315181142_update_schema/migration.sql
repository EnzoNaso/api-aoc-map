-- CreateTable
CREATE TABLE `resources` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `respawnTimer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resourcepositions` (
    `id` VARCHAR(255) NOT NULL,
    `resourceId` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `rarity` VARCHAR(50) NOT NULL,
    `image` LONGBLOB,
    `lastHarvest` DATETIME(3),

    INDEX `resourcepositions.resourceId_index`(`resourceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
