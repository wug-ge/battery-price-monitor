import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSyncTypeORMSchema1740237531982 implements MigrationInterface {
    name = 'InitialSyncTypeORMSchema1740237531982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`battery_prices\` DROP FOREIGN KEY \`battery_prices_ibfk_1\``);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` DROP FOREIGN KEY \`battery_prices_ibfk_2\``);
        await queryRunner.query(`DROP INDEX \`batteryId\` ON \`battery_prices\``);
        await queryRunner.query(`DROP INDEX \`sourcerId\` ON \`battery_prices\``);
        await queryRunner.query(`ALTER TABLE \`batteries\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`batteries\` CHANGE \`voltage\` \`voltage\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`batteries\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`batteries\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sourcers\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`sourcers\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` ADD CONSTRAINT \`FK_9fce3b5c688ce3da78b906fdf0e\` FOREIGN KEY (\`batteryId\`) REFERENCES \`batteries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` ADD CONSTRAINT \`FK_ad4f9c5e77fb5cf5d7f78f9695b\` FOREIGN KEY (\`sourcerId\`) REFERENCES \`sourcers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`battery_prices\` DROP FOREIGN KEY \`FK_ad4f9c5e77fb5cf5d7f78f9695b\``);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` DROP FOREIGN KEY \`FK_9fce3b5c688ce3da78b906fdf0e\``);
        await queryRunner.query(`ALTER TABLE \`sourcers\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`sourcers\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`batteries\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`batteries\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`batteries\` CHANGE \`voltage\` \`voltage\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`batteries\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`CREATE INDEX \`sourcerId\` ON \`battery_prices\` (\`sourcerId\`)`);
        await queryRunner.query(`CREATE INDEX \`batteryId\` ON \`battery_prices\` (\`batteryId\`)`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` ADD CONSTRAINT \`battery_prices_ibfk_2\` FOREIGN KEY (\`sourcerId\`) REFERENCES \`sourcers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` ADD CONSTRAINT \`battery_prices_ibfk_1\` FOREIGN KEY (\`batteryId\`) REFERENCES \`batteries\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

}
