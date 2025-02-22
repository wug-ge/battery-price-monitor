import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1740237491232 implements MigrationInterface {
    name = 'InitialSchema1740237491232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`batteries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`eanGtin\` varchar(255) NOT NULL, \`weight\` float NOT NULL, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`chemistry\` varchar(255) NOT NULL, \`voltage\` float NOT NULL, \`minCapacity\` float NOT NULL, \`typCapacity\` float NOT NULL, \`version\` varchar(255) NOT NULL, \`dischargeCurrent\` float NOT NULL, \`circuitProtection\` varchar(255) NOT NULL, \`height\` float NOT NULL, \`diameter\` float NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sourcers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`battery_prices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`batteryId\` int NOT NULL, \`sourcerId\` int NOT NULL DEFAULT '1', \`price\` float NOT NULL, \`priceReduced\` float NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` ADD CONSTRAINT \`FK_9fce3b5c688ce3da78b906fdf0e\` FOREIGN KEY (\`batteryId\`) REFERENCES \`batteries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` ADD CONSTRAINT \`FK_ad4f9c5e77fb5cf5d7f78f9695b\` FOREIGN KEY (\`sourcerId\`) REFERENCES \`sourcers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`battery_prices\` DROP FOREIGN KEY \`FK_ad4f9c5e77fb5cf5d7f78f9695b\``);
        await queryRunner.query(`ALTER TABLE \`battery_prices\` DROP FOREIGN KEY \`FK_9fce3b5c688ce3da78b906fdf0e\``);
        await queryRunner.query(`DROP TABLE \`battery_prices\``);
        await queryRunner.query(`DROP TABLE \`sourcers\``);
        await queryRunner.query(`DROP TABLE \`batteries\``);
    }

}
