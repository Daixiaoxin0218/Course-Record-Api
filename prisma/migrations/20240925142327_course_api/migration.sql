-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sex` INTEGER NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `monthly_sales` INTEGER NULL,
    `total_sales` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(191) NOT NULL,
    `course_price` INTEGER NOT NULL,
    `class_hour` INTEGER NOT NULL,
    `every_class` INTEGER NOT NULL,
    `surplus` INTEGER NOT NULL,
    `start_date` VARCHAR(191) NOT NULL,
    `deadline_date` VARCHAR(191) NOT NULL,
    `stop_card` VARCHAR(191) NULL,
    `resume_classes` VARCHAR(191) NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
