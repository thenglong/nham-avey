import { MigrationInterface, QueryRunner } from "typeorm";

export class addCitySlugColumn1658608922137 implements MigrationInterface {
    name = 'addCitySlugColumn1658608922137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cities"
            ADD "slug" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cities" DROP COLUMN "slug"
        `);
    }

}
