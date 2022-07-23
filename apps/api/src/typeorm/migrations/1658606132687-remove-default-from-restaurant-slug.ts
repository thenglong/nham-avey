import { MigrationInterface, QueryRunner } from "typeorm"

export class removeDefaultFromRestaurantSlug1658606132687 implements MigrationInterface {
  name = "removeDefaultFromRestaurantSlug1658606132687"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ALTER COLUMN "slug" DROP DEFAULT
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ALTER COLUMN "slug"
              SET DEFAULT ''
          `)
  }
}
