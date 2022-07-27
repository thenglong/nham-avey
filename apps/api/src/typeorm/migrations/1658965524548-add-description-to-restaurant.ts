import { MigrationInterface, QueryRunner } from "typeorm"

export class addDescriptionToRestaurant1658965524548 implements MigrationInterface {
  name = "addDescriptionToRestaurant1658965524548"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "description" character varying(255)
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "description"
          `)
  }
}
