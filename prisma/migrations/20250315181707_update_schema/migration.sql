-- AddForeignKey
ALTER TABLE `resourcepositions` ADD FOREIGN KEY (`resourceId`) REFERENCES `resources`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
